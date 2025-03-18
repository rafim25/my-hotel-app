'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaUser } from 'react-icons/fa';
import Image from 'next/image';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/rooms', label: 'Rooms' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/bookings', label: 'My Bookings' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 
        ${isScrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-md py-2 border-b border-primary/10'
          : 'bg-transparent py-4'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="Unnata Forest View"
              width={150}
              height={50}
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative group"
              >
                <span className={`text-sm font-medium transition-colors group-hover:text-primary
                  ${pathname === item.href ? 'text-primary' : 'text-gray-600'}`}
                >
                  {item.label}
                </span>
                {/* Active indicator */}
                {pathname === item.href && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary/80 shadow-[0_0_8px_rgba(42,157,143,0.5)]"
                    initial={false}
                  />
                )}
                {/* Hover indicator */}
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary/40 scale-x-0 group-hover:scale-x-100 transition-transform" />
              </Link>
            ))}
            <Link
              href="/account"
              className="p-2.5 rounded-full bg-primary/5 hover:bg-primary/10 transition-colors"
            >
              <FaUser className="text-primary" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-primary/5 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <FaTimes className="text-primary" />
            ) : (
              <FaBars className="text-primary" />
            )}
          </button>
        </nav>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block relative group"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className={`text-sm font-medium transition-colors block py-2
                      ${pathname === item.href
                        ? 'text-primary bg-primary/5 pl-4 rounded-lg'
                        : 'text-gray-600 hover:text-primary hover:bg-primary/5 pl-4 rounded-lg'
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header; 