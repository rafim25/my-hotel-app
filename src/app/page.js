import Image from "next/image";
import Navbar from '@/components/Navbar';
import BookingForm from '@/components/BookingForm';
import ServiceCard from '@/components/ServiceCard';
import Link from 'next/link';
import Footer from '@/components/Footer';
import SpecialOfferCard from '@/components/SpecialOfferCard';
import HeroCarousel from '@/components/HeroCarousel';
import ScrollToTop from '@/components/ScrollToTop';

const services = [
  {
    title: 'Luxury Rooms',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39',
    href: '/rooms'
  },
  {
    title: 'Fine Dining',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0',
    href: '/dining'
  },
  {
    title: 'Spa & Wellness',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874',
    href: '/spa'
  },
  {
    title: 'Events & Weddings',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3',
    href: '/events'
  },
  {
    title: 'Conferences & Meetings',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205',
    href: '/meetings'
  },
  {
    title: 'Services & Facilities',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b',
    href: '/services'
  },
  {
    title: 'Fitness Center',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48',
    href: '/fitness'
  },
  {
    title: 'Wedding Package',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552',
    href: '/weddings'
  }
];

const specialOffers = [
  {
    title: 'Weekend Getaway',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
    price: 299,
    discount: 20,
    description: 'Enjoy a luxurious weekend stay with breakfast included'
  },
  {
    title: 'Honeymoon Package',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
    price: 599,
    discount: 15,
    description: 'Special package for newlyweds with romantic dinner'
  },
  {
    title: 'Business Package',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a',
    rating: 4.9,
    description: 'Perfect for corporate stays with meeting room access',
    price: 999
  },
  {
    title: 'Family Vacation',
    image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6',
    rating: 4.7,
    description: 'Spacious suite with activities for the whole family',
    price: 499
  }
];

export default function Home() {
  return (
    <>
      <ScrollToTop />
      <main className="min-h-screen">
        {/* <Navbar /> */}
        
        {/* Hero Section */}
        <HeroCarousel />

        {/* Booking Form */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <BookingForm />
        </div>

        {/* Services Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover our wide range of premium services designed to make your stay unforgettable
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <ServiceCard key={index} {...service} />
              ))}
            </div>
          </div>
        </section>

        {/* Special Offers */}
        <section className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
              <div>
                <span className="text-primary font-semibold">Special Offers</span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2">Best offers of the month</h2>
                <p className="text-gray-600 mt-2 max-w-2xl">
                  Experience fantastic benefits and get better rates when you make a direct booking
                </p>
              </div>
              <Link href="/offers" className="mt-4 md:mt-0 text-primary hover:underline font-semibold">
                View all offers →
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {specialOffers.map((offer, index) => (
                <SpecialOfferCard key={index} {...offer} />
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="bg-primary text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Newsletter & Special Promo</h2>
                <p className="text-white/90">Subscribe to get special offers and updates</p>
              </div>
              <div className="w-full md:w-auto">
                <form className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="px-6 py-3 rounded-md w-full sm:w-80 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <button className="bg-white text-primary px-8 py-3 rounded-md hover:bg-gray-100 transition-colors font-semibold">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
