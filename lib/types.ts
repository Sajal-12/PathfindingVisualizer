export type NodeType = "start" | "target" | "bomb" | "weight" | null

export interface GridNode {
  row: number
  col: number
  isStart: boolean
  isFinish: boolean
  isWall: boolean
  isVisited: boolean
  isInShortestPath: boolean
  isBomb: boolean
  isWeight: boolean
  distance: number
  previousNode: GridNode | null
  weight: number
}
