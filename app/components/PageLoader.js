'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PageLoader = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 30;
      });
    }, 100);

    // Complete loading when document is ready
    const handleLoad = () => {
      setProgress(100);
      setTimeout(() => setLoading(false), 500);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    // Fallback timeout
    const timeout = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setLoading(false), 300);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="text-3xl sm:text-4xl font-bold text-white">
                <span className="text-[#ed1b24]">PDC</span> Consult
              </div>
            </motion.div>

            {/* Loading Bar */}
            <div className="w-48 sm:w-64 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.3 }}
                className="h-full bg-gradient-to-r from-[#ed1b24] to-[#ff5c63] rounded-full"
              />
            </div>

            {/* Loading Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 text-gray-400 text-sm tracking-widest uppercase"
            >
              Loading
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default PageLoader;
