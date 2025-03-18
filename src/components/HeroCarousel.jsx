'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';

const images = [
  {
    src: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb',
    title: 'Luxury Accommodations',
    subtitle: 'Experience comfort at its finest'
  },
  {
    src: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa',
    title: 'Exquisite Dining',
    subtitle: 'Savor world-class cuisine'
  },
  {
    src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d',
    title: 'Premium Amenities',
    subtitle: 'Indulge in luxury services'
  }
];

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
  });

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[600px] sm:h-[700px]">
      <div {...handlers} className="relative w-full h-full overflow-hidden">
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentIndex].src}
              alt="Hotel View"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30" />
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative z-10 h-full flex items-center"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                  {images[currentIndex].title}
                </h1>
                <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
                  {images[currentIndex].subtitle}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-white w-8' : 'bg-white/50'
                }`}
            />
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
        >
          ←
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
        >
          →
        </button>
      </div>
    </div>
  );
};

export default HeroCarousel; 