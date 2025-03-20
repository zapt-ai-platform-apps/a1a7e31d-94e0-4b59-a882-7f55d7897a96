import React from 'react';

const GameControls = ({ timer, onRestart, gameCompleted }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg">
          <span className="font-medium">Time:</span> {timer}s
        </div>
        <button
          onClick={onRestart}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer transition-colors"
        >
          {gameCompleted ? 'Play Again' : 'Restart'}
        </button>
      </div>
      
      {gameCompleted && (
        <div className="text-center text-xl font-bold text-green-600 mb-4 py-2 bg-green-100 rounded">
          Maze Completed! Your time: {timer}s
        </div>
      )}
      
      <div className="text-sm text-gray-600 mt-4 p-2 bg-gray-100 rounded">
        Use the arrow keys to navigate through the maze.
      </div>
    </div>
  );
};

export default GameControls;