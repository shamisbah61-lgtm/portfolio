import { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"

export default function Ufo() {
  const controls = useAnimation()
  const [showBeam, setShowBeam] = useState(false)

  useEffect(() => {
    let active = true

    const runUfoSequence = async () => {
      // Start hidden off-screen left
      await controls.set({ x: "-20vw", y: "20vh", rotate: 0, scale: 0.8 })

      while (active) {
        // Wait a random duration before appearing (between 12 and 24 seconds)
        const delay = 12000 + Math.random() * 12000
        await new Promise((resolve) => setTimeout(resolve, delay))

        if (!active) break

        const startHeight = 15 + Math.random() * 30  // vh
        const midHeight = 35 + Math.random() * 25    // vh
        const endHeight = 15 + Math.random() * 30    // vh
        const stopPosition = 20 + Math.random() * 40  // vw

        // Reset to initial height off-screen
        await controls.set({ x: "-20vw", y: `${startHeight}vh`, rotate: 0 })

        // 1. Fly in from left to random stop position
        await controls.start({
          x: `${stopPosition}vw`,
          y: `${midHeight}vh`,
          rotate: [0, 8, -8, 0],
          transition: { duration: 5, ease: "easeOut" }
        })

        if (!active) break

        // 2. Hover gently
        controls.start({
          y: [`${midHeight}vh`, `${midHeight - 2}vh`, `${midHeight}vh`],
          transition: { duration: 2, repeat: 2, ease: "easeInOut" }
        })

        // 3. Shine tractor beam
        await new Promise((resolve) => setTimeout(resolve, 500))
        setShowBeam(true)

        // Keep beam active for 2.5 seconds
        await new Promise((resolve) => setTimeout(resolve, 2500))
        setShowBeam(false)
        await new Promise((resolve) => setTimeout(resolve, 4000))

        if (!active) break

        // 4. Zoom off-screen to the right
        await controls.start({
          x: "120vw",
          y: `${endHeight}vh`,
          rotate: 15,
          scale: 0.6,
          transition: { duration: 0.8, ease: "easeIn" }
        })
      }
    }

    runUfoSequence()

    return () => {
      active = false
    }
  }, [controls])

  return (
    <motion.div
      initial={{ x: "-20vw", y: "20vh" }}
      animate={controls}
      className="fixed z-40 pointer-events-none select-none"
    >
      <div className="relative flex flex-col items-center">
        {/* UFO Body & Cockpit */}
        <svg
          viewBox="0 0 100 60"
          className="w-32 h-20 drop-shadow-[0_0_15px_rgba(34,211,238,0.7)]"
        >
          {/* Glass Cabin Dome */}
          <path
            d="M 35 30 Q 50 10 65 30 Z"
            fill="#22d3ee"
            opacity="0.85"
            className="animate-pulse"
          />

          {/* Glowing alien head outline inside cabin */}
          <ellipse cx="50" cy="24" rx="3" ry="4" fill="#1e293b" />
          <circle cx="48.5" cy="23" r="0.75" fill="#22d3ee" />
          <circle cx="51.5" cy="23" r="0.75" fill="#22d3ee" />

          {/* Main Metallic Saucer Plate */}
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
              opacity: showBeam ? 0.55 : 0,
              scaleX: showBeam ? 1 : 0
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-36 h-60 -mt-2 origin-top"
            style={{
              background: "linear-gradient(to bottom, rgba(34, 211, 238, 0.85) 0%, rgba(34, 211, 238, 0) 100%)",
              clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)"
            }}
          />
          {showBeam && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="absolute top-12 flex flex-col items-center"
            >
              <span className="text-cyan-100 text-[10px] md:text-xs font-black tracking-[0.25em] drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-pulse text-center">
                CONTACT
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
