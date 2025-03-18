'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaUser, FaQuoteLeft } from 'react-icons/fa';

const RoomReviews = ({ reviews = [] }) => {
  const [showAll, setShowAll] = useState(false);

  const displayedReviews = showAll ? reviews : reviews.slice(0, 3);
  const averageRating = reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length;

  return (
    <div className="py-8">
      <h3 className="text-2xl font-semibold mb-6">Guest Reviews</h3>
      
      {/* Rating Summary */}
      <div className="bg-primary/5 rounded-lg p-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="text-4xl font-bold text-primary">
            {averageRating.toFixed(1)}
          </div>
          <div>
            <div className="flex gap-1 mb-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={star <= averageRating ? 'text-yellow-400' : 'text-gray-300'}
                />
              ))}
            </div>
            <p className="text-gray-600">Based on {reviews.length} reviews</p>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        <AnimatePresence>
          {displayedReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg p-6 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                  {review.avatar ? (
                    <img src={review.avatar} alt={review.userName} className="object-cover" />
                  ) : (
                    <FaUser className="w-full h-full p-3 text-gray-400" />
                  )}
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{review.userName}</h4>
                      <div className="flex gap-1 my-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar
                            key={star}
                            className={star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}
                            size={14}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <div className="mt-3">
                    <FaQuoteLeft className="text-primary/20 text-xl mb-2" />
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {reviews.length > 3 && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAll(!showAll)}
          className="mt-6 w-full py-3 text-primary border-2 border-primary/20 rounded-lg 
            hover:bg-primary/5 transition-colors"
        >
          {showAll ? 'Show Less' : `Show All ${reviews.length} Reviews`}
        </motion.button>
      )}
    </div>
  );
};

export default RoomReviews; 