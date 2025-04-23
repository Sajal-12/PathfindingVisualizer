"use client"

import type { NodeType } from "@/lib/types"

interface LegendProps {
  onNodeTypeSelect: (type: NodeType) => void
  currentlyPlacing: NodeType | null
}

export default function Legend({ onNodeTypeSelect, currentlyPlacing }: LegendProps) {
  const legendItems = [
    { type: "start" as NodeType, label: "Start Node", color: "bg-purple-700", symbol: "→" },
    { type: "target" as NodeType, label: "Target Node", color: "bg-red-600", symbol: "◎" },
    { type: "bomb" as NodeType, label: "Bomb Node", color: "bg-purple-900", symbol: "💣" },
    { type: "weight" as NodeType, label: "Weight Node", color: "bg-yellow-600", symbol: "⚓" },
    { type: null, label: "Unvisited Node", color: "bg-white border border-gray-200", symbol: "" },
    { type: null, label: "Visited Nodes", color: "bg-blue-400", symbol: "" },
    { type: null, label: "Shortest-path Node", color: "bg-yellow-300", symbol: "" },
    { type: null, label: "Wall Node", color: "bg-slate-800", symbol: "" },
  ]

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4 bg-white border-b border-gray-200">
      {legendItems.map((item, index) => (
        <div
          key={index}
          className={`flex items-center gap-2 cursor-${item.type ? "pointer" : "default"} ${
            currentlyPlacing === item.type ? "ring-2 ring-blue-500 p-1 rounded" : ""
          }`}
          onClick={() => item.type && onNodeTypeSelect(item.type)}
        >
          <div className={`w-6 h-6 ${item.color} flex items-center justify-center`}>{item.symbol}</div>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  )
}
