"use client"

import { playlists } from "@/data/focus-data"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function PlaylistSelector({ current, onChange }) {
  return (
    <Select
      value={current.id}
      onValueChange={(value) => {
        const playlist = playlists.find((p) => p.id === value)
        if (playlist) onChange(playlist)
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a playlist" />
      </SelectTrigger>
      <SelectContent>
        {playlists.map((playlist) => (
          <SelectItem key={playlist.id} value={playlist.id}>
            {playlist.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

