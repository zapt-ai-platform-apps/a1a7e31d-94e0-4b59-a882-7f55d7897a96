import React from 'react';

const MazeRenderer = ({ maze, playerPosition, exitPosition }) => {
  if (!maze.length) return <div className="text-center p-4">Loading maze...</div>;

  const cellSize = 20;
  const mazeWidth = maze[0].length * cellSize;
  const mazeHeight = maze.length * cellSize;

  return (
    <div className="relative border-2 border-gray-800 mb-4">
      <svg width={mazeWidth} height={mazeHeight}>
        {/* Draw the maze cells */}
        {maze.map((row, rowIdx) => 
          row.map((cell, colIdx) => (
            <g key={`${rowIdx}-${colIdx}`}>
              {/* Top wall */}
              {cell.walls.top && (
                <line
                  x1={colIdx * cellSize}
                  y1={rowIdx * cellSize}
                  x2={(colIdx + 1) * cellSize}
                  y2={rowIdx * cellSize}
                  stroke="black"
                  strokeWidth="2"
                />
              )}
              
              {/* Right wall */}
              {cell.walls.right && (
                <line
                  x1={(colIdx + 1) * cellSize}
                  y1={rowIdx * cellSize}
                  x2={(colIdx + 1) * cellSize}
                  y2={(rowIdx + 1) * cellSize}
                  stroke="black"
                  strokeWidth="2"
                />
              )}
              
              {/* Bottom wall */}
              {cell.walls.bottom && (
                <line
                  x1={colIdx * cellSize}
                  y1={(rowIdx + 1) * cellSize}
                  x2={(colIdx + 1) * cellSize}
                  y2={(rowIdx + 1) * cellSize}
                  stroke="black"
                  strokeWidth="2"
                />
              )}
              
              {/* Left wall */}
              {cell.walls.left && (
                <line
                  x1={colIdx * cellSize}
                  y1={rowIdx * cellSize}
                  x2={colIdx * cellSize}
                  y2={(rowIdx + 1) * cellSize}
                  stroke="black"
                  strokeWidth="2"
                />
              )}
            </g>
          ))
        )}
        
        {/* Draw the exit */}
        <rect
          x={exitPosition.col * cellSize + 4}
          y={exitPosition.row * cellSize + 4}
          width={cellSize - 8}
          height={cellSize - 8}
          fill="green"
        />
        
        {/* Draw the player */}
        <circle
          cx={playerPosition.col * cellSize + cellSize / 2}
          cy={playerPosition.row * cellSize + cellSize / 2}
          r={cellSize / 3}
          fill="blue"
        />
      </svg>
    </div>
  );
};

export default MazeRenderer;