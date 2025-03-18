'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import RoomCard from './RoomCard';
import { mockRooms } from '@/utils/mockData';
import { FaSpinner } from 'react-icons/fa';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function RoomsGrid({ rooms, loading }) {
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <FaSpinner className="text-primary text-3xl" />
        </motion.div>
      </div>
    );
  }

  if (!rooms.length) {
    return (
      <div className="text-center text-gray-500 py-8">
        No rooms match your selected filters.
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {rooms.map((room) => (
        <motion.div key={room.id} variants={itemVariants}>
          <RoomCard room={room} />
        </motion.div>
      ))}
    </motion.div>
  );
} 