import React from 'react';

const DifficultySelector = ({ difficulty, onDifficultyChange, disabled }) => {
  const difficulties = [
    { id: 'easy', label: 'Easy', size: '10x10' },
    { id: 'medium', label: 'Medium', size: '15x15' },
    { id: 'hard', label: 'Hard', size: '20x20' }
  ];

  return (
    <div className="w-full mb-4">
      <div className="flex flex-col sm:flex-row justify-between items-center bg-gray-100 p-2 rounded">
        <label className="font-medium text-gray-700 mb-2 sm:mb-0">
          Difficulty:
        </label>
        <div className="flex space-x-2">
          {difficulties.map(({ id, label, size }) => (
            <button
              key={id}
              onClick={() => onDifficultyChange(id)}
              className={`px-3 py-1 text-sm rounded transition-colors ${
                difficulty === id 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-200'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              disabled={disabled}
              aria-pressed={difficulty === id}
              aria-label={`${label} difficulty (${size})`}
            >
              {label}
              <span className="hidden sm:inline ml-1 text-xs opacity-80">({size})</span>
            </button>
          ))}
        </div>
      </div>
      {disabled && (
        <p className="text-xs text-gray-500 mt-1 italic text-center">
          Finish the current maze or restart to change difficulty
        </p>
      )}
    </div>
  );
};

export default DifficultySelector;