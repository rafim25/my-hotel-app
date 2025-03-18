'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBed, FaUtensils, FaClock, FaLanguage } from 'react-icons/fa';
import { preferenceService } from '@/utils/apiService';
import { useToast } from '@/contexts/ToastContext';
import { useLoading } from '@/contexts/LoadingContext';

export default function UserPreferences() {
  const { showToast } = useToast();
  const { showLoading, hideLoading } = useLoading();
  const [preferences, setPreferences] = useState({
    roomPreferences: {
      roomType: '',
      floorLevel: '',
      specialRequests: '',
    },
    diningPreferences: {
      dietaryRestrictions: [],
      preferredMealTimes: {
        breakfast: '',
        lunch: '',
        dinner: '',
      },
    },
    communicationPreferences: {
      language: 'english',
      timeFormat: '24h',
    },
  });
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPreferences();
  }, []);

  const fetchPreferences = async () => {
    try {
      const { data } = await preferenceService.getUserPreferences();
      setPreferences(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    showLoading('Updating preferences...');

    try {
      const { data } = await preferenceService.updatePreferences(preferences);
      setPreferences(data);
      showToast('Preferences updated successfully');
    } catch (err) {
      showToast(err.message, 'error');
      setError(err.message);
    } finally {
      hideLoading();
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">User Preferences</h2>
      
      {error && (
        <div className="mb-4 bg-red-50 text-red-500 p-3 rounded">{error}</div>
      )}
      {success && (
        <div className="mb-4 bg-green-50 text-green-500 p-3 rounded">{success}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Room Preferences */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <FaBed className="text-primary" />
            <h3 className="text-lg font-semibold">Room Preferences</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Room Type
              </label>
              <select
                value={preferences.roomPreferences.roomType}
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    roomPreferences: {
                      ...preferences.roomPreferences,
                      roomType: e.target.value,
                    },
                  })
                }
                className="w-full rounded-lg border border-gray-300 p-2"
              >
                <option value="">Select Room Type</option>
                <option value="standard">Standard</option>
                <option value="deluxe">Deluxe</option>
                <option value="suite">Suite</option>
              </select>
            </div>
            {/* Add more room preferences fields */}
          </div>
        </div>

        {/* Dining Preferences */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <FaUtensils className="text-primary" />
            <h3 className="text-lg font-semibold">Dining Preferences</h3>
          </div>
          {/* Add dining preferences fields */}
        </div>

        {/* Communication Preferences */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <FaLanguage className="text-primary" />
            <h3 className="text-lg font-semibold">Communication Preferences</h3>
          </div>
          {/* Add communication preferences fields */}
        </div>

        <div className="flex justify-end">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Save Preferences
          </motion.button>
        </div>
      </form>
    </div>
  );
} 