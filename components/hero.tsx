"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, Github, Linkedin, Mail, Sparkles, Zap } from "lucide-react"
import { usePortfolioStore } from "@/lib/store"
import Link from "next/link"

const roles = [
  "Full Stack Developer",
  "AI Engineer",
  "Machine Learning Enthusiast",
  "Problem Solver",
  "Innovation Creator",
]

const floatingElements = [
  { icon: Sparkles, color: "text-pink-400", delay: 0 },
  { icon: Zap, color: "text-cyan-400", delay: 1 },
  { icon: Sparkles, color: "text-emerald-400", delay: 2 },
  { icon: Zap, color: "text-orange-400", delay: 3 },
]

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0)
  const { setCurrentSection } = usePortfolioStore()

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCurrentSection("hero")
        }
      },
      { threshold: 0.5 },
    )

    const heroElement = document.getElementById("hero")
    if (heroElement) observer.observe(heroElement)

    return () => observer.disconnect()
  }, [setCurrentSection])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 cosmic-bg rounded-full blur-3xl opacity-60 animate-pulse" />
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 animated-bg rounded-full blur-3xl opacity-60 animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl float" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-full blur-3xl float"
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

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <motion.div
            className="inline-block mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="glass-vibrant px-6 py-3 rounded-full">
              <span className="gradient-text-neon font-semibold">✨ Welcome to my digital universe</span>
            </div>
          </motion.div>

          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
          >
            Hi, I'm <span className="gradient-text-aurora neon-flicker">Mani Kumar</span>
          </motion.h1>

          <div className="h-20 flex items-center justify-center mb-6">
            <motion.h2
              key={currentRole}
              initial={{ y: 50, opacity: 0, rotateX: 90 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              exit={{ y: -50, opacity: 0, rotateX: -90 }}
              className="text-3xl md:text-4xl gradient-text font-light"
              transition={{ type: "spring", stiffness: 200 }}
            >
              {roles[currentRole]}
            </motion.h2>
          </div>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Crafting innovative solutions with{" "}
          <span className="gradient-text-neon font-semibold">modern technology</span> and{" "}
          <span className="gradient-text-aurora font-semibold">creative vision</span>
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-6 mb-12">
          {[
            { href: "mailto:mkmanikumar.ks@gmail.com", icon: Mail, label: "Email", color: "from-pink-500 to-rose-500" },
            {
              href: "https://linkedin.com/in/manikumar-mk-246ba02a0",
              icon: Linkedin,
              label: "LinkedIn",
              color: "from-blue-500 to-cyan-500",
            },
            {
              href: "https://github.com/Manikumar4",
              icon: Github,
              label: "GitHub",
              color: "from-purple-500 to-indigo-500",
            },
          ].map((link, index) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className={`interactive flex items-center gap-3 px-8 py-4 glass-vibrant rounded-full hover-lift hover-glow transition-all duration-300 bg-gradient-to-r ${link.color} min-h-[44px]`}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              aria-label={`Contact via ${link.label}`}
            >
              <link.icon size={20} />
              <span className="font-medium">{link.label}</span>
            </motion.a>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-6">
          <Link href="/projects">
            <motion.button
              className="interactive px-10 py-4 animated-bg rounded-full font-bold text-lg text-white shadow-2xl hover-lift min-h-[44px]"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              aria-label="View my projects"
            >
              🚀 Explore My Universe
            </motion.button>
          </Link>

          <Link href="/contact">
            <motion.button
              className="interactive px-10 py-4 glass-vibrant rounded-full font-bold text-lg hover-lift border-2 border-transparent hover:border-white/30 min-h-[44px]"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Get in touch"
            >
              💫 Let's Connect
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, 15, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <div className="flex flex-col items-center gap-2">
          <ChevronDown size={32} className="text-white" />
          <div className="w-1 h-8 bg-gradient-to-b from-white to-transparent rounded-full" />
        </div>
      </motion.div>
    </section>
  )
}
