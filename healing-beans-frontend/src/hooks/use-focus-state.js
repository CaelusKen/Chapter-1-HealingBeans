"use client"

import { useState } from "react"
import { backgrounds, vfxOptions, playlists } from "@/data/focus-data"

export function useFocusState() {
  const [background, setBackground] = useState(backgrounds[0])
  const [activeVFX, setActiveVFX] = useState(vfxOptions)
  const [currentPlaylist, setCurrentPlaylist] = useState(playlists[0])
  const [isTimerActive, setIsTimerActive] = useState(false)
  const [timerMinutes, setTimerMinutes] = useState(25)

  const toggleVFX = (id) => {
    setActiveVFX((prev) => prev.map((vfx) => (vfx.id === id ? { ...vfx, enabled: !vfx.enabled } : vfx)))
  }

  return {
    background,
    setBackground,
    activeVFX,
    toggleVFX,
    currentPlaylist,
    setCurrentPlaylist,
    isTimerActive,
    setIsTimerActive,
    timerMinutes,
    setTimerMinutes,
  }
}

