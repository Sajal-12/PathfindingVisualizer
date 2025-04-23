import type { GridNode } from "./types"

export const createInitialGrid = (
  startNodeRow: number,
  startNodeCol: number,
  finishNodeRow: number,
  finishNodeCol: number,
  bombNodeRow: number,
  bombNodeCol: number,
): GridNode[][] => {
  const grid: GridNode[][] = []
  for (let row = 0; row < 20; row++) {
    const currentRow: GridNode[] = []
    for (let col = 0; col < 50; col++) {
      currentRow.push(
        createNode(row, col, startNodeRow, startNodeCol, finishNodeRow, finishNodeCol, bombNodeRow, bombNodeCol),
      )
    }
    grid.push(currentRow)
  }
  return grid
}

export const createNode = (
  row: number,
  col: number,
  startNodeRow: number,
  startNodeCol: number,
  finishNodeRow: number,
  finishNodeCol: number,
  bombNodeRow: number,
  bombNodeCol: number,
): GridNode => {
  return {
    row,
    col,
    isStart: row === startNodeRow && col === startNodeCol,
    isFinish: row === finishNodeRow && col === finishNodeCol,
    isWall: false,
    isVisited: false,
    isInShortestPath: false,
    isBomb: row === bombNodeRow && col === bombNodeCol,
    isWeight: false,
    distance: Number.POSITIVE_INFINITY,
    previousNode: null,
    weight: 1,
  }
}

export const getNewGridWithWallToggled = (grid: GridNode[][], row: number, col: number): GridNode[][] => {
  const newGrid = grid.slice()
  const node = newGrid[row][col]

  if (node.isStart || node.isFinish || node.isBomb) {
    return newGrid
  }

  const newNode = {
    ...node,
    isWall: !node.isWall,
  }

  newGrid[row][col] = newNode
  return newGrid
}
