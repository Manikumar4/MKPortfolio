import React from 'react'
import { motion } from 'framer-motion'
import './Card.css'

const Card = ({ 
  children, 
  variant = 'glass', 
  className = '', 
  hover = true,
  onClick,
  ...props 
}) => {
  const baseClass = `card card-${variant}`
  
  return (
    <motion.div
      className={`${baseClass} ${hover ? 'card-hover' : ''} ${className}`}
      onClick={onClick}
      whileHover={hover ? { y: -5, scale: 1.02 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      {...props}
    >
      <div className="card-content">
        {children}
      </div>
      <div className="card-shine" />
    </motion.div>
  )
}

export default Card