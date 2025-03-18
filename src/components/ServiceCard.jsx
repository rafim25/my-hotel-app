'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const ServiceCard = ({ image, title, href }) => {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="relative rounded-lg overflow-hidden shadow-lg group"
      >
        <div className="relative h-64">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
          <motion.span
            className="inline-block text-white/90 text-sm"
            whileHover={{ x: 5 }}
          >
            Learn More →
          </motion.span>
        </div>
      </motion.div>
    </Link>
  );
};

export default ServiceCard; 