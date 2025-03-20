import { useState, useEffect } from 'react';

export function useHighScores() {
  const [highScores, setHighScores] = useState({
    easy: [],
    medium: [],
    hard: []
  });

  // Load high scores from localStorage on initial render
  useEffect(() => {
    const savedScores = localStorage.getItem('mazeRunnerHighScores');
    if (savedScores) {
      try {
        const parsedScores = JSON.parse(savedScores);
        setHighScores(parsedScores);
        console.log('Loaded high scores from localStorage:', parsedScores);
      } catch (error) {
        console.error('Error parsing high scores from localStorage:', error);
      }
    }
  }, []);

  // Add a new high score
  const addHighScore = (difficulty, time) => {
    setHighScores(prevScores => {
      // Create a copy of the current scores for this difficulty
      const newScores = [...prevScores[difficulty], time];
      
      // Sort scores (lowest/fastest time first)
      newScores.sort((a, b) => a - b);
      
      // Create a new object with updated scores
      const updatedScores = {
        ...prevScores,
        [difficulty]: newScores
      };
      
      // Save to localStorage
      localStorage.setItem('mazeRunnerHighScores', JSON.stringify(updatedScores));
      console.log(`Added new high score for ${difficulty}: ${time}s`);
      
      return updatedScores;
    });
  };

  // Clear all high scores
  const clearHighScores = () => {
    const emptyScores = {
      easy: [],
      medium: [],
      hard: []
    };
    
    setHighScores(emptyScores);
    localStorage.removeItem('mazeRunnerHighScores');
    console.log('Cleared all high scores');
  };

  return {
    highScores,
    addHighScore,
    clearHighScores
  };
}