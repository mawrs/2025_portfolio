"use client";

import { useState } from 'react';
import Image from 'next/image';

// Define a type for image with description
type ProjectImage = {
  src: string;
  alt: string;
  description: string;
}

const ExperienceItem = ({ 
  company, 
  role, 
  location, 
  date, 
  points,
  contract = "W-2",
  thumbnail,
  images = [{
    src: '/projects/default.webp',
    alt: 'Project preview',
    description: 'Project overview and key features'
  }]
}: {
  company: string;
  role: string;
  location: string;
  date: string;
  points: string[];
  contract?: string;
  thumbnail?: { src: string; alt: string; };
  images?: ProjectImage[];
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const previousImage = () => {
    setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length);
  };

  const nextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Project Image Thumbnail */}
      <div className={`w-full md:w-[240px] aspect-[3/4] md:aspect-auto relative ${images.length > 0 ? 'cursor-pointer' : ''} shrink-0`} 
        onClick={() => images.length > 0 && setIsModalOpen(true)}
      >
        <div className="relative size-full">
          <Image
            src={thumbnail?.src || images[0].src}
            alt={thumbnail?.alt || images[0].alt}
            fill
            className={`object-cover rounded-lg ${images.length > 0 ? 'hover:opacity-90' : ''} transition-opacity`}
            sizes="(max-width: 768px) 100vw, 240px"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* Experience Content */}
      <div className="grow space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
          <div>
            <h4 className="text-gray-900 dark:text-white font-medium">{company}</h4>
            <p className="text-gray-700 dark:text-gray-300">
              {role} <span className="text-gray-500">({contract})</span>
            </p>
          </div>
          <div className="sm:text-right">
            <p className="text-gray-700 dark:text-gray-300">{location}</p>
            <p className="text-gray-500">{date}</p>
          </div>
        </div>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          {points.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>

      {/* Modal */}
      {isModalOpen && images.length > 0 && (
        <div 
          className="fixed inset-0 bg-black/95 flex flex-col items-center justify-center z-50"
          onClick={(e) => e.target === e.currentTarget && setIsModalOpen(false)}
        >
          {/* Content Container */}
          <div className="w-[90vw] max-w-5xl flex flex-col items-center gap-6">
            {/* Main Image */}
            <div 
              className="relative size-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[currentImageIndex].src}
                alt={images[currentImageIndex].alt}
                fill
                className="object-contain"
              />
            </div>

            {/* Description */}
            <p className="text-white text-center max-w-2xl">
              {images[currentImageIndex].description}
            </p>

            {/* Navigation Buttons */}
            <div className="flex gap-4">
              <button
                onClick={previousImage}
                className="p-2 text-white hover:text-gray-300 transition-colors"
                aria-label="Previous image"
              >
                Previous
              </button>
              <button
                onClick={nextImage}
                className="p-2 text-white hover:text-gray-300 transition-colors"
                aria-label="Next image"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperienceItem; 