'use client';
import { motion } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner';

export default function LoadingOverlay({ isLoading, children }) {
  return (
    <div className="relative">
      {children}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-white/80 flex items-center justify-center z-50"
        >
          <LoadingSpinner />
        </motion.div>
      )}
    </div>
  );
} 