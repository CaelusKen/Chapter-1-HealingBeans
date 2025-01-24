"use client"

import { backgrounds } from "@/data/focus-data"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function BackgroundPicker({ current, onChange }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {backgrounds.map((bg) => (
        <Button
          key={bg.id}
          variant={bg.id === current.id ? "default" : "outline"}
          className="p-0 w-full aspect-video overflow-hidden"
          onClick={() => onChange(bg)}
        >
          <img
            src={bg.url || "/placeholder.svg"}
            alt={bg.name}
            width={200}
            height={112}
            className="w-full h-full object-cover"
          />
        </Button>
      ))}
    </div>
  )
}