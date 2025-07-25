import React, { useEffect, useRef } from 'react';
import { usePortfolioStore } from '../lib/store';

function ParticleBackground() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef();
  const { theme, mousePosition, isInteracting } = usePortfolioStore();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const colors = {
      dark: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff8c00', '#40e0d0', '#ee82ee', '#98fb98'],
      light: ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c', '#e67e22', '#34495e', '#f1c40f'],
    };

    const createParticle = (x, y) => {
      const currentColors = colors[theme];
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
      };
    };

    const createParticles = () => {
      const particles = [];
      const particleCount = Math.min(150, Math.floor((canvas.width * canvas.height) / 8000));

      for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle());
      }

      particlesRef.current = particles;
    };

    const updateParticle = (particle) => {
      particle.life++;
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > canvas.width) {
        particle.vx *= -0.8;
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
      }
      if (particle.y < 0 || particle.y > canvas.height) {
        particle.vy *= -0.8;
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));
      }

      if (isInteracting) {
        const dx = mousePosition.x - particle.x;
        const dy = mousePosition.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          const force = (100 - distance) / 100;
          particle.vx += (dx / distance) * force * 0.5;
          particle.vy += (dy / distance) * force * 0.5;
        }
      }

      particle.opacity = Math.max(0, 1 - particle.life / particle.maxLife);
      particle.vx *= 0.99;
      particle.vy *= 0.99;
    };

    const drawParticle = (particle) => {
      ctx.save();
      ctx.globalAlpha = particle.opacity;
      ctx.fillStyle = particle.color;
      ctx.shadowBlur = 15;
      ctx.shadowColor = particle.color;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalAlpha = particle.opacity * 0.3;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const drawConnections = () => {
      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.save();
            ctx.globalAlpha = ((120 - distance) / 120) * 0.3 * particles[i].opacity * particles[j].opacity;
            ctx.strokeStyle = particles[i].color;
            ctx.lineWidth = 1;
            ctx.shadowBlur = 5;
            ctx.shadowColor = particles[i].color;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter((particle) => {
        updateParticle(particle);
        drawParticle(particle);
        return particle.life < particle.maxLife;
      });

      while (particlesRef.current.length < 100) {
        particlesRef.current.push(createParticle());
      }

      drawConnections();

      if (isInteracting && Math.random() < 0.3) {
        particlesRef.current.push(
          createParticle(mousePosition.x + (Math.random() - 0.5) * 20, mousePosition.y + (Math.random() - 0.5) * 20)
        );
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createParticles();
    animate();

    const handleResize = () => {
      resizeCanvas();
      createParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [theme, mousePosition, isInteracting]);

  return <canvas ref={canvasRef} className="particle-canvas" />;
}

export default ParticleBackground;