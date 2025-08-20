import React, { useState, useEffect, useRef, memo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePortfolioStore } from "../lib/store"
import { Menu, X, Sun, Moon } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import '../styles/Navigation.css'

const navItems = [
  { id: "hero", label: "Home", href: "/" },
  { id: "about", label: "About",  href: "/about" },
  { id: "experience", label: "Experience", href: "/experience" },
  { id: "skills", label: "Skills", href: "/skills" },
  { id: "projects", label: "Projects",href: "/projects" },
  { id: "education", label: "Education",  href: "/education" },
  { id: "contact", label: "Contact", href: "/contact" },
]

// Debounce utility
function debounce(fn, delay) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hoveredNav, setHoveredNav] = useState(null)
  const { currentSection, theme, toggleTheme, setCurrentSection } = usePortfolioStore()
  const location = useLocation()
  const observerRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  // Update current section based on pathname
  useEffect(() => {
    const currentItem = navItems.find(item => item.href === location.pathname)
    if (currentItem) {
      setCurrentSection(currentItem.id)
    }
  }, [location.pathname, setCurrentSection])

  useEffect(() => {
    const sectionIds = navItems.map(item => item.id)
    const handleIntersect = debounce((entries) => {
      const visibleSections = entries.filter(entry => entry.isIntersecting)
      if (visibleSections.length > 0) {
        const topSection = visibleSections.reduce((prev, curr) =>
          prev.boundingClientRect.top < curr.boundingClientRect.top ? prev : curr
        )
        setCurrentSection(topSection.target.id)
      }
    }, 80)
    const observer = new window.IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '0px 0px -60% 0px',
      threshold: 0.3
    })
    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    observerRef.current = observer
    return () => {
      observer.disconnect()
    }
  }, [setCurrentSection])

  const scrollToSection = (sectionId, href) => {
    if (href === "/" && location.pathname === "/") {
      // If we're on home page and clicking home, scroll to hero
      const element = document.getElementById("hero")
      if (element) {
        element.scrollIntoView({ behavior: "auto" })
      }
    }
    setCurrentSection(sectionId)
    setIsOpen(false)
  }

  const isActive = (href) => {
    if (href === "/" && location.pathname === "/") return true
    return location.pathname === href
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`nav-container ${scrolled ? 'scrolled' : ''}`}
    >
      <div className="nav-content">
        <div className="nav-inner">
          <Link to="/" onClick={() => scrollToSection("hero", "/")}>
            <motion.div whileHover={{ scale: 1.08, rotate: 5 }} className="nav-logo-container">
             <div className="nav-logo-wrapper">
                  {/* Central star */}
                  <p className="nav-logo-star">✨</p>
                  
                  
                  {/* Glow effect */}
                  <div className="nav-logo-glow"></div>
                </div>
                <span className="nav-logo-text gradient-text-neon">MK</span>
            

            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="nav-desktop">
            {navItems.map((item, index) => (
              <NavItem
                key={item.id}
                item={item}
                index={index}
                active={currentSection === item.id}
                isHovered={hoveredNav === item.id}
                scrollToSection={scrollToSection}
                setHoveredNav={setHoveredNav}
              />
            ))}

            <motion.button
              onClick={toggleTheme}
              className="nav-theme-button interactive"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            >
              <AnimatePresence mode="wait">
                {theme === "dark" ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Sun size={20} className="icon-yellow" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Moon size={20} className="icon-blue" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="nav-mobile-button">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="nav-theme-button interactive"
              whileTap={{ scale: 0.95 }}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="nav-mobile-container"
            data-open={isOpen}
          >
            <div className="nav-mobile-content">
              {navItems.map((item, index) => (
                <Link key={item.id} to={item.href}>
                  <motion.button
                    onClick={() => scrollToSection(item.id, item.href)}
                    className={`nav-mobile-item interactive group ${isActive(item.href) ? 'active' : ''}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10, scale: 1.05 }}
                    aria-label={`Navigate to ${item.label}`}
                  >
                    <span>{item.label}</span>
                  </motion.button>
                </Link>
              ))}

              <motion.button
                onClick={toggleTheme}
                className="nav-mobile-theme interactive"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                whileHover={{ x: 10, scale: 1.02 }}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              >
                {theme === "dark" ? (
                  <>
                    <Sun size={20} className="icon-yellow" />
                    Light Mode
                  </>
                ) : (
                  <>
                    <Moon size={20} className="icon-blue" />
                    Dark Mode
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

// Memoized nav item
const NavItem = memo(({ item, index, active, isHovered, scrollToSection, setHoveredNav }) => {
  const { label, id, href } = item;
  return (
    <Link key={id} to={href}>
      <motion.button
        onClick={() => scrollToSection(id, href)}
        className={`nav-item-button interactive group ${active ? 'active' : ''}`}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.07 }}
        aria-label={`Navigate to ${label}`}
        onMouseEnter={() => setHoveredNav(id)}
        onMouseLeave={() => setHoveredNav(null)}
      >
        <span className="nav-item-label">
          {label}
          {(active || isHovered) && (
            <motion.div
              key={active ? 'active' : 'hover'}
              className="nav-item-underline"
              initial={{ width: 0, opacity: 0.5 }}
              animate={{ width: '100%', opacity: 1 }}
              exit={{ width: 0, opacity: 0.5 }}
              transition={{ type: 'spring', stiffness: 600, damping: 24 }}
            />
          )}
        </span>
      </motion.button>
    </Link>
  );
});