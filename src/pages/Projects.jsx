import { useEffect, useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { usePortfolioStore } from "../lib/store"
import { ExternalLink, Github, Play, X } from "lucide-react"
import '../styles/Projects.css'
const projects = [
  {
    title: "AI Chatbot Assistant",
    description:
      "An interactive AI chatbot powered by natural language processing to handle real-time queries, integrated seamlessly with web applications for intelligent customer support.",
    image: "/aichat.png",
    technologies: ["JavaScript", "HTML", "CSS", "Gemini API"],
    liveDemo: "https://mkchatbot.netlify.app",
    sourceCode: "https://github.com/Manikumar4/AiChatbot",
    category: "AI/ML",
    featured: true,
  },
  {
    title: "Advanced Full-Stack eCommerce with Admin Panel",
    description:
      "Next-generation eCommerce platform featuring product management, analytics dashboard, order tracking, user authentication, payment gateway integration, and a secure admin interface.",
    image: "/advecom.png",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "JWT", "Redux"],
    liveDemo: "https://mkcart.onrender.com",
    sourceCode: "https://github.com/Manikumar4/MKCart",
    category: "Full Stack",
    featured: true,
  },
  {
    title: "MERN Stack eCommerce Website",
    description:
      "A complete eCommerce solution built with MongoDB, Express.js, React.js, and Node.js featuring user authentication, product management, shopping cart, and order processing.",
    image: "/ecom.png",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Bootstrap", "JWT"],
    liveDemo: "https://shopping-fqgd.onrender.com",
    sourceCode: "https://github.com/Manikumar4/Shopping",
    category: "Full Stack",
    featured: true,
  },

  {
    title: "Diabetes Prediction Model",
    description:
      "Machine learning model using Python and scikit-learn to predict diabetes risk based on patient health metrics with high accuracy.",
    image: "/diab.jpg",
    technologies: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib"],
    category: "Machine Learning",
    featured: true,
  },
  {
    title: "Cat/Dog Classifier CNN",
    description:
      "Deep learning image classifier using Convolutional Neural Networks (VGG16) to distinguish between cats and dogs with high precision.",
    image: "/class.jpg",
    technologies: ["Python", "TensorFlow", "Keras", "VGG16", "OpenCV"],
    category: "AI/ML",
    featured: true,
  },
  {
    title: "Responsive Portfolio Website",
    description:
      "Modern, responsive portfolio website showcasing projects and skills with smooth animations and mobile-first design.",
    image: "/port.png",
    technologies: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    category: "Frontend",
  },
]

const categories = ["All", "Full Stack", "Machine Learning", "AI/ML", "Frontend"]

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedProject, setSelectedProject] = useState(null)
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
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="projects-header"
        >
          <motion.div
            className="about-intro-container"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="glass-vibrant px-6 py-4 rounded-full">
              <span className="about-intro-text">🚀 Featured Works</span>
            </div>
          </motion.div>
          <h2 className="projects-title">
            Featured <span className="projects-title-highlight">Projects</span>
          </h2>
          <p className="projects-subtitle">
            A showcase of my technical projects and achievements
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="projects-filter"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`projects-filter-btn ${activeCategory === category
                  ? "active"
                  : ""
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div ref={ref} className="projects-grid" layout>
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`project-card ${project.featured ? "featured" : ""
                  }`}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className="project-image-container">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="project-image"
                  />
                  <div className="project-overlay">
                    <motion.button
                      onClick={() => setSelectedProject(project)}
                      className="project-view-btn"
                      whileHover={{ scale: 0.9 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Play size={16} />
                      View Details
                    </motion.button>
                  </div>
                  {project.featured && (
                    <div className="project-featured-badge">
                      Featured
                    </div>
                  )}
                </div>

                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>

                  <div className="project-technologies">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        className="project-tech-tag"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="project-tech-more">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="project-actions">
                    {project.liveDemo && (
                      <motion.a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-action-btn primary"
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
                        className="project-action-btn secondary"
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
            className="project-modal-overlay"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="project-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  className="project-modal-image"
                  style={{ height: '16rem' }}
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="project-modal-close"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="project-modal-content">
                <h3 className="project-modal-title">{selectedProject.title}</h3>
                <p className="project-modal-description">{selectedProject.description}</p>

                <div className="project-modal-technologies">
                  {selectedProject.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="project-modal-tech-tag"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="project-modal-actions">
                  {selectedProject.liveDemo && (
                    <motion.a
                      href={selectedProject.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-modal-action-btn primary"
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
                      className="project-modal-action-btn secondary"
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