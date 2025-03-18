'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import RoomGallery from '@/components/RoomGallery';
import BookingModal from '@/components/BookingModal';
import { mockRooms } from '@/utils/mockData';
import { FaBed, FaWifi, FaCity, FaCoffee, FaGamepad, FaChild } from 'react-icons/fa';

const iconMap = {
  'King Bed': <FaBed className="text-2xl" />,
  'City View': <FaCity className="text-2xl" />,
  'Free WiFi': <FaWifi className="text-2xl" />,
  'Mini Bar': <FaCoffee className="text-2xl" />,
  'Kids Area': <FaChild className="text-2xl" />,
  'Game Console': <FaGamepad className="text-2xl" />,
};

export default function RoomDetail() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    // In real app, fetch from API
    const foundRoom = mockRooms.find(r => r.id === parseInt(id));
    setRoom(foundRoom);
  }, [id]);

  if (!room) return <div>Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">{room.name}</h1>
            <p className="text-xl text-gray-600 mt-2">{room.description}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-primary">${room.price}</div>
            <div className="text-gray-500">per night</div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsBookingModalOpen(true)}
              className="mt-4 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark"
            >
              Book Now
            </motion.button>
          </div>
        </div>

        <RoomGallery images={room.images} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Room Features</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(room.features).map(([feature, value]) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="text-primary">{iconMap[feature]}</div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Room Policies</h2>
            <ul className="space-y-3 text-gray-700">
              <li>Check-in: 2:00 PM</li>
              <li>Check-out: 12:00 PM</li>
              <li>No smoking</li>
              <li>Pets not allowed</li>
              <li>Maximum occupancy: 2 adults</li>
            </ul>
          </div>
        </div>
      </motion.div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        room={room}
      />
    </div>
  );
} 