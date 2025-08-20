import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, Github, Linkedin, Mail, Sparkles, Zap } from "lucide-react"
import { usePortfolioStore } from "../lib/store"
import { Link } from "react-router-dom"
import '../styles/Hero.css'

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
    <section id="hero" className="hero-section">
      {/* Enhanced animated background elements */}
      <div className="hero-background">
        <div className="hero-bg-element hero-bg-cosmic" />
        <div className="hero-bg-element hero-bg-animated" />
        <div className="hero-bg-element hero-bg-float-1" />
        <div className="hero-bg-element hero-bg-float-2" />
      </div>

      {/* Floating decorative elements */}
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          className={`hero-floating-element ${element.color} opacity-30`}
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
            repeat: Infinity,
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
        className="hero-content"
      >
        <motion.div variants={itemVariants} className="hero-badge-container">
          <motion.div
            className="hero-badge"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="glass-vibrant hero-badge-content">
              <span className="hero-badge-text gradient-text-neon">✨ Welcome to my digital universe</span>
            </div>
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
          >
            Hi, I'm <span className="hero-name gradient-text-aurora neon-flicker">Mani Kumar</span>
          </motion.h1>
  
          <div className="hero-role-container" style={{ height: '5rem' }}>
            <motion.h2
              key={currentRole}
              initial={{ y: 50, opacity: 0, rotateX: 90 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              exit={{ y: -50, opacity: 0, rotateX: -90 }}
              className="hero-role gradient-text"
              transition={{ type: "spring", stiffness: 200 }}
            >
              {roles[currentRole]}
            </motion.h2>
          </div>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="hero-description"
        >
          Crafting innovative solutions with{" "}
          <span className="hero-description-highlight gradient-text-neon">modern technology</span> and{" "}
          <span className="hero-description-highlight gradient-text-aurora">creative vision</span>
        </motion.p>

        <motion.div variants={itemVariants} className="hero-social-links">
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
              className={`interactive hero-social-link  hover-lift hover-glow ${link.color === "from-pink-500 to-rose-500" ? "pink" :
                link.color === "from-blue-500 to-cyan-500" ? "blue" : "purple"}`}
              style={{
                background: `linear-gradient(to right, ${link.color === "from-pink-500 to-rose-500" ? "#ec4899, #f43f5e" :
                  link.color === "from-blue-500 to-cyan-500" ? "#3b82f6, #06b6d4" : "#8b5cf6, #6366f1"})`
              }}
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

        <motion.div variants={itemVariants} className="hero-actions">
          <Link to="/projects">
            <motion.button
              className="interactive hero-action-btn hero-action-btn.primary animated-bg hover-lift"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              aria-label="View my projects"
            >
              🚀 Explore My Universe
            </motion.button>
          </Link>
  
          <Link to="/contact">
            <motion.button
              className="interactive hero-action-btn hero-action-btn.secondary  hover-lift"
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
        className="hero-scroll-indicator"
        style={{ bottom: '1rem' }}
        animate={{
          y: [0, 15, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="scroll-indicator-container">
          <ChevronDown size={28} className="hero-scroll-chevron text-white" />
          <div className="hero-scroll-line" />
        </div>
      </motion.div>
    </section>
  )
}