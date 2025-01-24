import GameLayout from "@/layouts/game-layout";
import Sudoku from "@/components/reuse/games/sudoku/sudoku"

export default function TicTacToePage() {
  return (
    <GameLayout title="Tic Tac Toe">
      <Sudoku />
    </GameLayout>
  )
}
