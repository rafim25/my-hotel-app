'use client';
import { useState } from 'react';
import OptimizedImage from './OptimizedImage';
import { motion } from 'framer-motion';
import RoomDetailModal from './RoomDetailModal';
import {
  FaBed,
  FaWifi,
  FaCity,
  FaCoffee,
  FaGamepad,
  FaChild,
  FaUtensils,
  FaParking,
  FaTv,
  FaConciergeBell,
  FaCouch
} from 'react-icons/fa';
import Link from 'next/link';

// Facility icons with proper styling
const facilityIcons = {
  'King Bed': { icon: <FaBed />, label: 'King Bed' },
  'City View': { icon: <FaCity />, label: 'City View' },
  'Free WiFi': { icon: <FaWifi />, label: 'WiFi' },
  'Mini Bar': { icon: <FaCoffee />, label: 'Mini Bar' },
  'Kids Area': { icon: <FaChild />, label: 'Kids Area' },
  'Game Console': { icon: <FaGamepad />, label: 'Gaming' },
  'Room Service': { icon: <FaConciergeBell />, label: 'Room Service' },
  'Parking': { icon: <FaParking />, label: 'Parking' },
  'Smart TV': { icon: <FaTv />, label: 'Smart TV' },
  'Living Room': { icon: <FaCouch />, label: 'Living Room' }
};

const defaultImage = 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2074';

const RoomCard = ({ room }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (!room) return null;

  const mainImage = imageError ? defaultImage : (room.images?.[0] || defaultImage);

  // Filter active facilities
  const activeFacilities = Object.entries(room.features || {})
    .filter(([_, value]) => value)
    .map(([key]) => key);

  return (
    <>
      <motion.div
        whileHover={{ y: -5 }}
        className="bg-white rounded-lg shadow-lg overflow-hidden"
      >
        <div className="relative h-48">
          <OptimizedImage
            src={mainImage}
            alt={room.name || 'Room image'}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
            priority
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2">{room.name || 'Room'}</h3>
          <p className="text-gray-600 mb-4">{room.description || 'No description available'}</p>

          {/* Facilities Grid */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {activeFacilities.map(facility => (
              facilityIcons[facility] && (
                <div
                  key={facility}
                  className="flex items-center gap-2 text-gray-600 bg-gray-50 p-2 rounded-lg"
                >
                  <span className="text-primary text-lg">
                    {facilityIcons[facility].icon}
                  </span>
                  <span className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                    {facilityIcons[facility].label}
                  </span>
                </div>
              )
            ))}
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <div>
              <span className="text-2xl font-bold text-primary">
                ${room.price || 0}
              </span>
              <span className="text-gray-500 text-sm">/night</span>
            </div>
            <Link href={`/rooms/${room.id}`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
              >
                Book Now
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>

      <RoomDetailModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        room={room}
      />
    </>
  );
};

export default RoomCard; 