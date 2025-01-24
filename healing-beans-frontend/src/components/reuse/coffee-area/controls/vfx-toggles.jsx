"use client"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function VFXToggles({ options, onToggle }) {
  return (
    <div className="space-y-4">
      {options.map((vfx) => (
        <div key={vfx.id} className="flex items-center space-x-2">
          <Switch id={vfx.id} checked={vfx.enabled} onCheckedChange={() => onToggle(vfx.id)} />
          <Label htmlFor={vfx.id}>{vfx.name}</Label>
        </div>
      ))}
    </div>
  )
}

