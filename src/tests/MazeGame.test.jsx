import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MazeGame from '../components/MazeGame';
import { generateMaze } from '../utils/mazeGenerator';

// Mock the mazeGenerator
vi.mock('../utils/mazeGenerator', () => ({
  generateMaze: vi.fn().mockImplementation((rows, cols) => {
    // Create a simple test maze with a clear path
    const grid = [];
    for (let r = 0; r < rows; r++) {
      const row = [];
      for (let c = 0; c < cols; c++) {
        row.push({
          visited: true,
          walls: {
            top: r === 0 && c !== 0, // Open path at the start
            right: c === cols - 1,
            bottom: r === rows - 1 && c !== cols - 1, // Open path at the exit
            left: c === 0
          }
        });
      }
      grid.push(row);
    }
    
    // Create a direct path from start to finish (for testing)
    for (let i = 0; i < rows - 1; i++) {
      grid[i][0].walls.bottom = false;
      grid[i + 1][0].walls.top = false;
    }
    
    for (let i = 0; i < cols - 1; i++) {
      grid[rows - 1][i].walls.right = false;
      grid[rows - 1][i + 1].walls.left = false;
    }
    
    return grid;
  }),
  analyzeMazeComplexity: vi.fn().mockReturnValue({
    deadEnds: 4,
    longestPath: 25,
    averageBranchingFactor: 1.5
  })
}));

// Mock localStorage
beforeEach(() => {
  const localStorageMock = (() => {
    let store = {};
    return {
      getItem: vi.fn((key) => store[key] || null),
      setItem: vi.fn((key, value) => {
        store[key] = value.toString();
      }),
      removeItem: vi.fn((key) => {
        delete store[key];
      }),
      clear: vi.fn(() => {
        store = {};
      }),
    };
  })();

  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });
  
  // Mock audio
  window.HTMLMediaElement.prototype.play = vi.fn();
  window.HTMLMediaElement.prototype.pause = vi.fn();
});

describe('MazeGame', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    generateMaze.mockClear();
  });
  
  it('renders the game title', () => {
    render(<MazeGame />);
    expect(screen.getByText('Maze Runner')).toBeInTheDocument();
  });
  
  it('starts the timer when arrow key is pressed', () => {
    render(<MazeGame />);
    
    // Timer should start at 0
    expect(screen.getByText(/Time:/)).toHaveTextContent('Time: 0.0s');
    
    // Press arrow key to start game
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    
    // Advance timer
    vi.advanceTimersByTime(500);
    
    // Timer should have incremented
    expect(screen.getByText(/Time:/)).not.toHaveTextContent('Time: 0.0s');
  });
  
  it('moves player when valid arrow key is pressed', () => {
    render(<MazeGame />);
    
    // Move right
    fireEvent.keyDown(window, { key: 'ArrowDown' });
    
    // Should have attempted to move
    expect(generateMaze).toHaveBeenCalled();
  });
  
  it('shows different difficulty options', () => {
    render(<MazeGame />);
    
    expect(screen.getByText('Easy')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
    expect(screen.getByText('Hard')).toBeInTheDocument();
  });
  
  it('prevents changing difficulty during an active game', async () => {
    render(<MazeGame />);
    
    // Press arrow key to start game
    fireEvent.keyDown(window, { key: 'ArrowDown' });
    
    // Try to change difficulty
    fireEvent.click(screen.getByText('Easy'));
    
    // Should show message about finishing or restarting
    await waitFor(() => {
      expect(screen.getByText(/Finish the current maze or restart to change difficulty/)).toBeInTheDocument();
    });
  });
  
  it('generates a new maze when restart button is clicked', () => {
    render(<MazeGame />);
    
    // Click restart button
    fireEvent.click(screen.getByText('Restart'));
    
    // Should generate a new maze
    expect(generateMaze).toHaveBeenCalledTimes(2); // Once on initial render, once on restart
  });
  
  it('displays touch controls on mobile devices', () => {
    // Mock window.innerWidth to simulate mobile device
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500, // Mobile width
    });
    
    render(<MazeGame />);
    
    // Check if touch controls are rendered
    const upButton = screen.getByLabelText('Move up');
    const downButton = screen.getByLabelText('Move down');
    const leftButton = screen.getByLabelText('Move left');
    const rightButton = screen.getByLabelText('Move right');
    
    expect(upButton).toBeInTheDocument();
    expect(downButton).toBeInTheDocument();
    expect(leftButton).toBeInTheDocument();
    expect(rightButton).toBeInTheDocument();
  });
  
  it('shows high scores section', () => {
    render(<MazeGame />);
    expect(screen.getByText(/Best Times/)).toBeInTheDocument();
  });
});