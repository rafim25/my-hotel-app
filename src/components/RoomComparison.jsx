'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OptimizedImage from './OptimizedImage';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { roomService } from '@/utils/apiService';

export default function RoomComparison({ rooms }) {
  const [selectedRooms, setSelectedRooms] = useState([]);

  const toggleRoom = (room) => {
    if (selectedRooms.includes(room)) {
      setSelectedRooms(selectedRooms.filter(r => r !== room));
    } else if (selectedRooms.length < 3) {
      setSelectedRooms([...selectedRooms, room]);
    }
  };

  // Get all unique features from all rooms
  const allFeatures = [...new Set(
    rooms.flatMap(room => Object.keys(room.features || {}))
  )];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-6">Compare Rooms</h3>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {rooms.map((room) => (
          <motion.div
            key={room.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative cursor-pointer rounded-lg overflow-hidden border-2 
              ${selectedRooms.includes(room) ? 'border-primary' : 'border-transparent'}`}
            onClick={() => toggleRoom(room)}
          >
            <div className="relative h-48">
              <OptimizedImage
                src={room.images[0]}
                alt={room.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h4 className="font-semibold">{room.name}</h4>
              <p className="text-primary font-medium">${room.price}/night</p>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedRooms.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="overflow-x-auto"
          >
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4">Features</th>
                  {selectedRooms.map(room => (
                    <th key={room.id} className="text-center py-4">{room.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-4">Price per night</td>
                  {selectedRooms.map(room => (
                    <td key={room.id} className="text-center py-4">
                      ${room.price}
                    </td>
                  ))}
                </tr>
                {allFeatures.map(feature => (
                  <tr key={feature} className="border-b">
                    <td className="py-4">{feature}</td>
                    {selectedRooms.map(room => (
                      <td key={room.id} className="text-center py-4">
                        {room.features[feature] ? (
                          <FaCheck className="inline text-green-500" />
                        ) : (
                          <FaTimes className="inline text-red-500" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 