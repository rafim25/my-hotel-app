'use client';
import { useState } from 'react';
import OptimizedImage from './OptimizedImage';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  FaBed, 
  FaWifi, 
  FaTv, 
  FaCoffee,
  FaCity,
  FaChild,
  FaGamepad,
  FaConciergeBell,
  FaParking,
  FaCouch
} from 'react-icons/fa';

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
  const [imageError, setImageError] = useState(false);

  if (!room) return null;

  const mainImage = imageError ? defaultImage : (room.images?.[0] || defaultImage);
  const activeFacilities = Object.entries(room.features || {})
    .filter(([_, value]) => value)
    .map(([key]) => key);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col"
    >
      {/* Image Container */}
      <div className="relative h-64 w-full">
        <OptimizedImage
          src={mainImage}
          alt={room.name || 'Room image'}
          fill
          className="object-cover"
          onError={() => setImageError(true)}
          priority
        />
      </div>

      {/* Content Container */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{room.name || 'Room'}</h3>
        <p className="text-gray-600 mb-4">{room.description || 'No description available'}</p>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {activeFacilities.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-gray-600">
              <span className="text-primary">{facilityIcons[feature]?.icon || '•'}</span>
              <span className="text-sm">{facilityIcons[feature]?.label || feature}</span>
            </div>
          ))}
        </div>

        {/* Price and Button */}
        <div className="mt-auto pt-4 flex items-center justify-between">
          <div className="text-primary">
            <span className="text-2xl font-bold">₹{room.price || 0}</span>
            <span className="text-gray-600 text-sm">/night</span>
          </div>
          <Link href={`/rooms/${room.id}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
            >
              Book Now
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default RoomCard; 