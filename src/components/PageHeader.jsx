'use client';
import { motion } from 'framer-motion';

export default function PageHeader({ title, subtitle, bgImage }) {
  return (
    <div className="relative h-[300px] mb-12">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${bgImage || 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070'})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-center items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-white mb-4"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-white/90"
        >
          {subtitle}
        </motion.p>
      </div>
    </div>
  );
} 