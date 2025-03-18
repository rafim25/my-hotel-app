'use client';
import { useState } from 'react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setStatus('success');
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    // Reset status after 3 seconds
    setTimeout(() => setStatus(null), 3000);
  };

  return (
    <main className="pt-20">
      <ScrollReveal>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
              <p className="text-gray-600">
                We'd love to hear from you. Please fill out the form below or reach out directly.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
                  >
                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                  </motion.button>
                  {status === 'success' && (
                    <p className="text-green-600 text-center">
                      Message sent successfully!
                    </p>
                  )}
                </form>
              </div>

              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-semibold mb-6">Get in Touch</h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                        <FaPhone />
                      </div>
                      <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-gray-600">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                        <FaEnvelope />
                      </div>
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-gray-600">info@luxstay.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                        <FaMapMarkerAlt />
                      </div>
                      <div>
                        <p className="font-medium">Address</p>
                        <p className="text-gray-600">
                          123 Luxury Lane, Suite 100<br />
                          Beverly Hills, CA 90210
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-6">Map Location</h2>
                  <div className="h-[300px] bg-gray-100 rounded-lg">
                    {/* Add your map component here */}
                    <div className="w-full h-full rounded-lg overflow-hidden">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.7152203627526!2d-118.40144118478912!3d34.0736359806083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc04d6d147ab%3A0xd6c7c379fd081ed1!2sBeverly%20Hills%2C%20CA%2090210!5e0!3m2!1sen!2sus!4v1645764盲"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </main>
  );
};

export default ContactPage; 