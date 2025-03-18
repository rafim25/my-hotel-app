'use client';
import { useState, useEffect, useReducer } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  FaUser,
  FaBed,
  FaCalendar,
  FaCreditCard,
  FaIdCard,
  FaEnvelope,
  FaPhone,
  FaCheck,
  FaArrowRight
} from 'react-icons/fa';
import { mockRooms } from '@/utils/mockData';
import { formatDate } from '@/utils/dateUtils';
import bookingReducer, {
  initialState,
  updateGuestDetails,
  updatePreferences,
  updateStayDetails,
  startEditing,
  finishEditing
} from '@/redux/slices/bookingSlice';

// Import components directly instead of using dynamic imports
const BookingReview = require('@/components/BookingReview').default;
const PaymentSection = require('@/components/PaymentSection').default;

const BOOKING_STEPS = [
  { id: 1, title: 'Customer Information', icon: FaUser },
  { id: 2, title: 'Review Booking', icon: FaCalendar },
  { id: 3, title: 'Payment', icon: FaCreditCard },
  { id: 4, title: 'Booking Confirmed', icon: FaCheck }
];

export default function BookingSummaryPage() {
  const searchParams = useSearchParams();
  const [room, setRoom] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingState, dispatch] = useReducer(bookingReducer, initialState);

  useEffect(() => {
    const roomId = searchParams.get('room');
    setRoom(mockRooms.find(r => r.id === parseInt(roomId)));
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentStep === 1) {
      setCurrentStep(2);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            {/* Lead Guest Details */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Lead Guest Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
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
                    required
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
                      required
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
                      required
                      value={bookingState.guestDetails.phone}
                      onChange={(e) => dispatch(updateGuestDetails({ phone: e.target.value }))}
                      className="w-full pl-10 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Room Preferences and Special Requests */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Room Preferences</h3>
              <div className="space-y-6">
                {/* Room Type Preference */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-3">
                    Which type of room would you prefer?
                  </p>
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

                {/* Bed Setup Preference */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-3">
                    Which bed setup would you prefer?
                  </p>
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
                      <span className="text-gray-700">I'd like a large bed</span>
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
                      <span className="text-gray-700">I'd like twin beds</span>
                    </label>
                  </div>
                </div>

                <div className="text-sm text-gray-500 italic">
                  * All preferences are subject to availability
                </div>
              </div>
            </div>

            {/* Additional Requests */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Additional Requests</h3>
              <textarea
                value={bookingState.guestDetails.specialRequests}
                onChange={(e) => dispatch(updateGuestDetails({ specialRequests: e.target.value }))}
                rows={3}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Any other special requests or preferences?"
              />
            </div>

            {/* Agreement Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="space-y-4">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    required
                    checked={bookingState.preferences.marketingConsent}
                    onChange={(e) => dispatch(updatePreferences({ marketingConsent: e.target.checked }))}
                    className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <span className="text-sm text-gray-600">
                    I agree to receive updates and promotions about Unnata Forest View and its affiliates
                    or business partners via various channels, including WhatsApp.
                  </span>
                </label>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-4 bg-primary text-white rounded-lg font-medium 
                hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
            >
              <FaArrowRight />
              Continue to Review
            </motion.button>
          </div>
        );

      case 2:
        return (
          <>
            <BookingReview
              booking={{
                room,
                checkIn: searchParams.get('checkIn'),
                checkOut: searchParams.get('checkOut'),
                guests: searchParams.get('guests'),
                totalAmount: room.price * 15 * 1.1,
                ...bookingState
              }}
              onConfirm={() => setCurrentStep(3)}
              bookingState={bookingState}
              dispatch={dispatch}
            />
          </>
        );

      case 3:
        return (
          <>
            <PaymentSection
              booking={{
                room,
                nights: 15,
                totalAmount: room.price * 15 * 1.1
              }}
              onPaymentComplete={() => setCurrentStep(4)}
            />
          </>
        );

      case 4:
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4"
            >
              <FaCheck className="text-3xl text-green-500" />
            </motion.div>
            <h2 className="text-2xl font-semibold text-gray-900">Booking Confirmed!</h2>
            <p className="mt-2 text-gray-600">
              Your booking has been confirmed. Check your email for details.
            </p>
            <div className="mt-6">
              <p className="text-sm text-gray-600">Booking Reference: #UNT{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            </div>
          </div>
        );
    }
  };

  if (!room) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex justify-between items-center relative">
            <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-200 -z-10" />
            <div
              className="absolute left-0 right-0 top-1/2 h-1 bg-primary transition-all duration-300"
              style={{ width: `${((currentStep - 1) / (BOOKING_STEPS.length - 1)) * 100}%` }}
            />
            {BOOKING_STEPS.map((step) => (
              <div key={step.id} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300
                  ${step.id <= currentStep ? 'bg-primary text-white' : 'bg-gray-200 text-gray-400'}`}>
                  <step.icon className="w-5 h-5" />
                </div>
                <span className={`mt-2 text-sm font-medium transition-colors duration-300 ${step.id <= currentStep ? 'text-primary' : 'text-gray-400'
                  }`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Booking Summary Card */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <FaBed className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{room.name}</h3>
                    <p className="text-sm text-gray-600">{room.type}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <FaCalendar className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Stay Duration</h3>
                    <p className="text-sm text-gray-600">
                      {formatDate(searchParams.get('checkIn'))} - {formatDate(searchParams.get('checkOut'))}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <FaUser className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Guests</h3>
                    <p className="text-sm text-gray-600">{searchParams.get('guests')} person(s)</p>
                  </div>
                </div>

                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Room Rate</span>
                    <span className="font-medium">${room.price}/night</span>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-gray-600">Total Nights</span>
                    <span className="font-medium">15 nights</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold mt-4 pt-4 border-t">
                    <span>Total</span>
                    <span>${room.price * 15}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-2">
            {currentStep === 1 ? (
              <form onSubmit={handleSubmit} className="space-y-8">
                {renderStepContent()}
              </form>
            ) : (
              <div className="space-y-8">
                {renderStepContent()}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
} 