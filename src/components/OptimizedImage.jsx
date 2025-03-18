'use client';
import Image from 'next/image';
import { useState } from 'react';
import { FaImage } from 'react-icons/fa';

const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <rect width="${w}" height="${h}" fill="#f3f4f6" />
  <rect id="r" width="${w}" height="${h}" fill="#f3f4f6">
    <animate attributeName="x" values="-${w};${w}" dur="1s" repeatCount="indefinite" />
  </rect>
  <rect width="${w}" height="${h}" fill="url(#g)" />
</svg>`;

const toBase64 = (str) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

export default function OptimizedImage({ src, alt, fill, className, onError, priority = false }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleError = (e) => {
    setHasError(true);
    if (onError) onError(e);
  };

  const defaultImage = 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80';

  if (!src) {
    return (
      <div className="flex items-center justify-center bg-gray-100 h-full w-full">
        <FaImage className="text-gray-400 text-4xl" />
      </div>
    );
  }

  return (
    <div className={`relative ${fill ? 'h-full w-full' : ''} overflow-hidden bg-gray-100`}>
      <Image
        src={hasError ? defaultImage : src}
        alt={alt}
        fill={fill}
        className={`${className} ${isLoading ? 'scale-110 blur-2xl' : 'scale-100 blur-0'} transition-all duration-300`}
        onError={handleError}
        onLoad={() => setIsLoading(false)}
        priority={priority}
        quality={80}
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      {isLoading && !hasError && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse" />
      )}
    </div>
  );
} 