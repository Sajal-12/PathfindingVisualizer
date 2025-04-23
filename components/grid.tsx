"use client"

import type { GridNode } from "@/lib/types"
import Node from "./node"

interface GridProps {
  grid: GridNode[][]
  onMouseDown: (row: number, col: number) => void
  onMouseEnter: (row: number, col: number) => void
  onMouseUp: () => void
}

export default function Grid({ grid, onMouseDown, onMouseEnter, onMouseUp }: GridProps) {
  return (
    <div className="grid-container flex-grow overflow-auto" onMouseLeave={onMouseUp}>
      <div className="grid bg-white">
        {grid.map((row, rowIdx) => (
          <div key={rowIdx} className="grid-row flex">
            {row.map((node, nodeIdx) => {
              const { row, col, isStart, isFinish, isWall, isVisited, isInShortestPath, isBomb, isWeight } = node

              return (
                <Node
                  key={nodeIdx}
                  row={row}
                  col={col}
                  isStart={isStart}
                  isFinish={isFinish}
                  isWall={isWall}
                  isVisited={isVisited}
                  isInShortestPath={isInShortestPath}
                  isBomb={isBomb}
                  isWeight={isWeight}
                  onMouseDown={onMouseDown}
                  onMouseEnter={onMouseEnter}
                  onMouseUp={onMouseUp}
                />
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
