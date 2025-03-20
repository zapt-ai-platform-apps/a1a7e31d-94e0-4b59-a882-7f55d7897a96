import React from 'react';

const MazeRenderer = ({ maze, playerPosition, prevPlayerPosition, exitPosition, isMoving, cellSize = 24 }) => {
  if (!maze.length) return <div className="text-center p-4">Loading maze...</div>;

  const mazeWidth = maze[0].length * cellSize;
  const mazeHeight = maze.length * cellSize;

  // Calculate animated position for smooth movement
  const playerX = playerPosition.col * cellSize + cellSize / 2;
  const playerY = playerPosition.row * cellSize + cellSize / 2;

  return (
    <div className="relative border-2 border-gray-800 mb-4 overflow-hidden bg-gray-50 shadow-inner">
      <svg 
        width={mazeWidth} 
        height={mazeHeight}
        aria-label="Maze game board"
        role="img"
      >
        {/* Background for cells */}
        {maze.map((row, rowIdx) => 
          row.map((cell, colIdx) => (
            <rect
              key={`bg-${rowIdx}-${colIdx}`}
              x={colIdx * cellSize}
              y={rowIdx * cellSize}
              width={cellSize}
              height={cellSize}
              fill={
                // Start position
                (rowIdx === 0 && colIdx === 0) ? "rgba(173, 216, 230, 0.5)" :
                // Exit position
                (rowIdx === exitPosition.row && colIdx === exitPosition.col) ? "rgba(144, 238, 144, 0.5)" :
                // Regular cell
                "white"
              }
              stroke="#f0f0f0"
              strokeWidth="0.5"
            />
          ))
        )}

        {/* Draw the maze walls */}
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
        
        {/* Draw the start point (blue circle) */}
        <circle
          cx={0 * cellSize + cellSize / 2}
          cy={0 * cellSize + cellSize / 2}
          r={cellSize / 5}
          fill="#4169E1"
          opacity="0.6"
        >
          <title>Start</title>
        </circle>
        
        {/* Draw the exit (green square with 'EXIT' text) */}
        <rect
          x={exitPosition.col * cellSize + 3}
          y={exitPosition.row * cellSize + 3}
          width={cellSize - 6}
          height={cellSize - 6}
          fill="#2ECC71"
          rx="4"
        >
          <title>Exit</title>
        </rect>
        <text
          x={exitPosition.col * cellSize + cellSize / 2}
          y={exitPosition.row * cellSize + cellSize / 2 + 1}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          fontSize={cellSize < 20 ? "6" : "8"}
          fontWeight="bold"
        >
          EXIT
        </text>
        
        {/* Player's trail */}
        <circle
          cx={prevPlayerPosition.col * cellSize + cellSize / 2}
          cy={prevPlayerPosition.row * cellSize + cellSize / 2}
          r={cellSize / 6}
          fill="#4169E1"
          opacity="0.2"
        />
        
        {/* Draw the player with animation */}
        <circle
          cx={playerX}
          cy={playerY}
          r={cellSize / 3}
          fill="#4169E1" // Royal blue
          strokeWidth="2"
          stroke="#2E4CB5"
          style={{
            transition: isMoving ? 'cx 0.15s ease-out, cy 0.15s ease-out' : 'none'
          }}
        >
          <animate 
            attributeName="r" 
            values={`${cellSize/3};${cellSize/3.2};${cellSize/3}`} 
            dur="1s" 
            repeatCount="indefinite" 
          />
          <title>Player</title>
        </circle>
      </svg>
    </div>
  );
};

export default MazeRenderer;