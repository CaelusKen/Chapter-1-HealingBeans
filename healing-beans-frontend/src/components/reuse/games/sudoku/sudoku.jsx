"use client"
import { useState, useEffect } from "react"
import Board from "./board"
import {
  generateSolvedSudoku,
  generatePuzzle,
  solveSudoku,
  isValidSudoku
} from "@/utils/sudoku-utils"
import { Button } from "@/components/ui/button"

const Sudoku = () => {
  const [board, setBoard] = useState([])
  const [initialBoard, setInitialBoard] = useState([])
  const [isSolved, setIsSolved] = useState(false)

  useEffect(() => {
    startNewGame()
  }, [])

  const startNewGame = () => {
    const solvedBoard = generateSolvedSudoku()
    const newBoard = generatePuzzle(solvedBoard, 0.5) // 0.5 represents medium difficulty
    setBoard(newBoard)
    setInitialBoard(newBoard.map(row => [...row]))
    setIsSolved(false)
  }

  const handleCellChange = (row, col, value) => {
    const newBoard = board.map(r => [...r])
    newBoard[row][col] = value
    setBoard(newBoard)
    setIsSolved(false)
  }

  const handleSolve = () => {
    const solvedBoard = board.map(row => [...row])
    if (solveSudoku(solvedBoard)) {
      setBoard(solvedBoard)
      setIsSolved(true)
    } else {
      alert("This Sudoku puzzle cannot be solved!")
    }
  }

  const checkSolution = () => {
    if (isValidSudoku(board)) {
      if (board.every(row => row.every(cell => cell !== 0))) {
        alert("Congratulations! You solved the Sudoku puzzle!")
        setIsSolved(true)
      } else {
        alert("So far, so good! Keep going!")
      }
    } else {
      alert("Oops! There are some errors in your solution.")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-fit">
      <Board
        board={board}
        initialBoard={initialBoard}
        onCellChange={handleCellChange}
      />
      <div className="mt-8 space-x-4">
        <Button onClick={startNewGame}>New Game</Button>
        <Button onClick={handleSolve} disabled={isSolved}>
          Solve
        </Button>
        <Button onClick={checkSolution}>Check Solution</Button>
      </div>
    </div>
  )
}

export default Sudoku
