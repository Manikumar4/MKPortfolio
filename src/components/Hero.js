import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolioStore } from '../lib/store';
import '../styles/Hero.css';

const roles = [
  'Full Stack Developer',
  'AI Engineer',
  'Machine Learning Enthusiast',
  'Problem Solver',
  'Innovation Creator',
];

function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const { setCurrentSection } = usePortfolioStore();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCurrentSection('hero');
        }
      },
      { threshold: 0.5 }
    );

    const heroElement = document.getElementById('hero');
    if (heroElement) observer.observe(heroElement);

    return () => observer.disconnect();
  }, [setCurrentSection]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <section id="hero" className="hero">
      <div className="hero-background">
        <div className="bg-element bg-element-1"></div>
        <div className="bg-element bg-element-2"></div>
        <div className="bg-element bg-element-3"></div>
        <div className="bg-element bg-element-4"></div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="hero-content"
      >
        <motion.div variants={itemVariants} className="hero-intro">
          <motion.div
            className="hero-badge"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <span className="badge-text">✨ Welcome to my digital universe</span>
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100, delay: 0.5 }}
          >
            Hi, I'm <span className="hero-name">Mani Kumar</span>
          </motion.h1>

          <div className="hero-role-container">
            <motion.h2
              key={currentRole}
              initial={{ y: 50, opacity: 0, rotateX: 90 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              exit={{ y: -50, opacity: 0, rotateX: -90 }}
              className="hero-role"
              transition={{ type: 'spring', stiffness: 200 }}
            >
              {roles[currentRole]}
            </motion.h2>
          </div>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="hero-description"
        >
          Crafting innovative solutions with{' '}
          <span className="highlight">cutting-edge technology</span> and{' '}
          <span className="highlight">creative vision</span>
        </motion.p>

        <motion.div variants={itemVariants} className="hero-actions">
          {[
            { href: 'mailto:mkmanikumar.ks@gmail.com', icon: '📧', label: 'Email' },
            { href: 'tel:+919080047206', icon: '📞', label: 'Call' },
            { href: 'https://linkedin.com/in/manikumar-mk-246ba02a0', icon: '💼', label: 'LinkedIn' },
            { href: 'https://github.com/Manikumar4', icon: '🔗', label: 'GitHub' },
          ].map((link, index) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="hero-link"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              <span className="link-icon">{link.icon}</span>
              <span className="link-label">{link.label}</span>
            </motion.a>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="hero-buttons">
          <motion.button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="hero-btn primary"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            🚀 Explore My Universe
          </motion.button>

          <motion.button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="hero-btn secondary"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            💫 Let's Connect
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-scroll-indicator"
        animate={{
          y: [0, 15, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="scroll-arrow">↓</div>
        <div className="scroll-line"></div>
      </motion.div>
    </section>
  );
}

export default Hero;