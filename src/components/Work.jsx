import { FaGithub, FaExternalLinkAlt } from "react-icons/fa"

const projects = [
  {
    id: 1,
    title: "Turf Booking System",
    description: "Full stack turf booking app with slot booking and authentication.",
    image: "/project1.jpg",
    github: "#",
    live: "#"
  },
  {
    id: 2,
    title: "Portfolio Website",
    description: "Modern developer portfolio with galaxy background and orbit animations.",
    image: "/project2.webp",
    github: "#",
    live: "#"
  },
  {
    id: 3,
    title: "Django API Project",
    description: "REST API backend with authentication and PostgreSQL database.",
    image: "/project3.webp",
    github: "#",
    live: "#"
  },
  {
    id: 4,
    title: "Hotline Solution",
    description: "A premium travel agency booking platform featuring customized holiday packages, hotel listings, and interactive itinerary planning.",
    image: "/hotline_solution.png",
    github: "#",
    live: "#"
  }
]


function Work() {
  return (
    <section id="work" className="min-h-screen px-6 py-20">

      <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
        My <span className="text-cyan-400">Projects</span>
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">

        {projects.map((project) => (

          <div
            key={project.id}
            className="group bg-black/60 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:scale-105 hover:-translate-y-2 transition duration-300"
          >

            {/* project image */}
            <div className="h-48 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
            </div>

            {/* project content */}
            <div className="p-6">

              <h3 className="text-xl font-semibold mb-2">
                {project.title}
              </h3>

              <p className="text-gray-300 text-sm mb-4">
                {project.description}
              </p>

              <div className="flex gap-4 text-sm">

                <a
                  href={project.github}
                  className="flex items-center gap-2 hover:text-cyan-400"
                >
                  <FaGithub /> Code
                </a>

                <a
                  href={project.live}
                  className="flex items-center gap-2 hover:text-cyan-400"
                >
                  <FaExternalLinkAlt /> Live
                </a>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  )
}

export default Work