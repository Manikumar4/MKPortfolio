"use client"

import React from "react"
import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { usePortfolioStore } from "@/lib/store"
import { Code, Database, Brain, Globe } from "lucide-react"

const skillCategories = [
  {
    title: "Languages",
    icon: Code,
    color: "from-pink-500 to-rose-500",
    skills: [
      { name: "Python", level: 90, color: "from-yellow-400 to-yellow-600", icon: "🐍" },
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
      { name: "Express.js", level: 82, color: "from-gray-400 to-gray-600", icon: "🚀" },
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
      { name: "Vercel", level: 80, color: "from-black to-gray-800", icon: "▲" },
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
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >

          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            My <span className="gradient-text-neon">Skills</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Technologies and tools I wield to bring extraordinary ideas to life
          </p>
        </motion.div>

        <div ref={ref} className="grid lg:grid-cols-2 gap-12">
          {/* Category Tabs */}
          <div className="space-y-6">
            {skillCategories.map((category, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveCategory(index)}
                className={`interactive-card w-full text-left p-6 rounded-2xl transition-all duration-500 hover-lift ${
                  activeCategory === index
                    ? "glass-vibrant border-2 border-white/30 shadow-2xl"
                    : "glass hover:bg-white/10"
                }`}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 10 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${category.color}`}>
                    <category.icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.slice(0, 3).map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gradient-to-r from-white/10 to-white/5 rounded-full text-sm text-gray-300 border border-white/20"
                    >
                      {skill.icon} {skill.name}
                    </span>
                  ))}
                  {category.skills.length > 3 && (
                    <span className="px-3 py-1 bg-gradient-to-r from-gray-500/20 to-gray-600/20 rounded-full text-sm text-gray-400">
                      +{category.skills.length - 3} more
                    </span>
                  )}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Skills Display */}
          <div className="space-y-8">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="glass-vibrant p-8 rounded-2xl"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className={`p-4 rounded-xl bg-gradient-to-r ${skillCategories[activeCategory].color}`}>
                  {React.createElement(skillCategories[activeCategory].icon, {
                    size: 32,
                    className: "text-white",
                  })}
                </div>
                <h3 className="text-3xl font-bold gradient-text-aurora">{skillCategories[activeCategory].title}</h3>
              </div>

              <div className="space-y-6">
                {skillCategories[activeCategory].skills.map((skill, index) => (
                  <motion.div
                    key={`${activeCategory}-${index}`}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="space-y-3"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{skill.icon}</span>
                        <span className="text-white font-semibold text-lg">{skill.name}</span>
                      </div>
                      <span className="text-gray-300 font-bold">{skill.level}%</span>
                    </div>

                    <div className="skill-bar">
                      <motion.div
                        className={`skill-progress bg-gradient-to-r ${skill.color}`}
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
