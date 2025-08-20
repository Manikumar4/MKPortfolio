import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { usePortfolioStore } from "../lib/store"
import { Mail, MapPin, Send, Github, Linkedin } from "lucide-react"
import '../styles/Contact.css'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { setCurrentSection } = usePortfolioStore()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCurrentSection("contact")
        }
      },
      { threshold: 0.3 },
    )

    const contactElement = document.getElementById("contact")
    if (contactElement) observer.observe(contactElement)

    return () => observer.disconnect()
  }, [setCurrentSection])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    alert("Thank you for your message! I'll get back to you soon.")
    setFormData({ name: "", email: "", message: "" })
    setIsSubmitting(false)
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="contact-header"
        >
          <motion.div
            className="about-intro-container"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="glass-vibrant px-6 py-4 rounded-full">
              <span className="about-intro-text">📧 Let's Connect</span>
            </div>
          </motion.div>
          <h2 className="contact-title">
            Get In <span className="contact-title-highlight">Touch</span>
          </h2>
          <p className="contact-subtitle">
            Let's connect and discuss opportunities to work together
          </p>
        </motion.div>

        <div ref={ref} className="contact-content">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="contact-info"
          >
            <div>
              <h3 className="contact-info-title">Contact Information</h3>
              <div className="contact-info-list">
                <motion.a
                  href="mailto:mkmanikumar.ks@gmail.com"
                  className="contact-info-item"
                  whileHover={{ scale: 1.02, x: 10 }}
                  aria-label="Send email to mkmanikumar.ks@gmail.com"
                >
                  <div className="contact-info-item-icon"
                    style={{ background: 'linear-gradient(to right, #3b82f6, #8b5cf6)' }}>
                    <Mail size={20} />
                  </div>
                  <div className="contact-info-item-content">
                    <p className="contact-info-item-label">Email</p>
                    <p className="contact-info-item-value">mkmanikumar.ks@gmail.com</p>
                  </div>
                </motion.a>

                <motion.div
                  className="contact-info-item"
                  whileHover={{ scale: 1.02, x: 10 }}
                >
                  <div className="contact-info-item-icon"
                    style={{ background: 'linear-gradient(to right, #8b5cf6, #ec4899)' }}>
                    <MapPin size={20} />
                  </div>
                  <div className="contact-info-item-content">
                    <p className="contact-info-item-label">Location</p>
                    <p className="contact-info-item-value">Nagercoil, India 629004</p>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="contact-social">
              <h4 className="contact-social-title">Connect With Me</h4>
              <div className="contact-social-links">
                <motion.a
                  href="https://linkedin.com/in/manikumar-mk-246ba02a0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social-link"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Visit LinkedIn profile"
                >
                  <Linkedin size={24} />
                </motion.a>
                <motion.a
                  href="https://github.com/Manikumar4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social-link"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Visit GitHub profile"
                >
                  <Github size={24} />
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="contact-form">
              <h3 className="contact-form-title">Send a Message</h3>

              <div className="contact-form-group">
                <label htmlFor="name" className="contact-form-label">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="contact-form-input"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    focusRingColor: 'rgba(59, 130, 246, 0.2)'
                  }}
                  placeholder="Your name"
                />
              </div>

              <div className="contact-form-group">
                <label htmlFor="email" className="contact-form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="contact-form-input"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    focusRingColor: 'rgba(59, 130, 246, 0.2)'
                  }}
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="contact-form-group">
                <label htmlFor="message" className="contact-form-label">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="contact-form-textarea"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    focusRingColor: 'rgba(59, 130, 246, 0.2)'
                  }}
                  placeholder="Tell me about your project or opportunity..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="contact-form-submit"
                style={{
                  background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
                  boxShadow: '0 0 20px rgba(59, 130, 246, 0.25)'
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="contact-form-spinner" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}