"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useFocusState } from "@/hooks/use-focus-state";
import { BackgroundPicker } from "./controls/background-picker";
import { VFXToggles } from "./controls/vfx-toggles";
import { PlaylistSelector } from "./controls/playlist-selector";
import { RainOverlay } from "./vfx/rain-overlay";
import { SteamEffect } from "./vfx/steam-effect";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ClockDisplay } from "./clock-display";
import GameSelector from "../games/game-toggle";

export default function FocusSpace() {
  const {
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
  } = useFocusState();

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 transition-all duration-1000"
        style={{
          backgroundImage: `url(${background.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* VFX Overlays */}
      <AnimatePresence>
        {activeVFX.find((vfx) => vfx.id === "rain")?.enabled && <RainOverlay />}
        {activeVFX.find((vfx) => vfx.id === "steam")?.enabled && (
          <SteamEffect />
        )}
        {activeVFX.find((vfx) => vfx.id === "blur")?.enabled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 backdrop-blur-sm pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Clock/Timer Display */}
      <ClockDisplay
        initialMinutes={timerMinutes}
        isActive={isTimerActive}
        onToggle={() => setIsTimerActive(!isTimerActive)}
        onMinutesChange={setTimerMinutes}
      />

      {/* Controls */}
      <div className="relative z-10">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="fixed top-4 right-4 bg-background/80 backdrop-blur-sm"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Focus Space Settings</SheetTitle>
              <SheetDescription>
                Customize your environment for better focus
              </SheetDescription>
            </SheetHeader>
            <div className="space-y-6 mt-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Background</h3>
                <BackgroundPicker
                  current={background}
                  onChange={setBackground}
                />
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Visual Effects</h3>
                <VFXToggles options={activeVFX} onToggle={toggleVFX} />
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Music</h3>
                <PlaylistSelector
                  current={currentPlaylist}
                  onChange={setCurrentPlaylist}
                />
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Spotify Embed */}
        <div className="fixed bottom-4 left-4 w-80">
          <div className="flex items-end gap-4">
              <iframe
                src={currentPlaylist.url}
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-lg shadow-lg bg-background/80 backdrop-blur-sm"
              />
    
              <GameSelector />
          </div>
        </div>
      </div>
    </div>
  );
}
