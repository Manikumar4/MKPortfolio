import { useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { usePortfolioStore } from "../lib/store"
import { Calendar, MapPin, ExternalLink, Github } from "lucide-react"
import '../styles/Experience.css'
const experiences = [
  {
    title: "Artificial Intelligence Intern",
    company: "Nixzytech",
    location: "Nagercoil, India (In-Office)",
    duration: "June 2025 - July 2025",
    description: [
      "Developed AI/ML projects using Python, Neural Networks and deep learning, Machine learning, OpenCV, and Data science.",
      "Worked on image processing and prediction models and different datasets.",
      "Created Diabetes Prediction Model and Cat/Dog classifier using CNN (VGG16).",
    ],
    technologies: ["Python", "Neural Networks", "Deep Learning", "OpenCV", "Data Science", "CNN", "VGG16"],
  },
  {
    title: "Full Stack Web Developer Intern",
    company: "AK Infopark",
    location: "Nagercoil, India (In-Office)",
    duration: "Nov 2024 - Dec 2024",
    description: [
      "Designed and developed a complete MERN stack eCommerce website.",
      "Utilized HTML, CSS, JavaScript, Bootstrap, React.js for the frontend, and Node.js, Express.js for the backend, with MongoDB for the database.",
      "Implemented product listing, user authentication, cart, checkout and order functionality.",
      "Deployed the website live using Vercel.",
    ],
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "HTML", "CSS", "JavaScript", "Bootstrap"],
    projectLink: "https://shopping-1-09ca.onrender.com",
    sourceCode: "https://github.com/Manikumar4/Shopping",
  },
  {
    title: "Full Stack Web Developer Intern",
    company: "Prodigy InfoTech",
    location: "Mumbai, India (Remote)",
    duration: "Aug 2024 - Sep 2024",
    description: [
      "Built responsive websites and applications using HTML, CSS, JavaScript.",
      "Developed a responsive portfolio, tic-tac-toe game, and stopwatch web app.",
      "Gained hands-on experience in responsive UI and component-based development.",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "Responsive Design", "UI/UX"],
  },
]

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { setCurrentSection } = usePortfolioStore()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCurrentSection("experience")
        }
      },
      { threshold: 0.3 },
    )

    const experienceElement = document.getElementById("experience")
    if (experienceElement) observer.observe(experienceElement)

    return () => observer.disconnect()
  }, [setCurrentSection])
  return (
      <section id="experience" className="experience-section">
        <div className="experience-container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="experience-header"
        >
                    <motion.div
            className="about-intro-container"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="glass-vibrant px-6 py-4 rounded-full">
              <span className="about-intro-text">💼 My Professional Journey</span>
            </div>
          </motion.div>
          <h2 className="experience-title">
            Professional <span className="gradient-text">Experience</span>
          </h2>
          <p className="experience-subtitle">
            My journey through various internships and hands-on projects
          </p>
        </motion.div>

        <div ref={ref} className="experience-timeline">
          {/* Timeline line */}
          <div className="experience-timeline-line"
               style={{ background: 'linear-gradient(to bottom, #3b82f6, #8b5cf6)' }} />

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`experience-item ${index % 2 === 0 ? "" : "even"}`}
            >
              {/* Timeline dot */}
              <div className="experience-timeline-dot"
                   style={{ background: 'linear-gradient(to right, #3b82f6, #8b5cf6)' }} />

              {/* Content card */}
              <div className="experience-content">
                <motion.div
                  className="experience-card"
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="experience-card-header">
                    <div className="experience-card-title">
                      <h3 className="experience-job-title">{exp.title}</h3>
                      <p className="experience-company">{exp.company}</p>
                    </div>
                    <div className="experience-card-meta">
                      <div className="experience-meta-item">
                        <Calendar size={14} />
                        <span>{exp.duration}</span>
                      </div>
                      <div className="experience-meta-item">
                        <MapPin size={14} />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  <ul className="experience-description-list">
                    {exp.description.map((item, i) => (
                      <li key={i} className="experience-description-item">
                        • {item}
                      </li>
                    ))}
                  </ul>

                  <div className="experience-technologies">
                    {exp.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="experience-tech-tag"
                        style={{ background: 'linear-gradient(to right, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))' }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {(exp.projectLink || exp.sourceCode) && (
                    <div className="experience-actions">
                      {exp.projectLink && (
                        <motion.a
                          href={exp.projectLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="experience-action-btn primary"
                          style={{
                            background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
                            boxShadow: '0 0 20px rgba(59, 130, 246, 0.25)'
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ExternalLink size={16} />
                          Live Demo
                        </motion.a>
                      )}
                      {exp.sourceCode && (
                        <motion.a
                          href={exp.sourceCode}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="experience-action-btn secondary"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Github size={16} />
                          Source Code
                        </motion.a>
                      )}
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    
  )
}