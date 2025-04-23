import type { GridNode } from "../types"

export function dijkstra(grid: GridNode[][], startNode: GridNode, finishNode: GridNode) {
  const visitedNodesInOrder: GridNode[] = []
  startNode.distance = 0
  const unvisitedNodes = getAllNodes(grid)

  while (unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes)
    const closestNode = unvisitedNodes.shift()

    if (!closestNode) break

    // If we encounter a wall, we skip it
    if (closestNode.isWall) continue

    // If the closest node is at a distance of infinity,
    // we must be trapped and should stop
    if (closestNode.distance === Number.POSITIVE_INFINITY) return visitedNodesInOrder

    closestNode.isVisited = true
    visitedNodesInOrder.push(closestNode)

    if (closestNode === finishNode) return visitedNodesInOrder

    updateUnvisitedNeighbors(closestNode, grid)
  }

  return visitedNodesInOrder
}

function sortNodesByDistance(unvisitedNodes: GridNode[]) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance)
}

function updateUnvisitedNeighbors(node: GridNode, grid: GridNode[][]) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid)
  for (const neighbor of unvisitedNeighbors) {
    const weight = neighbor.isWeight ? 5 : 1
    neighbor.distance = node.distance + weight
    neighbor.previousNode = node
  }
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

function getAllNodes(grid: GridNode[][]) {
  const nodes: GridNode[] = []
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node)
    }
  }
  return nodes
}

// Backtracks from the finishNode to find the shortest path
export function getNodesInShortestPathOrder(finishNode: GridNode) {
  const nodesInShortestPathOrder: GridNode[] = []
  let currentNode: GridNode | null = finishNode

  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode)
    currentNode = currentNode.previousNode
  }

  return nodesInShortestPathOrder
}
