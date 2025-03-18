'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFilter, FaSort, FaCalendar } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function RoomFilters({ onFilterChange }) {
  const [filters, setFilters] = useState({
    type: 'all',
    priceRange: 'all',
    features: [],
    dates: {
      checkIn: null,
      checkOut: null
    },
    sortBy: 'price-low'
  });

  const handleFilterChange = (newFilters) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="mb-8 bg-white rounded-lg shadow p-6">
      <div className="space-y-6">
        {/* Room Type and Price Range */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">Room Type</label>
            <div className="flex items-center gap-2">
              <FaFilter className="text-primary" />
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange({ type: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value="all">All Types</option>
                <option value="deluxe">Deluxe Room</option>
                <option value="suite">Executive Suite</option>
                <option value="family">Family Room</option>
              </select>
            </div>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
            <div className="flex items-center gap-2">
              <FaSort className="text-primary" />
              <select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange({ priceRange: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value="all">All Prices</option>
                <option value="0-300">$0 - $300</option>
                <option value="301-500">$301 - $500</option>
                <option value="501+">$501+</option>
              </select>
            </div>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <div className="flex items-center gap-2">
              <FaSort className="text-primary" />
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange({ sortBy: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Check-in / Check-out</label>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <FaCalendar className="absolute left-3 top-3 text-gray-400" />
                <DatePicker
                  selected={filters.dates.checkIn}
                  onChange={date => handleFilterChange({
                    dates: { ...filters.dates, checkIn: date }
                  })}
                  selectsStart
                  startDate={filters.dates.checkIn}
                  endDate={filters.dates.checkOut}
                  minDate={new Date()}
                  placeholderText="Check-in Date"
                  className="w-full pl-10 border rounded-lg px-3 py-2"
                />
              </div>
            </div>
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <FaCalendar className="absolute left-3 top-3 text-gray-400" />
                <DatePicker
                  selected={filters.dates.checkOut}
                  onChange={date => handleFilterChange({
                    dates: { ...filters.dates, checkOut: date }
                  })}
                  selectsEnd
                  startDate={filters.dates.checkIn}
                  endDate={filters.dates.checkOut}
                  minDate={filters.dates.checkIn || new Date()}
                  placeholderText="Check-out Date"
                  className="w-full pl-10 border rounded-lg px-3 py-2"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
          <div className="flex flex-wrap gap-2">
            {['WiFi', 'Mini Bar', 'Room Service', 'City View', 'King Bed', 'Living Room'].map(feature => (
              <motion.button
                key={feature}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const newFeatures = filters.features.includes(feature)
                    ? filters.features.filter(f => f !== feature)
                    : [...filters.features, feature];
                  handleFilterChange({ features: newFeatures });
                }}
                className={`px-4 py-2 rounded-full text-sm ${filters.features.includes(feature)
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {feature}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 