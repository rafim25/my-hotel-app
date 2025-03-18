'use client';
import { motion } from 'framer-motion';
import { FaCalendar, FaUser, FaBed, FaCreditCard, FaCheckCircle } from 'react-icons/fa';

export default function BookingSummary({ booking, onConfirm }) {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4"
        >
          <FaCheckCircle className="text-3xl text-green-500" />
        </motion.div>
        <h1 className="text-2xl font-semibold text-gray-900">Review Your Booking</h1>
        <p className="text-gray-600 mt-2">Please review your booking details before confirming</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <div className="space-y-6">
            {/* Room Details */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <FaBed className="text-xl text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{booking.room.name}</h3>
                <p className="text-gray-600 text-sm">{booking.room.description}</p>
              </div>
            </div>

            {/* Dates */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <FaCalendar className="text-xl text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Stay Duration</h3>
                <p className="text-gray-600 text-sm">
                  Check-in: {new Date(booking.checkIn).toLocaleDateString()}<br />
                  Check-out: {new Date(booking.checkOut).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Guests */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <FaUser className="text-xl text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Guests</h3>
                <p className="text-gray-600 text-sm">{booking.guests} person(s)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Price Summary */}
        <div className="border-t bg-gray-50 p-6">
          <div className="space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Room Rate ({booking.nights} nights)</span>
              <span>${booking.room.price} × {booking.nights}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Taxes & Fees</span>
              <span>${booking.taxes}</span>
            </div>
            <div className="flex justify-between font-semibold text-gray-900 pt-2 border-t">
              <span>Total Amount</span>
              <span>${booking.totalPrice}</span>
            </div>
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onConfirm}
        className="w-full mt-6 py-4 bg-primary text-white rounded-lg font-medium 
          hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
      >
        <FaCreditCard />
        Proceed to Payment
      </motion.button>
    </div>
  );
} 