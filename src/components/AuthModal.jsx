'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGoogle, FaFacebook, FaEnvelope, FaTimes, FaArrowRight, FaUser } from 'react-icons/fa';

export default function AuthModal({ isOpen, onClose, onSuccess, bookingDetails }) {
  const [authMode, setAuthMode] = useState('options'); // 'options', 'login', or 'register'
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    gender: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSocialLogin = async (provider) => {
    try {
      setLoading(true);
      // Here you would implement actual social login
      console.log(`Logging in with ${provider}`);
      // Simulate successful login
      setTimeout(() => {
        onSuccess();
      }, 1000);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Here you would implement actual registration
      console.log('Registering with:', formData);
      // Simulate successful registration
      setTimeout(() => {
        onSuccess();
      }, 1000);
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderAuthOptions = () => (
    <>
      <div className="relative p-6 pb-0">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-gray-400 hover:text-gray-600"
        >
          <FaTimes size={24} />
        </button>
        <h2 className="text-2xl font-semibold text-gray-900">Welcome to Unnata Forest View</h2>
        <p className="mt-2 text-gray-600">Sign in or create an account to complete your booking</p>
      </div>

      <div className="p-6 space-y-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSocialLogin('google')}
          className="w-full py-3 px-4 bg-white border border-gray-300 rounded-lg text-gray-700 
            font-medium flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors"
        >
          <FaGoogle className="text-red-500" />
          Continue with Google
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSocialLogin('facebook')}
          className="w-full py-3 px-4 bg-[#1877F2] text-white rounded-lg 
            font-medium flex items-center justify-center gap-3 hover:bg-[#1865F2] transition-colors"
        >
          <FaFacebook />
          Continue with Facebook
        </motion.button>

        <div className="relative flex items-center justify-center my-6">
          <div className="absolute left-0 right-0 border-t border-gray-200"></div>
          <span className="relative bg-white px-4 text-sm text-gray-500">or</span>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setAuthMode('register')}
          className="w-full py-3 px-4 bg-primary text-white rounded-lg 
            font-medium flex items-center justify-center gap-3 hover:bg-primary-dark transition-colors"
        >
          <FaUser />
          Register with Email
        </motion.button>
      </div>

      <div className="p-6 bg-gray-50 border-t text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <button
            onClick={() => setAuthMode('login')}
            className="text-primary font-medium hover:underline"
          >
            Sign in
          </button>
        </p>
      </div>
    </>
  );

  const renderRegistrationForm = () => (
    <form onSubmit={handleRegister}>
      <div className="relative p-6 pb-0">
        <button
          type="button"
          onClick={() => setAuthMode('options')}
          className="absolute right-6 top-6 text-gray-400 hover:text-gray-600"
        >
          <FaTimes size={24} />
        </button>
        <h2 className="text-2xl font-semibold text-gray-900">Create Account</h2>
        <p className="mt-2 text-gray-600">Please fill in your details to register</p>
      </div>

      <div className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input
              type="text"
              required
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input
              type="text"
              required
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
          <input
            type="tel"
            required
            value={formData.mobile}
            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
          <select
            required
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <input
            type="password"
            required
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 px-4 bg-primary text-white rounded-lg font-medium 
            hover:bg-primary-dark transition-colors flex items-center justify-center gap-2
            disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {loading ? (
            'Creating Account...'
          ) : (
            <>
              <FaUser />
              Create Account
            </>
          )}
        </motion.button>
      </div>

      <div className="p-6 bg-gray-50 border-t text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => setAuthMode('login')}
            className="text-primary font-medium hover:underline"
          >
            Sign in
          </button>
        </p>
      </div>
    </form>
  );

  return (
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
            className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {authMode === 'register' ? renderRegistrationForm() : renderAuthOptions()}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 