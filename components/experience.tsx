"use client"

import { useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { usePortfolioStore } from "@/lib/store"
import { Calendar, MapPin, ExternalLink, Github } from "lucide-react"

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
    <section id="experience" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Professional <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            My journey through various internships and hands-on projects
          </p>
        </motion.div>

        <div ref={ref} className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-600 transform md:-translate-x-1/2" />

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative flex items-center mb-12 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
            >
              {/* Timeline dot */}
              <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transform md:-translate-x-1/2 z-10" />

              {/* Content card */}
              <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                <motion.div
                  className="glass p-6 rounded-xl hover:bg-white/10 transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{exp.title}</h3>
                      <p className="text-blue-400 font-medium">{exp.company}</p>
                    </div>
                    <div className="text-right text-sm text-gray-400">
                      <div className="flex items-center gap-1 mb-1">
                        <Calendar size={14} />
                        <span>{exp.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-gray-300 text-sm leading-relaxed">
                        • {item}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {exp.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full text-xs font-medium text-blue-300 border border-blue-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {(exp.projectLink || exp.sourceCode) && (
                    <div className="flex gap-3">
                      {exp.projectLink && (
                        <motion.a
                          href={exp.projectLink}
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
                      {exp.sourceCode && (
                        <motion.a
                          href={exp.sourceCode}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-sm font-medium hover:bg-white/10 transition-all"
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
