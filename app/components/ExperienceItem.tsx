"use client";

import { useState, useEffect, useRef } from 'react';
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  // Handle scroll events
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const maxScroll = container.scrollWidth - container.clientWidth;
    const scrollPercentage = Math.min((container.scrollLeft / maxScroll) * 80, 80); // Limit to 80% to keep thumb visible
    setScrollPosition(scrollPercentage);
  };

  // Handle drag events
  const handleDragStart = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
  };

  const handleDragMove = (e: MouseEvent) => {
    if (!isDraggingRef.current || !scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const rect = container.getBoundingClientRect();
    const scrollbarWidth = rect.width;
    
    // Constrain the drag position within the container bounds
    const x = Math.max(0, Math.min(e.clientX - rect.left, scrollbarWidth));
    const scrollPercentage = x / scrollbarWidth;
    const newScrollPosition = scrollPercentage * (container.scrollWidth - container.clientWidth);
    
    container.scrollLeft = newScrollPosition;
  };

  const handleDragEnd = () => {
    isDraggingRef.current = false;
    document.removeEventListener('mousemove', handleDragMove);
    document.removeEventListener('mouseup', handleDragEnd);
  };

  // Clean up event listeners
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleDragMove);
      document.removeEventListener('mouseup', handleDragEnd);
    };
  }, []);

  const previousImage = () => {
    setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length);
  };

  const nextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Project Image Thumbnail */}
      <div 
        className={`w-full h-[200px] md:h-auto md:w-[240px] relative ${images.length > 0 ? 'cursor-pointer' : ''} shrink-0 group`} 
        onClick={() => {
          if (images.length > 0) {
            setIsModalOpen(true);
          }
        }}
      >
        {/* Glow effect */}
        <div className="absolute -inset-px bg-gradient-to-r 
          dark:from-gray-500/10 dark:via-white/20 dark:to-gray-500/10
          from-gray-900/10 via-gray-800/20 to-gray-900/10
          rounded-lg blur-sm group-hover:blur-md transition-all duration-300" />
        
        {/* Border gradient */}
        <div className="absolute -inset-px bg-gradient-to-r 
          dark:from-gray-500/30 dark:via-white/30 dark:to-gray-500/30
          from-gray-900/30 via-gray-800/30 to-gray-900/30
          rounded-lg" />

        {/* Image Container */}
        <div className="relative h-full">
          <Image
            src={thumbnail?.src || images[0].src}
            alt={thumbnail?.alt || images[0].alt}
            fill
            className={`object-cover rounded-lg ${images.length > 0 ? 'hover:opacity-90' : ''} transition-opacity`}
            sizes="(max-width: 768px) 100vw, 240px"
          />
        </div>
      </div>

      {/* Experience Content */}
      <div className="grow space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
          <div>
            <h4 className="text-gray-900 dark:text-white font-medium">{company}</h4>
            <p className="text-gray-700 dark:text-gray-300">
              {role}
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

      {/* Modal with backdrop blur */}
      {isModalOpen && images.length > 0 && (
        <div 
          className="fixed inset-0 backdrop-blur-sm bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          {/* Content Container */}
          <div className="w-[50vw] h-[85vh] flex flex-col bg-black/50 rounded-lg overflow-hidden">
            {/* Main Image Area */}
            <div className="w-full h-[calc(85vh-8rem)] relative mb-4">
              <Image
                src={images[currentImageIndex].src}
                alt={images[currentImageIndex].alt}
                fill
                className="object-contain"
                priority={true}
                sizes="50vw"
              />
            </div>
            
            {/* Caption and Thumbnails Container */}
            <div className="w-full md:w-[400px] lg:w-[600px] mx-auto">
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
              <div className="h-16 md:h-20 relative">
                {/* Thumbnail Container */}
                <div 
                  ref={scrollContainerRef}
                  onScroll={handleScroll}
                  className="h-[calc(100%-12px)] overflow-x-auto scrollbar-hide"
                >
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
                
                {/* Custom Scrollbar */}
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-800/50 cursor-pointer">
                  <div
                    ref={thumbRef}
                    onMouseDown={handleDragStart}
                    className="absolute h-full bg-white/50 rounded-full transition-all duration-75 hover:bg-white/75 active:bg-white/90"
                    style={{
                      width: '20%',
                      left: `${Math.min(Math.max(scrollPosition, 10), 90)}%`,
                      transform: 'translateX(-50%)',
                      cursor: 'grab',
                      touchAction: 'none'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperienceItem; 