'use client';
import { motion } from 'framer-motion';
import { FaSpinner, FaCircleNotch, FaCog } from 'react-icons/fa';

export const SpinnerVariant = () => (
  <div className="flex items-center justify-center">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    >
      <FaSpinner className="text-primary text-2xl" />
    </motion.div>
  </div>
);

export const CircleVariant = () => (
  <div className="flex items-center justify-center">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
    >
      <FaCircleNotch className="text-primary text-2xl" />
    </motion.div>
  </div>
);

export const DotsVariant = () => (
  <div className="flex gap-1">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="w-2 h-2 bg-primary rounded-full"
        animate={{ y: [-3, 3] }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
          delay: i * 0.1,
        }}
      />
    ))}
  </div>
);

export const ProgressBar = ({ progress }) => (
  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
    <motion.div
      className="h-full bg-primary"
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.3 }}
    />
  </div>
); 