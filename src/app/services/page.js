import Image from 'next/image';
import { ScrollReveal } from '@/components/ScrollReveal';

const services = [
  {
    title: 'Restaurant & Bar',
    description: 'Experience fine dining with our world-class chefs',
    image: '/images/services/restaurant.jpg',
    features: [
      '24/7 Service',
      'International Cuisine',
      'Premium Bar Selection',
      'Private Dining Rooms'
    ]
  },
  {
    title: 'Spa & Wellness',
    description: 'Relax and rejuvenate with our premium spa services',
    image: '/images/services/spa.jpg',
    features: [
      'Massage Therapy',
      'Facial Treatments',
      'Yoga Classes',
      'Steam Room'
    ]
  },
  {
    title: 'Fitness Center',
    description: 'Stay fit with state-of-the-art equipment',
    image: '/images/services/gym.jpg',
    features: [
      'Modern Equipment',
      'Personal Trainers',
      '24/7 Access',
      'Group Classes'
    ]
  },
  // Add more services
];

const ServicesPage = () => {
  return (
    <main className="pt-16">
      {/* Hero Section */}
      <div className="relative h-[400px]">
        <Image
          src="/images/services-hero.jpg"
          alt="Hotel Services"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Services & Amenities
            </h1>
            <p className="text-xl text-white/90">
              Experience luxury with our premium services
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <ScrollReveal>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              {services.map((service, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-8">
                  <div className="relative w-full md:w-1/2 h-64">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-700">
                          <span className="w-2 h-2 bg-primary rounded-full mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* CTA Section */}
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience Luxury?</h2>
          <p className="text-xl mb-8">Book your stay now and enjoy our premium services</p>
          <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Book Now
          </button>
        </div>
      </section>
    </main>
  );
};

export default ServicesPage; 