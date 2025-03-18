'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendar, FaUsers, FaBed, FaCreditCard, FaDownload } from 'react-icons/fa';

const BookingHistory = ({ bookings }) => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [filter, setFilter] = useState('all'); // all, upcoming, past

  const filteredBookings = bookings.filter(booking => {
    const checkOut = new Date(booking.checkOut);
    const today = new Date();
    
    if (filter === 'upcoming') return checkOut >= today;
    if (filter === 'past') return checkOut < today;
    return true;
  });

  const downloadInvoice = (bookingId) => {
    // Implement invoice download logic
    console.log('Downloading invoice for booking:', bookingId);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Booking History</h2>
        <div className="flex gap-2">
          {['all', 'upcoming', 'past'].map(option => (
            <button
              key={option}
              onClick={() => setFilter(option)}
              className={`px-4 py-2 rounded-lg capitalize ${
                filter === option
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredBookings.map((booking) => (
          <motion.div
            key={booking.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{booking.roomName}</h3>
                <div className="flex gap-4 text-sm text-gray-600 mt-2">
                  <div className="flex items-center gap-2">
                    <FaCalendar />
                    <span>
                      {new Date(booking.checkIn).toLocaleDateString()} - 
                      {new Date(booking.checkOut).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaUsers />
                    <span>
                      {booking.guests.adults + booking.guests.children} Guests
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="font-bold text-lg">${booking.totalAmount}</span>
                <div className="text-sm text-gray-600">{booking.status}</div>
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={() => setSelectedBooking(booking)}
                className="text-primary hover:underline"
              >
                View Details
              </button>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => downloadInvoice(booking.id)}
                  className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  <FaDownload size={14} />
                  <span>Invoice</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-lg p-6 max-w-lg w-full"
            >
              <h3 className="text-xl font-bold mb-4">Booking Details</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FaBed className="text-gray-400" />
                  <div>
                    <p className="font-medium">{selectedBooking.roomName}</p>
                    <p className="text-sm text-gray-600">Room Type</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FaCalendar className="text-gray-400" />
                  <div>
                    <p className="font-medium">
                      {new Date(selectedBooking.checkIn).toLocaleDateString()} - 
                      {new Date(selectedBooking.checkOut).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">Stay Duration</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FaCreditCard className="text-gray-400" />
                  <div>
                    <p className="font-medium">{selectedBooking.paymentMethod}</p>
                    <p className="text-sm text-gray-600">Payment Method</p>
                  </div>
                </div>
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between mb-2">
                    <span>Room Rate</span>
                    <span>${selectedBooking.price}/night</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total Amount</span>
                    <span>${selectedBooking.totalAmount}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="w-full mt-6 bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookingHistory; 