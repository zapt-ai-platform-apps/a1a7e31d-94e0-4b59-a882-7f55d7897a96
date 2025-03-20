import React, { useState, useEffect, useCallback } from 'react';
import { generateMaze } from '../utils/mazeGenerator';
import MazeRenderer from './MazeRenderer';
import GameControls from './GameControls';

const MazeGame = () => {
  // Default maze size
  const rows = 15;
  const cols = 15;
  
  // Game state
  const [maze, setMaze] = useState([]);
  const [playerPosition, setPlayerPosition] = useState({ row: 0, col: 0 });
  const [exitPosition, setExitPosition] = useState({ row: rows - 1, col: cols - 1 });
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);

  // Generate a new maze
  const generateNewMaze = useCallback(() => {
    const newMaze = generateMaze(rows, cols);
    setMaze(newMaze);
    setPlayerPosition({ row: 0, col: 0 });
    setExitPosition({ row: rows - 1, col: cols - 1 });
    setGameStarted(false);
    setGameCompleted(false);
    setTimer(0);
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  }, [rows, cols, timerInterval]);

  // Initialize the game
  useEffect(() => {
    generateNewMaze();
    console.log("New maze generated");
  }, [generateNewMaze]);

  // Handle keyboard input for player movement
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gameStarted && !gameCompleted) {
        // Start the game and timer on first movement
        setGameStarted(true);
        const interval = setInterval(() => {
          setTimer((prevTimer) => prevTimer + 0.1);
        }, 100);
        setTimerInterval(interval);
        console.log("Game started");
      }

      if (gameCompleted) return;

      const { row, col } = playerPosition;
      let newRow = row;
      let newCol = col;

      // Check if move is valid (no wall in the way)
      switch (e.key) {
        case 'ArrowUp':
          if (!maze[row][col].walls.top) {
            newRow = row - 1;
          }
          break;
        case 'ArrowRight':
          if (!maze[row][col].walls.right) {
            newCol = col + 1;
          }
          break;
        case 'ArrowDown':
          if (!maze[row][col].walls.bottom) {
            newRow = row + 1;
          }
          break;
        case 'ArrowLeft':
          if (!maze[row][col].walls.left) {
            newCol = col - 1;
          }
          break;
        default:
          return;
      }

      // Update player position if valid move
      if (newRow !== row || newCol !== col) {
        setPlayerPosition({ row: newRow, col: newCol });
        console.log(`Player moved to: [${newRow}, ${newCol}]`);

        // Check if player reached the exit
        if (newRow === exitPosition.row && newCol === exitPosition.col) {
          setGameCompleted(true);
          clearInterval(timerInterval);
          setTimerInterval(null);
          console.log("Game completed!");
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [maze, playerPosition, exitPosition, gameStarted, gameCompleted, timerInterval]);

  // Restart the game
  const handleRestart = () => {
    generateNewMaze();
    console.log("Game restarted");
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">Maze Runner</h1>
      
      <MazeRenderer 
        maze={maze} 
        playerPosition={playerPosition} 
        exitPosition={exitPosition} 
      />
      
      <GameControls 
        timer={timer.toFixed(1)} 
        onRestart={handleRestart}
        gameCompleted={gameCompleted}
      />
    </div>
  );
};

export default MazeGame;