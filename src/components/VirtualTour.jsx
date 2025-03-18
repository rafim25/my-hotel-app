'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaPause, FaExpand, FaCompress } from 'react-icons/fa';
import Image from 'next/image';

const tourSpots = [
  {
    id: 1,
    title: 'Lobby',
    description: 'Experience our grand entrance and welcoming atmosphere',
    image: '/images/virtual-tour/lobby.jpg',
    video: '/videos/lobby-tour.mp4',
  },
  {
    id: 2,
    title: 'Deluxe Suite',
    description: 'Explore our luxurious suites with panoramic views',
    image: '/images/virtual-tour/suite.jpg',
    video: '/videos/suite-tour.mp4',
  },
  // Add more tour spots
];

const VirtualTour = () => {
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold mb-8">Virtual Tour</h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tourSpots.map((spot) => (
          <motion.div
            key={spot.id}
            whileHover={{ scale: 1.02 }}
            className="relative rounded-lg overflow-hidden cursor-pointer"
            onClick={() => setSelectedSpot(spot)}
          >
            <Image
              src={spot.image}
              alt={spot.title}
              width={400}
              height={300}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-center text-white p-4">
                <h3 className="text-xl font-semibold mb-2">{spot.title}</h3>
                <p className="text-sm opacity-80">{spot.description}</p>
                <FaPlay className="mx-auto mt-4" size={24} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tour Modal */}
      <AnimatePresence>
        {selectedSpot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          >
            <div className="relative w-full max-w-6xl mx-4">
              <button
                onClick={() => setSelectedSpot(null)}
                className="absolute -top-12 right-0 text-white"
              >
                Close
              </button>
              
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <video
                  src={selectedSpot.video}
                  className="w-full h-full object-cover"
                  controls={false}
                  autoPlay={isPlaying}
                  loop
                />
                
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white text-xl font-semibold">
                        {selectedSpot.title}
                      </h3>
                      <p className="text-white/80 text-sm">
                        {selectedSpot.description}
                      </p>
                    </div>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="text-white hover:text-primary transition-colors"
                      >
                        {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
                      </button>
                      <button
                        onClick={toggleFullscreen}
                        className="text-white hover:text-primary transition-colors"
                      >
                        {isFullscreen ? (
                          <FaCompress size={20} />
                        ) : (
                          <FaExpand size={20} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VirtualTour; 