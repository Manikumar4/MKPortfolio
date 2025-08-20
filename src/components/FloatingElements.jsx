"use client"
import { motion } from "framer-motion"
import "./FloatingElements.css"

const FloatingElements = () => {
  const elements = [
    { id: 1, size: 60, delay: 0, duration: 8 },
    { id: 2, size: 40, delay: 2, duration: 10 },
    { id: 3, size: 80, delay: 4, duration: 12 },
    { id: 4, size: 30, delay: 1, duration: 9 },
    { id: 5, size: 50, delay: 3, duration: 11 },
  ]

  return (
    <div className="floating-elements">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="floating-element"
          style={{
            width: element.size,
            height: element.size,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: element.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: element.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

export default FloatingElements