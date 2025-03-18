'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '@/components/PageHeader';
import BookingList from '@/components/BookingList';
import { mockBookings } from '@/utils/mockData';

export default function BookingsPage() {
  const [bookings, setBookings] = useState(mockBookings);

  return (
    <div>
      <PageHeader 
        title="My Bookings"
        subtitle="View and manage your hotel reservations"
        bgImage="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070"
      />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <BookingList bookings={bookings} />
      </div>
    </div>
  );
} 