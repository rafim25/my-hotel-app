'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '@/components/PageHeader';
import RoomsGrid from '@/components/RoomsGrid';
import RoomFilters from '@/components/RoomFilters';
import RoomComparison from '@/components/RoomComparison';
import { mockRooms } from '@/utils/mockData';

export default function RoomsPage() {
  const [filteredRooms, setFilteredRooms] = useState(mockRooms);
  const [loading, setLoading] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  const handleFilterChange = (filters) => {
    setLoading(true);
    
    let results = [...mockRooms];

    // Filter by type
    if (filters.type !== 'all') {
      results = results.filter(room => room.type === filters.type);
    }

    // Filter by price range
    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(Number);
      results = results.filter(room => {
        if (max) {
          return room.price >= min && room.price <= max;
        }
        return room.price >= min;
      });
    }

    // Filter by features
    if (filters.features.length > 0) {
      results = results.filter(room => 
        filters.features.every(feature => 
          room.features[feature.replace(' ', '_').toLowerCase()]
        )
      );
    }

    // Sort rooms
    switch (filters.sortBy) {
      case 'price-low':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        results.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        break;
    }

    // Check availability if dates are selected
    if (filters.dates.checkIn && filters.dates.checkOut) {
      // In a real app, this would check against bookings in the database
      // For now, we'll just simulate availability
      results = results.filter(room => {
        return true; // All rooms available for demo
      });
    }

    setTimeout(() => {
      setFilteredRooms(results);
      setLoading(false);
    }, 300); // Simulate API delay
  };

  return (
    <div>
      <PageHeader 
        title="Our Rooms & Suites"
        subtitle="Experience luxury and comfort in our carefully designed accommodations"
        bgImage="https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070"
      />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Available Rooms</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowComparison(!showComparison)}
            className="px-4 py-2 bg-primary text-white rounded-lg"
          >
            {showComparison ? 'View All Rooms' : 'Compare Rooms'}
          </motion.button>
        </div>

        {showComparison ? (
          <RoomComparison rooms={filteredRooms} />
        ) : (
          <>
            <RoomFilters onFilterChange={handleFilterChange} />
            <RoomsGrid rooms={filteredRooms} loading={loading} />
          </>
        )}
      </div>
    </div>
  );
} 