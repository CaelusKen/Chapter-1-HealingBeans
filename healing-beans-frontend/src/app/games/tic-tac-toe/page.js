import GameLayout from "@/layouts/game-layout";
import TicTacToe from "@/components/reuse/games/tic-tac-toe/tic-tac-toe"

export default function TicTacToePage() {
  return (
    <GameLayout title="Tic Tac Toe">
      <TicTacToe />
    </GameLayout>
  )
}
