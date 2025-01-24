"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Play, Pause, Timer } from 'lucide-react'

export function ClockDisplay({
  initialMinutes,
  isActive,
  onToggle,
  onMinutesChange,
}) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showTimerInput, setShowTimerInput] = useState(false)

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

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    })
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-0 flex items-center justify-center pointer-events-none"
    >
      <div className="bg-black/30 backdrop-blur-md rounded-2xl p-8 shadow-2xl pointer-events-auto text-center min-w-[400px]">
        <AnimatePresence mode="wait">
          {isActive ? (
            // Focus Timer Display
            <motion.div
              key="timer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-semibold text-amber-200">Focus Time</h2>
              <div className="text-7xl font-mono text-white tabular-nums">
                {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
              </div>
            </motion.div>
          ) : (
            // Clock Display
            <motion.div
              key="clock"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className="text-7xl font-mono text-white tabular-nums">
                {formatTime(currentTime)}
              </div>
              <div className="text-xl text-amber-200/90">
                {formatDate(currentTime)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-6 flex items-center justify-center gap-4">
          {showTimerInput && !isActive && (
            <Input
              type="number"
              min="1"
              max="60"
              value={initialMinutes}
              onChange={(e) => onMinutesChange(parseInt(e.target.value, 10))}
              className="w-20 bg-white/10 border-white/20 text-white text-center"
              placeholder="mins"
            />
          )}
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              if (!isActive && !showTimerInput) {
                setShowTimerInput(true)
              } else {
                onToggle()
              }
            }}
            className="bg-white/10 border-white/20 hover:bg-white/20 transition-colors"
          >
            {isActive ? (
              <Pause className="h-4 w-4 text-white" />
            ) : showTimerInput ? (
              <Play className="h-4 w-4 text-white" />
            ) : (
              <Timer className="h-4 w-4 text-white" />
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
