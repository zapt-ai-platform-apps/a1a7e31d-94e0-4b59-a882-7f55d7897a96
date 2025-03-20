import React, { useState, useEffect, useCallback, useRef } from 'react';
import { generateMaze } from '../utils/mazeGenerator';
import MazeRenderer from './MazeRenderer';
import GameControls from './GameControls';
import DifficultySelector from './DifficultySelector';
import { useHighScores } from '../hooks/useHighScores';

const MazeGame = () => {
  // Game configuration
  const [difficulty, setDifficulty] = useState('medium');
  const difficultySettings = {
    easy: { rows: 10, cols: 10 },
    medium: { rows: 15, cols: 15 },
    hard: { rows: 20, cols: 20 }
  };
  
  const { rows, cols } = difficultySettings[difficulty];
  
  // Game state
  const [maze, setMaze] = useState([]);
  const [playerPosition, setPlayerPosition] = useState({ row: 0, col: 0 });
  const [prevPlayerPosition, setPrevPlayerPosition] = useState({ row: 0, col: 0 });
  const [exitPosition, setExitPosition] = useState({ row: rows - 1, col: cols - 1 });
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [isMoving, setIsMoving] = useState(false);
  const mazeRef = useRef(null);
  
  // High scores
  const { highScores, addHighScore } = useHighScores();

  // Generate a new maze
  const generateNewMaze = useCallback(() => {
    console.log(`Generating new ${difficulty} maze: ${rows}x${cols}`);
    const newMaze = generateMaze(rows, cols);
    setMaze(newMaze);
    setPlayerPosition({ row: 0, col: 0 });
    setPrevPlayerPosition({ row: 0, col: 0 });
    setExitPosition({ row: rows - 1, col: cols - 1 });
    setGameStarted(false);
    setGameCompleted(false);
    setTimer(0);
    setIsMoving(false);
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  }, [rows, cols, difficulty, timerInterval]);

  // Initialize the game
  useEffect(() => {
    generateNewMaze();
  }, [generateNewMaze]);

  // Handle keyboard input for player movement
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isMoving || gameCompleted) return;

      if (!gameStarted && ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'].includes(e.key)) {
        // Start the game and timer on first movement
        setGameStarted(true);
        const interval = setInterval(() => {
          setTimer((prevTimer) => prevTimer + 0.1);
        }, 100);
        setTimerInterval(interval);
        console.log("Game started");
      }

      const { row, col } = playerPosition;
      let newRow = row;
      let newCol = col;

      // Check if move is valid (no wall in the way)
      switch (e.key) {
        case 'ArrowUp':
          if (!maze[row][col].walls.top) {
            newRow = row - 1;
            playMoveSound();
          }
          break;
        case 'ArrowRight':
          if (!maze[row][col].walls.right) {
            newCol = col + 1;
            playMoveSound();
          }
          break;
        case 'ArrowDown':
          if (!maze[row][col].walls.bottom) {
            newRow = row + 1;
            playMoveSound();
          }
          break;
        case 'ArrowLeft':
          if (!maze[row][col].walls.left) {
            newCol = col - 1;
            playMoveSound();
          }
          break;
        default:
          return;
      }

      // Update player position if valid move
      if (newRow !== row || newCol !== col) {
        setPrevPlayerPosition({ row, col });
        setPlayerPosition({ row: newRow, col: newCol });
        setIsMoving(true);
        
        setTimeout(() => {
          setIsMoving(false);
        }, 150); // Match this with CSS transition duration

        // Check if player reached the exit
        if (newRow === exitPosition.row && newCol === exitPosition.col) {
          completeGame();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [maze, playerPosition, exitPosition, gameStarted, gameCompleted, timerInterval, isMoving]);

  // Play sound effects
  const playMoveSound = () => {
    // Simple approach with inline audio - in a production app, you'd use a proper audio system
    try {
      const audio = new Audio("data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=");
      audio.volume = 0.2;
      audio.play().catch(e => console.log("Audio play failed:", e));
    } catch (e) {
      console.log("Audio creation failed:", e);
    }
  };

  const playCompletionSound = () => {
    try {
      const audio = new Audio("data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=");
      audio.volume = 0.3;
      audio.play().catch(e => console.log("Audio play failed:", e));
    } catch (e) {
      console.log("Audio creation failed:", e);
    }
  };

  // Complete the game
  const completeGame = () => {
    setGameCompleted(true);
    clearInterval(timerInterval);
    setTimerInterval(null);
    playCompletionSound();
    
    // Add high score
    const finalTime = parseFloat(timer.toFixed(1));
    addHighScore(difficulty, finalTime);
    
    console.log("Game completed!");
  };

  // Handle touch controls for mobile devices
  const handleTouchControl = useCallback((direction) => {
    if (isMoving || gameCompleted) return;

    if (!gameStarted) {
      // Start the game and timer on first movement
      setGameStarted(true);
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 0.1);
      }, 100);
      setTimerInterval(interval);
      console.log("Game started");
    }

    const { row, col } = playerPosition;
    let newRow = row;
    let newCol = col;

    // Check if move is valid (no wall in the way)
    switch (direction) {
      case 'up':
        if (!maze[row][col].walls.top) {
          newRow = row - 1;
          playMoveSound();
        }
        break;
      case 'right':
        if (!maze[row][col].walls.right) {
          newCol = col + 1;
          playMoveSound();
        }
        break;
      case 'down':
        if (!maze[row][col].walls.bottom) {
          newRow = row + 1;
          playMoveSound();
        }
        break;
      case 'left':
        if (!maze[row][col].walls.left) {
          newCol = col - 1;
          playMoveSound();
        }
        break;
      default:
        return;
    }

    // Update player position if valid move
    if (newRow !== row || newCol !== col) {
      setPrevPlayerPosition({ row, col });
      setPlayerPosition({ row: newRow, col: newCol });
      setIsMoving(true);
      
      setTimeout(() => {
        setIsMoving(false);
      }, 150); // Match this with CSS transition duration

      // Check if player reached the exit
      if (newRow === exitPosition.row && newCol === exitPosition.col) {
        completeGame();
      }
    }
  }, [maze, playerPosition, exitPosition, gameStarted, gameCompleted, timerInterval, isMoving]);

  // Restart the game
  const handleRestart = () => {
    generateNewMaze();
    console.log("Game restarted");
  };

  // Change difficulty
  const handleDifficultyChange = (newDifficulty) => {
    if (difficulty !== newDifficulty) {
      setDifficulty(newDifficulty);
      // The maze will be regenerated due to useEffect dependency
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg w-full max-w-2xl" ref={mazeRef}>
      <h1 className="text-2xl font-bold mb-4 text-blue-600">Maze Runner</h1>
      
      <DifficultySelector 
        difficulty={difficulty} 
        onDifficultyChange={handleDifficultyChange} 
        disabled={gameStarted && !gameCompleted}
      />
      
      <MazeRenderer 
        maze={maze} 
        playerPosition={playerPosition}
        prevPlayerPosition={prevPlayerPosition}
        exitPosition={exitPosition}
        isMoving={isMoving}
        cellSize={difficulty === 'hard' ? 18 : difficulty === 'easy' ? 30 : 24}
      />
      
      <GameControls 
        timer={timer.toFixed(1)} 
        onRestart={handleRestart}
        gameCompleted={gameCompleted}
        onDirectionClick={handleTouchControl}
        highScores={highScores[difficulty]}
        difficulty={difficulty}
      />
    </div>
  );
};

export default MazeGame;