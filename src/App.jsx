import { useState } from "react"

import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./components/About"
import Work from "./components/Work"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import Galaxy from "./components/Galaxy"
import Cursor from "./components/Cursor"
import Loader from "./components/Loader"


function App() {

  const [loading, setLoading] = useState(true)

  return (
    <div className="text-white relative overflow-x-hidden min-h-screen">

      <Galaxy />
      <Cursor />

      {/* WEBSITE CONTENT */}
      <div
        className={`transition-all duration-700 ${
          loading ? "blur-md scale-105" : "blur-0 scale-100"
        }`}
      >
        <Navbar />
        <Hero />
        <About />
        <Work />
        <Contact />
        <Footer />
      </div>

      {/* LOADER */}
      {loading && <Loader finishLoading={() => setLoading(false)} />}

    </div>
  )
}

export default App