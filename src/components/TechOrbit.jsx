import { Canvas } from "@react-three/fiber"
import { OrbitControls, Float, Html } from "@react-three/drei"

import {
  FaReact,
  FaJs,
  FaPython,
  FaGithub,
  FaNodeJs,
  FaGitAlt,
  FaDatabase
} from "react-icons/fa"

import { SiTailwindcss, SiPostgresql } from "react-icons/si"


function Icon({ position, children }) {
  return (
    <Float speed={2} rotationIntensity={2} floatIntensity={2}>
      <mesh position={position}>
        <Html center>
          <div className="text-6xl md:text-7xl drop-shadow-[0_0_20px_white]">
            {children}
          </div>
        </Html>
      </mesh>
    </Float>
  )
}


export default function TechOrbit() {
  return (

    <div className="w-[320px] h-[320px] md:w-[450px] md:h-[450px]">

      <Canvas camera={{ position: [0, 0, 7] }}>

        <ambientLight intensity={1.5} />

        {/* React */}
        <Icon position={[3, 0, 0]}>
          <FaReact color="#61DBFB" />
        </Icon>

        {/* Git */}
        <Icon position={[-3, 0, 0]}>
          <FaGitAlt color="#F1502F" />
        </Icon>

        {/* PostgreSQL */}
        <Icon position={[0, 3, 0]}>
          <SiPostgresql color="#336791" />
        </Icon>

        {/* JavaScript */}
        <Icon position={[0, -3, 0]}>
          <FaJs color="#F7DF1E" />
        </Icon>

        {/* Python */}
        <Icon position={[2, 2, 0]}>
          <FaPython color="#3776AB" />
        </Icon>

        {/* GitHub */}
        <Icon position={[-2, 2, 0]}>
          <FaGithub color="#ffffff" />
        </Icon>

        {/* NodeJS */}
        <Icon position={[2, -2, 0]}>
          <FaNodeJs color="#68A063" />
        </Icon>

        {/* Tailwind */}
        <Icon position={[-2, -2, 0]}>
          <SiTailwindcss color="#38BDF8" />
        </Icon>

        {/* Database */}
        <Icon position={[0, 0, 3]}>
          <FaDatabase color="#a855f7" />
        </Icon>

        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={1.5}
        />

      </Canvas>

    </div>
  )
}