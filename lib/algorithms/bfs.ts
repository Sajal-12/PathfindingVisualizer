import type { GridNode } from "../types"

export function bfs(grid: GridNode[][], startNode: GridNode, finishNode: GridNode) {
  const visitedNodesInOrder: GridNode[] = []
  const queue: GridNode[] = []

  startNode.distance = 0
  queue.push(startNode)

  while (queue.length) {
    const currentNode = queue.shift()

    if (!currentNode) break

    if (currentNode.isWall) continue

    currentNode.isVisited = true
    visitedNodesInOrder.push(currentNode)

    if (currentNode === finishNode) return visitedNodesInOrder

    const unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid)
    for (const neighbor of unvisitedNeighbors) {
      neighbor.distance = currentNode.distance + 1
      neighbor.previousNode = currentNode
      queue.push(neighbor)
    }
  }

  return visitedNodesInOrder
}

function getUnvisitedNeighbors(node: GridNode, grid: GridNode[][]) {
  const neighbors: GridNode[] = []
  const { row, col } = node

  if (row > 0) neighbors.push(grid[row - 1][col])
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col])
  if (col > 0) neighbors.push(grid[row][col - 1])
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1])

  return neighbors.filter((neighbor) => !neighbor.isVisited)
}
