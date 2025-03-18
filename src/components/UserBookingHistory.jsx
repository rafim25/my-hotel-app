'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCalendar, FaBed, FaMoneyBill, FaDownload } from 'react-icons/fa';
import { formatDate, formatCurrency } from '@/utils/format';
import { bookingService } from '@/utils/apiService';

export default function UserBookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data } = await bookingService.getUserBookings();
      setBookings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadInvoice = async (bookingId) => {
    try {
      const blob = await bookingService.downloadInvoice(bookingId);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `invoice-${bookingId}.pdf`;
      a.click();
    } catch (err) {
      console.error('Error downloading invoice:', err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Booking History</h2>
      <div className="space-y-6">
        {bookings.map((booking) => (
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">{booking.room_name}</h3>
                <p className="text-gray-600">Booking ID: {booking.reference}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                  booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => downloadInvoice(booking.id)}
                  className="text-primary hover:text-primary-dark"
                >
                  <FaDownload />
                </motion.button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <FaCalendar className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Check-in</p>
                  <p className="font-medium">{formatDate(booking.check_in)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FaBed className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Check-out</p>
                  <p className="font-medium">{formatDate(booking.check_out)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FaMoneyBill className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="font-medium">{formatCurrency(booking.total_amount)}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 