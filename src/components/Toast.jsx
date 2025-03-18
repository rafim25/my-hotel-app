'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaExclamationCircle, FaTimes } from 'react-icons/fa';

export default function Toast({ message, type = 'success', onClose }) {
  const icons = {
    success: <FaCheckCircle className="text-green-500 text-xl" />,
    error: <FaExclamationCircle className="text-red-500 text-xl" />,
  };

  const bgColors = {
    success: 'bg-green-50',
    error: 'bg-red-50',
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={`fixed top-4 right-4 z-50 ${bgColors[type]} p-4 rounded-lg shadow-lg flex items-center gap-3 max-w-md`}
      >
        {icons[type]}
        <p className="flex-1 text-gray-800">{message}</p>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <FaTimes />
        </button>
      </motion.div>
    </AnimatePresence>
  );
} 