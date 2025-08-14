"use client"

import React, { useState, useEffect, useRef, memo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePortfolioStore } from "@/lib/store"
import { Menu, X, Sun, Moon, Sparkles, Home, User, Briefcase, Zap, Rocket, GraduationCap, Mail, LucideIcon } from "lucide-react"
import type { ComponentType } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface NavItem {
  id: string;
  label: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  href: string;
}

const navItems: NavItem[] = [
  { id: "hero", label: "Home", icon: Home, href: "/" },
  { id: "about", label: "About", icon: User, href: "/about" },
  { id: "experience", label: "Experience", icon: Briefcase, href: "/experience" },
  { id: "skills", label: "Skills", icon: Zap, href: "/skills" },
  { id: "projects", label: "Projects", icon: Rocket, href: "/projects" },
  { id: "education", label: "Education", icon: GraduationCap, href: "/education" },
  { id: "contact", label: "Contact", icon: Mail, href: "/contact" },
]

// Debounce utility
function debounce(fn: (...args: any[]) => void, delay: number) {
  let timer: NodeJS.Timeout
  return (...args: any[]) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hoveredNav, setHoveredNav] = useState<string | null>(null)
  const { currentSection, theme, toggleTheme, setCurrentSection } = usePortfolioStore()
  const pathname = usePathname()
  const observerRef = useRef<IntersectionObserver | null>(null)

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
  }, [pathname])

  // Update current section based on pathname
  useEffect(() => {
    const currentItem = navItems.find(item => item.href === pathname)
    if (currentItem) {
      setCurrentSection(currentItem.id)
    }
  }, [pathname, setCurrentSection])

  useEffect(() => {
    const sectionIds = navItems.map(item => item.id)
    const handleIntersect = debounce((entries: IntersectionObserverEntry[]) => {
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

  const scrollToSection = (sectionId: string, href: string) => {
    if (href === "/" && pathname === "/") {
      // If we're on home page and clicking home, scroll to hero
      const element = document.getElementById("hero")
      if (element) {
        element.scrollIntoView({ behavior: "auto" })
      }
    }
    setCurrentSection(sectionId)
    setIsOpen(false)
  }

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true
    return pathname === href
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white/5 backdrop-blur-lg border border-white/10 py-1 rounded-lg`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          <Link href="/" prefetch={true} onClick={() => scrollToSection("hero", "/")}> 
            <motion.div whileHover={{ scale: 1.08, rotate: 5 }} className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <div className="w-10 h-10 rounded-full animated-bg flex items-center justify-center morphing">
                  <Sparkles className="text-white" size={20} />
                </div>
                <div className="absolute inset-0 w-10 h-10 rounded-full animated-bg opacity-30 blur-md" />
              </div>
              <span className="text-xl font-bold gradient-text-neon">MK</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item, index) => (
              <NavItem
                key={item.id}
                item={item}
                index={index}
                active={currentSection === item.id}
                isHovered={hoveredNav === item.id}
                scrollToSection={scrollToSection}
                setHoveredNav={setHoveredNav}
                prefetch={true}
              />
            ))}

            <motion.button
              onClick={toggleTheme}
              className="interactive p-3 rounded-full glass-vibrant hover:bg-white/20 transition-all duration-300 ml-4 relative overflow-hidden min-h-[44px] min-w-[44px]"
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
                    <Sun size={20} className="text-yellow-400" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Moon size={20} className="text-blue-400" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="interactive p-3 rounded-full glass-vibrant min-h-[44px] min-w-[44px]"
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
            className="md:hidden glass-vibrant backdrop-blur-xl"
          >
            <div className="px-4 pt-4 pb-6 grid grid-cols-2 gap-3">
              {navItems.map((item, index) => (
                <Link key={item.id} href={item.href} prefetch={true}>
                  <motion.button
                    onClick={() => scrollToSection(item.id, item.href)}
                    className={`interactive flex items-center gap-3 w-full text-left px-4 py-3 text-base font-semibold rounded-xl transition-all duration-300 min-h-[48px] backdrop-blur-md bg-white/10 ${
                      isActive(item.href)
                        ? "bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-500 text-white shadow-lg scale-105"
                        : "text-gray-300 hover:text-white hover:bg-white/20 hover:scale-105"
                    }`}
                    style={isActive(item.href) ? { boxShadow: '0 2px 16px 0 rgba(255,255,255,0.10)' } : {}}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10, scale: 1.05 }}
                    aria-label={`Navigate to ${item.label}`}
                  >
                    <span className="transition-colors duration-300" aria-hidden="true">{typeof item.icon === 'function' ? (
                      React.createElement(item.icon, { size: 22, className: isActive(item.href) ? 'text-yellow-500' : 'text-gray-400 group-hover:text-yellow-400' })
                    ) : null}</span>
                    <span>{item.label}</span>
                  </motion.button>
                </Link>
              ))}

              <motion.button
                onClick={toggleTheme}
                className="interactive w-full flex items-center gap-3 px-6 py-4 text-base font-medium rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 min-h-[44px]"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                whileHover={{ x: 10, scale: 1.02 }}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              >
                {theme === "dark" ? (
                  <>
                    <Sun size={20} className="text-yellow-400" />
                    Light Mode
                  </>
                ) : (
                  <>
                    <Moon size={20} className="text-blue-400" />
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
interface NavItemProps {
  item: {
    id: string;
    label: string;
    icon: ComponentType<{ size?: number; className?: string }>;
    href: string;
  };
  index: number;
  active: boolean;
  isHovered: boolean;
  scrollToSection: (id: string, href: string) => void;
  setHoveredNav: (id: string | null) => void;
  prefetch?: boolean;
}

const NavItem = memo(({ item, index, active, isHovered, scrollToSection, setHoveredNav, prefetch }: NavItemProps) => {
  const { icon: Icon, label, id, href } = item;
  return (
    <Link key={id} href={href} prefetch={prefetch}>
      <motion.button
        onClick={() => scrollToSection(id, href)}
        className={`interactive relative flex items-center gap-2 px-4 py-1.5 text-base font-semibold tracking-wide transition-all duration-200 rounded-lg min-h-[36px] min-w-[36px] font-sans ${
          active ? "text-white" : "text-gray-200"
        }`}
        style={{ letterSpacing: '0.04em', background: 'transparent' }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.07 }}
        aria-label={`Navigate to ${label}`}
        onMouseEnter={() => setHoveredNav(id)}
        onMouseLeave={() => setHoveredNav(null)}
      >
        <span className="mr-1 transition-colors duration-300" aria-hidden="true">
          {typeof Icon === 'function' ? (
            <Icon size={20} className={active || isHovered ? "text-pink-400" : "text-gray-400 group-hover:text-pink-400"} />
          ) : null}
        </span>
        <span className="relative flex flex-col items-center">
          {label}
          {(active || isHovered) && (
            <motion.div
              key={active ? 'active' : 'hover'}
              className="absolute left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-500 shadow-lg"
              style={{ bottom: '-2px' }}
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