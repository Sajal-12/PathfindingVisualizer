# Pathfinding Visualizer

A visualization tool for various pathfinding algorithms. This application allows users to visualize how different pathfinding algorithms work in real-time.

## Features

- Visualize multiple pathfinding algorithms:
  - Dijkstra's Algorithm
  - A* Search
  - Breadth-First Search
  - Depth-First Search
- Create walls and weighted nodes
- Add bomb nodes (additional targets)
- Generate random mazes and patterns
- Adjust visualization speed
- Interactive tutorial

## Algorithms

### Dijkstra's Algorithm
Guarantees the shortest path in weighted graphs. It works by visiting the node with the shortest known distance from the start node first, then updating the distances to all unvisited neighbors.

### A* Search
Uses heuristics to find the shortest path more efficiently than Dijkstra's. It prioritizes nodes that are closer to the target based on a heuristic function.

### Breadth-First Search
Guarantees the shortest path in unweighted graphs. It explores all neighbors at the present depth before moving on to nodes at the next depth level.

### Depth-First Search
Does not guarantee the shortest path. It explores as far as possible along each branch before backtracking.

## Usage

1. Select an algorithm from the dropdown menu
2. Create walls by clicking and dragging on the grid
3. Add weights by selecting the Weight Node from the legend and clicking on the grid
4. Add a bomb by clicking the "Add Bomb" button and then clicking on the grid
5. Click "Visualize!" to start the visualization
6. Use the clear buttons to reset different elements of the grid

## Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/yourusername/PathfindingVisualizer.git

# Navigate to the project directory
cd PathfindingVisualizer

# Install dependencies
npm install

# Start the development server
npm run dev
\`\`\`

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS

## Created by
SAJAL SWAPNIL
