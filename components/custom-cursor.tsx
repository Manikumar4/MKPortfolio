"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { usePortfolioStore } from "@/lib/store"

export default function CustomCursor() {
  const { isInteracting, setMousePosition, setInteracting } = usePortfolioStore()
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      // Direct DOM update for instant cursor
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX - 10}px`
        cursorRef.current.style.top = `${e.clientY - 10}px`
        cursorRef.current.style.transform = `scale(${isInteracting ? 1.18 : 1})`
      }
      if (followerRef.current) {
        followerRef.current.style.left = `${e.clientX - 20}px`
        followerRef.current.style.top = `${e.clientY - 20}px`
        followerRef.current.style.transform = `scale(${isInteracting ? 1.08 : 1})`
      }
      // Optionally update state for other logic
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = () => setInteracting(true)
    const handleMouseLeave = () => setInteracting(false)

    // Add event listeners for interactive elements (start interaction on mouseenter, not on cursor round overlap)
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
      <div
        ref={cursorRef}
        className="custom-cursor hidden md:block"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          transform: 'scale(1)',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      />
      <div
        ref={followerRef}
        className="custom-cursor-follower hidden md:block"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          transform: 'scale(1)',
          pointerEvents: 'none',
          zIndex: 9998,
        }}
      />
    </>
  )
}
