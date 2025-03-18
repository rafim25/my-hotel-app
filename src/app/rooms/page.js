import Image from 'next/image';
import { ScrollReveal } from '@/components/ScrollReveal';
import RoomComparison from '@/components/RoomComparison';
import RoomCard from '@/components/RoomCard';
import OptimizedImage from '@/components/OptimizedImage';

const rooms = [
  {
    id: 1,
    name: 'Deluxe Room',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39',
    description: 'Spacious room with city view',
    price: 299,
    features: ['King Bed', 'City View', 'Free WiFi', 'Mini Bar']
  },
  {
    id: 2,
    name: 'Executive Suite',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b',
    description: 'Luxury suite with separate living area',
    price: 499,
    features: ['King Bed', 'Ocean View', 'Living Room', 'Butler Service']
  },
  {
    id: 3,
    name: 'Family Room',
    image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6',
    description: 'Perfect for families with extra space',
    price: 399,
    features: ['2 Queen Beds', 'Kids Area', 'Kitchenette', 'Game Console']
  },
  {
    id: 4,
    name: 'Presidential Suite',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a',
    description: 'Ultimate luxury with panoramic views',
    price: 999,
    features: ['Master Suite', 'Private Terrace', 'Dining Room', 'Private Chef']
  }
];

const RoomsPage = () => {
  return (
    <main className="pt-16">
      {/* Hero Section */}
      <div className="relative h-[400px]">
        <OptimizedImage
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"
          alt="Luxury Rooms"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Rooms & Suites
            </h1>
            <p className="text-xl text-white/90">
              Experience luxury and comfort in our carefully designed accommodations
            </p>
          </div>
        </div>
      </div>

      {/* Room Categories */}
      <ScrollReveal>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Room Comparison */}
      <ScrollReveal>
        <RoomComparison />
      </ScrollReveal>

      {/* Room Features */}
      <ScrollReveal>
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              Room Features & Amenities
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Add feature cards here */}
            </div>
          </div>
        </section>
      </ScrollReveal>
    </main>
  );
};

export default RoomsPage; 