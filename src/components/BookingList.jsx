'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDate } from '@/utils/dateUtils';
import { 
  FaCalendar, 
  FaBed, 
  FaUser, 
  FaCheckCircle, 
  FaClock,
  FaTimesCircle,
  FaChevronDown,
  FaPrint,
  FaEnvelope,
  FaBan,
  FaEdit
} from 'react-icons/fa';
import Link from 'next/link';

const statusColors = {
  confirmed: 'bg-green-100 text-green-800 border border-green-200',
  pending: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
  cancelled: 'bg-red-100 text-red-800 border border-red-200',
  completed: 'bg-blue-100 text-blue-800 border border-blue-200'
};

const statusIcons = {
  confirmed: <FaCheckCircle className="text-green-600" />,
  pending: <FaClock className="text-yellow-600" />,
  cancelled: <FaTimesCircle className="text-red-600" />,
  completed: <FaCheckCircle className="text-blue-600" />
};

export default function BookingList({ bookings }) {
  const [expandedBooking, setExpandedBooking] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handlePrint = (booking) => {
    window.print();
  };

  const handleEmailConfirmation = (booking) => {
    console.log('Resending confirmation for booking:', booking.reference);
  };

  const handleCancelBooking = (booking) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      console.log('Cancelling booking:', booking.reference);
      // In a real app, this would make an API call
    }
  };

  const filteredBookings = bookings.filter(booking => {
    // Filter by status
    if (filterStatus !== 'all' && booking.status !== filterStatus) return false;

    // Filter by search query
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      return (
        booking.reference.toLowerCase().includes(searchLower) ||
        booking.room_name.toLowerCase().includes(searchLower) ||
        booking.guest_name.toLowerCase().includes(searchLower)
      );
    }

    return true;
  });

  const calculateNights = (checkIn, checkOut) => {
    return Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h2 className="text-2xl font-semibold">Your Bookings</h2>
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search bookings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full md:w-64"
          />
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            <option value="all">All Bookings</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No bookings found
          </div>
        ) : (
          filteredBookings.map((booking) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200"
            >
              {/* Booking Header */}
              <div 
                className="p-6 cursor-pointer"
                onClick={() => setExpandedBooking(expandedBooking === booking.id ? null : booking.id)}
              >
                <div className="flex justify-between items-center">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-gray-900">{booking.room_name}</h3>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1.5
                        ${statusColors[booking.status]}`}
                      >
                        {statusIcons[booking.status]}
                        <span>{booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</span>
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm font-medium">Booking Reference: {booking.reference}</p>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedBooking === booking.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FaChevronDown />
                  </motion.div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <FaCalendar className="text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Check-in</div>
                      <div className="text-sm">{formatDate(booking.check_in)}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <FaCalendar className="text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Check-out</div>
                      <div className="text-sm">{formatDate(booking.check_out)}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <FaUser className="text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Guest</div>
                      <div className="text-sm">{booking.guest_name}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              <AnimatePresence>
                {expandedBooking === booking.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="p-6 bg-gray-50 border-t border-gray-100">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white p-4 rounded-lg border border-gray-100">
                          <h4 className="font-medium mb-3 text-gray-900">Booking Details</h4>
                          <div className="space-y-3 text-sm">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">Total Amount</span>
                              <span className="font-semibold text-gray-900">${booking.total_amount}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">Duration</span>
                              <span className="font-medium text-gray-900">
                                {calculateNights(booking.check_in, booking.check_out)} nights
                              </span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-3 text-gray-900">Actions</h4>
                          <div className="flex flex-wrap gap-3">
                            <button
                              onClick={() => handlePrint(booking)}
                              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700"
                            >
                              <FaPrint />
                              Print
                            </button>
                            <button
                              onClick={() => handleEmailConfirmation(booking)}
                              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700"
                            >
                              <FaEnvelope />
                              Resend Email
                            </button>
                            {booking.status === 'confirmed' && (
                              <>
                                <button
                                  onClick={() => handleCancelBooking(booking)}
                                  className="flex items-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50"
                                >
                                  <FaBan />
                                  Cancel
                                </button>
                                <Link 
                                  href={`/bookings/${booking.id}/edit`}
                                  className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700"
                                >
                                  <FaEdit />
                                  Modify
                                </Link>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
} 