'use client';
import { motion } from 'framer-motion';

export const SkeletonLoader = ({ className }) => {
  return (
    <motion.div
      className={`bg-gray-200 animate-pulse ${className}`}
      initial={{ opacity: 0.6 }}
      animate={{ opacity: 1 }}
      transition={{
        repeat: Infinity,
        repeatType: "reverse",
        duration: 1
      }}
    />
  );
}; 