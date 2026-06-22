import { motion, useMotionValue, useTransform } from "framer-motion"
import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram } from "react-icons/fa"
import ContactUfo from "./ContactUfo"

function Contact() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Map mouse movement to 3D rotation angles
  const rotateX = useTransform(y, [-200, 200], [10, -10])
  const rotateY = useTransform(x, [-200, 200], [-10, 10])

  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = event.clientX - rect.left - width / 2
    const mouseY = event.clientY - rect.top - height / 2
    x.set(mouseX)
    y.set(mouseY)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15
      }
    }
  }

  const cardEntranceVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 14
      }
    }
  }

  const socials = [
    { href: "https://github.com", icon: <FaGithub />, label: "GitHub" },
    { href: "https://linkedin.com", icon: <FaLinkedin />, label: "LinkedIn" },
    { href: "https://www.instagram.com/misbaahshaa?igsh=NGJxNjM5NW9tbzNq&utm_source=qr", icon: <FaInstagram />, label: "Instagram" },
    { href: "mailto:yourmail@gmail.com", icon: <FaEnvelope />, label: "Email" }
  ]

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden"
    >
      {/* Decorative background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none animate-pulse" />

      {/* Local UFOs in the background of the Contact section */}
      <ContactUfo
        position={{ top: "15%", left: "5%" }}
        scale={1.1}
        beamText="CONTACT"
        floatDuration={5}
        beamDelay={2000}
        beamInterval={10000}
        flyInFrom="left"
      />
      <ContactUfo
        position={{ bottom: "15%", right: "5%" }}
        scale={0.95}
        beamText="SAY HELLO"
        floatDuration={6.5}
        beamDelay={3500}
        beamInterval={12000}
        flyInFrom="right"
      />
      <ContactUfo
        position={{ top: "10%", right: "18%" }}
        scale={0.7}
        beamText="PING ME"
        floatDuration={8}
        beamDelay={5000}
        beamInterval={14000}
        flyInFrom="right"
      />

      <motion.div
        className="max-w-4xl w-full text-center z-10 perspective"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {/* title */}
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-6"
          variants={itemVariants}
        >
          Let's <span className="text-cyan-400">Connect</span>
        </motion.h2>

        {/* subtitle */}
        <motion.p 
          className="text-gray-400 mb-12 max-w-lg mx-auto leading-relaxed"
          variants={itemVariants}
        >
          I'm always open to discussing new projects, collaborations,
          or opportunities. Feel free to reach out.
        </motion.p>

        {/* glowing card with 3D tilt & zero-gravity sway */}
        <motion.div 
          variants={cardEntranceVariants}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          animate={{
            y: [0, -6, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-10 shadow-[0_0_40px_rgba(0,255,255,0.08)] hover:border-cyan-500/30 transition-all duration-300 max-w-2xl mx-auto cursor-pointer"
        >
          {/* email button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="relative inline-block group mb-8"
            style={{ transform: "translateZ(30px)" }} // Pop-out 3D effect
          >
            {/* Glowing ring under button */}
            <div className="absolute inset-0 bg-cyan-500 rounded-xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
            
            <a
              href="mailto:yourmail@gmail.com"
              className="relative inline-flex items-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-4 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300"
            >
              <FaEnvelope className="text-lg" />
              Send Email
            </a>
          </motion.div>

          {/* social icons */}
          <div 
            className="flex justify-center gap-8 text-3xl"
            style={{ transform: "translateZ(20px)" }} // Pop-out 3D effect
          >
            {socials.map((social, idx) => (
              <motion.a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                variants={itemVariants}
                whileHover={{ scale: 1.25, y: -4, color: "#22d3ee" }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-300 hover:text-cyan-400 transition-all duration-200 p-2.5 bg-white/5 rounded-xl border border-white/5 hover:border-cyan-500/20"
                aria-label={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>

          {/* Glowing Cyberpunk Fire/Flame Effect */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[25%] w-[85%] h-24 pointer-events-none select-none z-[-1] overflow-visible">
            {/* Outer Deep Red/Orange Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[100%] h-16 bg-gradient-to-t from-red-600 via-orange-600 to-transparent blur-2xl opacity-60 animate-pulse" />
            
            {/* Inner Vibrant Yellow Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-12 bg-gradient-to-t from-orange-500 via-yellow-400 to-transparent blur-xl opacity-80" />

            {/* SVG Flame Vectors that warp and flicker */}
            <div className="absolute bottom-0 left-0 right-0 h-full flex justify-center items-end overflow-visible">
              <svg viewBox="0 0 100 50" className="w-[180px] md:w-[260px] h-20 drop-shadow-[0_-8px_20px_rgba(239,68,68,0.7)] overflow-visible">
                <defs>
                  {/* Fire gradients */}
                  <linearGradient id="outerFire" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#dc2626" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#f97316" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#facc15" stopOpacity="0" />
                  </linearGradient>

                  <linearGradient id="innerFire" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#ea580c" stopOpacity="0.95" />
                    <stop offset="60%" stopColor="#fbbf24" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Layer 1: Outer Red Flame */}
                <motion.path
                  d="M 10 50 Q 25 20 40 5 Q 50 12 60 5 Q 75 20 90 50 Z"
                  fill="url(#outerFire)"
                  animate={{
                    d: [
                      "M 10 50 Q 25 20 40 5 Q 50 12 60 5 Q 75 20 90 50 Z",
                      "M 10 50 Q 22 24 38 8 Q 52 16 62 4 Q 78 22 90 50 Z",
                      "M 10 50 Q 28 18 42 3 Q 48 8 58 6 Q 72 18 90 50 Z",
                      "M 10 50 Q 25 20 40 5 Q 50 12 60 5 Q 75 20 90 50 Z"
                    ]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Layer 2: Inner Flame Core */}
                <motion.path
                  d="M 22 50 Q 32 25 45 15 Q 50 20 55 15 Q 68 25 78 50 Z"
                  fill="url(#innerFire)"
                  animate={{
                    d: [
                      "M 22 50 Q 32 25 45 15 Q 50 20 55 15 Q 68 25 78 50 Z",
                      "M 22 50 Q 35 22 43 18 Q 48 16 57 12 Q 65 28 78 50 Z",
                      "M 22 50 Q 30 28 47 12 Q 52 24 53 18 Q 70 22 78 50 Z",
                      "M 22 50 Q 32 25 45 15 Q 50 20 55 15 Q 68 25 78 50 Z"
                    ]
                  }}
                  transition={{
                    duration: 1.1,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.15
                  }}
                />

                {/* Spark Particles */}
                <motion.circle
                  cx="45"
                  cy="25"
                  r="1.8"
                  fill="#fef08a"
                  animate={{
                    y: [0, -35],
                    x: [0, -6, 6, 0],
                    opacity: [1, 0.9, 0],
                    scale: [1, 1.2, 0.4]
                  }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />
                <motion.circle
                  cx="55"
                  cy="20"
                  r="1.2"
                  fill="#f97316"
                  animate={{
                    y: [0, -30],
                    x: [0, 4, -4, 0],
                    opacity: [1, 0.8, 0],
                    scale: [1, 1.1, 0.3]
                  }}
                  transition={{
                    duration: 1.3,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: 0.4
                  }}
                />
                <motion.circle
                  cx="38"
                  cy="35"
                  r="2.2"
                  fill="#dc2626"
                  animate={{
                    y: [0, -42],
                    x: [0, -3, 3, 0],
                    opacity: [1, 0.7, 0],
                    scale: [1, 1.3, 0.2]
                  }}
                  transition={{
                    duration: 2.0,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: 0.8
                  }}
                />
              </svg>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Contact