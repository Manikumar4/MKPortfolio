"use client"

import type React from "react"
import { useEffect } from "react"
import { motion } from "framer-motion"
import { usePortfolioStore } from "@/lib/store"
import Navigation from "@/components/navigation"
import Education from "@/components/education"
import dynamic from "next/dynamic"
const WebGLBackground = dynamic(() => import("@/components/webgl-background"), { ssr: false })
const AdvancedParticles = dynamic(() => import("@/components/advanced-particles"), { ssr: false })
const CustomCursor = dynamic(() => import("@/components/custom-cursor"), { ssr: false })

export default function EducationPage() {
  const { setCurrentSection } = usePortfolioStore()

  useEffect(() => {
    setCurrentSection("education")
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center py-12"
        >
          <motion.div
            className="inline-block mb-6"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="glass-vibrant px-8 py-4 rounded-full">
              <span className="gradient-text-aurora font-semibold text-lg">🎓 Academic Journey</span>
            </div>
          </motion.div>
        </motion.div>

        <Education />
      </div>
    </main>
  )
}