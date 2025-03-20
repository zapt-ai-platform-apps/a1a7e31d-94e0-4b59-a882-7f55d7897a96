import React from 'react';

const HighScoresList = ({ highScores, difficulty }) => {
  const difficultyLabels = {
    easy: 'Easy (10x10)',
    medium: 'Medium (15x15)',
    hard: 'Hard (20x20)'
  };

  if (!highScores || highScores.length === 0) {
    return (
      <div className="mt-4 p-3 bg-gray-50 rounded border border-gray-200">
        <h3 className="font-medium text-gray-700 mb-2">Best Times ({difficultyLabels[difficulty]})</h3>
        <p className="text-gray-500 text-sm italic">No high scores yet. Complete the maze to set a record!</p>
      </div>
    );
  }

  return (
    <div className="mt-4 p-3 bg-gray-50 rounded border border-gray-200">
      <h3 className="font-medium text-gray-700 mb-2">Best Times ({difficultyLabels[difficulty]})</h3>
      <ol className="space-y-1">
        {highScores.slice(0, 5).map((score, index) => (
          <li key={index} className="flex justify-between text-sm">
            <span className={index === 0 ? "font-bold text-blue-600" : ""}>
              #{index + 1}
            </span>
            <span className={index === 0 ? "font-bold text-blue-600" : ""}>
              {score.toFixed(1)}s
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default HighScoresList;