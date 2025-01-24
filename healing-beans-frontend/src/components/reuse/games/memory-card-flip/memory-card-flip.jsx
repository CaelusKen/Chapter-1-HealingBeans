"use client"

import React, { useState, useEffect } from "react"
import Card from "./card"
import { generateCards } from "@/utils/match-utils"
import { Button } from "@/components/ui/button"

const Game= () => {
    const [cards, setCards] = useState([])
    const [flippedCards, setFlippedCards] = useState([])
    const [moves, setMoves] = useState(0)
    const [isGameOver, setIsGameOver] = useState(false)
  
    useEffect(() => {
      startNewGame()
    }, [])
  
    const startNewGame = () => {
      setCards(generateCards())
      setFlippedCards([])
      setMoves(0)
      setIsGameOver(false)
    }
  
    const handleCardClick = (clickedCard) => {
      if (flippedCards.length === 2 || clickedCard.isMatched || clickedCard.isFlipped) return
  
      const newCards = cards.map((card) => (card.id === clickedCard.id ? { ...card, isFlipped: true } : card))
  
      const newFlippedCards = [...flippedCards, clickedCard.id]
  
      setCards(newCards)
      setFlippedCards(newFlippedCards)
      setMoves(moves + 1)
  
      if (newFlippedCards.length === 2) {
        const [firstCardId, secondCardId] = newFlippedCards
        const firstCard = newCards.find((card) => card.id === firstCardId)
        const secondCard = newCards.find((card) => card.id === secondCardId)
  
        if (firstCard && secondCard && firstCard.emoji === secondCard.emoji) {
          const matchedCards = newCards.map((card) =>
            card.id === firstCardId || card.id === secondCardId ? { ...card, isMatched: true } : card,
          )
          setCards(matchedCards)
          setFlippedCards([])
  
          if (matchedCards.every((card) => card.isMatched)) {
            setIsGameOver(true)
          }
        } else {
          setTimeout(() => {
            const resetCards = newCards.map((card) =>
              card.id === firstCardId || card.id === secondCardId ? { ...card, isFlipped: false } : card,
            )
            setCards(resetCards)
            setFlippedCards([])
          }, 1000)
        }
      }
    }
  
    return (
      <div className="flex flex-col items-center justify-center min-h-fit">
        <div className="mb-4">
          <span className="text-xl font-semibold">Moves: {moves}</span>
        </div>
        <div className="grid grid-cols-4 gap-4 mb-8">
          {cards.map((card) => (
            <Card key={card.id} card={card} onClick={() => handleCardClick(card)} />
          ))}
        </div>
        <Button onClick={startNewGame}>{isGameOver ? "Play Again" : "Reset Game"}</Button>
        {isGameOver && (
          <div className="mt-4 text-2xl font-bold text-green-600">Congratulations! You won in {moves} moves!</div>
        )}
      </div>
    )
  }
  
  export default Game