"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Brain, Gamepad2, Grid3X3 } from "lucide-react"
import { AnimatePresence } from "framer-motion"

export default function GameSelector() {
  const [selectedGame, setSelectedGame] = useState(null)

  const games = [
    { id: "sudoku", name: "Sudoku", icon: Grid3X3 },
    { id: "tic-tac-toe", name: "Tic-tac-toe", icon: Gamepad2 },
    { id: "memory", name: "Memory", icon: Brain },
  ]

  const gameUrls = {
    sudoku: `${process.env.NEXTAPP_URL}/games/sudoku`,
    "tic-tac-toe": `${process.env.NEXTAPP_URL}/games/tic-tac-toe`,
    memory: `${process.env.NEXTAPP_URL}/games/memory-card`,
  }

  return (
    <div className="w-48">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-white/80 mb-2">Games</h3>
        <div className="flex gap-2">
          {games.map((game) => (
            <Button
              key={game.id}
              variant="outline"
              className="w-full justify-start gap-2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
              onClick={() => setSelectedGame(game.id)}
            >
              <game.icon className="h-4 w-4" />
              {game.name}
            </Button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedGame && (
          <Dialog open={!!selectedGame} onOpenChange={() => setSelectedGame(null)}>
            <DialogContent className="sm:max-w-[800px]">
              <DialogHeader>
                <DialogTitle>{selectedGame}</DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                <iframe
                  src={gameUrls[selectedGame]}
                  className="w-full h-[600px] border-0 rounded-md"
                  title={`${selectedGame} game`}
                />
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  )
}
