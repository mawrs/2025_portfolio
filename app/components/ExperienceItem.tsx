"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

// Define the types
export type ProjectImage = {
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
  images = []
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
  console.log('ExperienceItem rendering:', { company, images });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Add useEffect to track modal state changes
  useEffect(() => {
    console.log('Modal state changed:', isModalOpen);
  }, [isModalOpen]);

  const previousImage = () => {
    setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length);
  };

  const nextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };

  console.log('Modal open:', isModalOpen);
  console.log('Images array:', images);
  console.log('Current image:', images[currentImageIndex]);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Project Image Thumbnail */}
      <div 
        className={`w-full md:w-[240px] aspect-[3/4] md:aspect-auto relative ${images.length > 0 ? 'cursor-pointer' : ''} shrink-0`} 
        onClick={() => {
          console.log('Raw click event on thumbnail');  // This should log regardless
          console.log('Company:', company);
          console.log('Images array length:', images?.length);
          console.log('Full images array:', images);
          
          if (images.length > 0) {
            setIsModalOpen(true);
          }
        }}
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
      {(() => {
        console.log('Checking modal render condition:', { isModalOpen, imagesLength: images.length });
        return isModalOpen && images.length > 0 && (
          <div 
            className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4"
            onClick={(e) => {
              console.log('Modal background clicked');
              if (e.target === e.currentTarget) setIsModalOpen(false);
            }}
          >
            {/* Content Container - Reduced width */}
            <div className="w-[80vw] h-[85vh] flex flex-col">
              {/* Main Image Area */}
              <div className="w-full h-[calc(85vh-8rem)] relative mb-4">
                <Image
                  src={images[currentImageIndex].src}
                  alt={images[currentImageIndex].alt}
                  fill
                  className="object-contain"
                  priority={true}
                  sizes="80vw"
                />
              </div>
              
              {/* Caption and Thumbnails Container */}
              <div className="w-full md:w-[600px] lg:w-[800px] mx-auto">
                {/* Caption */}
                <div className="bg-black/70 text-white px-4 py-2 mb-4 flex justify-between items-center gap-4">
                  <p className="text-sm flex-1 line-clamp-2 max-w-[80%] md:max-w-none">
                    {images[currentImageIndex].description}
                  </p>
                  <span className="text-sm whitespace-nowrap">
                    {currentImageIndex + 1} / {images.length}
                  </span>
                </div>

                {/* Thumbnail Strip */}
                <div className="h-16 md:h-20">
                  <div className="h-full overflow-x-auto scrollbar-hide">
                    <div 
                      className="flex gap-2 p-2 h-full justify-start md:justify-center min-w-min"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {images.map((image, index) => (
                        <div
                          key={index}
                          className={`relative h-full aspect-[16/9] shrink-0 cursor-pointer transition-all duration-200
                            ${index === currentImageIndex 
                              ? 'border-2 border-white opacity-100' 
                              : 'border border-gray-600 opacity-50 hover:opacity-75'
                            }`}
                          onClick={() => setCurrentImageIndex(index)}
                        >
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 80px, 100px"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default ExperienceItem; 