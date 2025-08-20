import React, { useEffect, Suspense } from "react"
import { motion } from "framer-motion"
import { usePortfolioStore } from "../lib/store"
import Hero from "../components/Hero"
import Experience from "./Experience"
import Skills from "./Skills"
import Projects from "./Projects"
import Education from "./Education"
import Contact from "./Contact"
import { Mail, Linkedin, Github, Sparkles, Heart } from "lucide-react"
import About from "./About"
import "./home.css"

// Error Boundary Component
function ErrorBoundary({ children }) {
  const { hasError, setError } = usePortfolioStore()

  useEffect(() => {
    const handleError = (event) => {
      console.warn("Non-critical error caught:", event.error)
      if (event.error?.message?.includes("ChunkLoadError")) {
        window.location.reload()
      }
    }

    window.addEventListener("error", handleError)
    return () => window.removeEventListener("error", handleError)
  }, [setError])

  if (hasError) {
    return (
      <div className="error-container">
        <div className="error-card">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}>
            <h1 className="error-title">Oops! Something went wrong</h1>
            <p className="error-message">Don't worry, let's get you back on track!</p>
            <motion.button
              onClick={() => window.location.reload()}
              className="error-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🚀 Reload Universe
            </motion.button>
          </motion.div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

export default function Home() {
  return (
    <ErrorBoundary>
      <main className="home-container">
        <Suspense fallback={<LoadingScreen />}>
          <div className="home-content">
            <Hero />
            <About />
            <Experience />
            <Skills />
            <Projects />
            <Education />
            <Contact />
            <Footer />
          </div>
        </Suspense>
      </main>
    </ErrorBoundary>
  )
}

function LoadingScreen() {
  const { isLoading } = usePortfolioStore()

  if (!isLoading) return null

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="loading-overlay"
    >
      <div className="text-center">
        <motion.div className="loading-spinner-container">
          <motion.div
            className="loading-spinner-outer"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="loading-spinner-middle"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="loading-spinner-inner"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="loading-content"
        >
          <motion.h1
            className="loading-title"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="animate-pulse" />
            Mani Kumar M K
            <Sparkles className="animate-pulse" />
          </motion.h1>

          <motion.p
            className="loading-subtitle"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Crafting Digital Experiences...
          </motion.p>

          <div className="loading-dots-container">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="loading-dot"
                style={{ background: 'linear-gradient(to right, #22d3ee, #a855f7)' }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}



function Footer() {
  return (
    <footer className="footer-container">
        <div className="footer-background" />
        
        <div className="footer-content">
          <div className="footer-main">
            <motion.div
              className="footer-info"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="footer-name">
                <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 2, repeat: Infinity }}>
                  <Sparkles className="animate-pulse" />
                </motion.div>
                Mani Kumar M K
              </h3>
              <p className="footer-title">Full Stack Developer & AI Engineer</p>
              <p className="footer-description">Building the future, one line of code at a time</p>
            </motion.div>
  
            <div className="footer-social-container">
              {[
                { href: "mailto:mkmanikumar.ks@gmail.com", icon: Mail, label: "Email" },
                {
                  href: "https://linkedin.com/in/manikumar-mk-246ba02a0",
                  icon: Linkedin,
                  label: "LinkedIn",
                },
                { href: "https://github.com/Manikumar4", icon: Github, label: "GitHub" },
              ].map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="footer-social-link hover-lift"
                  whileHover={{ scale: 1.2, y: -5, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={link.label}
                >
                  <link.icon size={24} />
                </motion.a>
              ))}
            </div>
          </div>
  
          <motion.div
            className="footer-copyright-container"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <p className="footer-copyright">
              © 2025 <span className="footer-copyright-name">Mani Kumar M K</span>
              <span className="footer-copyright-text">All rights reserved.</span>
            </p>
            <motion.p
              className="footer-quote"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              "The future belongs to those who believe in the beauty of their dreams." ✨
            </motion.p>
          </motion.div>
        </div>
      </footer>
  )
}