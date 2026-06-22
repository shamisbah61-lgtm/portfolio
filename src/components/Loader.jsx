import { useEffect, useState } from "react"

function Loader({ finishLoading }) {

  const [slideUp, setSlideUp] = useState(false)

  useEffect(() => {

    setTimeout(() => {
      setSlideUp(true)
    }, 1500)

    setTimeout(() => {
      finishLoading()
    }, 2200)

  }, [])

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-[9999]
      bg-black/70 transition-transform duration-700
      ${slideUp ? "-translate-y-full" : "translate-y-0"}`}
    >

      <h1 className="text-6xl md:text-8xl font-extrabold tracking-widest text-white">
      PORT<span className="text-cyan-400">FOLIO</span>
      </h1>

    </div>
  )
}

export default Loader