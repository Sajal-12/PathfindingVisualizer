import type { GridNode } from "../types"

export function astar(grid: GridNode[][], startNode: GridNode, finishNode: GridNode) {
  const visitedNodesInOrder: GridNode[] = []
  startNode.distance = 0
  const unvisitedNodes = getAllNodes(grid)

  while (unvisitedNodes.length) {
    sortNodesByFScore(unvisitedNodes, finishNode)
    const closestNode = unvisitedNodes.shift()

    if (!closestNode) break

    if (closestNode.isWall) continue

    if (closestNode.distance === Number.POSITIVE_INFINITY) return visitedNodesInOrder

    closestNode.isVisited = true
    visitedNodesInOrder.push(closestNode)

    if (closestNode === finishNode) return visitedNodesInOrder

    updateUnvisitedNeighbors(closestNode, grid, finishNode)
  }

  return visitedNodesInOrder
}

function sortNodesByFScore(unvisitedNodes: GridNode[], finishNode: GridNode) {
  unvisitedNodes.sort((nodeA, nodeB) => {
    const fScoreA = nodeA.distance + heuristic(nodeA, finishNode)
    const fScoreB = nodeB.distance + heuristic(nodeB, finishNode)
    return fScoreA - fScoreB
  })
}

function heuristic(node: GridNode, finishNode: GridNode) {
  // Manhattan distance
  return Math.abs(node.row - finishNode.row) + Math.abs(node.col - finishNode.col)
}

function updateUnvisitedNeighbors(node: GridNode, grid: GridNode[][], finishNode: GridNode) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid)
  for (const neighbor of unvisitedNeighbors) {
    const weight = neighbor.isWeight ? 5 : 1
    const tentativeDistance = node.distance + weight

    if (tentativeDistance < neighbor.distance) {
      neighbor.distance = tentativeDistance
      neighbor.previousNode = node
    }
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
