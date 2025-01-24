"use client";

import React from "react";
import { useState, useEffect } from "react";
import Board from "./board";
import {
  calculateWinner,
  isBoardFull,
  getComputerMove,
} from "@/utils/tic-tac-toe-utils";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Game= () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isPVE, setIsPVE] = useState(false);

  useEffect(() => {
    // Add a small delay for better UX
    const timer = setTimeout(() => {
      if (isPVE && !xIsNext && !winner && !isBoardFull(board)) {
        const move = getComputerMove(board);
        if (move !== -1) {
          const newBoard = [...board];
          newBoard[move] = "O";
          setBoard(newBoard);
          setXIsNext(true);

          // Check for winner after computer move
          const newWinner = calculateWinner(newBoard);
          if (newWinner) {
            setWinner(newWinner);
          }
        }
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [board, xIsNext, winner, isPVE]);

  const handleClick = (i) => {
    if (winner || board[i] || (isPVE && !xIsNext)) return;

    const newBoard = [...board];
    newBoard[i] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);

    const newWinner = calculateWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    }
  };

  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  };

  const handleModeChange = () => {
    setIsPVE(!isPVE);
    handleRestart();
  };

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isBoardFull(board)) {
    status = "It's a draw!";
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-fit">
      <div className="mb-4 flex items-center space-x-2">
        <Switch
          id="game-mode"
          checked={isPVE}
          onCheckedChange={handleModeChange}
        />
        <Label htmlFor="game-mode">Player vs Computer</Label>
      </div>
      <div className="mb-4 text-xl font-semibold">{status}</div>
      <Board squares={board} onClick={handleClick} />
      <Button className="mt-4" onClick={handleRestart}>
        Restart Game
      </Button>
    </div>
  );
};

export default Game;
