"use client"

interface NodeProps {
  row: number
  col: number
  isStart: boolean
  isFinish: boolean
  isWall: boolean
  isVisited: boolean
  isInShortestPath: boolean
  isBomb: boolean
  isWeight: boolean
  onMouseDown: (row: number, col: number) => void
  onMouseEnter: (row: number, col: number) => void
  onMouseUp: () => void
}

export default function Node({
  row,
  col,
  isStart,
  isFinish,
  isWall,
  isVisited,
  isInShortestPath,
  isBomb,
  isWeight,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}: NodeProps) {
  const getNodeClassName = () => {
    let className = "node w-6 h-6 border border-gray-200 flex items-center justify-center"

    if (isStart) {
      className += " bg-purple-700"
    } else if (isFinish) {
      className += " bg-red-600"
    } else if (isBomb) {
      className += " bg-purple-900"
    } else if (isWall) {
      className += " bg-slate-800"
    } else if (isWeight) {
      className += " bg-yellow-600"
    } else if (isInShortestPath) {
      className += " bg-yellow-300"
    } else if (isVisited) {
      className += " bg-blue-400"
    } else {
      className += " bg-white"
    }

    return className
  }

  const getNodeContent = () => {
    if (isStart) {
      return "→"
    } else if (isFinish) {
      return "◎"
    } else if (isBomb) {
      return "💣"
    } else if (isWeight) {
      return "⚓"
    }
    return ""
  }

  return (
    <div
      id={`node-${row}-${col}`}
      className={getNodeClassName()}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}
    >
      {getNodeContent()}
    </div>
  )
}
