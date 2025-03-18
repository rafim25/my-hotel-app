'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

const SpecialOfferCard = ({ title, description, image, price, discount }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-white rounded-lg overflow-hidden shadow-lg"
    >
      <div className="relative h-48">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
        {discount && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {discount}% OFF
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <div>
            {discount ? (
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-primary">
                  ${price - (price * discount / 100)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ${price}
                </span>
              </div>
            ) : (
              <span className="text-2xl font-bold text-primary">
                ${price}
              </span>
            )}
          </div>
          <button className="btn-primary">
            Book Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SpecialOfferCard; 