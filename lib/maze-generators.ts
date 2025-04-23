import type { GridNode } from "./types"

export function generateRandomMaze(
  grid: GridNode[][],
  startNodeRow: number,
  startNodeCol: number,
  finishNodeRow: number,
  finishNodeCol: number,
) {
  const newGrid = grid.slice()

  for (let row = 0; row < newGrid.length; row++) {
    for (let col = 0; col < newGrid[0].length; col++) {
      if ((row === startNodeRow && col === startNodeCol) || (row === finishNodeRow && col === finishNodeCol)) {
        continue
      }

      if (Math.random() < 0.3) {
        newGrid[row][col] = {
          ...newGrid[row][col],
          isWall: true,
        }
      }
    }
  }

  return newGrid
}

export function generateRecursiveDivisionMaze(
  grid: GridNode[][],
  startNodeRow: number,
  startNodeCol: number,
  finishNodeRow: number,
  finishNodeCol: number,
) {
  const newGrid = grid.slice().map((row) =>
    row.map((node) => ({
      ...node,
      isWall: false,
    })),
  )

  // Add border walls
  for (let row = 0; row < newGrid.length; row++) {
    newGrid[row][0].isWall = true
    newGrid[row][newGrid[0].length - 1].isWall = true
  }

  for (let col = 0; col < newGrid[0].length; col++) {
    newGrid[0][col].isWall = true
    newGrid[newGrid.length - 1][col].isWall = true
  }

  // Recursive division
  recursiveDivision(
    newGrid,
    1,
    newGrid.length - 2,
    1,
    newGrid[0].length - 2,
    startNodeRow,
    startNodeCol,
    finishNodeRow,
    finishNodeCol,
  )

  return newGrid
}

function recursiveDivision(
  grid: GridNode[][],
  rowStart: number,
  rowEnd: number,
  colStart: number,
  colEnd: number,
  startNodeRow: number,
  startNodeCol: number,
  finishNodeRow: number,
  finishNodeCol: number,
) {
  if (rowEnd < rowStart || colEnd < colStart) {
    return
  }

  const width = colEnd - colStart + 1
  const height = rowEnd - rowStart + 1

  if (width < 2 || height < 2) {
    return
  }

  // Choose orientation (horizontal or vertical)
  const horizontal = width < height ? false : true

  if (horizontal) {
    // Choose a random row to add a wall
    const wallRow = Math.floor(Math.random() * (rowEnd - rowStart)) + rowStart
    // Choose a random column to add a passage
    const passageCol = Math.floor(Math.random() * (colEnd - colStart)) + colStart

    // Add horizontal wall
    for (let col = colStart; col <= colEnd; col++) {
      if (
        col === passageCol ||
        (wallRow === startNodeRow && col === startNodeCol) ||
        (wallRow === finishNodeRow && col === finishNodeCol)
      ) {
        continue
      }

      grid[wallRow][col].isWall = true
    }

    // Recursively divide the top and bottom sections
    recursiveDivision(
      grid,
      rowStart,
      wallRow - 1,
      colStart,
      colEnd,
      startNodeRow,
      startNodeCol,
      finishNodeRow,
      finishNodeCol,
    )

    recursiveDivision(
      grid,
      wallRow + 1,
      rowEnd,
      colStart,
      colEnd,
      startNodeRow,
      startNodeCol,
      finishNodeRow,
      finishNodeCol,
    )
  } else {
    // Choose a random column to add a wall
    const wallCol = Math.floor(Math.random() * (colEnd - colStart)) + colStart
    // Choose a random row to add a passage
    const passageRow = Math.floor(Math.random() * (rowEnd - rowStart)) + rowStart

    // Add vertical wall
    for (let row = rowStart; row <= rowEnd; row++) {
      if (
        row === passageRow ||
        (row === startNodeRow && wallCol === startNodeCol) ||
        (row === finishNodeRow && wallCol === finishNodeCol)
      ) {
        continue
      }

      grid[row][wallCol].isWall = true
    }

    // Recursively divide the left and right sections
    recursiveDivision(
      grid,
      rowStart,
      rowEnd,
      colStart,
      wallCol - 1,
      startNodeRow,
      startNodeCol,
      finishNodeRow,
      finishNodeCol,
    )

    recursiveDivision(
      grid,
      rowStart,
      rowEnd,
      wallCol + 1,
      colEnd,
      startNodeRow,
      startNodeCol,
      finishNodeRow,
      finishNodeCol,
    )
  }
}
