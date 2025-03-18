'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaCreditCard, FaPaypal, FaApplePay, FaGooglePay, 
  FaLock, FaCcVisa, FaCcMastercard, FaCcAmex 
} from 'react-icons/fa';
import { 
  validateCardNumber, 
  validateExpiry, 
  validateCVC, 
  formatCardNumber 
} from '@/utils/paymentValidation';

const PaymentOptions = ({ amount, onPaymentComplete }) => {
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const paymentMethods = [
    { id: 'card', label: 'Credit Card', icon: <FaCreditCard /> },
    { id: 'paypal', label: 'PayPal', icon: <FaPaypal /> },
    { id: 'applepay', label: 'Apple Pay', icon: <FaApplePay /> },
    { id: 'googlepay', label: 'Google Pay', icon: <FaGooglePay /> }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    const cardNumberError = validateCardNumber(cardDetails.number);
    if (cardNumberError) newErrors.number = cardNumberError;
    
    const expiryError = validateExpiry(cardDetails.expiry);
    if (expiryError) newErrors.expiry = expiryError;
    
    const cvcError = validateCVC(cardDetails.cvc);
    if (cvcError) newErrors.cvc = cvcError;
    
    if (!cardDetails.name) newErrors.name = 'Name is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedMethod === 'card' && !validateForm()) {
      return;
    }
    setLoading(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    onPaymentComplete({
      method: selectedMethod,
      details: selectedMethod === 'card' ? cardDetails : null
    });
    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Payment Method</h2>
        <div className="flex items-center gap-2 text-green-600">
          <FaLock />
          <span className="text-sm">Secure Payment</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {paymentMethods.map((method) => (
          <motion.button
            key={method.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedMethod(method.id)}
            className={`p-4 rounded-lg border-2 flex flex-col items-center gap-2
              ${selectedMethod === method.id ? 'border-primary' : 'border-gray-200'}`}
          >
            {method.icon}
            <span className="text-sm">{method.label}</span>
          </motion.button>
        ))}
      </div>

      {selectedMethod === 'card' && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-2">Card Number</label>
            <div className="relative">
              <input
                type="text"
                value={cardDetails.number}
                onChange={(e) => {
                  const formatted = formatCardNumber(e.target.value);
                  setCardDetails({ ...cardDetails, number: formatted });
                }}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary
                  ${errors.number ? 'border-red-500' : ''}`}
                placeholder="1234 5678 9012 3456"
                maxLength="19"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                <FaCcVisa className="text-gray-400" />
                <FaCcMastercard className="text-gray-400" />
                <FaCcAmex className="text-gray-400" />
              </div>
            </div>
            {errors.number && (
              <p className="text-red-500 text-sm mt-1">{errors.number}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">Cardholder Name</label>
            <input
              type="text"
              value={cardDetails.name}
              onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
              placeholder="John Doe"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Expiry Date</label>
              <input
                type="text"
                value={cardDetails.expiry}
                onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                placeholder="MM/YY"
                maxLength="5"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">CVC</label>
              <input
                type="text"
                value={cardDetails.cvc}
                onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                placeholder="123"
                maxLength="3"
              />
            </div>
          </div>
        </form>
      )}

      {selectedMethod === 'paypal' && (
        <div className="text-center py-8">
          <FaPaypal className="text-4xl text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">
            You will be redirected to PayPal to complete your payment
          </p>
        </div>
      )}

      <div className="mt-8">
        <div className="flex justify-between mb-4 text-lg">
          <span>Total Amount:</span>
          <span className="font-bold">${amount}</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
        >
          {loading ? 'Processing...' : `Pay $${amount}`}
        </motion.button>
      </div>
    </div>
  );
};

export default PaymentOptions; 