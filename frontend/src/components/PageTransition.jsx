import React from 'react';
import { motion } from 'framer-motion';

/**
 * PageTransition - Wrapper component for page animations
 * Provides smooth enter/exit transitions for route changes
 */
const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.3,
        ease: 'easeInOut'
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
