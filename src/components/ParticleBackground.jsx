"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

const ParticleBackground = () => {
  const canvasRef = useRef(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const particlesRef = useRef([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    let animationFrameId

    const resizeCanvas = () => {
      const { innerWidth, innerHeight } = window
      canvas.width = innerWidth
      canvas.height = innerHeight
      setDimensions({ width: innerWidth, height: innerHeight })

      particlesRef.current.forEach((particle) => {
        
        if (particle.x > innerWidth) particle.x = innerWidth * 0.9
        if (particle.y > innerHeight) particle.y = innerHeight * 0.9
        if (particle.x < 0) particle.x = innerWidth * 0.1
        if (particle.y < 0) particle.y = innerHeight * 0.1

        particle.baseX = Math.min(particle.baseX, innerWidth * 0.9)
        particle.baseY = Math.min(particle.baseY, innerHeight * 0.9)
      })
    }

    resizeCanvas()

    let resizeTimeout
    const debouncedResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(resizeCanvas, 100)
    }
    window.addEventListener("resize", debouncedResize)

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener("mousemove", handleMouseMove)

    class Particle {
      constructor(type = "default") {
        this.type = type
        this.reset()
        this.setupByType()
      }

      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.baseX = this.x
        this.baseY = this.y
        this.density = Math.random() * 30 + 1
        this.life = 1
        this.maxLife = Math.random() * 100 + 50
      }

      setupByType() {
        
        const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        const speedMultiplier = isMobile ? 0.3 : 1
        
        switch (this.type) {
          case "cosmic":
            this.size = Math.random() * 4 + 2
            this.speedX = (Math.random() * 0.3 - 0.15) * speedMultiplier
            this.speedY = (Math.random() * 0.3 - 0.15) * speedMultiplier
            this.color = this.getCosmicColor()
            this.pulseSpeed = Math.random() * 0.015 + 0.008
            this.pulse = 0
            break
          case "nebula":
            this.size = Math.random() * 8 + 4
            this.speedX = (Math.random() * 0.15 - 0.075) * speedMultiplier
            this.speedY = (Math.random() * 0.15 - 0.075) * speedMultiplier
            this.color = this.getNebulaColor()
            this.opacity = Math.random() * 0.3 + 0.1
            break
          case "star":
            this.size = Math.random() * 2 + 1
            this.speedX = (Math.random() * 0.2 - 0.1) * speedMultiplier
            this.speedY = (Math.random() * 0.2 - 0.1) * speedMultiplier
            this.color = this.getStarColor()
            this.twinkle = Math.random() * Math.PI * 2
            this.twinkleSpeed = Math.random() * 0.03 + 0.015
            break
          case "energy":
            this.size = Math.random() * 3 + 1
            this.speedX = (Math.random() * 0.6 - 0.3) * speedMultiplier
            this.speedY = (Math.random() * 0.6 - 0.3) * speedMultiplier
            this.color = this.getEnergyColor()
            this.trail = []
            this.trailLength = 5
            break
          default:
            this.size = Math.random() * 3 + 1
            this.speedX = (Math.random() * 1.2 - 0.6) * speedMultiplier
            this.speedY = (Math.random() * 1.2 - 0.6) * speedMultiplier
            this.color = this.getDefaultColor()
            this.opacity = Math.random() * 0.5 + 0.2
        }
      }

      getCosmicColor() {
        const colors = [
          `rgba(102, 126, 234, ${Math.random() * 0.8 + 0.2})`,
          `rgba(246, 211, 101, ${Math.random() * 0.8 + 0.2})`,
          `rgba(255, 154, 158, ${Math.random() * 0.8 + 0.2})`,
          `rgba(168, 237, 234, ${Math.random() * 0.8 + 0.2})`,
          `rgba(254, 207, 239, ${Math.random() * 0.8 + 0.2})`,
        ]
        return colors[Math.floor(Math.random() * colors.length)]
      }

      getNebulaColor() {
        const colors = [
          `rgba(120, 119, 198, ${Math.random() * 0.4 + 0.1})`,
          `rgba(255, 119, 198, ${Math.random() * 0.4 + 0.1})`,
          `rgba(120, 219, 255, ${Math.random() * 0.4 + 0.1})`,
        ]
        return colors[Math.floor(Math.random() * colors.length)]
      }

      getStarColor() {
        const colors = [
          `rgba(255, 255, 255, ${Math.random() * 0.9 + 0.1})`,
          `rgba(255, 248, 220, ${Math.random() * 0.9 + 0.1})`,
          `rgba(173, 216, 230, ${Math.random() * 0.9 + 0.1})`,
        ]
        return colors[Math.floor(Math.random() * colors.length)]
      }

      getEnergyColor() {
        const colors = [
          `rgba(0, 255, 255, ${Math.random() * 0.8 + 0.2})`,
          `rgba(255, 0, 255, ${Math.random() * 0.8 + 0.2})`,
          `rgba(255, 255, 0, ${Math.random() * 0.8 + 0.2})`,
        ]
        return colors[Math.floor(Math.random() * colors.length)]
      }

      getDefaultColor() {
        const colors = [
          `rgba(102, 126, 234, ${Math.random() * 0.6 + 0.2})`,
          `rgba(246, 211, 101, ${Math.random() * 0.6 + 0.2})`,
          `rgba(255, 154, 158, ${Math.random() * 0.6 + 0.2})`,
        ]
        return colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        
        const mouse = mouseRef.current
        const dx = mouse.x - this.x
        const dy = mouse.y - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance > 0 && distance < 150 && window.innerWidth > 768) {
          const forceDirectionX = dx / distance
          const forceDirectionY = dy / distance
          const maxDistance = 150
          const force = (maxDistance - distance) / maxDistance
          const directionX = forceDirectionX * force * this.density * 0.3
          const directionY = forceDirectionY * force * this.density * 0.3

          this.x -= directionX
          this.y -= directionY
        } else {
          
          if (this.x !== this.baseX) {
            const dx = this.x - this.baseX
            this.x -= dx / 15
          }
          if (this.y !== this.baseY) {
            const dy = this.y - this.baseY
            this.y -= dy / 15
          }
        }

        switch (this.type) {
          case "cosmic":
            this.pulse += this.pulseSpeed
            this.x += this.speedX
            this.y += this.speedY
            break
          case "nebula":
            this.x += this.speedX
            this.y += this.speedY
            this.opacity = Math.sin(Date.now() * 0.001 + this.x * 0.01) * 0.2 + 0.3
            break
          case "star":
            this.twinkle += this.twinkleSpeed
            this.x += this.speedX
            this.y += this.speedY
            break
          case "energy":
            this.trail.push({ x: this.x, y: this.y })
            if (this.trail.length > this.trailLength) {
              this.trail.shift()
            }
            this.x += this.speedX
            this.y += this.speedY
            break
          default:
            this.x += this.speedX
            this.y += this.speedY
        }

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height

        this.life++
        if (this.life > this.maxLife) {
          this.reset()
          this.setupByType()
        }
      }

      draw() {
        ctx.save()

        switch (this.type) {
          case "cosmic":
            this.drawCosmic()
            break
          case "nebula":
            this.drawNebula()
            break
          case "star":
            this.drawStar()
            break
          case "energy":
            this.drawEnergy()
            break
          default:
            this.drawDefault()
        }

        ctx.restore()
      }

      drawCosmic() {
        const pulseSize = this.size + Math.sin(this.pulse) * 2

        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, pulseSize * 3)
        gradient.addColorStop(0, this.color)
        gradient.addColorStop(1, "transparent")

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, pulseSize * 3, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, pulseSize, 0, Math.PI * 2)
        ctx.fill()
      }

      drawNebula() {
        ctx.globalAlpha = this.opacity

        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 4)
        gradient.addColorStop(0, this.color)
        gradient.addColorStop(0.5, this.color.replace(/[\d.]+\)$/g, "0.1)"))
        gradient.addColorStop(1, "transparent")

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size * 4, 0, Math.PI * 2)
        ctx.fill()

        ctx.globalAlpha = 1
      }

      drawStar() {
        const twinkleOpacity = Math.sin(this.twinkle) * 0.5 + 0.5
        ctx.globalAlpha = twinkleOpacity

        ctx.strokeStyle = this.color
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(this.x - this.size * 2, this.y)
        ctx.lineTo(this.x + this.size * 2, this.y)
        ctx.moveTo(this.x, this.y - this.size * 2)
        ctx.lineTo(this.x, this.y + this.size * 2)
        ctx.stroke()

        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()

        ctx.globalAlpha = 1
      }

      drawEnergy() {
        
        if (this.trail.length > 1) {
          ctx.strokeStyle = this.color
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.moveTo(this.trail[0].x, this.trail[0].y)

          for (let i = 1; i < this.trail.length; i++) {
            ctx.globalAlpha = i / this.trail.length
            ctx.lineTo(this.trail[i].x, this.trail[i].y)
          }
          ctx.stroke()
        }

        ctx.globalAlpha = 1
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()

        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3)
        gradient.addColorStop(0, this.color)
        gradient.addColorStop(1, "transparent")

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2)
        ctx.fill()
      }

      drawDefault() {
        ctx.globalAlpha = this.opacity

        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2)
        gradient.addColorStop(0, this.color)
        gradient.addColorStop(1, "transparent")

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()

        ctx.globalAlpha = 1
      }
    }

    const createParticles = () => {
      const particles = []
      const particleCount = Math.min(150, Math.floor((canvas.width * canvas.height) / 15000))

      const types = [
        { type: "cosmic", count: Math.floor(particleCount * 0.3) },
        { type: "nebula", count: Math.floor(particleCount * 0.2) },
        { type: "star", count: Math.floor(particleCount * 0.25) },
        { type: "energy", count: Math.floor(particleCount * 0.15) },
        { type: "default", count: Math.floor(particleCount * 0.1) },
      ]

      types.forEach(({ type, count }) => {
        for (let i = 0; i < count; i++) {
          particles.push(new Particle(type))
        }
      })

      return particles
    }

    particlesRef.current = createParticles()

    const drawConnections = () => {
      const particles = particlesRef.current

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            ctx.globalAlpha = ((120 - distance) / 120) * 0.1
            ctx.strokeStyle = "#667eea"
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
      ctx.globalAlpha = 1
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const bgGradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height),
      )
      bgGradient.addColorStop(0, "rgba(26, 26, 46, 0.1)")
      bgGradient.addColorStop(0.5, "rgba(22, 33, 62, 0.05)")
      bgGradient.addColorStop(1, "rgba(15, 52, 96, 0.02)")

      ctx.fillStyle = bgGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      drawConnections()

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", debouncedResize)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameId)
      clearTimeout(resizeTimeout)
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -2,
          pointerEvents: "none",
        }}
      />

      {}
      <div className="cosmic-overlay">
        {}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="cosmic-orb"
            style={{
              position: "fixed",
              width: `${60 + Math.random() * 40}px`,
              height: `${60 + Math.random() * 40}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${
                ["rgba(102, 126, 234, 0.1)", "rgba(246, 211, 101, 0.1)", "rgba(255, 154, 158, 0.1)"][i % 3]
              }, transparent)`,
              borderRadius: "50%",
              filter: "blur(20px)",
              pointerEvents: "none",
              zIndex: -1,
            }}
            animate={{
              x: [-20, 20, -20],
              y: [-30, 30, -30],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.5,
            }}
          />
        ))}

        {}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`nebula-${i}`}
            className="nebula-effect"
            style={{
              position: "fixed",
              width: `${200 + Math.random() * 200}px`,
              height: `${200 + Math.random() * 200}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(ellipse, ${
                ["rgba(120, 119, 198, 0.05)", "rgba(255, 119, 198, 0.05)", "rgba(120, 219, 255, 0.05)"][i % 3]
              }, transparent)`,
              borderRadius: "50%",
              filter: "blur(40px)",
              pointerEvents: "none",
              zIndex: -1,
            }}
            animate={{
              x: [-50, 50, -50],
              y: [-40, 40, -40],
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 2,
            }}
          />
        ))}
      </div>
    </>
  )
}

export default ParticleBackground