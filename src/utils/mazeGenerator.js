// Maze generation using randomized DFS algorithm

export function generateMaze(rows, cols) {
  // Initialize the grid with all walls
  const grid = [];
  for (let r = 0; r < rows; r++) {
    const row = [];
    for (let c = 0; c < cols; c++) {
      row.push({
        visited: false,
        walls: {
          top: true,
          right: true,
          bottom: true,
          left: true
        }
      });
    }
    grid.push(row);
  }

  // DFS to carve out the maze
  const stack = [];
  const startRow = 0;
  const startCol = 0;
  grid[startRow][startCol].visited = true;
  stack.push([startRow, startCol]);

  while (stack.length > 0) {
    const [currentRow, currentCol] = stack[stack.length - 1];
    
    // Get unvisited neighbors
    const neighbors = [];
    
    // Check top neighbor
    if (currentRow > 0 && !grid[currentRow - 1][currentCol].visited) {
      neighbors.push({ row: currentRow - 1, col: currentCol, direction: 'top' });
    }
    
    // Check right neighbor
    if (currentCol < cols - 1 && !grid[currentRow][currentCol + 1].visited) {
      neighbors.push({ row: currentRow, col: currentCol + 1, direction: 'right' });
    }
    
    // Check bottom neighbor
    if (currentRow < rows - 1 && !grid[currentRow + 1][currentCol].visited) {
      neighbors.push({ row: currentRow + 1, col: currentCol, direction: 'bottom' });
    }
    
    // Check left neighbor
    if (currentCol > 0 && !grid[currentRow][currentCol - 1].visited) {
      neighbors.push({ row: currentRow, col: currentCol - 1, direction: 'left' });
    }
    
    if (neighbors.length === 0) {
      // Backtrack
      stack.pop();
    } else {
      // Choose a random unvisited neighbor
      const { row, col, direction } = neighbors[Math.floor(Math.random() * neighbors.length)];
      
      // Remove walls between current cell and chosen neighbor
      if (direction === 'top') {
        grid[currentRow][currentCol].walls.top = false;
        grid[row][col].walls.bottom = false;
      } else if (direction === 'right') {
        grid[currentRow][currentCol].walls.right = false;
        grid[row][col].walls.left = false;
      } else if (direction === 'bottom') {
        grid[currentRow][currentCol].walls.bottom = false;
        grid[row][col].walls.top = false;
      } else if (direction === 'left') {
        grid[currentRow][currentCol].walls.left = false;
        grid[row][col].walls.right = false;
      }
      
      // Mark the chosen cell as visited and push it to the stack
      grid[row][col].visited = true;
      stack.push([row, col]);
    }
  }

  // Create a path from start to exit (ensure entrance and exit are open)
  grid[0][0].walls.top = false; // Entry
  grid[rows - 1][cols - 1].walls.bottom = false; // Exit
  
  return grid;
}