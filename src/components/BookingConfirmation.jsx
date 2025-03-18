'use client';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaCalendar, FaUser, FaEnvelope } from 'react-icons/fa';
import Link from 'next/link';

export default function BookingConfirmation({ booking, onClose }) {
  const bookingReference = `BK${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  return (
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
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full"
      >
        <div className="p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-green-500 text-6xl mb-6 flex justify-center"
          >
            <FaCheckCircle />
          </motion.div>
          <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-6">
            Your booking has been successfully confirmed. A confirmation email will be sent shortly.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
            <h3 className="font-semibold mb-4">Booking Details</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="text-primary">
                  <FaCalendar />
                </div>
                <div>
                  <div className="font-medium">Check-in</div>
                  <div className="text-gray-600">{booking.checkIn?.toLocaleDateString()}</div>
                </div>
                <div className="mx-4">→</div>
                <div>
                  <div className="font-medium">Check-out</div>
                  <div className="text-gray-600">{booking.checkOut?.toLocaleDateString()}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-primary">
                  <FaUser />
                </div>
                <div>
                  <div className="font-medium">Guests</div>
                  <div className="text-gray-600">{booking.guests} person(s)</div>
                </div>
              </div>

              <div className="pt-3 border-t">
                <div className="font-medium">Booking Reference</div>
                <div className="text-primary font-mono">{bookingReference}</div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Link 
              href="/bookings"
              className="flex-1 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark text-center"
            >
              View My Bookings
            </Link>
            <button
              onClick={onClose}
              className="flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
} 