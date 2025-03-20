# Maze Runner Game

A fun 2D maze game where you navigate through randomly generated mazes to reach the exit.

## Features

- Random maze generation for a new experience each time
- Three difficulty levels: Easy (10x10), Medium (15x15), and Hard (20x20)
- Player movement using arrow keys or touch controls on mobile
- Timer to track your completion time
- High score tracking to save your best times
- Smooth animations and visual feedback
- Responsive design for both desktop and mobile devices

## How to Play

1. Select your difficulty level: Easy, Medium, or Hard
2. Use the arrow keys (Up, Down, Left, Right) to move the player through the maze
   - On mobile devices, use the on-screen arrow buttons
3. Try to reach the green exit square as quickly as possible
4. Your time is recorded and compared against your previous best times
5. Press the "Restart" button to generate a new maze and start over

## Game Elements

- **Blue Circle**: Your player character
- **Green Square**: The exit
- **Black Lines**: Walls that cannot be passed through
- **Timer**: Shows your current time in seconds
- **High Scores**: Displays your best times for the current difficulty level

## Development

This game is built with React and uses SVG for rendering the maze. The maze is generated using a randomized depth-first search algorithm, which ensures that every maze has exactly one solution path from start to finish.

### Key Features:

- Responsive design for all screen sizes
- Accessible keyboard and touch controls
- Local storage for persisting high scores
- Smooth animations for player movement
- Optimized rendering for performance