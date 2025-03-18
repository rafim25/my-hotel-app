'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

const ReviewForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    rating: 0,
    name: '',
    comment: ''
  });
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      date: new Date().toLocaleDateString()
    });
    setFormData({ rating: 0, name: '', comment: '' });
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-lg shadow-sm border"
      onSubmit={handleSubmit}
    >
      <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
      
      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-2">Rating</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <motion.button
              key={star}
              type="button"
              whileHover={{ scale: 1.2 }}
              onClick={() => setFormData({ ...formData, rating: star })}
              onMouseEnter={() => setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(0)}
              className="text-2xl focus:outline-none"
            >
              <FaStar
                className={
                  star <= (hoveredStar || formData.rating)
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }
              />
            </motion.button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-2">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-2">Review</label>
        <textarea
          value={formData.comment}
          onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
          rows={4}
          required
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition-colors"
      >
        Submit Review
      </motion.button>
    </motion.form>
  );
};

export default ReviewForm; 