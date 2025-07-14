"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { usePortfolioStore } from "@/lib/store"
import { ExternalLink, Github, Play, X } from "lucide-react"
import Image from "next/image";

const projects = [
  {
    title: "MERN Stack eCommerce Website",
    description:
      "A complete eCommerce solution built with MongoDB, Express.js, React.js, and Node.js featuring user authentication, product management, shopping cart, and order processing.",
    image: "/ecom.png?height=300&width=500",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Bootstrap", "JWT"],
    liveDemo: "https://shopping-fqgd.onrender.com" ,
    sourceCode: "https://github.com/Manikumar4/Shopping",
    category: "Full Stack",
    featured: true,
  },
  {
    title: "Diabetes Prediction Model",
    description:
      "Machine learning model using Python and scikit-learn to predict diabetes risk based on patient health metrics with high accuracy.",
    image: "/diab.jpg?height=300&width=500",
    technologies: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib"],
    category: "Machine Learning",
    featured: true,
  },
  {
    title: "Cat/Dog Classifier CNN",
    description:
      "Deep learning image classifier using Convolutional Neural Networks (VGG16) to distinguish between cats and dogs with high precision.",
    image: "/class.jpg?height=300&width=500",
    technologies: ["Python", "TensorFlow", "Keras", "VGG16", "OpenCV"],
    category: "AI/ML",
    featured: true,
  },
  {
    title: "Responsive Portfolio Website",
    description:
      "Modern, responsive portfolio website showcasing projects and skills with smooth animations and mobile-first design.",
    image: "/port.png?height=300&width=500",
    technologies: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    category: "Frontend",
  },
  {
    title: "Interactive Tic-Tac-Toe Game",
    description:
      "Browser-based tic-tac-toe game with AI opponent, score tracking, and smooth animations built with vanilla JavaScript.",
    image: "/tic.png?height=300&width=500",
    technologies: ["HTML", "CSS", "JavaScript", "Game Logic"],
    category: "Frontend",
  },
  {
    title: "Stopwatch Web Application",
    description:
      "Precision stopwatch application with lap timing, pause/resume functionality, and clean user interface.",
    image: "/stop.png?height=300&width=500",
    technologies: ["HTML", "CSS", "JavaScript", "Web APIs"],
    category: "Frontend",
  },
]

const categories = ["All", "Full Stack", "Machine Learning", "AI/ML", "Frontend"]

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)
  const { setCurrentSection } = usePortfolioStore()

  const filteredProjects =
    activeCategory === "All" ? projects : projects.filter((project) => project.category === activeCategory)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCurrentSection("projects")
        }
      },
      { threshold: 0.3 },
    )

    const projectsElement = document.getElementById("projects")
    if (projectsElement) observer.observe(projectsElement)

    return () => observer.disconnect()
  }, [setCurrentSection])

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A showcase of my technical projects and achievements
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeCategory === category
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                  : "glass text-gray-300 hover:bg-white/10"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" layout>
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`glass rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 ${
                  project.featured ? "md:col-span-2 lg:col-span-1" : ""
                }`}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className="relative group">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <motion.button
                      onClick={() => setSelectedProject(project)}
                      className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Play size={16} />
                      View Details
                    </motion.button>
                  </div>
                  {project.featured && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full text-xs font-bold text-black">
                      Featured
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded text-xs text-blue-300 border border-blue-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-500/20 rounded text-xs text-gray-400">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-3">
                    {project.liveDemo && (
                      <motion.a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink size={16} />
                        Live Demo
                      </motion.a>
                    )}
                    {project.sourceCode && (
                      <motion.a
                        href={project.sourceCode}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-sm font-medium hover:bg-white/10 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github size={16} />
                        Code
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="glass max-w-2xl w-full rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-4">{selectedProject.title}</h3>
                <p className="text-gray-300 mb-6">{selectedProject.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full text-sm text-blue-300 border border-blue-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  {selectedProject.liveDemo && (
                    <motion.a
                      href={selectedProject.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink size={18} />
                      Live Demo
                    </motion.a>
                  )}
                  {selectedProject.sourceCode && (
                    <motion.a
                      href={selectedProject.sourceCode}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 glass rounded-lg font-medium hover:bg-white/10 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={18} />
                      Source Code
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
