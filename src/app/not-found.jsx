'use client';
import { motion } from 'framer-motion';
import { FaExclamationCircle, FaHome } from 'react-icons/fa';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center p-8"
      >
        <FaExclamationCircle className="text-6xl text-red-500 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg"
          >
            <FaHome />
            Return Home
          </motion.div>
        </Link>
      </motion.div>
    </div>
  );
} 