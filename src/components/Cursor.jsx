import { useEffect, useState } from "react"

function Cursor() {

  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [particles, setParticles] = useState([])

  useEffect(() => {

    const moveCursor = (e) => {

      setPosition({
        x: e.clientX,
        y: e.clientY
      })

      const particle = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY
      }

      setParticles((prev) => [...prev, particle].slice(-5))

      setTimeout(() => {
        setParticles((prev) => prev.slice(1))
      }, 300)

    }

    window.addEventListener("mousemove", moveCursor)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
    }

  }, [])

  return (
    <>
      {/* main cursor glow */}
      <div
        className="pointer-events-none fixed z-[9999]"
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)"
        }}
      >
        <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_20px_8px_rgba(34,211,238,0.8)]"></div>
      </div>

      {/* subtle particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="pointer-events-none fixed w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-60"
          style={{
            left: p.x,
            top: p.y,
            transform: "translate(-50%, -50%)"
          }}
        />
      ))}
    </>
  )
}

export default Cursor