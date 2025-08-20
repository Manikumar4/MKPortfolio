import { useEffect } from "react"
import { motion } from "framer-motion"
import { usePortfolioStore } from "../lib/store"
import "../styles/About.css"

export default function About() {

  const { setCurrentSection } = usePortfolioStore()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCurrentSection("about")
        }
      },
      { threshold: 0.3 },
    )

    const aboutElement = document.getElementById("about")
    if (aboutElement) observer.observe(aboutElement)

    return () => observer.disconnect()
  }, [setCurrentSection])
  return (
    <div id="about" className="about-container">
      {/* Background decorations */}
      <div className="about-background">
        <div className="absolute float rounded-full blur-3xl"
          style={{
            top: '5rem',
            left: '5rem',
            width: '16rem',
            height: '16rem',
            background: 'linear-gradient(to right, rgba(236, 72, 153, 0.1), rgba(168, 85, 247, 0.1))'
          }} />
        <div
          className="absolute float rounded-full blur-3xl"
          style={{
            bottom: '5rem',
            right: '5rem',
            width: '20rem',
            height: '20rem',
            background: 'linear-gradient(to right, rgba(6, 182, 212, 0.1), rgba(16, 185, 129, 0.1))',
            animationDelay: '2s'
          }}
        />
      </div>

      <div className="about-content">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="about-text-center"
        >
          <motion.div
            className="about-intro-container"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="glass-vibrant px-6 py-4 rounded-full">
              <span className="about-intro-text">👨‍💻 Get to know me</span>
            </div>
          </motion.div>

          <h1 className="about-title">
            About <span className="gradient-text-neon">Me</span>
          </h1>

          <motion.div
            className="about-card about-card-3d"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="about-text-content">
              <motion.p
                className="about-paragraph"
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
                className="about-paragraph"
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
                className="about-paragraph"
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
                    className="about-stats-grid"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <div className="glass about-stat-card">
                      <div className="about-stat-emoji">🎓</div>
                      <h3 className="about-stat-heading">Education</h3>
                      <p className="about-stat-description">Computer Science Engineering Student</p>
                    </div>
                    <div className="glass about-stat-card">
                      <div className="about-stat-emoji">💼</div>
                      <h3 className="about-stat-heading">Experience</h3>
                      <p className="about-stat-description">3 Professional Internships</p>
                    </div>
                    <div className="glass about-stat-card">
                      <div className="about-stat-emoji">🚀</div>
                      <h3 className="about-stat-heading">Focus</h3>
                      <p className="about-stat-description">Full Stack & AI Development</p>
                    </div>
                  </motion.div>
            </div>

            <motion.div
              className="about-emoji-container"
              whileHover={{ scale: 1.2, rotate: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="about-emoji">🚀</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}