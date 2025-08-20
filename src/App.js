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
import Button from './components/ui/Button'
import Card from './components/ui/Card'
import { Github, ExternalLink, Mail, Sparkles, Zap, Code, Database, Brain } from 'lucide-react'
import './styles/globals.css'
import './styles/Navigation.css'
import InteractiveElements from './components/InteractiveElements'

import FloatingElements from './components/FloatingElements'
import ParticleBackground  from './components/ParticleBackground'

// Demo Components Showcase
function ComponentShowcase() {
  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Enhanced <span className="gradient-text-neon">Portfolio</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Featuring improved animations, individual CSS files, and modern UI components
          </p>
        </div>

        {/* Button Showcase */}
        <Card variant="glass" className="mb-12 p-8">
          <h2 className="text-3xl font-bold mb-6 gradient-text">Button Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="primary" icon={<Sparkles size={18} />}>
              Primary
            </Button>
            <Button variant="secondary" icon={<Zap size={18} />}>
              Secondary
            </Button>
            <Button variant="outline" icon={<Code size={18} />}>
              Outline
            </Button>
            <Button variant="gradient" icon={<Database size={18} />}>
              Gradient
            </Button>
            <Button variant="primary" size="sm" icon={<Github size={16} />}>
              Small
            </Button>
            <Button variant="secondary" size="lg" icon={<ExternalLink size={20} />}>
              Large
            </Button>
            <Button variant="outline" loading>
              Loading
            </Button>
            <Button variant="ghost" icon={<Mail size={18} />}>
              Ghost
            </Button>
          </div>
        </Card>

        {/* Card Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card variant="glass" className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500">
                <Brain size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Glass Card</h3>
            </div>
            <p className="text-gray-300">
              Beautiful glassmorphism effect with backdrop blur and transparency.
            </p>
          </Card>

          <Card variant="vibrant" className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500">
                <Code size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Vibrant Card</h3>
            </div>
            <p className="text-gray-300">
              Colorful gradient backgrounds with enhanced visual appeal.
            </p>
          </Card>

          <Card variant="gradient" className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500">
                <Database size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Gradient Card</h3>
            </div>
            <p className="text-gray-300">
              Smooth gradient backgrounds with modern styling.
            </p>
          </Card>
        </div>

        {/* Animation Showcase */}
        <Card variant="neon" className="p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 gradient-text-aurora">Animation Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="animate-slide-up p-4 glass rounded-xl text-center">
              <Sparkles size={32} className="mx-auto mb-2 text-pink-400" />
              <p className="text-white font-semibold">Slide Up</p>
            </div>
            <div className="animate-slide-left p-4 glass rounded-xl text-center">
              <Zap size={32} className="mx-auto mb-2 text-cyan-400" />
              <p className="text-white font-semibold">Slide Left</p>
            </div>
            <div className="animate-fade-scale p-4 glass rounded-xl text-center">
              <Code size={32} className="mx-auto mb-2 text-emerald-400" />
              <p className="text-white font-semibold">Fade Scale</p>
            </div>
            <div className="animate-bounce-in p-4 glass rounded-xl text-center">
              <Brain size={32} className="mx-auto mb-2 text-orange-400" />
              <p className="text-white font-semibold">Bounce In</p>
            </div>
          </div>
        </Card>

        {/* Typography Showcase */}
        <Card variant="aurora" className="p-8">
          <h2 className="text-3xl font-bold mb-6 gradient-text-sunset">Typography Styles</h2>
          <div className="space-y-4">
            <h1 className="text-4xl font-display font-bold gradient-text-neon">
              Playfair Display - Elegant Headlines
            </h1>
            <h2 className="text-2xl font-grotesk font-semibold gradient-text-aurora">
              Space Grotesk - Modern Subheadings
            </h2>
            <p className="text-lg font-inter text-gray-300">
              Inter - Clean and readable body text for optimal user experience and accessibility.
            </p>
            <code className="font-mono text-cyan-400 bg-black/30 px-3 py-1 rounded">
              JetBrains Mono - Perfect for code snippets
            </code>
          </div>
        </Card>
      </div>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <InteractiveElements />
      <FloatingElements />
      <ParticleBackground />
      <Router>
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
            <Route path="/showcase" element={<ComponentShowcase />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App