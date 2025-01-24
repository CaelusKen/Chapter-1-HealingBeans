import GameLayout from "@/layouts/game-layout";
import MemoryCardFlip from "@/components/reuse/games/memory-card-flip/memory-card-flip"

export default function TicTacToePage() {
  return (
    <GameLayout title="Tic Tac Toe">
      <MemoryCardFlip />
    </GameLayout>
  )
}
