'use client';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

const PaymentConfirmation = ({ booking, onClose }) => {
  useEffect(() => {
    // Trigger confetti animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
        </motion.div>
        
        <h2 className="text-2xl font-bold mb-4">Payment Successful!</h2>
        <p className="text-gray-600 mb-6">
          Your booking has been confirmed. A confirmation email will be sent shortly.
        </p>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="text-left space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Booking Reference:</span>
              <span className="font-medium">{booking.reference}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Amount Paid:</span>
              <span className="font-medium">${booking.totalAmount}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.location.href = '/bookings'}
            className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition-colors"
          >
            View Booking
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Close
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentConfirmation; 