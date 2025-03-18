'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import RoomFeatures from './RoomFeatures';
import RoomGallery from './RoomGallery';

export default function RoomDetailModal({ isOpen, closeModal, room }) {
  if (!isOpen || !room) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-6 border-b">
            <h2 className="text-2xl font-semibold">{room.name}</h2>
            <button 
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
          </div>

          <div className="p-6">
            <RoomGallery images={room.images} />

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Room Features</h3>
              <RoomFeatures features={room.features} className="mb-8" />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Description</h3>
                <p className="text-gray-600">{room.description}</p>
                
                {room.amenities && (
                  <div className="mt-6">
                    <h4 className="font-semibold mb-2">Additional Amenities</h4>
                    <ul className="list-disc list-inside text-gray-600">
                      {room.amenities.map((amenity) => (
                        <li key={amenity}>{amenity}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Room Details</h3>
                <div className="space-y-2 text-gray-600">
                  {room.size && (
                    <p>Room Size: {room.size}</p>
                  )}
                  {room.maxOccupancy && (
                    <p>Max Occupancy: {room.maxOccupancy} guests</p>
                  )}
                  <p>Rate: ${room.price} per night</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 