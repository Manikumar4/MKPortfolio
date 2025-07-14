"use client"

import { useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { usePortfolioStore } from "@/lib/store"
import { GraduationCap, Award, Calendar } from "lucide-react"

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
    <section id="education" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Education & <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">My academic journey and professional certifications</p>
        </motion.div>

        <div ref={ref} className="grid lg:grid-cols-2 gap-12">
          {/* Education */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
                <GraduationCap size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white">Education</h3>
            </motion.div>

            <div className="space-y-6">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="glass p-6 rounded-xl hover:bg-white/10 transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-white mb-1">{edu.degree}</h4>
                      <p className="text-blue-400 font-medium">{edu.institution}</p>
                    </div>
                    {edu.status && (
                      <span className="px-3 py-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full text-xs font-medium text-green-400 border border-green-500/30">
                        {edu.status}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{edu.duration}</span>
                    </div>
                    {edu.percentage && (
                      <div className="flex items-center gap-1">
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
              className="flex items-center gap-3 mb-8"
            >
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full">
                <Award size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white">Certifications</h3>
            </motion.div>

            <div className="grid gap-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass p-4 rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center gap-4"
                  whileHover={{ scale: 1.02, x: 10 }}
                >
                  <div className="text-2xl">{cert.icon}</div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold">{cert.name}</h4>
                    <p className="text-gray-400 text-sm">{cert.provider}</p>
                  </div>
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
                </motion.div>
              ))}
            </div>

            {/* Additional Skills Summary */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8 glass p-6 rounded-xl"
            >
              <h4 className="text-lg font-bold text-white mb-4">Key Competencies</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-blue-400 font-medium mb-2">Development</p>
                  <ul className="text-gray-300 space-y-1">
                    <li>• Full-Stack Development</li>
                    <li>• Responsive UI Design</li>
                    <li>• REST API Development</li>
                  </ul>
                </div>
                <div>
                  <p className="text-purple-400 font-medium mb-2">AI & Data</p>
                  <ul className="text-gray-300 space-y-1">
                    <li>• Machine Learning</li>
                    <li>• Data Preprocessing</li>
                    <li>• Model Training</li>
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
