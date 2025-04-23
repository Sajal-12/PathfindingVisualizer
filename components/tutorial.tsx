"use client"

import { Button } from "@/components/ui/button"

interface TutorialProps {
  step: number
  onNext: () => void
  onPrevious: () => void
  onSkip: () => void
}

export default function Tutorial({ step, onNext, onPrevious, onSkip }: TutorialProps) {
  const tutorialSteps = [
    {
      title: "Welcome to Pathfinding Visualizer!",
      content: "This short tutorial will walk you through all of the features of this application.",
    },
    {
      title: "What is a pathfinding algorithm?",
      content:
        "At its core, a pathfinding algorithm seeks to find the shortest path between two points. This application visualizes various pathfinding algorithms in action.",
    },
    {
      title: "Picking an algorithm",
      content:
        "Choose an algorithm from the 'Algorithms' dropdown menu. Each algorithm has different characteristics and behaviors.",
    },
    {
      title: "Meet the algorithms",
      content:
        "Dijkstra's Algorithm (weighted): guarantees the shortest path. A* Search (weighted): uses heuristics to find the shortest path faster than Dijkstra's. Breadth-First Search (unweighted): guarantees the shortest path. Depth-First Search (unweighted): does not guarantee the shortest path.",
    },
    {
      title: "Adding walls and weights",
      content:
        "Click and drag on the grid to add walls. Walls are impenetrable, meaning that a path cannot cross through them. Click the Weight Node in the legend and then click on the grid to add weights. Weights are not impenetrable, but it 'costs' more to move through them.",
    },
    {
      title: "Adding a bomb",
      content:
        "Click the 'Add Bomb' button, then click on the grid to place a bomb. The bomb represents an additional target that the algorithm must reach before going to the final target.",
    },
    {
      title: "Generating mazes",
      content:
        "Click on the 'Mazes & Patterns' dropdown to generate different types of mazes and patterns on the grid.",
    },
    {
      title: "Visualizing and more",
      content:
        "Click the 'Visualize!' button to start the visualization. Use the 'Clear Board', 'Clear Walls & Weights', and 'Clear Path' buttons to clear different elements of the grid.",
    },
    {
      title: "Adjusting speed",
      content: "Use the 'Speed' dropdown to control the visualization speed.",
    },
  ]

  const currentStep = tutorialSteps[step - 1]

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
        <div className="text-right text-sm text-gray-500">{step}/9</div>
        <h2 className="text-2xl font-bold text-slate-800 mb-4">{currentStep.title}</h2>
        <p className="text-gray-700 mb-8">{currentStep.content}</p>

        <div className="flex justify-center items-center gap-4">
          <img src="/placeholder.svg?height=200&width=200" alt="Tutorial illustration" className="w-32 h-32" />
        </div>

        <div className="flex justify-between mt-8">
          <Button onClick={onSkip} variant="outline" className="bg-emerald-500 hover:bg-emerald-600 text-white">
            Skip Tutorial
          </Button>
          <div className="flex gap-2">
            {step > 1 && (
              <Button onClick={onPrevious} variant="outline" className="bg-emerald-500 hover:bg-emerald-600 text-white">
                Previous
              </Button>
            )}
            <Button onClick={onNext} className="bg-emerald-500 hover:bg-emerald-600 text-white">
              {step === 9 ? "Finish" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
