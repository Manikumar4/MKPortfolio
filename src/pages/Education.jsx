import { useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { usePortfolioStore } from "../lib/store"
import { GraduationCap, Award, Calendar } from "lucide-react"
import '../styles/Education.css'

const education = [
  {
    degree: "Bachelor of Engineering (Computer Science & Engineering)",
    institution: "University College of Engineering Nagercoil, Konam",
    duration: "Oct 2022 - July 2026",
    status: "Current",
    description:
      "Pursuing comprehensive education in computer science fundamentals, software engineering, and emerging technologies.",
  },
  {
    degree: "HSC (Computer Science)",
    institution: "Carmel Hr. Sec. School, Ramanputhur",
    duration: "June 2021 - May 2022",
    percentage: "86.5% (519/600)",
    description: "Specialized in computer science with strong foundation in programming and mathematics.",
  },
  {
    degree: "SSC",
    institution: "Carmel Hr. Sec. School, Ramanputhur",
    duration: "June 2019 - Mar 2020",
    percentage: "90.2% (451/500)",
    description: "Completed secondary education with excellent academic performance.",
  },
]

const certifications = [
  { name: "Python", provider: "Infosys Springboard", icon: "🐍" },
  { name: "Data Science", provider: "Infosys Springboard", icon: "📊" },
  { name: "React", provider: "Udemy", icon: "⚛️" },
  { name: "Java", provider: "Udemy", icon: "☕" },
  { name: "Robotic Process Automation", provider: "Naan Mudhalvan (UIPath)", icon: "🤖" },
]

export default function Education() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { setCurrentSection } = usePortfolioStore()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCurrentSection("education")
        }
      },
      { threshold: 0.3 },
    )

    const educationElement = document.getElementById("education")
    if (educationElement) observer.observe(educationElement)

    return () => observer.disconnect()
  }, [setCurrentSection])

  return (
    <section id="education" className="education-section">
      <div className="education-container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="education-header"
        >
          <motion.div
            className="about-intro-container"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="glass-vibrant px-6 py-4 rounded-full">
              <span className="about-intro-text">🎓 Academic Journey</span>
            </div>
          </motion.div>
          <h2 className="education-title">
            Education & <span className="gradient-text">Certifications</span>
          </h2>
          <p className="education-subtitle">My academic journey and professional certifications</p>
        </motion.div>

        <div ref={ref} className="education-content">
          {/* Education */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="education-section-header"
            >
              <div className="education-section-icon education"
                style={{ background: 'linear-gradient(to right, #3b82f6, #8b5cf6)' }}>
                <GraduationCap size={24} />
              </div>
              <h3 className="education-section-title">Education</h3>
            </motion.div>

            <div className="space-y-6">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="education-item"
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="education-item-header">
                    <div className="education-item-content">
                      <h4 className="education-degree">{edu.degree}</h4>
                      <p className="education-institution">{edu.institution}</p>
                    </div>
                    {edu.status && (
                      <span className="education-status-badge education"
                        style={{ background: 'linear-gradient(to right, rgba(34, 197, 94, 0.2), rgba(16, 185, 129, 0.2))' }}>
                        {edu.status}
                      </span>
                    )}
                  </div>

                  <div className="flex-center-gap-4 text-sm text-gray-400 mb-3">
                    <div className="flex-center-gap-1">
                      <Calendar size={14} />
                      <span>{edu.duration}</span>
                    </div>
                    {edu.percentage && (
                      <div className="flex-center-gap-1">
                        <Award size={14} />
                        <span>{edu.percentage}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-gray-300 text-sm">{edu.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="education-section-header"
            >
              <div className="education-section-icon certifications"
                style={{ background: 'linear-gradient(to right, #8b5cf6, #ec4899)' }}>
                <Award size={24} />
              </div>
              <h3 className="education-section-title">Certifications</h3>
            </motion.div>

            <div className="grid-gap-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="education-item flex-center-gap-4"
                  whileHover={{ scale: 1.02, x: 10 }}
                >
                  <div className="text-2xl">{cert.icon}</div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold">{cert.name}</h4>
                    <p className="text-gray-400 text-sm">{cert.provider}</p>
                  </div>

                </motion.div>
              ))}
            </div>

            {/* Additional Skills Summary */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="skills-summary"
            >
              <h4 className="skills-summary-title">Key Competencies</h4>
              <div className="skills-summary-content">
                <div>
                  <p className="skills-category-title">Development</p>
                  <ul className="skills-listt">
                    <li>Full-Stack Development</li>
                    <li>Responsive UI Design</li>
                    <li>REST API Development</li>
                  </ul>
                </div>
                <div>
                  <p className="skills-category-title ai">AI & Data</p>
                  <ul className="skills-listt">
                    <li>Machine Learning</li>
                    <li>Data Preprocessing</li>
                    <li>Model Training</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}