"use client"

import { motion } from "framer-motion"

export function RainOverlay() {
  return (
    <>
      <style jsx global>{`
        @keyframes rain-front {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }

        @keyframes rain-mid {
          0% {
            transform: translateY(-150%);
          }
          100% {
            transform: translateY(100%);
          }
        }

        @keyframes rain-back {
          0% {
            transform: translateY(-200%);
          }
          100% {
            transform: translateY(100%);
          }
        }

        .rain-drop {
          position: fixed;
          width: 1px;
          height: 100vh;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.6) 100%
          );
        }

        .rain-front {
          opacity: 0.8;
          animation: rain-front 1s linear infinite;
        }

        .rain-mid {
          opacity: 0.6;
          animation: rain-mid 1.2s linear infinite;
        }

        .rain-back {
          opacity: 0.4;
          animation: rain-back 1.4s linear infinite;
        }
      `}</style>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 pointer-events-none overflow-hidden"
      >
        <div className="relative w-full h-full">
          {/* Front layer rain */}
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={`front-${i}`}
              className="rain-drop rain-front"
              style={{
                left: `${i * 2.5}%`,
                transform: `rotate(15deg)`,
                animationDelay: `${Math.random() * 1}s`,
              }}
            />
          ))}

          {/* Mid layer rain */}
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={`mid-${i}`}
              className="rain-drop rain-mid"
              style={{
                left: `${i * 3.33}%`,
                transform: `rotate(20deg)`,
                animationDelay: `${Math.random() * 1.2}s`,
              }}
            />
          ))}

          {/* Back layer rain */}
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={`back-${i}`}
              className="rain-drop rain-back"
              style={{
                left: `${i * 5}%`,
                transform: `rotate(25deg)`,
                animationDelay: `${Math.random() * 1.4}s`,
              }}
            />
          ))}
        </div>
      </motion.div>
    </>
  )
}

