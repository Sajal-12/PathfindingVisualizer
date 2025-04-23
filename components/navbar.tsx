"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface NavBarProps {
  onVisualize: () => void
  onClearBoard: () => void
  onClearWallsAndWeights: () => void
  onClearPath: () => void
  onAddBomb: () => void
  onAlgorithmChange: (algorithm: string) => void
  onGenerateMaze: (type: string) => void
  onSpeedChange: (speed: "fast" | "average" | "slow") => void
  currentAlgorithm: string
  speed: "fast" | "average" | "slow"
  isRunning: boolean
}

export default function NavBar({
  onVisualize,
  onClearBoard,
  onClearWallsAndWeights,
  onClearPath,
  onAddBomb,
  onAlgorithmChange,
  onGenerateMaze,
  onSpeedChange,
  currentAlgorithm,
  speed,
  isRunning,
}: NavBarProps) {
  const [algorithmsOpen, setAlgorithmsOpen] = useState(false)
  const [mazesOpen, setMazesOpen] = useState(false)

  const getAlgorithmName = (algorithm: string) => {
    switch (algorithm) {
      case "dijkstra":
        return "Dijkstra's Algorithm"
      case "astar":
        return "A* Search"
      case "bfs":
        return "Breadth-First Search"
      case "dfs":
        return "Depth-First Search"
      default:
        return "Select Algorithm"
    }
  }

  return (
    <nav className="bg-slate-800 text-white p-4 flex flex-wrap items-center gap-2">
      <div className="font-bold text-lg mr-4">Pathfinding Visualizer</div>

      <DropdownMenu open={algorithmsOpen} onOpenChange={setAlgorithmsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="bg-slate-700 text-white border-slate-600 hover:bg-slate-600">
            Algorithms <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-slate-700 text-white border-slate-600">
          <DropdownMenuItem
            onClick={() => {
              onAlgorithmChange("dijkstra")
              setAlgorithmsOpen(false)
            }}
          >
            Dijkstra's Algorithm
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              onAlgorithmChange("astar")
              setAlgorithmsOpen(false)
            }}
          >
            A* Search
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              onAlgorithmChange("bfs")
              setAlgorithmsOpen(false)
            }}
          >
            Breadth-First Search
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              onAlgorithmChange("dfs")
              setAlgorithmsOpen(false)
            }}
          >
            Depth-First Search
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu open={mazesOpen} onOpenChange={setMazesOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="bg-slate-700 text-white border-slate-600 hover:bg-slate-600">
            Mazes & Patterns <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-slate-700 text-white border-slate-600">
          <DropdownMenuItem
            onClick={() => {
              onGenerateMaze("random")
              setMazesOpen(false)
            }}
          >
            Random Maze
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              onGenerateMaze("recursive-division")
              setMazesOpen(false)
            }}
          >
            Recursive Division
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant="outline"
        className="bg-slate-700 text-white border-slate-600 hover:bg-slate-600"
        onClick={onAddBomb}
        disabled={isRunning}
      >
        Add Bomb
      </Button>

      <Button className="bg-emerald-500 hover:bg-emerald-600 text-white" onClick={onVisualize} disabled={isRunning}>
        Visualize!
      </Button>

      <Button
        variant="outline"
        className="bg-slate-700 text-white border-slate-600 hover:bg-slate-600"
        onClick={onClearBoard}
        disabled={isRunning}
      >
        Clear Board
      </Button>

      <Button
        variant="outline"
        className="bg-slate-700 text-white border-slate-600 hover:bg-slate-600"
        onClick={onClearWallsAndWeights}
        disabled={isRunning}
      >
        Clear Walls & Weights
      </Button>

      <Button
        variant="outline"
        className="bg-slate-700 text-white border-slate-600 hover:bg-slate-600"
        onClick={onClearPath}
        disabled={isRunning}
      >
        Clear Path
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="bg-slate-700 text-white border-slate-600 hover:bg-slate-600">
            Speed: {speed.charAt(0).toUpperCase() + speed.slice(1)}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-slate-700 text-white border-slate-600">
          <DropdownMenuItem onClick={() => onSpeedChange("fast")}>Fast</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSpeedChange("average")}>Average</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSpeedChange("slow")}>Slow</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  )
}
