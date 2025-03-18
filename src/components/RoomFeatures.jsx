'use client';
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
  FaCouch,
  FaSwimmingPool,
  FaCar,
  FaDumbbell
} from 'react-icons/fa';

const featureIcons = {
  'King Bed': <FaBed className="text-xl" />,
  'City View': <FaCity className="text-xl" />,
  'Free WiFi': <FaWifi className="text-xl" />,
  'Mini Bar': <FaCoffee className="text-xl" />,
  'Kids Area': <FaChild className="text-xl" />,
  'Game Console': <FaGamepad className="text-xl" />,
  'Room Service': <FaConciergeBell className="text-xl" />,
  'Parking': <FaParking className="text-xl" />,
  'Smart TV': <FaTv className="text-xl" />,
  'Living Room': <FaCouch className="text-xl" />,
  'Swimming Pool': <FaSwimmingPool className="text-xl" />,
  'Valet Parking': <FaCar className="text-xl" />,
  'Fitness Center': <FaDumbbell className="text-xl" />,
};

export default function RoomFeatures({ features = {}, className = '' }) {
  // Get active features (where value is true)
  const activeFeatures = Object.entries(features)
    .filter(([_, value]) => value)
    .map(([key]) => key);

  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 gap-4 ${className}`}>
      {activeFeatures.map((feature) => (
        <div key={feature} className="flex items-center gap-2 text-gray-600">
          <span className="text-primary">
            {featureIcons[feature] || '•'}
          </span>
          <span className="text-sm">{feature}</span>
        </div>
      ))}
    </div>
  );
} 