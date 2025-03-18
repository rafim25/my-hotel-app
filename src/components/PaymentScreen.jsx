'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCreditCard, FaPaypal, FaGooglePay, FaApplePay, FaTimes, FaLock } from 'react-icons/fa';
import BookingConfirmation from './BookingConfirmation';

const paymentMethods = [
  {
    id: 'credit-card',
    name: 'Credit Card',
    icon: <FaCreditCard className="text-2xl" />,
    fields: ['cardNumber', 'expiryDate', 'cvv', 'cardholderName'],
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: <FaPaypal className="text-2xl" />,
    fields: ['email'],
  },
  {
    id: 'google-pay',
    name: 'Google Pay',
    icon: <FaGooglePay className="text-2xl" />,
    fields: [],
  },
  {
    id: 'apple-pay',
    name: 'Apple Pay',
    icon: <FaApplePay className="text-2xl" />,
    fields: [],
  },
];

export default function PaymentScreen({ isOpen, onClose, bookingDetails }) {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [paymentData, setPaymentData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show confirmation screen
      setShowConfirmation(true);
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    onClose({ success: true, paymentMethod: selectedMethod });
  };

  return (
    <>
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
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-6 border-b">
                <h2 className="text-2xl font-semibold">Payment Details</h2>
                <button
                  onClick={() => onClose({ success: false })}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="p-6">
                {/* Booking Summary */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold mb-2">Booking Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Room Type</span>
                      <span>{bookingDetails.room.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Check-in</span>
                      <span>{bookingDetails.checkIn?.toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Check-out</span>
                      <span>{bookingDetails.checkOut?.toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between font-semibold pt-2 border-t">
                      <span>Total Amount</span>
                      <span>${bookingDetails.totalPrice}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {paymentMethods.map((method) => (
                    <motion.button
                      key={method.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`p-4 rounded-lg border-2 flex items-center gap-3
                        ${selectedMethod === method.id ? 'border-primary' : 'border-gray-200'}`}
                    >
                      {method.icon}
                      <span>{method.name}</span>
                    </motion.button>
                  ))}
                </div>

                {/* Payment Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {selectedMethod === 'credit-card' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Card Number
                        </label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="w-full p-2 border rounded-lg"
                          maxLength="19"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-full p-2 border rounded-lg"
                            maxLength="5"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CVV
                          </label>
                          <input
                            type="text"
                            placeholder="123"
                            className="w-full p-2 border rounded-lg"
                            maxLength="3"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {selectedMethod === 'paypal' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        PayPal Email
                      </label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={!selectedMethod || loading}
                    className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary-dark 
                      disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>Processing...</>
                    ) : (
                      <>
                        <FaLock />
                        Pay Securely
                      </>
                    )}
                  </motion.button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-4">
                  Your payment information is encrypted and secure
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {showConfirmation && (
        <BookingConfirmation
          booking={bookingDetails}
          onClose={handleConfirmationClose}
        />
      )}
    </>
  );
} 