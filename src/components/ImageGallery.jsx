'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

const images = [
  {
    src: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461',
    title: 'Luxury Suite',
    description: 'Spacious suite with ocean view'
  },
  {
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
    title: 'Fine Dining',
    description: 'World-class restaurant'
  },
  {
    src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef',
    title: 'Spa & Wellness',
    description: 'Relaxation and rejuvenation'
  },
  // Add more images
];

const ImageGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="py-12">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="relative aspect-square cursor-pointer"
            onClick={() => {
              setSelectedImage(image);
              setCurrentIndex(index);
            }}
          >
            <Image
              src={image.src}
              alt={image.title}
              fill
              className="object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity rounded-lg">
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-lg font-semibold">{image.title}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300"
            >
              <FaTimes size={24} />
            </button>

            <button
              onClick={handlePrev}
              className="absolute left-4 text-white hover:text-gray-300"
            >
              <FaChevronLeft size={24} />
            </button>

            <div className="relative w-full max-w-4xl mx-4 aspect-video">
              <Image
                src={images[currentIndex].src}
                alt={images[currentIndex].title}
                fill
                className="object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-white text-xl font-semibold">
                  {images[currentIndex].title}
                </h3>
                <p className="text-white/80">
                  {images[currentIndex].description}
                </p>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="absolute right-4 text-white hover:text-gray-300"
            >
              <FaChevronRight size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageGallery; 