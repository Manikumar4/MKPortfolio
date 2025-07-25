import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePortfolioStore } from '../lib/store';
import '../styles/About.css';

function About() {
  const { setCurrentSection } = usePortfolioStore();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCurrentSection('about');
        }
      },
      { threshold: 0.5, rootMargin: '0px 0px -10% 0px' }
    );

    const aboutElement = document.getElementById('about');
    if (aboutElement) observer.observe(aboutElement);

    return () => observer.disconnect();
  }, [setCurrentSection]);

  return (
    <section id="about" className="about">
      <div className="about-background">
        <div className="bg-shape bg-shape-1"></div>
        <div className="bg-shape bg-shape-2"></div>
      </div>

      <div className="about-container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="about-content"
        >
          <motion.div
            className="about-badge"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <span className="badge-text">👨‍💻 Get to know me</span>
          </motion.div>

          <h2 className="about-title">
            About <span className="title-highlight">Me</span>
          </h2>

          <motion.div
            className="about-card"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="card-content">
              <motion.p
                className="about-text"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                I'm a{' '}
                <span className="text-highlight">final-year Computer Science Engineering student</span>{' '}
                with an insatiable passion for creating innovative solutions through technology. My journey spans across{' '}
                <span className="text-highlight">three transformative internships</span>, where I've honed
                my expertise in both full-stack web development and cutting-edge artificial intelligence applications.
              </motion.p>

              <motion.p
                className="about-text"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                My adventure includes architecting and deploying complete web applications using the{' '}
                <span className="text-highlight">MERN stack</span>, developing sophisticated machine learning
                models for real-world challenges, and exploring the fascinating realm of AI technologies. I'm
                particularly captivated by the{' '}
                <span className="text-highlight">
                  intersection of web development and artificial intelligence
                </span>
                .
              </motion.p>

              <motion.p
                className="about-text"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                I'm driven to contribute to{' '}
                <span className="text-highlight">
                  impactful, scalable, and high-performance software solutions
                </span>{' '}
                while continuously learning and applying modern development technologies.
                <span className="text-highlight"> Let's build something extraordinary together!</span>
              </motion.p>
            </div>

            <motion.div
              className="about-emoji"
              whileHover={{ scale: 1.2, rotate: 10 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              🚀
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;