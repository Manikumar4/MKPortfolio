"use client"

import type React from "react"
import { useEffect } from "react"
import { motion } from "framer-motion"
import { usePortfolioStore } from "@/lib/store"
import Navigation from "@/components/navigation"
import dynamic from "next/dynamic"
const WebGLBackground = dynamic(() => import("@/components/webgl-background"), { ssr: false })
const AdvancedParticles = dynamic(() => import("@/components/advanced-particles"), { ssr: false })
const CustomCursor = dynamic(() => import("@/components/custom-cursor"), { ssr: false })
import { Sparkles, Heart, Code, Brain, Rocket } from "lucide-react"

const floatingElements = [
  { icon: Sparkles, color: "text-pink-400", delay: 0 },
  { icon: Code, color: "text-cyan-400", delay: 1 },
  { icon: Brain, color: "text-emerald-400", delay: 2 },
  { icon: Rocket, color: "text-orange-400", delay: 3 },
]

export default function AboutPage() {
  const { setCurrentSection } = usePortfolioStore()

  useEffect(() => {
    setCurrentSection("about")
  }, [setCurrentSection])

  return (
    <main className="min-h-screen relative">
      {/* WebGL Background */}
      <WebGLBackground />

      {/* Advanced Particle System */}
      <AdvancedParticles />

      {/* Custom Cursor */}
      <CustomCursor />

      <Navigation />

      <div className="relative z-10 pt-20">
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-3xl float" />
            <div
              className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 rounded-full blur-3xl float"
              style={{ animationDelay: "2s" }}
            />
          </div>

          {/* Floating decorative elements */}
          {floatingElements.map((element, index) => (
            <motion.div
              key={index}
              className={`absolute ${element.color} opacity-30`}
              style={{
                top: `${20 + index * 15}%`,
                left: `${10 + index * 20}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 180, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4 + index,
                repeat: Number.POSITIVE_INFINITY,
                delay: element.delay,
              }}
            >
              <element.icon size={24 + index * 4} />
            </motion.div>
          ))}

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <motion.div
                className="inline-block mb-8"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="glass-vibrant px-8 py-4 rounded-full">
                  <span className="gradient-text-aurora font-semibold text-lg">👨‍💻 Get to know me</span>
                </div>
              </motion.div>

              <h1 className="text-5xl md:text-6xl font-bold mb-12">
                About <span className="gradient-text-neon">Me</span>
              </h1>

              <motion.div
                className="glass-vibrant p-10 rounded-3xl interactive-card hover-lift card-3d"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="space-y-8 text-lg leading-relaxed">
                  <motion.p
                    className="text-gray-200"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    I'm a{" "}
                    <span className="gradient-text-aurora font-bold">final-year Computer Science Engineering student</span>{" "}
                    with an insatiable passion for creating innovative solutions through technology. My journey spans across{" "}
                    <span className="gradient-text-neon font-bold">three transformative internships</span>, where I've honed
                    my expertise in both full-stack web development and cutting-edge artificial intelligence applications.
                  </motion.p>

                  <motion.p
                    className="text-gray-200"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    My adventure includes architecting and deploying complete web applications using the{" "}
                    <span className="gradient-text font-bold">MERN stack</span>, developing sophisticated machine learning
                    models for real-world challenges, and exploring the fascinating realm of AI technologies. I'm
                    particularly captivated by the{" "}
                    <span className="gradient-text-aurora font-bold">
                      intersection of web development and artificial intelligence
                    </span>
                    .
                  </motion.p>

                  <motion.p
                    className="text-gray-200"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    I'm driven to contribute to{" "}
                    <span className="gradient-text-neon font-bold">
                      impactful, scalable, and high-performance software solutions
                    </span>{" "}
                    while continuously learning and applying modern development technologies.
                    <span className="gradient-text font-bold"> Let's build something extraordinary together!</span>
                  </motion.p>

                  <motion.div
                    className="grid md:grid-cols-3 gap-6 mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <div className="glass p-6 rounded-xl text-center">
                      <div className="text-3xl mb-3">🎓</div>
                      <h3 className="font-bold text-white mb-2">Education</h3>
                      <p className="text-gray-300 text-sm">Computer Science Engineering Student</p>
                    </div>
                    <div className="glass p-6 rounded-xl text-center">
                      <div className="text-3xl mb-3">💼</div>
                      <h3 className="font-bold text-white mb-2">Experience</h3>
                      <p className="text-gray-300 text-sm">3 Professional Internships</p>
                    </div>
                    <div className="glass p-6 rounded-xl text-center">
                      <div className="text-3xl mb-3">🚀</div>
                      <h3 className="font-bold text-white mb-2">Focus</h3>
                      <p className="text-gray-300 text-sm">Full Stack & AI Development</p>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  className="mt-8 flex justify-center"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-6xl">🚀</div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  )
}