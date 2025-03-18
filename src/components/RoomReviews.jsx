'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaUser, FaCalendar } from 'react-icons/fa';
import { mockReviews } from '@/utils/mockData';

const StarRating = ({ rating }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <FaStar
        key={star}
        className={star <= rating ? 'text-yellow-400' : 'text-gray-300'}
      />
    ))}
  </div>
);

const ReviewCard = ({ review }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="bg-white rounded-lg shadow-md p-6"
  >
    <div className="flex items-start gap-4">
      <img
        src={review.avatar}
        alt={review.userName}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-semibold text-gray-900">{review.userName}</h4>
            <StarRating rating={review.rating} />
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <FaCalendar className="mr-2" />
            {new Date(review.date).toLocaleDateString()}
          </div>
        </div>
        <p className="mt-3 text-gray-600">{review.comment}</p>
      </div>
    </div>
  </motion.div>
);

export default function RoomReviews({ roomId }) {
  const [showAll, setShowAll] = useState(false);
  const reviews = mockReviews[roomId] || [];
  const displayReviews = showAll ? reviews : reviews.slice(0, 2);

  if (!reviews.length) {
    return (
      <div className="text-center text-gray-500 py-8">
        No reviews yet for this room.
      </div>
    );
  }

  const averageRating = (
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
  ).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-semibold text-gray-900">Guest Reviews</h3>
          <div className="flex items-center gap-2 mt-2">
            <StarRating rating={Math.round(averageRating)} />
            <span className="text-lg font-semibold text-gray-700">
              {averageRating}
            </span>
            <span className="text-gray-500">
              ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {displayReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </AnimatePresence>
      </div>

      {reviews.length > 2 && (
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2 text-primary hover:text-primary-dark font-medium"
          >
            {showAll ? 'Show Less' : 'Show All Reviews'}
          </motion.button>
        </div>
      )}
    </div>
  );
} 