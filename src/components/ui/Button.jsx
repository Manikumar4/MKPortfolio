import React from 'react'
import { motion } from 'framer-motion'
import './Button.css'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  onClick,
  disabled = false,
  icon,
  loading = false,
  ...props 
}) => {
  const baseClass = `btn btn-${variant} btn-${size}`
  
  return (
    <motion.button
      className={`${baseClass} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{ scale: disabled ? 1 : 1.05, y: disabled ? 0 : -2 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props}
    >
      {loading && (
        <div className="btn-spinner" />
      )}
      {icon && !loading && (
        <span className="btn-icon">{icon}</span>
      )}
      <span className={loading ? 'btn-text-loading' : 'btn-text'}>
        {children}
      </span>
    </motion.button>
  )
}

export default Button