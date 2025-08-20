import { useState, useEffect} from "react"
import { motion} from "framer-motion"
import {
  Star,
  Sparkles,
  Gem,
  Gift,
  ShoppingBag,
  Award,
  Target,
  Compass,
  Lightbulb,
  Rocket,
  Music,
  Camera,
  Video,
  Headphones,
  Gamepad2,
  Coffee,
  Palette,
  Code,
  Globe,
  Wifi,
  Battery,
  Volume2,
  Sun,
  Moon,
  Cloud,
  Umbrella,
  Snowflake,
} from "lucide-react"
import "./InteractiveElements.css"

const iconsList = [
  Gem,
  Star,
  Sparkles,
  Gift,
  ShoppingBag,
  Award,
  Target,
  Compass,
  Lightbulb,
  Rocket,
  Music,
  Camera,
  Video,
  Headphones,
  Gamepad2,
  Coffee,
  Palette,
  Code,
  Globe,
  Wifi,
  Battery,
  Volume2,
  Sun,
  Moon,
  Cloud,
  Umbrella,
  Snowflake,
]

const InteractiveElements = () => {
  const [particles, setParticles] = useState([])
  const [floatingIcons, setFloatingIcons] = useState([])

  useEffect(() => {
    
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 6 + 2,
      speedX: (Math.random() - 0.5) * 2,
      speedY: (Math.random() - 0.5) * 2,
      opacity: Math.random() * 0.8 + 0.2,
      color: [
        "#667eea",
        "#764ba2",
        "#f093fb",
        "#f5576c",
        "#4facfe",
        "#43e97b",
        "#38f9d7",
        "#ffd700",
        "#ff6b6b",
        "#4ecdc4",
      ][Math.floor(Math.random() * 10)],
      life: Math.random() * 100,
      maxLife: 100,
    }))
    setParticles(newParticles)

    const newFloatingIcons = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      Icon: iconsList[Math.floor(Math.random() * iconsList.length)],
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 2,
      scale: Math.random() * 0.5 + 0.5,
      opacity: Math.random() * 0.3 + 0.1,
      floatSpeed: Math.random() * 0.5 + 0.2,
      floatDirection: Math.random() * Math.PI * 2,
    }))
    setFloatingIcons(newFloatingIcons)
  }, [])


  useEffect(() => {
    const animateParticles = () => {
      setParticles((prevParticles) =>
        prevParticles.map((particle) => {
          let newX = particle.x + particle.speedX
          let newY = particle.y + particle.speedY
          const newLife = particle.life - 0.5

          if (newX <= 0 || newX >= window.innerWidth) {
            particle.speedX *= -1
            newX = Math.max(0, Math.min(window.innerWidth, newX))
          }
          if (newY <= 0 || newY >= window.innerHeight) {
            particle.speedY *= -1
            newY = Math.max(0, Math.min(window.innerHeight, newY))
          }

          if (newLife <= 0) {
            return {
              ...particle,
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              life: particle.maxLife,
              opacity: Math.random() * 0.8 + 0.2,
            }
          }

          return {
            ...particle,
            x: newX,
            y: newY,
            life: newLife,
            opacity: (newLife / particle.maxLife) * 0.8 + 0.2,
          }
        }),
      )
    }

    const interval = setInterval(animateParticles, 50)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const animateIcons = () => {
      setFloatingIcons((prevIcons) =>
        prevIcons.map((icon) => ({
          ...icon,
          x: icon.x + Math.cos(icon.floatDirection) * icon.floatSpeed,
          y: icon.y + Math.sin(icon.floatDirection) * icon.floatSpeed,
          rotation: icon.rotation + icon.rotationSpeed,
          floatDirection: icon.floatDirection + 0.01,
        })),
      )
    }

    const interval = setInterval(animateIcons, 100)
    return () => clearInterval(interval)
  }, [])


  return (
    <>
    

      {}
      <div className="floating-particles-container">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="floating-particle"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              opacity: particle.opacity,
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {}
      <div className="floating-icons-container">
        {floatingIcons.map(({ id, Icon, x, y, rotation, scale, opacity }) => (
          <motion.div
            key={id}
            className="floating-icon"
            style={{
              left: x,
              top: y,
              transform: `rotate(${rotation}deg) scale(${scale})`,
              opacity,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [rotation, rotation + 360],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <Icon size={24} />
          </motion.div>
        ))}
      </div>

      {}


    </>
  )
}

export default InteractiveElements