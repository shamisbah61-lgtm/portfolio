import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function ContactUfo({
  position = { top: "20%", left: "10%" },
  scale = 1,
  beamText = "CONTACT",
  floatDuration = 5,
  beamInterval = 12000,
  beamDelay = 2000,
  flyInFrom = "left"
}) {
  const [showBeam, setShowBeam] = useState(false)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    if (!isInView) {
      setShowBeam(false)
      return
    }

    let active = true

    const triggerBeamCycle = async () => {
      // Wait initial delay after entering viewport so the UFO has time to fly in
      await new Promise((resolve) => setTimeout(resolve, beamDelay))
      if (!active) return

      while (active) {
        setShowBeam(true)
        // Keep beam on for 3000ms
        await new Promise((resolve) => setTimeout(resolve, 3000))
        if (!active) return
        setShowBeam(false)

        // Wait for next cycle
        await new Promise((resolve) => setTimeout(resolve, Math.max(1000, beamInterval - 3000)))
      }
    }

    triggerBeamCycle()

    return () => {
      active = false
    }
  }, [isInView, beamInterval, beamDelay])

  // Determine starting coordinates based on flyInFrom direction
  const startX = flyInFrom === "left" ? -350 : flyInFrom === "right" ? 350 : 0
  const startY = flyInFrom === "top" ? -350 : flyInFrom === "bottom" ? 350 : 0

  const entranceVariants = {
    hidden: {
      x: startX,
      y: startY,
      opacity: 0,
      scale: scale * 0.7 // slightly smaller while entering for depth effect
    },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      scale: scale,
      transition: {
        type: "spring",
        stiffness: 45,
        damping: 14,
        mass: 1.1
      }
    }
  }

  return (
    <motion.div
      style={{ ...position }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      onViewportEnter={() => setIsInView(true)}
      onViewportLeave={() => setIsInView(false)}
      className="absolute z-0 pointer-events-none select-none"
    >
      {/* Middle container to apply the entrance animation (flying in from off-screen) without shifting the observer container */}
      <motion.div variants={entranceVariants}>
        {/* Inner container to decouple the infinite floating motion from the entrance motion */}
        <motion.div
          animate={{
            y: [0, -12, 0],
            x: [0, 6, 0],
            rotate: [0, 1.2, -1.2, 0]
          }}
          transition={{
            duration: floatDuration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          className="relative flex flex-col items-center"
        >
          {/* UFO Body & Cockpit */}
          <svg
            viewBox="0 0 100 60"
            className="w-24 h-15 drop-shadow-[0_0_12px_rgba(34,211,238,0.6)]"
          >
            {/* Glass Cabin Dome */}
            <path
              d="M 35 30 Q 50 10 65 30 Z"
              fill="#22d3ee"
              opacity="0.85"
              className="animate-pulse"
            />

            {/* Alien inside cabin */}
            <ellipse cx="50" cy="24" rx="3" ry="4" fill="#1e293b" />
            <circle cx="48.5" cy="23" r="0.75" fill="#22d3ee" />
            <circle cx="51.5" cy="23" r="0.75" fill="#22d3ee" />

            {/* Main Saucer Plate */}
            <ellipse
              cx="50"
              cy="35"
              rx="42"
              ry="11"
              fill="#1e293b"
              stroke="#475569"
              strokeWidth="1.5"
            />

            {/* Bottom Rim */}
            <ellipse cx="50" cy="39" rx="30" ry="7" fill="#0f172a" />

            {/* Flashing Lights */}
            <circle cx="20" cy="35" r="1.5" fill="#ef4444" className="animate-ping" />
            <circle cx="32" cy="37" r="1.5" fill="#eab308" />
            <circle cx="44" cy="39" r="1.5" fill="#22c55e" />
            <circle cx="56" cy="39" r="1.5" fill="#ef4444" />
            <circle cx="68" cy="37" r="1.5" fill="#eab308" />
            <circle cx="80" cy="35" r="1.5" fill="#22c55e" className="animate-ping" />
          </svg>

          {/* Tractor Beam Container */}
          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{
                opacity: showBeam ? 0.45 : 0,
                scaleX: showBeam ? 1 : 0
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-28 h-48 -mt-2 origin-top"
              style={{
                background: "linear-gradient(to bottom, rgba(34, 211, 238, 0.8) 0%, rgba(34, 211, 238, 0) 100%)",
                clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)"
              }}
            />
            {showBeam && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="absolute top-10 flex flex-col items-center"
              >
                <span className="text-cyan-100 text-[9px] font-black tracking-[0.2em] drop-shadow-[0_0_6px_rgba(34,211,238,0.7)] animate-pulse text-center">
                  {beamText}
                </span>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
