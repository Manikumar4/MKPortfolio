"use client"

import type React from "react"

import { useEffect, Suspense } from "react"
import { motion } from "framer-motion"
import { usePortfolioStore } from "@/lib/store"
import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import Experience from "@/components/experience"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Education from "@/components/education"
import Contact from "@/components/contact"
import dynamic from "next/dynamic"
const WebGLBackground = dynamic(() => import("@/components/webgl-background"), { ssr: false })
const AdvancedParticles = dynamic(() => import("@/components/advanced-particles"), { ssr: false })
const CustomCursor = dynamic(() => import("@/components/custom-cursor"), { ssr: false })
import { Mail, Linkedin, Github, Sparkles, Heart } from "lucide-react"

// Error Boundary Component
function ErrorBoundary({ children }: { children: React.ReactNode }) {
  const { hasError, setError } = usePortfolioStore()

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
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
      <div className="min-h-screen flex items-center justify-center animated-bg">
        <div className="text-center glass-vibrant p-8 rounded-2xl max-w-md">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}>
            <h1 className="text-3xl font-bold gradient-text-neon mb-4">Oops! Something went wrong</h1>
            <p className="text-gray-300 mb-6">Don't worry, let's get you back on track!</p>
            <motion.button
              onClick={() => window.location.reload()}
              className="px-8 py-4 animated-bg rounded-full font-bold hover-lift"
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
      <main className="min-h-screen relative">
        {/* WebGL Background */}
        <WebGLBackground />

        {/* Advanced Particle System */}
        <AdvancedParticles />

        {/* Custom Cursor */}
        <CustomCursor />

        <Suspense fallback={<LoadingScreen />}>
          <Navigation />
          <div className="relative z-10">
            <Hero />
            <AboutSection />
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
      className="fixed inset-0 animated-bg z-50 flex items-center justify-center"
    >
      <div className="text-center">
        <motion.div className="relative mb-8">
          <motion.div
            className="w-32 h-32 border-4 border-white/20 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-4 border-4 border-transparent border-t-cyan-400 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-8 border-4 border-transparent border-t-pink-400 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-6"
        >
          <motion.h1
            className="text-5xl font-bold gradient-text-neon flex items-center justify-center gap-3"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <Sparkles className="animate-pulse" />
            Mani Kumar M K
            <Sparkles className="animate-pulse" />
          </motion.h1>

          <motion.p
            className="text-2xl text-gray-300"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            Crafting Digital Experiences...
          </motion.p>

          <div className="flex justify-center gap-3 mt-6">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="w-4 h-4 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
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

function AboutSection() {
  const { setCurrentSection } = usePortfolioStore()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCurrentSection("about")
        }
      },
      { threshold: 0.5, rootMargin: "0px 0px -10% 0px" },
    )

    const aboutElement = document.getElementById("about")
    if (aboutElement) observer.observe(aboutElement)

    return () => observer.disconnect()
  }, [setCurrentSection])

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-3xl float" />
        <div
          className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 rounded-full blur-3xl float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
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

          <h2 className="text-5xl md:text-6xl font-bold mb-12">
            About <span className="gradient-text-neon">Me</span>
          </h2>

          <motion.div
            className="glass-vibrant p-10 rounded-3xl interactive-card hover-lift card-3d"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="space-y-8 text-lg leading-relaxed">
              <motion.p
                className="text-gray-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
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
                whileInView={{ opacity: 1, y: 0 }}
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
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                I'm driven to contribute to{" "}
                <span className="gradient-text-neon font-bold">
                  impactful, scalable, and high-performance software solutions
                </span>{" "}
                while continuously learning and applying modern development technologies.
                <span className="gradient-text font-bold"> Let's build something extraordinary together!</span>
              </motion.p>
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
  )
}

function Footer() {
  return (
    <footer className="py-16 border-t border-white/20 relative overflow-hidden">
      <div className="absolute inset-0 aurora-bg opacity-5" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <motion.div
            className="text-center md:text-left mb-6 md:mb-0"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="text-3xl font-bold gradient-text-neon mb-2 flex items-center gap-2">
              <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
                <Sparkles className="animate-pulse" />
              </motion.div>
              Mani Kumar M K
            </h3>
            <p className="text-xl text-gray-300">Full Stack Developer & AI Engineer</p>
            <p className="text-gray-400 mt-2">Building the future, one line of code at a time</p>
          </motion.div>

          <div className="flex items-center gap-6">
            {[
              { href: "mailto:mkmanikumar.ks@gmail.com", icon: Mail, color: "hover:text-pink-400", label: "Email" },
              {
                href: "https://linkedin.com/in/manikumar-mk-246ba02a0",
                icon: Linkedin,
                color: "hover:text-blue-400",
                label: "LinkedIn",
              },
              { href: "https://github.com/Manikumar4", icon: Github, color: "hover:text-purple-400", label: "GitHub" },
            ].map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`interactive p-4 glass-vibrant rounded-full text-gray-400 transition-all duration-300 ${link.color} hover-lift`}
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
          className="pt-8 border-t border-white/20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <p className="text-gray-400 flex items-center justify-center gap-2 flex-wrap">
            © 2025 <span className="gradient-text-neon">Mani Kumar M K</span>
            <span className="gradient-text-aurora">All rights reserved.</span>
          </p>
          <motion.p
            className="text-gray-500 text-sm mt-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          >
            "The future belongs to those who believe in the beauty of their dreams." ✨
          </motion.p>
        </motion.div>
      </div>
    </footer>
  )
}
