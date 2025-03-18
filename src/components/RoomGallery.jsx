'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaArrowRight, FaTimes } from 'react-icons/fa';
import OptimizedImage from './OptimizedImage';

export default function RoomGallery({ images = [] }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images.length) {
    return (
      <div className="bg-gray-100 rounded-lg p-4 text-center">
        No images available
      </div>
    );
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative h-[400px] rounded-lg overflow-hidden">
        <OptimizedImage
          src={images[currentIndex]}
          alt={`Room view ${currentIndex + 1}`}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <button
            onClick={handlePrev}
            className="p-2 bg-black/30 hover:bg-black/50 rounded-full text-white transition-colors"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={handleNext}
            className="p-2 bg-black/30 hover:bg-black/50 rounded-full text-white transition-colors"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden 
              ${currentIndex === index ? 'ring-2 ring-primary' : ''}`}
          >
            <OptimizedImage
              src={image}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300"
            >
              <FaTimes size={24} />
            </button>
            <div className="relative w-full max-w-6xl h-[80vh]">
              <OptimizedImage
                src={images[selectedImage]}
                alt={`Full view ${selectedImage + 1}`}
                fill
                className="object-contain"
              />
              <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-2 h-2 rounded-full ${
                      selectedImage === index ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 