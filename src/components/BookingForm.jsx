'use client';
import { useState, useRef, useEffect } from 'react';
import { FaRegCalendarAlt, FaUser, FaMinus, FaPlus } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const BookingForm = () => {
  const [activeTab, setActiveTab] = useState('overnight');
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [bookingData, setBookingData] = useState({
    checkIn: new Date(),
    checkOut: new Date(new Date().setDate(new Date().getDate() + 1)),
    room: 1,
    adult: 1,
    children: 0
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowGuestDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDateChange = (date, type) => {
    if (type === 'checkIn') {
      const nextDay = new Date(date);
      nextDay.setDate(date.getDate() + 1);

      setBookingData(prev => ({
        ...prev,
        checkIn: date,
        checkOut: prev.checkOut <= date ? nextDay : prev.checkOut
      }));
    } else {
      setBookingData(prev => ({
        ...prev,
        checkOut: date
      }));
    }
  };

  const handleGuestChange = (type, operation) => {
    const limits = {
      room: { min: 1, max: 10 },
      adult: { min: 1, max: 20 },
      children: { min: 0, max: 10 }
    };

    setBookingData(prev => ({
      ...prev,
      [type]: operation === 'add'
        ? Math.min(prev[type] + 1, limits[type].max)
        : Math.max(prev[type] - 1, limits[type].min)
    }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-3xl mx-auto -mt-28 relative z-10">
      {/* Stay Type Tabs */}
      <div className="flex gap-2 mb-6 justify-center">
        <button
          onClick={() => setActiveTab('overnight')}
          className={`rounded-full px-6 py-2.5 text-sm font-medium transition-colors
            ${activeTab === 'overnight'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          Overnight Stays
        </button>
        <button
          onClick={() => setActiveTab('dayuse')}
          className={`rounded-full px-6 py-2.5 text-sm font-medium transition-colors
            ${activeTab === 'dayuse'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          Day Use Stays
        </button>
      </div>

      {/* Search Form */}
      <div className="space-y-4">
        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10">
              <FaRegCalendarAlt className="text-gray-400" />
            </div>
            <DatePicker
              selected={bookingData.checkIn}
              onChange={(date) => handleDateChange(date, 'checkIn')}
              selectsStart
              startDate={bookingData.checkIn}
              endDate={bookingData.checkOut}
              minDate={new Date()}
              dateFormat="dd MMM yyyy"
              className="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-200 cursor-pointer"
              placeholderText="Check-in"
            />
            <div className="text-xs text-gray-500 mt-1 ml-1">Check-in</div>
          </div>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10">
              <FaRegCalendarAlt className="text-gray-400" />
            </div>
            <DatePicker
              selected={bookingData.checkOut}
              onChange={(date) => handleDateChange(date, 'checkOut')}
              selectsEnd
              startDate={bookingData.checkIn}
              endDate={bookingData.checkOut}
              minDate={bookingData.checkIn}
              dateFormat="dd MMM yyyy"
              className="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-200 cursor-pointer"
              placeholderText="Check-out"
            />
            <div className="text-xs text-gray-500 mt-1 ml-1">Check-out</div>
          </div>
        </div>

        {/* Guests & Room Selector */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setShowGuestDropdown(!showGuestDropdown)}
            className="w-full px-4 py-3 border rounded-lg text-left flex items-center gap-3"
          >
            <FaUser className="text-gray-400" />
            <span>
              {bookingData.room} room · {bookingData.adult} adult
              {bookingData.children > 0 ? ` · ${bookingData.children} children` : ''}
            </span>
          </button>

          {/* Dropdown Panel */}
          {showGuestDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg p-4 z-50">
              {/* Room Counter */}
              <div className="flex items-center justify-between py-3">
                <span>Room</span>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => handleGuestChange('room', 'subtract')}
                    className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100"
                  >
                    <FaMinus className="text-xs" />
                  </button>
                  <span className="w-6 text-center">{bookingData.room}</span>
                  <button
                    type="button"
                    onClick={() => handleGuestChange('room', 'add')}
                    className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100"
                  >
                    <FaPlus className="text-xs" />
                  </button>
                </div>
              </div>

              {/* Adult Counter */}
              <div className="flex items-center justify-between py-3 border-t">
                <div>
                  <div>Adult</div>
                  <div className="text-sm text-gray-500">Ages 18 or above</div>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => handleGuestChange('adult', 'subtract')}
                    className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100"
                  >
                    <FaMinus className="text-xs" />
                  </button>
                  <span className="w-6 text-center">{bookingData.adult}</span>
                  <button
                    type="button"
                    onClick={() => handleGuestChange('adult', 'add')}
                    className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100"
                  >
                    <FaPlus className="text-xs" />
                  </button>
                </div>
              </div>

              {/* Children Counter */}
              <div className="flex items-center justify-between py-3 border-t">
                <div>
                  <div>Children</div>
                  <div className="text-sm text-gray-500">Ages 0-17</div>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => handleGuestChange('children', 'subtract')}
                    className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100"
                  >
                    <FaMinus className="text-xs" />
                  </button>
                  <span className="w-6 text-center">{bookingData.children}</span>
                  <button
                    type="button"
                    onClick={() => handleGuestChange('children', 'add')}
                    className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100"
                  >
                    <FaPlus className="text-xs" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium text-lg hover:bg-blue-700 transition-colors"
        >
          SEARCH
        </button>
      </div>
    </div>
  );
};

// Add custom styles for the date picker
const datePickerStyles = `
  .react-datepicker {
    font-family: inherit;
    border-radius: 0.5rem;
    border: 1px solid #e5e7eb;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  .react-datepicker__header {
    background-color: white;
    border-bottom: 1px solid #e5e7eb;
    border-radius: 0.5rem 0.5rem 0 0;
  }
  .react-datepicker__day--selected {
    background-color: #2563eb;
    border-radius: 0.375rem;
  }
  .react-datepicker__day--in-range {
    background-color: #bfdbfe;
    border-radius: 0;
  }
  .react-datepicker__day--keyboard-selected {
    background-color: #93c5fd;
    border-radius: 0.375rem;
  }
`;

// Add the styles to the document
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = datePickerStyles;
  document.head.appendChild(style);
}

export default BookingForm;