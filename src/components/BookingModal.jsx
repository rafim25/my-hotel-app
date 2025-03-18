'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCalendar, FaUser, FaArrowRight } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import AuthModal from './AuthModal';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

// Custom styles for the date range highlight
const datePickerCustomStyles = `
  .react-datepicker {
    font-family: inherit;
    border-radius: 0.5rem;
    border: 1px solid #e5e7eb;
  }
  .react-datepicker__day--in-range {
    background-color: #10b981 !important;
    color: white !important;
  }
  .react-datepicker__day--in-selecting-range {
    background-color: #34d399 !important;
    color: white !important;
  }
  .react-datepicker__day--selected {
    background-color: #059669 !important;
    color: white !important;
  }
`;

export default function BookingModal({ isOpen, onClose, room }) {
  const [bookingData, setBookingData] = useState({
    checkIn: null,
    checkOut: null,
    guests: 1,
    specialRequests: '',
  });
  const [showAuth, setShowAuth] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const router = useRouter();
  const { user } = useAuth();

  if (!isOpen || !room) return null;

  // Calculate total nights and price
  const nights = bookingData.checkIn && bookingData.checkOut
    ? Math.ceil((bookingData.checkOut - bookingData.checkIn) / (1000 * 60 * 60 * 24))
    : 0;
  const totalPrice = nights * room.price;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setShowAuth(true);
    } else {
      router.push(`/booking/summary?room=${room.id}&checkIn=${bookingData.checkIn}&checkOut=${bookingData.checkOut}&guests=${bookingData.guests}`);
      onClose();
    }
  };

  const handleAuthSuccess = () => {
    setShowAuth(false);
    // Proceed to payment/summary after successful auth
    router.push(`/booking/summary?room=${room.id}&checkIn=${bookingData.checkIn}&checkOut=${bookingData.checkOut}&guests=${bookingData.guests}`);
    onClose();
  };

  return (
    <>
      <style>{datePickerCustomStyles}</style>
      <AnimatePresence>
        {isOpen && (
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
              className="bg-white rounded-lg shadow-xl max-w-4xl w-full overflow-hidden"
            >
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-2xl font-semibold">Book {room.name}</h2>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="flex flex-col md:flex-row">
                {/* Room Preview */}
                <div className="md:w-1/2 p-6 border-r">
                  <div className="relative h-64 rounded-lg overflow-hidden mb-4">
                    <img
                      src={room.images[currentImageIndex]}
                      alt={`${room.name} view ${currentImageIndex + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {room.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden 
                          ${currentImageIndex === index ? 'ring-2 ring-primary' : ''}`}
                      >
                        <img
                          src={image}
                          alt={`${room.name} thumbnail ${index + 1}`}
                          className="object-cover w-full h-full"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Booking Form */}
                <div className="md:w-1/2 p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Check-in
                        </label>
                        <div className="relative">
                          <FaCalendar className="absolute left-3 top-3 text-gray-400" />
                          <DatePicker
                            selected={bookingData.checkIn}
                            onChange={date => setBookingData({
                              ...bookingData,
                              checkIn: date,
                              checkOut: date > bookingData.checkOut ? null : bookingData.checkOut
                            })}
                            selectsStart
                            startDate={bookingData.checkIn}
                            endDate={bookingData.checkOut}
                            minDate={new Date()}
                            className="pl-10 w-full p-2 border rounded-lg"
                            placeholderText="Select date"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Check-out
                        </label>
                        <div className="relative">
                          <FaCalendar className="absolute left-3 top-3 text-gray-400" />
                          <DatePicker
                            selected={bookingData.checkOut}
                            onChange={date => setBookingData({ ...bookingData, checkOut: date })}
                            selectsEnd
                            startDate={bookingData.checkIn}
                            endDate={bookingData.checkOut}
                            minDate={bookingData.checkIn || new Date()}
                            className="pl-10 w-full p-2 border rounded-lg"
                            placeholderText="Select date"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Number of Guests
                      </label>
                      <div className="relative">
                        <FaUser className="absolute left-3 top-3 text-gray-400" />
                        <select
                          value={bookingData.guests}
                          onChange={e => setBookingData({ ...bookingData, guests: parseInt(e.target.value) })}
                          className="pl-10 w-full p-2 border rounded-lg"
                        >
                          {[1, 2, 3, 4].map(num => (
                            <option key={num} value={num}>
                              {num} Guest{num > 1 ? 's' : ''}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Special Requests
                      </label>
                      <textarea
                        value={bookingData.specialRequests}
                        onChange={e => setBookingData({ ...bookingData, specialRequests: e.target.value })}
                        className="w-full p-2 border rounded-lg"
                        rows={3}
                        placeholder="Any special requests?"
                      />
                    </div>

                    {/* Booking Summary */}
                    {nights > 0 && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">Booking Summary</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Duration</span>
                            <span>{nights} night{nights > 1 ? 's' : ''}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Rate per night</span>
                            <span>${room.price}</span>
                          </div>
                          <div className="flex justify-between font-semibold pt-2 border-t">
                            <span>Total</span>
                            <span>${totalPrice}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={!bookingData.checkIn || !bookingData.checkOut}
                      className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      Confirm Booking
                    </motion.button>
                  </form>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        onSuccess={handleAuthSuccess}
        bookingDetails={{
          room,
          ...bookingData,
          totalPrice,
          nights,
        }}
      />
    </>
  );
}

// Helper function to calculate total price
function calculateTotalPrice(pricePerNight, checkIn, checkOut) {
  if (!pricePerNight || !checkIn || !checkOut) return 0;
  const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
  return pricePerNight * nights;
} 