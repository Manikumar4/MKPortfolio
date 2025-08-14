"use client"

import { useEffect, useRef } from "react"
import { usePortfolioStore } from "@/lib/store"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  opacity: number
  life: number
  maxLife: number
}

export default function AdvancedParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()
  const theme = usePortfolioStore((state) => state.theme)
  const mousePosition = usePortfolioStore((state) => state.mousePosition)
  const isInteracting = usePortfolioStore((state) => state.isInteracting)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const colors = {
      dark: ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57", "#ff8c00", "#40e0d0", "#ee82ee", "#98fb98"],
      light: ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6", "#1abc9c", "#e67e22", "#34495e", "#f1c40f"],
    }

    const createParticle = (x?: number, y?: number): Particle => {
      const themeKey = (theme && (theme === 'dark' || theme === 'light')) ? theme : 'dark';
      const currentColors = colors[themeKey];
      return {
        x: x ?? Math.random() * canvas.width,
        y: y ?? Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 4 + 1,
        color: currentColors[Math.floor(Math.random() * currentColors.length)],
        opacity: Math.random() * 0.8 + 0.2,
        life: 0,
        maxLife: Math.random() * 300 + 200,
      }
    }

    const createParticles = () => {
      const particles: Particle[] = []
      const particleCount = Math.min(150, Math.floor((canvas.width * canvas.height) / 8000))

      for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle())
      }

      particlesRef.current = particles
    }

    const updateParticle = (particle: Particle) => {
      particle.life++
      particle.x += particle.vx
      particle.y += particle.vy

      // Boundary collision with bounce
      if (particle.x < 0 || particle.x > canvas.width) {
        particle.vx *= -0.8
        particle.x = Math.max(0, Math.min(canvas.width, particle.x))
      }
      if (particle.y < 0 || particle.y > canvas.height) {
        particle.vy *= -0.8
        particle.y = Math.max(0, Math.min(canvas.height, particle.y))
      }

      // Mouse interaction
      if (isInteracting) {
        const dx = mousePosition.x - particle.x
        const dy = mousePosition.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          const force = (100 - distance) / 100
          // Make the force even gentler and lerp smoother
          const lerp = 0.16 // higher smoothing factor for even smoother motion
          const targetVx = (dx / distance) * force * 0.08
          const targetVy = (dy / distance) * force * 0.08
          particle.vx += (targetVx - particle.vx) * lerp
          particle.vy += (targetVy - particle.vy) * lerp
        }
      }

      // Fade out over lifetime
      // Smooth opacity transition
      const targetOpacity = Math.max(0, 1 - particle.life / particle.maxLife)
      particle.opacity += (targetOpacity - particle.opacity) * 0.08

      // Apply friction
      particle.vx *= 0.982
      particle.vy *= 0.982
    }

    const drawParticle = (particle: Particle) => {
      ctx.save()
      ctx.globalAlpha = particle.opacity
      ctx.fillStyle = particle.color
      ctx.shadowBlur = 15
      ctx.shadowColor = particle.color

      // Smooth size transition for a more natural effect
      if (!('renderedSize' in particle)) {
        (particle as any).renderedSize = particle.size
      }
      (particle as any).renderedSize += (particle.size - (particle as any).renderedSize) * 0.12

      // Draw particle with glow effect
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, (particle as any).renderedSize, 0, Math.PI * 2)
      ctx.fill()

      // Additional glow layer
      ctx.globalAlpha = particle.opacity * 0.3
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, (particle as any).renderedSize * 2, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()
    }

    const drawConnections = () => {
      const particles = particlesRef.current
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            ctx.save()
            ctx.globalAlpha = ((120 - distance) / 120) * 0.3 * particles[i].opacity * particles[j].opacity
            ctx.strokeStyle = particles[i].color
            ctx.lineWidth = 1
            ctx.shadowBlur = 5
            ctx.shadowColor = particles[i].color
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
            ctx.restore()
          }
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((particle) => {
        updateParticle(particle)
        drawParticle(particle)
        return particle.life < particle.maxLife
      })

      // Add new particles to maintain count
      while (particlesRef.current.length < 100) {
        particlesRef.current.push(createParticle())
      }

      // Draw connections
      drawConnections()

      // Add mouse trail effect
      if (isInteracting && Math.random() < 0.3) {
        particlesRef.current.push(
          createParticle(mousePosition.x + (Math.random() - 0.5) * 20, mousePosition.y + (Math.random() - 0.5) * 20),
        )
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    createParticles()
    animate()

    const handleResize = () => {
      resizeCanvas()
      createParticles()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [theme, mousePosition, isInteracting])

  return <canvas ref={canvasRef} className="particles-container" />
}
