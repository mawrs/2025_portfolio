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

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Project Image Thumbnail */}
      <div className={`w-full md:w-[240px] aspect-[3/4] md:aspect-auto relative ${images.length > 0 ? 'cursor-pointer' : ''} flex-shrink-0`} 
        onClick={() => images.length > 0 && setIsModalOpen(true)}
      >
        <div className="relative w-full h-full">
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
      <div className="flex-grow space-y-4">
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

      {/* Modal Carousel - Only render if there are images */}
      {isModalOpen && images.length > 0 && (
        // ... Modal code here (same as before)
      )}
    </div>
  );
};

export default ExperienceItem; 