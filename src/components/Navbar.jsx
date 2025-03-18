'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MobileMenu from './MobileMenu';
import DarkModeToggle from './DarkModeToggle';
import BookingModal from './BookingModal';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm z-50 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Hotel Logo"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 dark:text-gray-200 hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-gray-700 dark:text-gray-200 hover:text-primary transition-colors">
                About1
              </Link>
              <Link href="/rooms" className="text-gray-700 dark:text-gray-200 hover:text-primary transition-colors">
                Rooms
              </Link>
              <Link href="/services" className="text-gray-700 dark:text-gray-200 hover:text-primary transition-colors">
                Services
              </Link>
              <Link href="/contact" className="text-gray-700 dark:text-gray-200 hover:text-primary transition-colors">
                Contact
              </Link>
              <DarkModeToggle />
              <button
                onClick={() => setIsBookingOpen(true)}
                className="btn-primary"
              >
                Book Now
              </button>
            </div>

            <MobileMenu />
          </div>
        </div>
      </motion.nav>

      <BookingModal
        isOpen={isBookingOpen}
        closeModal={() => setIsBookingOpen(false)}
      />
    </>
  );
};

export default Navbar; 