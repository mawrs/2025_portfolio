"use client";

import { Card } from 'flowbite-react';
import type { FC } from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Image from 'next/image';

const roleDefinitions = {
  "designer": "I create intuitive digital experiences through user-centered design, focusing on both aesthetics and functionality.",
  "vibe coder": "I write code that not only works but feels good - combining technical skills with an eye for design and user experience.",
  "writer": "I craft clear, engaging content that tells stories and communicates complex ideas simply."
};

const Portfolio: FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const roles = ["designer", "vibe coder", "writer"];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setRoleIndex((current) => (current + 1) % roles.length);
        setIsTransitioning(false);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <main className="min-h-screen bg-white dark:bg-background-dark">
      <Navigation />
      {/* Hero Section */}
      <section className="py-20 px-4 max-w-screen-xl mx-auto min-h-[800px]">
        <div className="flex flex-col lg:flex-row items-stretch gap-10 h-full">
          {/* Left Column - Text Content */}
          <div className="flex-1 space-y-8">
            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-5xl text-gray-900 dark:text-white font-semibold leading-tight">
              Hello! I&apos;m Martin, a{' '}
              <span className="relative inline-block group">
                <span 
                  className={`
                    inline-block transition-all duration-300
                    ${isTransitioning 
                      ? 'opacity-0 translate-y-2' 
                      : 'opacity-100 translate-y-0'
                    }
                  `}
                >
                  {roles[roleIndex]}
                </span>
                
                {/* Definition tooltip */}
                <div className="absolute left-0 top-full hidden group-hover:block mt-2 z-10">
                  <div className="min-w-[200px] max-w-[300px] bg-white dark:bg-[#1E1E1E] shadow-lg rounded-lg p-4 border border-gray-200 dark:border-gray-800">
                    <p className="text-gray-900 dark:text-gray-100 text-sm leading-relaxed">
                      {roleDefinitions[roles[roleIndex] as keyof typeof roleDefinitions]}
                    </p>
                  </div>
                </div>
              </span>
              {' '}based in San Francisco.
            </h1>

            {/* Profile Image - Mobile/Tablet Only */}
            <div className="block lg:hidden mb-12 w-full">
              <div className="w-full">
                <Image
                  src="/headshot.png"
                  alt="Martin's Profile"
                  width={800}
                  height={800}
                  priority={true}
                  className="w-full h-auto rounded-xl object-cover"
                />
              </div>
            </div>

            {/* Text Content */}
            <div className="space-y-6 text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                As the founder of Mawrs©, I partner with startups and established companies to design digital products that solve complex business challenges. My work spans from early-stage product strategy and UX design to building comprehensive design systems and leading cross-functional teams.
              </p>

              <p>
                I love working on personal projects. I&apos;m currently building{' '}
                <a 
                  href="https://newcareers.fyi" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors underline"
                >
                  newcareers.fyi
                </a>
                {' '}to help college students find alternative career paths based on their majors.
              </p>

              <p>
                If I wasn&apos;t a designer full-time, I would be a developer, marketer, or researcher... or anything that heavily influences the direction of a product. As long as I&apos;m involved in the product decision-making process.
              </p>

              <p>
                If you&apos;re looking for a solid designer that dabbles in many creatives, you should text or email me. You&apos;re also more than welcome to test my hard skills in any way you see fit. Bring it on.
              </p>
            </div>
          </div>

          {/* Right Column - Desktop Image */}
          <div className="hidden lg:block w-[500px] relative">
            <div className="relative aspect-[3/4]">
              {/* Glow effect */}
              <div className="absolute -inset-[1px] bg-gradient-to-r 
                dark:from-gray-500/10 dark:via-white/20 dark:to-gray-500/10
                from-gray-900/10 via-gray-800/20 to-gray-900/10
                rounded-2xl blur-sm" />
              
              {/* Border gradient */}
              <div className="absolute -inset-[1px] bg-gradient-to-r 
                dark:from-gray-500/30 dark:via-white/30 dark:to-gray-500/30
                from-gray-900/30 via-gray-800/30 to-gray-900/30
                rounded-2xl" />

              {/* Image container */}
              <div className="relative h-full rounded-2xl overflow-hidden">
                <Image
                  src="/headshot.webp"
                  alt="Martin's Profile"
                  fill
                  priority={true}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Portfolio;