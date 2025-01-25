"use client"

import { useState, useEffect } from "react"
import { backgrounds, vfxOptions, playlists } from "@/data/focus-data"

export function useFocusState() {
  const [background, setBackground] = useState(backgrounds[0])
  const [activeVFX, setActiveVFX] = useState(vfxOptions)
  const [currentPlaylist, setCurrentPlaylist] = useState(playlists[0])
  const [isTimerActive, setIsTimerActive] = useState(false)
  const [timerMinutes, setTimerMinutes] = useState(25)
  const [timeLeft, setTimeLeft] = useState(timerMinutes * 60)

  const toggleVFX = (id) => {
    setActiveVFX((prev) => prev.map((vfx) => (vfx.id === id ? { ...vfx, enabled: !vfx.enabled } : vfx)))
  }

  useEffect(() => {
    setTimeLeft(timerMinutes * 60)
    setIsTimerActive(false)
  }, [timerMinutes])

  useEffect(() => {
    let interval
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsTimerActive(false)
    }
    return () => clearInterval(interval)
  }, [isTimerActive, timeLeft])

  const handleTimerToggle = () => {
    if (!isTimerActive && timeLeft === 0) {
      setTimeLeft(timerMinutes * 60)
    }
    setIsTimerActive(!isTimerActive)
  }

  return {
    background,
    setBackground,
    activeVFX,
    toggleVFX,
    currentPlaylist,
    setCurrentPlaylist,
    isTimerActive,
    setIsTimerActive: handleTimerToggle,
    timerMinutes,
    setTimerMinutes,
    timeLeft,
  }
}