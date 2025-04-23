import type { GridNode } from "../types"

export function dfs(grid: GridNode[][], startNode: GridNode, finishNode: GridNode) {
  const visitedNodesInOrder: GridNode[] = []
  const stack: GridNode[] = []

  startNode.distance = 0
  stack.push(startNode)

  while (stack.length) {
    const currentNode = stack.pop()

    if (!currentNode) break

    if (currentNode.isVisited || currentNode.isWall) continue

    currentNode.isVisited = true
    visitedNodesInOrder.push(currentNode)

    if (currentNode === finishNode) return visitedNodesInOrder

    const unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid)
    for (const neighbor of unvisitedNeighbors) {
      neighbor.previousNode = currentNode
      stack.push(neighbor)
    }
  }

  return visitedNodesInOrder
}

function getUnvisitedNeighbors(node: GridNode, grid: GridNode[][]) {
  const neighbors: GridNode[] = []
  const { row, col } = node

  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1])
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col])
  if (col > 0) neighbors.push(grid[row][col - 1])
  if (row > 0) neighbors.push(grid[row - 1][col])

  return neighbors.filter((neighbor) => !neighbor.isVisited)
}
