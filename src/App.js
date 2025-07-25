import React, { useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { usePortfolioStore } from './lib/store';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import ParticleBackground from './components/ParticleBackground';
import './styles/App.css';

function App() {
  const { setLoading } = usePortfolioStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [setLoading]);

  return (
    <div className="app">
      <ParticleBackground />
      
      <Suspense fallback={<LoadingScreen />}>
        <LoadingScreen />
        <Navigation />
        
        <main className="main-content">
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Projects />
          <Education />
          <Contact />
          <Footer />
        </main>
      </Suspense>
    </div>
  );
}

export default App;