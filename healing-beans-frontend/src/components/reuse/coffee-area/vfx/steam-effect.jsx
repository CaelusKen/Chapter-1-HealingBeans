"use client"

import { motion } from "framer-motion"

export function SteamEffect() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.8 }}
      className="fixed bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
    >
      <div className="relative w-40 h-60">
        <motion.div
          animate={{
            y: [-20, -120],
            x: [-20, 20],
            scale: [1, 2],
            opacity: [0.8, 0],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeOut",
          }}
          className="absolute bottom-0 left-1/2 w-8 h-8 bg-white rounded-full blur-xl"
        />
        <motion.div
          animate={{
            y: [-40, -140],
            x: [20, -20],
            scale: [1, 2],
            opacity: [0.8, 0],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeOut",
            delay: 1.5,
          }}
          className="absolute bottom-0 left-1/2 w-8 h-8 bg-white rounded-full blur-xl"
        />
      </div>
    </motion.div>
  )
}

