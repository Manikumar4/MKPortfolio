"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { usePortfolioStore } from "@/lib/store"

export default function CustomCursor() {
  const { mousePosition, isInteracting, setMousePosition, setInteracting } = usePortfolioStore()

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = () => setInteracting(true)
    const handleMouseLeave = () => setInteracting(false)

    // Add event listeners for interactive elements
    const updateInteractiveElements = () => {
      const interactiveElements = document.querySelectorAll("a, button, .interactive, [role='button']")
      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter)
        el.addEventListener("mouseleave", handleMouseLeave)
      })
    }

    updateInteractiveElements()

    // Re-run when DOM changes
    const observer = new MutationObserver(updateInteractiveElements)
    observer.observe(document.body, { childList: true, subtree: true })

    window.addEventListener("mousemove", updateMousePosition)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      observer.disconnect()
    }
  }, [setMousePosition, setInteracting])

  return (
    <>
      <motion.div
        className="custom-cursor hidden md:block"
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10,
          scale: isInteracting ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      <motion.div
        className="custom-cursor-follower hidden md:block"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isInteracting ? 1.2 : 1,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
      />
    </>
  )
}
