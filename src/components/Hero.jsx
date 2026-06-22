import { useState, useEffect } from "react"
import TechOrbit from "./TechOrbit"

function Hero() {

  const roles = [
    "Full Stack Developer",
    "React Developer",
    "Backend Developer",
    "UI Builder"
  ]

  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length)
    }, 3000) // change speed here

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="min-h-screen flex items-center pt-24">

      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT */}
        <div className="text-center md:text-left">

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Hi, I'm <span className="text-cyan-400">Misbah</span>
          </h1>

          <h2 className="text-3xl md:text-5xl font-bold mt-4 text-cyan-400 transition-all duration-500">
            {roles[index]}
          </h2>

          <p className="text-gray-400 mt-6 max-w-lg mx-auto md:mx-0">
            I build modern, scalable web applications using React,
            Django and modern web technologies.
          </p>

        </div>

        {/* RIGHT */}
        <div className="flex justify-center">
          <TechOrbit />
        </div>

      </div>

    </section>
  )
}

export default Hero