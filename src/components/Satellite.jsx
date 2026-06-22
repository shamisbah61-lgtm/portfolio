import { motion } from "framer-motion"

export default function Satellite() {
  // Wave animation variants for the transmission signals
  const waveVariants = {
    initial: { opacity: 0, scale: 0.6, y: 0 },
    animate: (i) => ({
      opacity: [0, 0.8, 0],
      scale: [0.8, 1.25, 1.4],
      y: [0, 10, 15],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        delay: i * 0.8,
        ease: "easeOut",
      },
    }),
  }

  // Blinking LED variants
  const ledVariants = {
    animate: {
      opacity: [0.3, 1, 0.3],
      scale: [0.9, 1.2, 0.9],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  }

  return (
    <motion.div
      initial={{ x: -100, y: -50, opacity: 0, rotate: -25 }}
      animate={{
        x: 0,
        y: 0,
        opacity: 0.9,
        rotate: [-10, 5, -10],
        translateY: [0, -15, 0],
        translateX: [0, 10, 0],
      }}
      transition={{
        // Entrance transition
        opacity: { duration: 1.5, ease: "easeOut" },
        x: { duration: 1.8, ease: "easeOut" },
        y: { duration: 1.8, ease: "easeOut" },
        // Floating loop transition (starts after entrance)
        rotate: {
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        },
        translateY: {
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        },
        translateX: {
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      className="absolute left-0 top-[10%] md:left-6 md:top-[12%] w-[250px] h-[250px] md:w-[420px] md:h-[420px] z-10 pointer-events-none select-none drop-shadow-[0_0_25px_rgba(34,211,238,0.25)]"
    >
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Cyberpunk metallic gradients */}
          <linearGradient id="satBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="40%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          <linearGradient id="goldFoil" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>

          <linearGradient id="solarPanel" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="50%" stopColor="#00f2fe" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>

          {/* Dish gradient */}
          <radialGradient id="dishGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="75%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#334155" />
          </radialGradient>
        </defs>

        {/* --- Background Antenna Glow --- */}
        <circle cx="100" cy="90" r="50" fill="url(#dishGrad)" opacity="0.05" />

        {/* --- SOLAR PANEL - LEFT --- */}
        {/* Connection Arm */}
        <rect x="25" y="93" width="30" height="4" rx="1" fill="#64748b" />
        <rect x="40" y="91" width="5" height="8" fill="#475569" />
        
        {/* Main Panel Frame */}
        <rect
          x="-15"
          y="70"
          width="40"
          height="50"
          rx="4"
          fill="#0f172a"
          stroke="#38bdf8"
          strokeWidth="1.5"
          transform="rotate(-5, 5, 95)"
        />
        {/* Solar Cells Grid */}
        <g fill="url(#solarPanel)" opacity="0.85" transform="rotate(-5, 5, 95)">
          <rect x="-11" y="74" width="7" height="12" rx="1" />
          <rect x="-1" y="74" width="7" height="12" rx="1" />
          <rect x="9" y="74" width="7" height="12" rx="1" />
          <rect x="19" y="74" width="7" height="12" rx="1" />

          <rect x="-11" y="89" width="7" height="12" rx="1" />
          <rect x="-1" y="89" width="7" height="12" rx="1" />
          <rect x="9" y="89" width="7" height="12" rx="1" />
          <rect x="19" y="89" width="7" height="12" rx="1" />

          <rect x="-11" y="104" width="7" height="12" rx="1" />
          <rect x="-1" y="104" width="7" height="12" rx="1" />
          <rect x="9" y="104" width="7" height="12" rx="1" />
          <rect x="19" y="104" width="7" height="12" rx="1" />
        </g>
        {/* Panel Crossbars */}
        <line x1="-15" y1="95" x2="25" y2="95" stroke="#0284c7" strokeWidth="1" opacity="0.5" />

        {/* --- SOLAR PANEL - RIGHT --- */}
        {/* Connection Arm */}
        <rect x="145" y="93" width="30" height="4" rx="1" fill="#64748b" />
        <rect x="155" y="91" width="5" height="8" fill="#475569" />

        {/* Main Panel Frame */}
        <rect
          x="175"
          y="70"
          width="40"
          height="50"
          rx="4"
          fill="#0f172a"
          stroke="#38bdf8"
          strokeWidth="1.5"
          transform="rotate(5, 195, 95)"
        />
        {/* Solar Cells Grid */}
        <g fill="url(#solarPanel)" opacity="0.85" transform="rotate(5, 195, 95)">
          <rect x="179" y="74" width="7" height="12" rx="1" />
          <rect x="189" y="74" width="7" height="12" rx="1" />
          <rect x="199" y="74" width="7" height="12" rx="1" />
          <rect x="209" y="74" width="7" height="12" rx="1" />

          <rect x="179" y="89" width="7" height="12" rx="1" />
          <rect x="189" y="89" width="7" height="12" rx="1" />
          <rect x="199" y="89" width="7" height="12" rx="1" />
          <rect x="209" y="89" width="7" height="12" rx="1" />

          <rect x="179" y="104" width="7" height="12" rx="1" />
          <rect x="189" y="104" width="7" height="12" rx="1" />
          <rect x="199" y="104" width="7" height="12" rx="1" />
          <rect x="209" y="104" width="7" height="12" rx="1" />
        </g>
        {/* Panel Crossbars */}
        <line x1="175" y1="95" x2="215" y2="95" stroke="#0284c7" strokeWidth="1" opacity="0.5" />

        {/* --- MAIN SATELLITE BODY --- */}
        {/* Gold Foil Layer */}
        <rect x="78" y="72" width="44" height="46" rx="3" fill="url(#goldFoil)" />
        
        {/* Main Hexagonal / Cylinder core */}
        <polygon points="70,95 80,68 120,68 130,95 120,122 80,122" fill="url(#satBody)" stroke="#475569" strokeWidth="1" />
        
        {/* Technical details/decals on body */}
        <rect x="85" y="78" width="30" height="8" rx="1" fill="#1e293b" stroke="#334155" strokeWidth="0.5" />
        <circle cx="90" cy="82" r="1.5" fill="#ef4444" />
        <circle cx="97" cy="82" r="1.5" fill="#22c55e" />
        
        <line x1="80" y1="95" x2="120" y2="95" stroke="#334155" strokeWidth="1.5" />
        <line x1="100" y1="68" x2="100" y2="122" stroke="#334155" strokeWidth="1" opacity="0.3" />

        {/* Blinking Sensor LEDs */}
        <motion.circle
          cx="110"
          cy="105"
          r="2"
          fill="#22d3ee"
          variants={ledVariants}
          animate="animate"
        />
        <motion.circle
          cx="90"
          cy="105"
          r="1.5"
          fill="#ef4444"
          variants={ledVariants}
          animate="animate"
        />

        {/* --- TOP INSTRUMENT PANEL (SENSORS) --- */}
        <rect x="90" y="58" width="20" height="10" fill="#475569" />
        <line x1="93" y1="58" x2="85" y2="45" stroke="#64748b" strokeWidth="1.5" />
        <circle cx="85" cy="45" r="2.5" fill="#94a3b8" />
        
        {/* Long Rod Antenna */}
        <line x1="107" y1="58" x2="115" y2="30" stroke="#94a3b8" strokeWidth="1.5" />
        <motion.circle
          cx="115"
          cy="30"
          r="3.5"
          fill="#eab308"
          variants={ledVariants}
          animate="animate"
        />
        {/* Tiny antenna tip glow */}
        <circle cx="115" cy="30" r="8" fill="#eab308" opacity="0.15" />

        {/* --- BOTTOM TRANSMITTER DISH --- */}
        {/* Support brackets */}
        <path d="M 85 122 L 95 138 L 105 138 L 115 122" fill="none" stroke="#475569" strokeWidth="2.5" />
        
        {/* Parabolic Dish antenna */}
        <path
          d="M 75 142 Q 100 162 125 142"
          fill="url(#dishGrad)"
          stroke="#22d3ee"
          strokeWidth="2"
        />
        
        {/* Feed Horn Assembly */}
        <line x1="100" y1="147" x2="100" y2="162" stroke="#eab308" strokeWidth="2" />
        <polygon points="98,162 102,162 100,166" fill="#fbbf24" />
        <circle cx="100" cy="162" r="2" fill="#ef4444" />

        {/* --- SIGNAL BEAM WAVE ANIMATION --- */}
        <g opacity="0.8">
          <motion.path
            d="M 90 174 Q 100 181 110 174"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="1.5"
            strokeLinecap="round"
            custom={0}
            variants={waveVariants}
            initial="initial"
            animate="animate"
          />
          <motion.path
            d="M 84 182 Q 100 193 116 182"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="1.5"
            strokeLinecap="round"
            custom={1}
            variants={waveVariants}
            initial="initial"
            animate="animate"
          />
          <motion.path
            d="M 78 190 Q 100 205 122 190"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="1.5"
            strokeLinecap="round"
            custom={2}
            variants={waveVariants}
            initial="initial"
            animate="animate"
          />
        </g>
      </svg>
    </motion.div>
  )
}
