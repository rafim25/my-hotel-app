'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { FaHome, FaBed, FaCalendarAlt, FaUser, FaBars, FaTimes, FaPhone } from 'react-icons/fa';

const navItems = [
  { href: '/', label: 'Home', icon: <FaHome className="text-lg" /> },
  { href: '/rooms', label: 'Rooms', icon: <FaBed className="text-lg" /> },
  { href: '/bookings', label: 'My Bookings', icon: <FaCalendarAlt className="text-lg" /> },
  { href: '/contact', label: 'Contact', icon: <FaPhone className="text-lg" /> },
];

const navVariants = {
  hidden: { opacity: 0, y: -100 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export default function MainNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-20 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-sm shadow-lg border-b border-primary/10' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full">
          <div className="flex justify-between items-center h-full">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative w-48 h-12"
              >
                <Image
                  src="/logo.png"
                  alt="Unnata Forest View"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative group"
                >
                  <motion.div
                    whileHover={{ y: -2 }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium 
                      transition-all duration-200 ${
                        pathname === item.href
                          ? 'text-primary bg-primary/5'
                          : 'text-gray-600 hover:text-primary hover:bg-primary/5'
                      }`}
                  >
                    <span className="text-primary/80">{item.icon}</span>
                    <span>{item.label}</span>
                  </motion.div>
                  {pathname === item.href && (
                    <motion.div
                      layoutId="navunderline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary/80 shadow-[0_0_8px_rgba(42,157,143,0.5)]"
                      initial={false}
                    />
                  )}
                  {/* Hover indicator */}
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary/40 scale-x-0 group-hover:scale-x-100 transition-transform" />
                </Link>
              ))}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="ml-4 px-6 py-2 bg-primary text-white rounded-full font-medium 
                  hover:bg-primary-dark transition-all duration-200 flex items-center gap-2
                  shadow-sm hover:shadow-[0_0_8px_rgba(42,157,143,0.5)]"
              >
                <FaUser />
                <span>Sign In</span>
              </motion.button>
            </nav>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-full hover:bg-primary/5 text-primary transition-colors"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isMobileMenuOpen ? 'close' : 'menu'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-x-0 top-20 z-40 md:hidden bg-white/95 backdrop-blur-sm shadow-lg border-b border-primary/10"
          >
            <nav className="flex flex-col p-4 gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <motion.div
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      pathname === item.href
                        ? 'bg-primary/5 text-primary shadow-[0_0_8px_rgba(42,157,143,0.15)]'
                        : 'text-gray-600 hover:bg-primary/5 hover:text-primary'
                    }`}
                  >
                    <span className="text-primary/80">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </motion.div>
                </Link>
              ))}
              <motion.button
                whileTap={{ scale: 0.98 }}
                className="mt-2 w-full py-3 bg-primary text-white rounded-lg font-medium 
                  hover:bg-primary-dark transition-all duration-200 flex items-center justify-center gap-2
                  shadow-sm hover:shadow-[0_0_8px_rgba(42,157,143,0.5)]"
              >
                <FaUser />
                <span>Sign In</span>
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-20" />
    </>
  );
} 