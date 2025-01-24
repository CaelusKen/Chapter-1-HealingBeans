"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pause, Play } from "lucide-react"
import { motion } from "framer-motion"

export function FocusTimer({ initialMinutes, isActive, onToggle, onMinutesChange }) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update current time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Timer countdown
  useEffect(() => {
    let interval

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      onToggle()
    }

    return () => clearInterval(interval)
  }, [isActive, timeLeft, onToggle])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  const formatCurrentTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-0 flex items-center justify-center pointer-events-none"
    >
      <div className="bg-background/30 backdrop-blur-lg rounded-lg p-6 shadow-lg pointer-events-auto">
        <div className="text-6xl font-mono text-white text-center mb-4">
          {isActive ? (
            // Timer display when active
            <span className="tabular-nums">
              {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
            </span>
          ) : (
            // Current time display when inactive
            <span>{formatCurrentTime(currentTime)}</span>
          )}
        </div>

        <div className="flex items-center justify-center gap-4">
          {!isActive && (
            <Input
              type="number"
              min="1"
              max="60"
              value={initialMinutes}
              onChange={(e) => onMinutesChange(Number.parseInt(e.target.value, 10))}
              className="w-20 bg-white/20 border-white/20 text-white"
            />
          )}
          <Button
            variant="outline"
            size="icon"
            onClick={onToggle}
            className="bg-white/20 border-white/20 hover:bg-white/30"
          >
            {isActive ? <Pause className="h-4 w-4 text-white" /> : <Play className="h-4 w-4 text-white" />}
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

