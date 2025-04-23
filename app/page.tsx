"use client"

import { useEffect, useState } from "react"
import NavBar from "@/components/navbar"
import Grid from "@/components/grid"
import Legend from "@/components/legend"
import Tutorial from "@/components/tutorial"
import type { GridNode, NodeType } from "@/lib/types"
import { createInitialGrid, getNewGridWithWallToggled } from "@/lib/grid-utils"
import { dijkstra, getNodesInShortestPathOrder } from "@/lib/algorithms/dijkstra"
import { bfs } from "@/lib/algorithms/bfs"
import { dfs } from "@/lib/algorithms/dfs"
import { astar } from "@/lib/algorithms/astar"
import { generateRandomMaze, generateRecursiveDivisionMaze } from "@/lib/maze-generators"

export default function Home() {
  const [grid, setGrid] = useState<GridNode[][]>([])
  const [mouseIsPressed, setMouseIsPressed] = useState(false)
  const [currentAlgorithm, setCurrentAlgorithm] = useState<string>("dijkstra")
  const [startNodeRow, setStartNodeRow] = useState(10)
  const [startNodeCol, setStartNodeCol] = useState(15)
  const [finishNodeRow, setFinishNodeRow] = useState(10)
  const [finishNodeCol, setFinishNodeCol] = useState(35)
  const [bombNodeRow, setBombNodeRow] = useState(-1)
  const [bombNodeCol, setBombNodeCol] = useState(-1)
  const [currentlyPlacing, setCurrentlyPlacing] = useState<NodeType | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [speed, setSpeed] = useState<"fast" | "average" | "slow">("fast")
  const [showTutorial, setShowTutorial] = useState(true)
  const [tutorialStep, setTutorialStep] = useState(1)
  const [hasBomb, setHasBomb] = useState(false)

  useEffect(() => {
    const initialGrid = createInitialGrid(
      startNodeRow,
      startNodeCol,
      finishNodeRow,
      finishNodeCol,
      bombNodeRow,
      bombNodeCol,
    )
    setGrid(initialGrid)
  }, [startNodeRow, startNodeCol, finishNodeRow, finishNodeCol, bombNodeRow, bombNodeCol])

  const handleMouseDown = (row: number, col: number) => {
    if (isRunning) return

    if (currentlyPlacing) {
      handleSpecialNodePlacement(row, col)
      return
    }

    const newGrid = getNewGridWithWallToggled(grid, row, col)
    setGrid(newGrid)
    setMouseIsPressed(true)
  }

  const handleMouseEnter = (row: number, col: number) => {
    if (!mouseIsPressed || isRunning) return
    const newGrid = getNewGridWithWallToggled(grid, row, col)
    setGrid(newGrid)
  }

  const handleMouseUp = () => {
    setMouseIsPressed(false)
  }

  const handleSpecialNodePlacement = (row: number, col: number) => {
    if (
      (row === startNodeRow && col === startNodeCol) ||
      (row === finishNodeRow && col === finishNodeCol) ||
      (hasBomb && row === bombNodeRow && col === bombNodeCol)
    ) {
      return
    }

    const newGrid = [...grid]

    if (currentlyPlacing === "start") {
      newGrid[startNodeRow][startNodeCol].isStart = false
      setStartNodeRow(row)
      setStartNodeCol(col)
    } else if (currentlyPlacing === "target") {
      newGrid[finishNodeRow][finishNodeCol].isFinish = false
      setFinishNodeRow(row)
      setFinishNodeCol(col)
    } else if (currentlyPlacing === "bomb") {
      if (hasBomb && bombNodeRow !== -1) {
        newGrid[bombNodeRow][bombNodeCol].isBomb = false
      }
      setBombNodeRow(row)
      setBombNodeCol(col)
      setHasBomb(true)
    } else if (currentlyPlacing === "weight") {
      newGrid[row][col].isWeight = !newGrid[row][col].isWeight
      setGrid(newGrid)
    }

    setCurrentlyPlacing(null)
  }

  const visualize = () => {
    if (isRunning) return
    clearPath()
    setIsRunning(true)

    const startNode = grid[startNodeRow][startNodeCol]
    const finishNode = grid[finishNodeRow][finishNodeCol]
    let visitedNodesInOrder

    switch (currentAlgorithm) {
      case "dijkstra":
        visitedNodesInOrder = dijkstra(grid, startNode, finishNode)
        break
      case "bfs":
        visitedNodesInOrder = bfs(grid, startNode, finishNode)
        break
      case "dfs":
        visitedNodesInOrder = dfs(grid, startNode, finishNode)
        break
      case "astar":
        visitedNodesInOrder = astar(grid, startNode, finishNode)
        break
      default:
        visitedNodesInOrder = dijkstra(grid, startNode, finishNode)
    }

    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode)
    animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder)
  }

  const animateAlgorithm = (visitedNodesInOrder: GridNode[], nodesInShortestPathOrder: GridNode[]) => {
    const speedFactor = speed === "fast" ? 10 : speed === "average" ? 50 : 100

    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder)
        }, speedFactor * i)
        return
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i]
        const newGrid = [...grid]
        const newNode = {
          ...newGrid[node.row][node.col],
          isVisited: true,
        }
        newGrid[node.row][node.col] = newNode
        setGrid(newGrid)
      }, speedFactor * i)
    }
  }

  const animateShortestPath = (nodesInShortestPathOrder: GridNode[]) => {
    const speedFactor = speed === "fast" ? 30 : speed === "average" ? 70 : 100

    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i]
        const newGrid = [...grid]
        const newNode = {
          ...newGrid[node.row][node.col],
          isInShortestPath: true,
        }
        newGrid[node.row][node.col] = newNode
        setGrid(newGrid)

        if (i === nodesInShortestPathOrder.length - 1) {
          setIsRunning(false)
        }
      }, speedFactor * i)
    }
  }

  const clearBoard = () => {
    if (isRunning) return
    const newGrid = createInitialGrid(
      startNodeRow,
      startNodeCol,
      finishNodeRow,
      finishNodeCol,
      bombNodeRow,
      bombNodeCol,
    )
    setGrid(newGrid)
  }

  const clearWallsAndWeights = () => {
    if (isRunning) return
    const newGrid = grid.map((row) =>
      row.map((node) => {
        return {
          ...node,
          isWall: false,
          isWeight: false,
        }
      }),
    )
    setGrid(newGrid)
  }

  const clearPath = () => {
    if (isRunning) return
    const newGrid = grid.map((row) =>
      row.map((node) => {
        return {
          ...node,
          isVisited: false,
          isInShortestPath: false,
          distance: Number.POSITIVE_INFINITY,
          previousNode: null,
        }
      }),
    )
    setGrid(newGrid)
  }

  const addBomb = () => {
    setCurrentlyPlacing("bomb")
  }

  const generateMaze = (type: string) => {
    if (isRunning) return
    clearBoard()

    let newGrid
    if (type === "random") {
      newGrid = generateRandomMaze(grid, startNodeRow, startNodeCol, finishNodeRow, finishNodeCol)
    } else {
      newGrid = generateRecursiveDivisionMaze(grid, startNodeRow, startNodeCol, finishNodeRow, finishNodeCol)
    }

    setGrid(newGrid)
  }

  const handleAlgorithmChange = (algorithm: string) => {
    setCurrentAlgorithm(algorithm)
  }

  const handleSpeedChange = (newSpeed: "fast" | "average" | "slow") => {
    setSpeed(newSpeed)
  }

  const handleTutorialNext = () => {
    if (tutorialStep < 9) {
      setTutorialStep(tutorialStep + 1)
    } else {
      setShowTutorial(false)
    }
  }

  const handleTutorialPrevious = () => {
    if (tutorialStep > 1) {
      setTutorialStep(tutorialStep - 1)
    }
  }

  const handleTutorialSkip = () => {
    setShowTutorial(false)
  }

  return (
    <main className="min-h-screen flex flex-col">
      <NavBar
        onVisualize={visualize}
        onClearBoard={clearBoard}
        onClearWallsAndWeights={clearWallsAndWeights}
        onClearPath={clearPath}
        onAddBomb={addBomb}
        onAlgorithmChange={handleAlgorithmChange}
        onGenerateMaze={generateMaze}
        onSpeedChange={handleSpeedChange}
        currentAlgorithm={currentAlgorithm}
        speed={speed}
        isRunning={isRunning}
      />
      <Legend onNodeTypeSelect={(type) => setCurrentlyPlacing(type)} currentlyPlacing={currentlyPlacing} />
      <Grid grid={grid} onMouseDown={handleMouseDown} onMouseEnter={handleMouseEnter} onMouseUp={handleMouseUp} />
      {showTutorial && (
        <Tutorial
          step={tutorialStep}
          onNext={handleTutorialNext}
          onPrevious={handleTutorialPrevious}
          onSkip={handleTutorialSkip}
        />
      )}
    </main>
  )
}
