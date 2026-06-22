import { motion } from "framer-motion"
import { FaInstagram, FaHeart, FaComment } from "react-icons/fa"

const instagramPosts = [
  {
    id: 1,
    image: "/instagram_1_1781775433151.png",
    likes: "342",
    comments: "24",
    link: "https://instagram.com"
  },
  {
    id: 2,
    image: "/instagram_2_1781775452884.png",
    likes: "512",
    comments: "41",
    link: "https://instagram.com"
  },
  {
    id: 3,
    image: "/instagram_3_1781775478255.png",
    likes: "420",
    comments: "18",
    link: "https://instagram.com"
  },
  {
    id: 4,
    image: "/instagram_4_1781775491786.png",
    likes: "608",
    comments: "56",
    link: "https://instagram.com"
  }
]

function Instagram() {
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

  return (
    <section
      id="instagram"
      className="py-24 px-6 relative overflow-hidden bg-black/40"
    >
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-pink-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/2 right-1/4 w-[300px] h-[300px] bg-yellow-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto z-10 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
            <FaInstagram className="text-pink-500 animate-pulse" />
            Follow Me on <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent">Instagram</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-md mx-auto">
            Check out my daily coding setups, behind-the-scenes projects, and design inspiration.
          </p>
        </div>

        {/* Grid of Posts */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {instagramPosts.map((post) => (
            <motion.a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="group relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md cursor-pointer"
            >
              {/* Image */}
              <img
                src={post.image}
                alt={`Instagram Post ${post.id}`}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />

              {/* Glassmorphic Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-4 text-white">
                <div className="flex gap-6 text-lg">
                  <span className="flex items-center gap-2 font-semibold hover:text-red-400 transition-colors">
                    <FaHeart className="text-red-500" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-2 font-semibold hover:text-cyan-400 transition-colors">
                    <FaComment className="text-cyan-400" />
                    {post.comments}
                  </span>
                </div>
                <span className="text-xs bg-white/10 border border-white/20 px-3 py-1.5 rounded-full text-gray-300 font-medium group-hover:bg-white/20 transition-all">
                  View Post
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Follow CTA Button */}
        <div className="text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block"
          >
            <a
              href="https://www.instagram.com/misbaahshaa?igsh=NGJxNjM5NW9tbzNq&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 hover:from-purple-500 hover:via-pink-400 hover:to-yellow-400 text-white font-bold px-8 py-4 rounded-xl shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] transition-all duration-300"
            >
              <FaInstagram className="text-xl" />
              Follow @misbahsha
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Instagram
