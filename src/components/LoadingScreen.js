import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolioStore } from '../lib/store';
import '../styles/LoadingScreen.css';

function LoadingScreen() {
  const { isLoading } = usePortfolioStore();

  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="loading-screen"
    >
      <div className="loading-content">
        <motion.div className="loading-spinner">
          <motion.div
            className="spinner-ring spinner-ring-1"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="spinner-ring spinner-ring-2"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="spinner-ring spinner-ring-3"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="loading-text"
        >
          <motion.h1
            className="loading-title"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✨ Mani Kumar M K ✨
          </motion.h1>

          <motion.p
            className="loading-subtitle"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Crafting Digital Experiences...
          </motion.p>

          <div className="loading-dots">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="loading-dot"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default LoadingScreen;