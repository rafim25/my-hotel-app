import Image from 'next/image';
import { ScrollReveal } from '@/components/ScrollReveal';
import { FaStar, FaUsers, FaHotel, FaAward } from 'react-icons/fa';

const stats = [
  {
    icon: <FaStar className="text-4xl text-primary" />,
    value: '4.9',
    label: 'Average Rating',
    suffix: '/5'
  },
  {
    icon: <FaUsers className="text-4xl text-primary" />,
    value: '50K+',
    label: 'Happy Guests',
  },
  {
    icon: <FaHotel className="text-4xl text-primary" />,
    value: '200+',
    label: 'Luxury Rooms',
  },
  {
    icon: <FaAward className="text-4xl text-primary" />,
    value: '15+',
    label: 'Awards Won',
  }
];

const team = [
  {
    name: 'John Smith',
    position: 'General Manager',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a',
  },
  {
    name: 'Sarah Johnson',
    position: 'Head Chef',
    image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548',
  },
  {
    name: 'Michael Brown',
    position: 'Customer Relations',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e',
  },
  // Add more team members
];

const AboutPage = () => {
  return (
    <main className="pt-16">
      {/* Hero Section */}
      <div className="relative h-[500px]">
        <Image
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"
          alt="Hotel Exterior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Our Story
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Experience luxury and comfort at its finest in our carefully curated spaces
            </p>
          </div>
        </div>
      </div>

      {/* About Content */}
      <ScrollReveal>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  Luxury Redefined Since 1995
                </h2>
                <p className="text-gray-600 mb-6">
                  For over 25 years, we have been providing exceptional hospitality services
                  to guests from around the world. Our commitment to excellence and attention
                  to detail has made us a leading name in the luxury hotel industry.
                </p>
                <p className="text-gray-600">
                  We believe in creating memorable experiences for our guests through
                  personalized service, world-class amenities, and an unwavering dedication
                  to comfort and luxury.
                </p>
              </div>
              <div className="relative h-[400px]">
                <Image
                  src="https://images.unsplash.com/photo-1519974719765-e6559eac2575"
                  alt="Hotel Interior"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Stats Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <ScrollReveal key={index}>
                <div className="text-center">
                  <div className="flex justify-center mb-4">{stat.icon}</div>
                  <div className="text-4xl font-bold mb-2">
                    {stat.value}{stat.suffix || ''}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <ScrollReveal>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our dedicated team of professionals works tirelessly to ensure your stay
                exceeds expectations
              </p>
            </div>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="relative w-48 h-48 mx-auto mb-4">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-gray-600">{member.position}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Values Section */}
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="max-w-2xl mx-auto">
              These core values guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Excellence</h3>
              <p className="text-white/80">
                We strive for excellence in every aspect of our service
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Innovation</h3>
              <p className="text-white/80">
                Continuously improving and innovating our services
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Integrity</h3>
              <p className="text-white/80">
                Operating with honesty and transparency
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage; 