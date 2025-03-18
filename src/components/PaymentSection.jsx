'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaCreditCard, 
  FaLock, 
  FaGoogle, 
  FaApple,
  FaPhoneAlt
} from 'react-icons/fa';
import { SiPhonepe, SiGooglepay } from 'react-icons/si';

const PAYMENT_METHODS = [
  { 
    id: 'card', 
    name: 'Credit/Debit Card', 
    icon: FaCreditCard,
    description: 'Pay securely with your card'
  },
  { 
    id: 'gpay', 
    name: 'Google Pay', 
    icon: SiGooglepay,
    description: 'Fast checkout with Google Pay'
  },
  { 
    id: 'phonepay', 
    name: 'PhonePe', 
    icon: SiPhonepe,
    description: 'Pay using PhonePe'
  },
  { 
    id: 'upi', 
    name: 'UPI', 
    icon: FaPhoneAlt,
    description: 'Pay using any UPI app'
  }
];

export default function PaymentSection({ booking, onPaymentComplete }) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [upiId, setUpiId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement payment processing based on method
    onPaymentComplete();
  };

  const renderPaymentMethodContent = () => {
    switch (paymentMethod) {
      case 'card':
        return (
          <div className="space-y-4">
            <label className="block">
              <span className="text-gray-700">Card Number</span>
              <div className="relative mt-1">
                <FaCreditCard className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full pl-10 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </label>

            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="text-gray-700">Expiry Date</span>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </label>

              <label className="block">
                <span className="text-gray-700">CVV</span>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </label>
            </div>

            <label className="block">
              <span className="text-gray-700">Name on Card</span>
              <input
                type="text"
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </label>
          </div>
        );

      case 'upi':
        return (
          <div className="space-y-4">
            <label className="block">
              <span className="text-gray-700">UPI ID</span>
              <div className="relative mt-1">
                <FaPhoneAlt className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="username@upi"
                  className="w-full pl-10 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </label>
          </div>
        );

      case 'gpay':
      case 'phonepay':
        return (
          <div className="text-center py-6">
            <p className="text-gray-600">
              Click "Pay Now" to open {paymentMethod === 'gpay' ? 'Google Pay' : 'PhonePe'}
            </p>
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-xl font-semibold mb-6">Payment Details</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Payment Method Selection */}
        <div className="grid grid-cols-2 gap-4">
          {PAYMENT_METHODS.map((method) => (
            <motion.div
              key={method.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setPaymentMethod(method.id)}
              className={`p-4 border rounded-lg cursor-pointer transition-colors
                ${paymentMethod === method.id 
                  ? 'border-primary bg-primary/5' 
                  : 'border-gray-200 hover:border-primary/50'}`}
            >
              <div className="flex items-center gap-3">
                <method.icon className={`text-xl ${
                  paymentMethod === method.id ? 'text-primary' : 'text-gray-500'
                }`} />
                <div>
                  <h4 className={`font-medium ${
                    paymentMethod === method.id ? 'text-primary' : 'text-gray-700'
                  }`}>
                    {method.name}
                  </h4>
                  <p className="text-sm text-gray-500">{method.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Payment Method Content */}
        {renderPaymentMethodContent()}

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FaLock className="text-green-500" />
          <span>Your payment information is secure and encrypted</span>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between text-xl font-semibold">
            <span>Total Amount</span>
            <span>${booking.totalAmount.toFixed(2)}</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full py-4 bg-primary text-white rounded-lg font-medium 
            hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
        >
          <FaLock />
          Pay Securely
        </motion.button>
      </form>
    </div>
  );
} 