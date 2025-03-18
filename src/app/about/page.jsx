import { ScrollReveal } from '@/components/ScrollReveal';
import { FaHotel, FaUsers, FaStar, FaGlobe } from 'react-icons/fa';
import OptimizedImage from '@/components/OptimizedImage';

const stats = [
  { icon: <FaHotel />, label: 'Luxury Rooms', value: '200+' },
  { icon: <FaUsers />, label: 'Happy Guests', value: '10K+' },
  { icon: <FaStar />, label: 'Rating', value: '4.9' },
  { icon: <FaGlobe />, label: 'Locations', value: '5' },
];

const AboutPage = () => {
  return (
    <main className="pt-20">
      <ScrollReveal>
        <section className="relative h-[400px]">
          <OptimizedImage
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"
            alt="About LuxStay"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
              About LuxStay
            </h1>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-gray-600 mb-4">
                  Founded in 2010, LuxStay has been redefining luxury hospitality. 
                  We believe in creating unforgettable experiences that combine 
                  comfort, elegance, and exceptional service.
                </p>
                <p className="text-gray-600">
                  Our commitment to excellence has earned us numerous accolades 
                  and the trust of guests from around the world.
                </p>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
                  alt="Hotel Lobby"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-6 bg-white rounded-lg shadow-sm"
                >
                  <div className="text-3xl text-primary mb-4">{stat.icon}</div>
                  <div className="text-2xl font-bold mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Excellence',
                  description: 'We strive for perfection in every detail.',
                },
                {
                  title: 'Hospitality',
                  description: 'Making every guest feel at home.',
                },
                {
                  title: 'Innovation',
                  description: 'Constantly evolving to exceed expectations.',
                },
              ].map((value, index) => (
                <div key={index} className="text-center">
                  <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>
    </main>
  );
};

export default AboutPage; 