import React from 'react';

const GameControls = ({ timer, onRestart, gameCompleted, onDirectionClick }) => {
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
        <div className="text-center text-xl font-bold text-green-600 mb-4 py-2 bg-green-100 rounded animate-pulse">
          Maze Completed! Your time: {timer}s
        </div>
      )}
      
      <div className="text-sm text-gray-600 mt-4 p-2 bg-gray-100 rounded">
        Use the arrow keys to navigate through the maze.
      </div>
      
      {/* Touch controls for mobile */}
      <div className="mt-4 md:hidden">
        <div className="flex justify-center mb-2">
          <button 
            onClick={() => onDirectionClick('up')}
            className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl shadow-md cursor-pointer"
            aria-label="Move up"
          >
            ↑
          </button>
        </div>
        <div className="flex justify-center space-x-4">
          <button 
            onClick={() => onDirectionClick('left')}
            className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl shadow-md cursor-pointer"
            aria-label="Move left"
          >
            ←
          </button>
          <button 
            onClick={() => onDirectionClick('down')}
            className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl shadow-md cursor-pointer"
            aria-label="Move down"
          >
            ↓
          </button>
          <button 
            onClick={() => onDirectionClick('right')}
            className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl shadow-md cursor-pointer"
            aria-label="Move right"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameControls;