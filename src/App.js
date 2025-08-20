import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ThemeProvider from './components/ThemeProvider'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import About from './pages/About'
import Experience from './pages/Experience'
import Skills from './pages/Skills'
import Projects from './pages/Projects'
import Education from './pages/Education'
import Contact from './pages/Contact'
import './styles/App.css'
import './styles/Navigation.css'
import InteractiveElements from './components/InteractiveElements'
import FloatingElements from './components/FloatingElements'
import ParticleBackground  from './components/ParticleBackground'

function App() {
  return (
    <ThemeProvider>
      <InteractiveElements />
      <FloatingElements />
      <ParticleBackground />
      <Router future={{ v7_relativeSplatPath: true }}>
        <div className="min-h-screen relative">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/education" element={<Education />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App