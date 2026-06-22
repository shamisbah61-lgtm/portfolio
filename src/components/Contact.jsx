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
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Contact