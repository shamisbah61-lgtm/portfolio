import { motion } from "framer-motion"
import { FaCode, FaRocket, FaLightbulb } from "react-icons/fa"

function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
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

  const cards = [
    {
      icon: <FaCode className="text-cyan-400 text-3xl" />,
      title: "Full-Stack Dev",
      desc: "Vibrant and clean frontend paired with robust backend architectures."
    },
    {
      icon: <FaRocket className="text-purple-400 text-3xl" />,
      title: "Fast Performance",
      desc: "Optimized queries, lightweight pages, and super-fast load speeds."
    },
    {
      icon: <FaLightbulb className="text-yellow-400 text-3xl" />,
      title: "UI Animations",
      desc: "Interactive components that respond dynamically to user inputs."
    }
  ]

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center px-6 md:px-20 py-20 relative overflow-hidden"
    >
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        className="max-w-6xl w-full grid md:grid-cols-2 gap-16 items-center z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        
        {/* LEFT: Cards Grid */}
        <div className="grid gap-6 order-2 md:order-1">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
            >
              {/* Floating Space Wrapper */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, idx % 2 === 0 ? 0.8 : -0.8, 0]
                }}
                transition={{
                  duration: 5 + idx * 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              >
                {/* Interactive Card */}
                <motion.div
                  whileHover={{ scale: 1.03, y: -4 }}
                  className="p-6 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl flex items-start gap-4 transition-colors duration-300 hover:border-cyan-500/40 hover:bg-cyan-500/5 group cursor-default"
                >
                  <div className="p-3 bg-white/5 rounded-xl group-hover:bg-cyan-500/10 transition-colors duration-300">
                    {card.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1 group-hover:text-cyan-400 transition-colors duration-300">
                      {card.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* RIGHT: Text Content */}
        <div className="order-1 md:order-2 space-y-6">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-8 text-center md:text-left"
            variants={itemVariants}
          >
            About <span className="text-cyan-400">Me</span>
          </motion.h2>

          <motion.p 
            className="text-lg text-gray-300 leading-relaxed text-center md:text-left"
            variants={itemVariants}
          >
            I'm <span className="text-white font-semibold">Misbahsha</span>, a
            full-stack developer focused on building modern, fast, and visually
            engaging web applications. I enjoy turning ideas into real products
            using clean code and efficient design.
          </motion.p>

          <motion.p 
            className="text-lg text-gray-300 leading-relaxed text-center md:text-left"
            variants={itemVariants}
          >
            My main stack includes React, JavaScript, Tailwind CSS, and backend
            technologies for building scalable applications. I like experimenting
            with UI animations and interactive experiences that make websites
            feel alive.
          </motion.p>

          <motion.p 
            className="text-lg text-gray-300 leading-relaxed text-center md:text-left"
            variants={itemVariants}
          >
            Currently I'm improving my skills by building real projects and
            learning better architecture, performance optimization, and modern
            development workflows.
          </motion.p>
        </div>

      </motion.div>
    </section>
  )
}

export default About