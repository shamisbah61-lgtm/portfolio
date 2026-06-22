import { useState } from "react"
import { FaBars, FaTimes } from "react-icons/fa"

function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed w-full top-0 z-50 bg-black">

      <div className="flex justify-between items-center px-6 md:px-12 py-5">

        {/* LOGO */}
        <h1 className="text-xl md:text-2xl font-extrabold tracking-wider text-white">
          MISBAH<span className="text-white">SHA</span>
        </h1>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex gap-8 text-sm md:text-base text-gray-300">
          <li><a href="#about" className="hover:text-cyan-400 transition">About</a></li>
          <li><a href="#work" className="hover:text-cyan-400 transition">Work</a></li>
          <li><a href="#contact" className="hover:text-cyan-400 transition">Contact</a></li>
        </ul>

        {/* MOBILE ICON */}
        <div 
          className="md:hidden text-2xl cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden bg-black overflow-hidden transition-all duration-500 ease-in-out ${
          menuOpen ? "max-h-60 py-6" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col items-center gap-6 text-lg text-gray-300">
          <li><a href="#about" onClick={()=>setMenuOpen(false)}>About</a></li>
          <li><a href="#work" onClick={()=>setMenuOpen(false)}>Work</a></li>
          <li><a href="#contact" onClick={()=>setMenuOpen(false)}>Contact</a></li>
        </ul>
      </div>

    </nav>
  )
}

export default Navbar