'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalendar, FaUsers } from 'react-icons/fa';
import BookingConfirmation from './BookingConfirmation';

const RoomAvailability = ({ room }) => {
  const [dates, setDates] = useState({ checkIn: '', checkOut: '' });
  const [guests, setGuests] = useState({ adults: 1, children: 0 });
  const [availability, setAvailability] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Simulated room availability data
  const bookedDates = [
    { start: '2024-03-15', end: '2024-03-20' },
    { start: '2024-04-01', end: '2024-04-05' },
  ];

  const isDateBooked = (date) => {
    return bookedDates.some(booking => {
      const checkDate = new Date(date);
      const start = new Date(booking.start);
      const end = new Date(booking.end);
      return checkDate >= start && checkDate <= end;
    });
  };

  const checkAvailability = async () => {
    setLoading(true);
    try {
      const checkInDate = new Date(dates.checkIn);
      const checkOutDate = new Date(dates.checkOut);
      
      // Check if any date in the range is booked
      let currentDate = new Date(checkInDate);
      let available = true;
      
      while (currentDate <= checkOutDate) {
        if (isDateBooked(currentDate)) {
          available = false;
          break;
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }

      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay

      setAvailability({
        available,
        message: available 
          ? 'Room is available for the selected dates!'
          : 'Sorry, room is not available for these dates.',
        price: available ? room.price : null
      });
    } catch (error) {
      console.error('Error checking availability:', error);
      setAvailability({
        available: false,
        message: 'Error checking availability. Please try again.',
      });
    }
    setLoading(false);
  };

  const handleBookNow = () => {
    setShowConfirmation(true);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold mb-4">Check Availability</h3>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm text-gray-600 mb-2">Check-in</label>
          <div className="relative">
            <FaCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="date"
              value={dates.checkIn}
              onChange={(e) => setDates({ ...dates, checkIn: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-2">Check-out</label>
          <div className="relative">
            <FaCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="date"
              value={dates.checkOut}
              onChange={(e) => setDates({ ...dates, checkOut: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
              min={dates.checkIn}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm text-gray-600 mb-2">Adults</label>
          <div className="relative">
            <FaUsers className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              value={guests.adults}
              onChange={(e) => setGuests({ ...guests, adults: Number(e.target.value) })}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
            >
              {[1, 2, 3, 4].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-2">Children</label>
          <div className="relative">
            <FaUsers className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              value={guests.children}
              onChange={(e) => setGuests({ ...guests, children: Number(e.target.value) })}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
            >
              {[0, 1, 2, 3].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={checkAvailability}
        disabled={loading || !dates.checkIn || !dates.checkOut}
        className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
      >
        {loading ? 'Checking...' : 'Check Availability'}
      </motion.button>

      {availability && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-4 p-4 rounded-lg ${
            availability.available ? 'bg-green-50' : 'bg-red-50'
          }`}
        >
          <p className={availability.available ? 'text-green-700' : 'text-red-700'}>
            {availability.message}
          </p>
          {availability.available && (
            <p className="text-green-700 font-semibold mt-2">
              Total: ${availability.price} per night
            </p>
          )}
        </motion.div>
      )}

      {availability?.available && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleBookNow}
          className="mt-4 w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition-colors"
        >
          Book Now
        </motion.button>
      )}

      {showConfirmation && (
        <BookingConfirmation
          booking={{
            ...dates,
            guests,
            price: room.price,
            roomName: room.name,
          }}
          onConfirm={(bookingData) => {
            console.log('Booking confirmed:', bookingData);
            // Handle booking confirmation
          }}
          onCancel={() => setShowConfirmation(false)}
        />
      )}
    </div>
  );
};

export default RoomAvailability; 