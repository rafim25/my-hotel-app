'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import {
  FaCheck,
  FaUser,
  FaBed,
  FaCalendar,
  FaEdit,
  FaEnvelope,
  FaPhone
} from 'react-icons/fa';
import { formatDate } from '@/utils/dateUtils';
import {
  updateGuestDetails,
  updatePreferences,
  startEditing,
  finishEditing
} from '@/redux/slices/bookingSlice';

export default function BookingReview({ booking, onConfirm }) {
  const dispatch = useDispatch();
  const bookingState = useSelector((state) => state.booking);

  const handleEdit = (section) => {
    dispatch(startEditing(section));
  };

  const handleSave = () => {
    dispatch(finishEditing());
  };

  const renderEditableGuestDetails = () => (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            type="text"
            value={bookingState.guestDetails.firstName}
            onChange={(e) => dispatch(updateGuestDetails({ firstName: e.target.value }))}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
            value={bookingState.guestDetails.lastName}
            onChange={(e) => dispatch(updateGuestDetails({ lastName: e.target.value }))}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              value={bookingState.guestDetails.email}
              onChange={(e) => dispatch(updateGuestDetails({ email: e.target.value }))}
              className="w-full pl-10 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <div className="relative">
            <FaPhone className="absolute left-3 top-3 text-gray-400" />
            <input
              type="tel"
              value={bookingState.guestDetails.phone}
              onChange={(e) => dispatch(updateGuestDetails({ phone: e.target.value }))}
              className="w-full pl-10 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>
      </div>
      <button
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
      >
        Save Changes
      </button>
    </div>
  );

  const renderEditablePreferences = () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-gray-700 mb-3">Room Type</p>
        <div className="space-y-2">
          <label className="flex items-center gap-3">
            <input
              type="radio"
              name="roomType"
              value="non-smoking"
              checked={bookingState.preferences.roomType === 'non-smoking'}
              onChange={(e) => dispatch(updatePreferences({ roomType: e.target.value }))}
              className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
            />
            <span className="text-gray-700">Non-smoking</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="radio"
              name="roomType"
              value="smoking"
              checked={bookingState.preferences.roomType === 'smoking'}
              onChange={(e) => dispatch(updatePreferences({ roomType: e.target.value }))}
              className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
            />
            <span className="text-gray-700">Smoking</span>
          </label>
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-700 mb-3">Bed Setup</p>
        <div className="space-y-2">
          <label className="flex items-center gap-3">
            <input
              type="radio"
              name="bedSetup"
              value="large"
              checked={bookingState.preferences.bedSetup === 'large'}
              onChange={(e) => dispatch(updatePreferences({ bedSetup: e.target.value }))}
              className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
            />
            <span className="text-gray-700">Large bed</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="radio"
              name="bedSetup"
              value="twin"
              checked={bookingState.preferences.bedSetup === 'twin'}
              onChange={(e) => dispatch(updatePreferences({ bedSetup: e.target.value }))}
              className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
            />
            <span className="text-gray-700">Twin beds</span>
          </label>
        </div>
      </div>

      <button
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
      >
        Save Changes
      </button>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-xl font-semibold mb-6">Review Your Booking</h3>

      <div className="space-y-6">
        {/* Guest Details */}
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
              <FaUser className="text-primary" />
              <h4 className="font-medium">Guest Information</h4>
            </div>
            <button
              onClick={() => handleEdit('guest')}
              className="text-primary hover:text-primary-dark flex items-center gap-1"
            >
              <FaEdit /> Edit
            </button>
          </div>

          <AnimatePresence mode="wait">
            {bookingState.editingSection === 'guest' ? (
              renderEditableGuestDetails()
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-2"
              >
                <p className="text-gray-600">
                  {bookingState.guestDetails.firstName} {bookingState.guestDetails.lastName}
                </p>
                <p className="text-gray-600">{bookingState.guestDetails.email}</p>
                <p className="text-gray-600">{bookingState.guestDetails.phone}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Room Preferences */}
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
              <FaBed className="text-primary" />
              <h4 className="font-medium">Room Preferences</h4>
            </div>
            <button
              onClick={() => handleEdit('preferences')}
              className="text-primary hover:text-primary-dark flex items-center gap-1"
            >
              <FaEdit /> Edit
            </button>
          </div>

          <AnimatePresence mode="wait">
            {bookingState.editingSection === 'preferences' ? (
              renderEditablePreferences()
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-2"
              >
                <p className="text-gray-600">Room Type: {bookingState.preferences.roomType}</p>
                <p className="text-gray-600">Bed Setup: {bookingState.preferences.bedSetup}</p>
                {bookingState.guestDetails.specialRequests && (
                  <p className="text-gray-600 mt-2">
                    Special Requests: {bookingState.guestDetails.specialRequests}
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Stay Details */}
        <div className="border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <FaCalendar className="text-primary" />
            <h4 className="font-medium">Stay Details</h4>
          </div>
          <div className="space-y-2">
            <p className="text-gray-600">
              Check-in: {formatDate(bookingState.stayDetails.checkIn)}
            </p>
            <p className="text-gray-600">
              Check-out: {formatDate(bookingState.stayDetails.checkOut)}
            </p>
            <p className="text-gray-600">
              Duration: {bookingState.stayDetails.nights} night(s)
            </p>
          </div>
        </div>

        {/* Price Summary */}
        <div className="border-t pt-4 mt-4">
          <div className="space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Room Rate ({bookingState.stayDetails.nights} nights)</span>
              <span>${booking.room.price} × {bookingState.stayDetails.nights}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Taxes & Fees</span>
              <span>${(booking.room.price * bookingState.stayDetails.nights * 0.1).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-semibold pt-2 border-t">
              <span>Total Amount</span>
              <span>${(booking.room.price * bookingState.stayDetails.nights * 1.1).toFixed(2)}</span>
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onConfirm}
          disabled={bookingState.isEditing}
          className="w-full py-4 bg-primary text-white rounded-lg font-medium 
            hover:bg-primary-dark transition-colors flex items-center justify-center gap-2
            disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <FaCheck />
          Confirm and Pay
        </motion.button>
      </div>
    </div>
  );
} 