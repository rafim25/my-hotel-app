'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBell, FaEnvelope, FaMobile, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import { notificationService } from '@/utils/apiService';

export default function NotificationSettings() {
  const [settings, setSettings] = useState({
    email: {
      bookingConfirmation: true,
      specialOffers: true,
      newsletter: false,
      reminders: true,
    },
    sms: {
      bookingConfirmation: true,
      checkInReminder: true,
      specialOffers: false,
    },
    pushNotifications: {
      bookingUpdates: true,
      promotions: false,
      newsAndUpdates: true,
    },
  });
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchNotificationSettings();
  }, []);

  const fetchNotificationSettings = async () => {
    try {
      const { data } = await notificationService.getSettings();
      setSettings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (category, setting) => {
    setSettings({
      ...settings,
      [category]: {
        ...settings[category],
        [setting]: !settings[category][setting],
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const { data } = await notificationService.updateSettings(settings);
      setSettings(data);
      setSuccess('Notification settings updated successfully');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Notification Settings</h2>

      {error && (
        <div className="mb-4 bg-red-50 text-red-500 p-3 rounded">{error}</div>
      )}
      {success && (
        <div className="mb-4 bg-green-50 text-green-500 p-3 rounded">{success}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Email Notifications */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <FaEnvelope className="text-primary" />
            <h3 className="text-lg font-semibold">Email Notifications</h3>
          </div>
          <div className="space-y-4">
            {Object.entries(settings.email).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-gray-700">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                </span>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleToggle('email', key)}
                  className={`text-2xl ${value ? 'text-primary' : 'text-gray-400'}`}
                >
                  {value ? <FaToggleOn /> : <FaToggleOff />}
                </motion.button>
              </div>
            ))}
          </div>
        </div>

        {/* SMS Notifications */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <FaMobile className="text-primary" />
            <h3 className="text-lg font-semibold">SMS Notifications</h3>
          </div>
          {/* Similar structure for SMS settings */}
        </div>

        {/* Push Notifications */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <FaBell className="text-primary" />
            <h3 className="text-lg font-semibold">Push Notifications</h3>
          </div>
          {/* Similar structure for push notification settings */}
        </div>

        <div className="flex justify-end">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Save Settings
          </motion.button>
        </div>
      </form>
    </div>
  );
} 