'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const RoomCalendar = ({ roomId }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState({ start: null, end: null });

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const handleDateClick = (day) => {
    if (!day) return;

    const clickedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );

    if (!selectedDates.start || (selectedDates.start && selectedDates.end)) {
      setSelectedDates({ start: clickedDate, end: null });
    } else {
      if (clickedDate < selectedDates.start) {
        setSelectedDates({ start: clickedDate, end: selectedDates.start });
      } else {
        setSelectedDates({ ...selectedDates, end: clickedDate });
      }
    }
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={prevMonth}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <FaChevronLeft />
        </button>
        <h3 className="text-lg font-semibold">
          {currentDate.toLocaleString('default', {
            month: 'long',
            year: 'numeric',
          })}
        </h3>
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <FaChevronRight />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
        {generateCalendarDays().map((day, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleDateClick(day)}
            className={`
              aspect-square rounded-full flex items-center justify-center text-sm
              ${!day ? 'invisible' : 'hover:bg-primary hover:text-white'}
              ${
                selectedDates.start &&
                day === selectedDates.start.getDate() &&
                currentDate.getMonth() === selectedDates.start.getMonth()
                  ? 'bg-primary text-white'
                  : ''
              }
              ${
                selectedDates.end &&
                day === selectedDates.end.getDate() &&
                currentDate.getMonth() === selectedDates.end.getMonth()
                  ? 'bg-primary text-white'
                  : ''
              }
            `}
          >
            {day}
          </motion.button>
        ))}
      </div>

      {selectedDates.start && selectedDates.end && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            Selected dates:{' '}
            <span className="font-semibold">
              {selectedDates.start.toLocaleDateString()} -{' '}
              {selectedDates.end.toLocaleDateString()}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default RoomCalendar; 