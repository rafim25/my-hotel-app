'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import {
  FaBed, FaWifi, FaCity, FaCoffee, FaGamepad,
  FaChild, FaConciergeBell, FaParking, FaTv, FaCouch,
  FaCheck, FaInfoCircle, FaStar, FaChevronLeft, FaChevronRight, FaCalendar, FaUser
} from 'react-icons/fa';
import RoomReviews from '@/components/RoomReviews';
import { mockRooms, mockReviews } from '@/utils/mockData';
import AuthModal from '@/components/AuthModal';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const amenityIcons = {
  'King Bed': { icon: <FaBed />, description: 'Comfortable king-size bed' },
  'City View': { icon: <FaCity />, description: 'Stunning city views' },
  'Free WiFi': { icon: <FaWifi />, description: 'High-speed internet' },
  'Mini Bar': { icon: <FaCoffee />, description: 'Fully stocked mini bar' },
  'Kids Area': { icon: <FaChild />, description: 'Child-friendly space' },
  'Game Console': { icon: <FaGamepad />, description: 'Gaming entertainment' },
  'Room Service': { icon: <FaConciergeBell />, description: '24/7 room service' },
  'Parking': { icon: <FaParking />, description: 'Secure parking available' },
  'Smart TV': { icon: <FaTv />, description: 'Smart TV with streaming' },
  'Living Room': { icon: <FaCouch />, description: 'Separate living area' }
};

export default function RoomDetail() {
  const { id } = useParams();
  const room = mockRooms.find(r => r.id.toString() === id);
  const reviews = mockReviews[id] || [];
  const router = useRouter();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user } = useAuth();
  const [bookingDetails, setBookingDetails] = useState({
    checkIn: null,
    checkOut: null,
    guests: 1,
  });

  if (!room) return <div>Room not found</div>;

  const ImageCarousel = () => {
    return (
      <div className="relative h-[500px] rounded-xl overflow-hidden mb-8 group">
        <Image
          src={room.images[currentImageIndex]}
          alt={`${room.name} view ${currentImageIndex + 1}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority
        />

        {/* Navigation Arrows - Show on hover */}
        <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setCurrentImageIndex((prev) =>
              prev === 0 ? room.images.length - 1 : prev - 1
            )}
            className="p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
          >
            <FaChevronLeft size={24} />
          </button>
          <button
            onClick={() => setCurrentImageIndex((prev) =>
              prev === room.images.length - 1 ? 0 : prev + 1
            )}
            className="p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
          >
            <FaChevronRight size={24} />
          </button>
        </div>

        {/* Image Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {room.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex
                  ? 'bg-white w-8'
                  : 'bg-white/50'
                }`}
            />
          ))}
        </div>

        {/* Thumbnail Strip */}
        <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-center gap-2">
          {room.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`relative w-16 h-16 rounded-lg overflow-hidden transition-all ${index === currentImageIndex
                  ? 'ring-2 ring-primary ring-offset-2'
                  : 'opacity-70'
                }`}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    );
  };

  const handleBookNow = () => {
    if (!bookingDetails.checkIn || !bookingDetails.checkOut) {
      toast.error('Please select check-in and check-out dates');
      return;
    }

    if (!user) {
      setShowAuthModal(true);
    } else {
      const queryParams = new URLSearchParams({
        roomId: id,
        checkIn: bookingDetails.checkIn.toISOString(),
        checkOut: bookingDetails.checkOut.toISOString(),
        guests: bookingDetails.guests,
      }).toString();

      router.push(`/booking/summary?${queryParams}`);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    const queryParams = new URLSearchParams({
      roomId: id,
      checkIn: bookingDetails.checkIn.toISOString(),
      checkOut: bookingDetails.checkOut.toISOString(),
      guests: bookingDetails.guests,
    }).toString();

    router.push(`/booking/summary?${queryParams}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Room Images */}
      <ImageCarousel />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Room Details */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{room.name}</h1>
          <p className="text-gray-600 mb-6">{room.description}</p>

          {/* Features */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Room Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(room.features).map(([feature, available]) => (
                available && (
                  <motion.div
                    key={feature}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-primary/5 transition-colors group"
                  >
                    <motion.span
                      whileHover={{ rotate: 15 }}
                      className="p-2 rounded-full bg-primary/10"
                    >
                      {amenityIcons[feature]?.icon || <FaCheck />}
                    </motion.span>
                    <div>
                      <span className="text-gray-700 font-medium">{feature}</span>
                      <p className="text-sm text-gray-500 hidden group-hover:block">
                        {amenityIcons[feature]?.description}
                      </p>
                    </div>
                  </motion.div>
                )
              ))}
            </div>
          </div>

          {/* Policies */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Room Policies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <FaInfoCircle className="text-primary mt-1" />
                <div>
                  <h3 className="font-medium">Check-in</h3>
                  <p className="text-gray-600">From 14:00</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <FaInfoCircle className="text-primary mt-1" />
                <div>
                  <h3 className="font-medium">Check-out</h3>
                  <p className="text-gray-600">Until 12:00</p>
                </div>
              </div>
              {/* Add more policies as needed */}
            </div>
          </div>

          {/* Reviews Section */}
          <RoomReviews reviews={reviews} />
        </div>

        {/* Booking Card */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg p-6 sticky top-24"
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <span className="text-3xl font-bold text-primary">₹{room.price}</span>
                <span className="text-gray-600">/night</span>
              </div>
              <div className="flex gap-1">
                <FaStar className="text-yellow-400" />
                <span className="font-medium">{room.rating}</span>
              </div>
            </div>

            {/* Date Selection */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                <div className="relative">
                  <DatePicker
                    selected={bookingDetails.checkIn}
                    onChange={date => setBookingDetails(prev => ({ ...prev, checkIn: date }))}
                    minDate={new Date()}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholderText="Select check-in date"
                  />
                  <FaCalendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                <div className="relative">
                  <DatePicker
                    selected={bookingDetails.checkOut}
                    onChange={date => setBookingDetails(prev => ({ ...prev, checkOut: date }))}
                    minDate={bookingDetails.checkIn || new Date()}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholderText="Select check-out date"
                  />
                  <FaCalendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                <div className="relative">
                  <select
                    value={bookingDetails.guests}
                    onChange={(e) => setBookingDetails(prev => ({ ...prev, guests: Number(e.target.value) }))}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none"
                  >
                    {[...Array(room.maxOccupancy)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                  <FaUser className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBookNow}
              className="w-full py-3 bg-primary text-white rounded-lg font-medium 
                hover:bg-primary-dark transition-colors"
            >
              Book Now
            </motion.button>

            <div className="mt-6 space-y-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <FaCheck className="text-primary" />
                <span>Free cancellation up to 24 hours before check-in</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheck className="text-primary" />
                <span>No prepayment needed</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheck className="text-primary" />
                <span>Pay at the property</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Add AuthModal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
        bookingDetails={{
          roomId: id,
          roomName: room.name,
          price: room.price,
          checkIn: bookingDetails.checkIn,
          checkOut: bookingDetails.checkOut,
          guests: bookingDetails.guests,
        }}
      />

      {/* Add ToastContainer */}
      <ToastContainer />
    </div>
  );
} 