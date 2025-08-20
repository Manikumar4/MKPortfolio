import React from "react"
import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { usePortfolioStore } from "../lib/store"
import { Code, Database, Brain, Globe } from "lucide-react"
import '../styles/Skills.css'

const skillCategories = [
  {
    title: "Languages",
    icon: Code,
    color: "from-pink-500 to-rose-500",
    skills: [
      { name: "Python", level: 90, color: "from-green-400 to-green-600", icon: "🐍" },
      { name: "JavaScript", level: 85, color: "from-yellow-300 to-yellow-500", icon: "⚡" },
      { name: "Java", level: 80, color: "from-red-400 to-red-600", icon: "☕" },
      { name: "HTML", level: 95, color: "from-orange-400 to-orange-600", icon: "🌐" },
      { name: "CSS", level: 90, color: "from-blue-400 to-blue-600", icon: "🎨" },
    ],
  },
  {
    title: "Frameworks",
    icon: Globe,
    color: "from-cyan-500 to-blue-500",
    skills: [
      { name: "React.js", level: 88, color: "from-cyan-400 to-cyan-600", icon: "⚛️" },
      { name: "Node.js", level: 85, color: "from-green-400 to-green-600", icon: "🟢" },
      { name: "Express.js", level: 82, color: "from-yellow-400 to-red-600", icon: "🚀" },
      { name: "Bootstrap", level: 85, color: "from-purple-400 to-purple-600", icon: "💜" },
    ],
  },
  {
    title: "Database & Tools",
    icon: Database,
    color: "from-emerald-500 to-teal-500",
    skills: [
      { name: "MongoDB", level: 80, color: "from-green-500 to-green-700", icon: "🍃" },
      { name: "MySQL", level: 75, color: "from-blue-500 to-blue-700", icon: "🐬" },
      { name: "Git", level: 85, color: "from-orange-500 to-orange-700", icon: "📝" },
      { name: "VS Code", level: 90, color: "from-blue-400 to-blue-600", icon: "💻" },
      { name: "Vercel", level: 80, color: "from-white to-gray-800", icon: "▲" },
    ],
  },
  {
    title: "AI & ML",
    icon: Brain,
    color: "from-purple-500 to-indigo-500",
    skills: [
      { name: "Machine Learning", level: 85, color: "from-indigo-400 to-indigo-600", icon: "🤖" },
      { name: "Neural Networks", level: 80, color: "from-purple-400 to-purple-600", icon: "🧠" },
      { name: "OpenCV", level: 75, color: "from-teal-400 to-teal-600", icon: "👁️" },
      { name: "Data Science", level: 82, color: "from-pink-400 to-pink-600", icon: "📊" },
    ],
  },
]

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeCategory, setActiveCategory] = useState(0)
  const { setCurrentSection } = usePortfolioStore()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCurrentSection("skills")
        }
      },
      { threshold: 0.3 },
    )

    const skillsElement = document.getElementById("skills")
    if (skillsElement) observer.observe(skillsElement)

    return () => observer.disconnect()
  }, [setCurrentSection])

  return (
  
      <section id="skills" className="skills-section">
      {/* Background decorations */}
      <div className="skills-background">
        <div className="skills-bg-element top-left" />
        <div className="skills-bg-element bottom-right" />
      </div>

      <div className="skills-container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="skills-header-content"
        >
          <motion.div
            className="about-intro-container"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="glass-vibrant px-6 py-4 rounded-full">
              <span className="about-intro-text">⚡ Technical Arsenal</span>
            </div>
          </motion.div>

          <h2 className="skills-main-title">
            My <span className="gradient-text-neon">Skills</span>
          </h2>
          <p className="skills-subtitle-text">
            Technologies and tools I wield to bring extraordinary ideas to life
          </p>
        </motion.div>

        <div ref={ref} className="skills-content">
          {/* Category Tabs */}
          <div className="skills-categories-container">
            {skillCategories.map((category, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveCategory(index)}
                className={`skills-category-card ${activeCategory === index
                    ? "skills-category-card active"
                    : "skills-category-card"
                  }`}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 10 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="skills-category-header-content">
                  <div className={`skills-category-icon-container`}
                    style={{
                      background: category.color === "from-pink-500 to-rose-500" ? "linear-gradient(to right, #ec4899, #f43f5e)" :
                        category.color === "from-cyan-500 to-blue-500" ? "linear-gradient(to right, #06b6d4, #3b82f6)" :
                          category.color === "from-emerald-500 to-teal-500" ? "linear-gradient(to right, #10b981, #14b8a6)" :
                            "linear-gradient(to right, #8b5cf6, #6366f1)"
                    }}>
                    <category.icon size={24} className="text-white" />
                  </div>
                  <h3 className="skills-category-title-text">{category.title}</h3>
                </div>

                <div className="skills-category-tags-container">
                  {category.skills.slice(0, 3).map((skill, i) => (
                    <span
                      key={i}
                      className="skills-category-tag-item"
                      style={{ background: 'linear-gradient(to right, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))' }}
                    >
                      {skill.icon} {skill.name}
                    </span>
                  ))}
                  {category.skills.length > 3 && (
                    <span className="skills-category-more-tag"
                      style={{ background: 'linear-gradient(to right, rgba(107, 114, 128, 0.2), rgba(107, 114, 128, 0.2))' }}>
                      +{category.skills.length - 3} more
                    </span>
                  )}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Skills Display */}
          <div className="skills-display-container">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="skills-display-card-content"
            >
              <div className="skills-display-header-content">
                <div className={`skills-display-icon-container`}
                  style={{
                    background: skillCategories[activeCategory].color === "from-pink-500 to-rose-500" ? "linear-gradient(to right, #ec4899, #f43f5e)" :
                      skillCategories[activeCategory].color === "from-cyan-500 to-blue-500" ? "linear-gradient(to right, #06b6d4, #3b82f6)" :
                        skillCategories[activeCategory].color === "from-emerald-500 to-teal-500" ? "linear-gradient(to right, #10b981, #14b8a6)" :
                          "linear-gradient(to right, #8b5cf6, #6366f1)"
                  }}>
                  {React.createElement(skillCategories[activeCategory].icon, {
                    size: 32,
                    className: "text-white",
                  })}
                </div>
                <h3 className="skills-display-title-text">{skillCategories[activeCategory].title}</h3>
              </div>

              <div className="skills-list-container">
                {skillCategories[activeCategory].skills.map((skill, index) => (
                  <motion.div
                    key={`${activeCategory}-${index}`}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="skill-item-container"
                  >
                    <div className="skill-header-content">
                      <div className="skill-info-content">
                        <span className="skill-emoji-icon">{skill.icon}</span>
                        <span className="skill-name-text">{skill.name}</span>
                      </div>
                      <span className="skill-percentage-text">{skill.level}%</span>
                    </div>

                    <div className="skill-bar">
                      <motion.div
                        className={`skill-progress`}
                        style={{
                          background: skill.color === "from-yellow-400 to-yellow-600" ? "linear-gradient(to right, #facc15, #ca8a04)" :
                            skill.color === "from-yellow-300 to-yellow-500" ? "linear-gradient(to right, #fde047, #eab308)" :
                              skill.color === "from-red-400 to-red-600" ? "linear-gradient(to right, #f87171, #dc2626)" :
                                skill.color === "from-orange-400 to-orange-600" ? "linear-gradient(to right, #fb923c, #ea580c)" :
                                  skill.color === "from-blue-400 to-blue-600" ? "linear-gradient(to right, #60a5fa, #2563eb)" :
                                    skill.color === "from-cyan-400 to-cyan-600" ? "linear-gradient(to right, #22d3ee, #0891b2)" :
                                      skill.color === "from-green-400 to-green-600" ? "linear-gradient(to right, #4ade80, #16a34a)" :
                                        skill.color === "from-gray-400 to-gray-600" ? "linear-gradient(to right, #9ca3af, #4b5563)" :
                                          skill.color === "from-purple-400 to-purple-600" ? "linear-gradient(to right, #c084fc, #9333ea)" :
                                            skill.color === "from-green-500 to-green-700" ? "linear-gradient(to right, #22c55e, #15803d)" :
                                              skill.color === "from-blue-500 to-blue-700" ? "linear-gradient(to right, #3b82f6, #1d4ed8)" :
                                                skill.color === "from-orange-500 to-orange-700" ? "linear-gradient(to right, #f97316, #c2410c)" :
                                                  skill.color === "from-black to-gray-800" ? "linear-gradient(to right, #000000, #1f2937)" :
                                                    skill.color === "from-indigo-400 to-indigo-600" ? "linear-gradient(to right, #818cf8, #4f46e5)" :
                                                      skill.color === "from-teal-400 to-teal-600" ? "linear-gradient(to right, #2dd4bf, #0d9488)" :
                                                        "linear-gradient(to right, #f472b6, #db2777)"
                        }}
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 1.5, delay: index * 0.2 + 0.5, ease: "easeOut" }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  
  )
}