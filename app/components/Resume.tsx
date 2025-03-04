import { type FC } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import Navigation from './Navigation';
import Image from 'next/image';
import Footer from './Footer';

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

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Project Image Thumbnail - Scaled width */}
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

      {/* Modal Carousel */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/95 flex flex-col items-center justify-center z-50"
          onClick={(e) => e.target === e.currentTarget && setIsModalOpen(false)}
        >
          {/* Content Container */}
          <div className="w-[90vw] max-w-5xl flex flex-col items-center gap-6">
            {/* Main Image */}
            <div 
              className="relative w-full aspect-[4/3]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[currentImageIndex].src}
                alt={images[currentImageIndex].alt}
                fill
                className="object-contain"
                priority={true}
              />
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4 flex justify-between items-center">
                <p className="text-sm flex-1">{images[currentImageIndex].description}</p>
                <span className="text-sm ml-4">
                  {currentImageIndex + 1} / {images.length}
                </span>
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="w-full">
              <div className="relative">
                {/* Gradient Indicators for scroll */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black to-transparent md:hidden pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black to-transparent md:hidden pointer-events-none" />
                
                {/* Scrollable Container */}
                <div className="w-full overflow-x-auto scrollbar-hide">
                  <div 
                    className="flex gap-2 p-2 min-w-min"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {images.map((image, index) => (
                      <div
                        key={index}
                        className={`relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 cursor-pointer transition-all duration-200
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
                          sizes="96px"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Resume: FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-background-dark">
      <Navigation />
      
      <section className="px-4 py-20 mx-auto max-w-screen-xl">
        <div className="space-y-12">
          <div className="relative mb-16">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white pb-2">
              Projects
            </h3>
            {/* Glow effect */}
            <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r 
              dark:from-gray-500/10 dark:via-white/20 dark:to-gray-500/10
              from-gray-900/10 via-gray-800/20 to-gray-900/10
              blur-sm" />
            
            {/* Border gradient */}
            <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r 
              dark:from-gray-500/30 dark:via-white/30 dark:to-gray-500/30
              from-gray-900/30 via-gray-800/30 to-gray-900/30" />
          </div>
          
          <ExperienceItem
            company="TRUE-See"
            role="Product Designer"
            location="Remote"
            date="Feb 2025 - Present"
            contract="1099"
            points={[
              "At TRUE-See, I'm helping revolutionize medical photography by designing a standardized system for healthcare professionals. The challenge involves creating an intuitive interface that enables clinicians to capture consistent, calibrated images without requiring photography expertise. Our solution integrates seamlessly with existing EHR software while maintaining strict HIPAA compliance and data security standards."
            ]}
            thumbnail={{
              src: '/true-see/logo.webp',
              alt: 'TRUE-See Logo',
            }}
            images={[]}
          />

          <ExperienceItem
            company="MDSV Capital"
            role="Head of Design"
            location="San Francisco, CA"
            date="Feb 2023 - Jan 2025"
            contract="1099"
            points={[
              "My time at MDSV Capital was focused on securing pre-seed funding through compelling visual narratives and product experiences. Working with cross-functional teams, we tackled ambiguous challenges by staying close to our users - conducting regular interviews and usability tests to validate our direction. The key to our success was maintaining strong relationships with our high-value customers while coordinating with distributed engineering teams through clear documentation and open communication channels."
            ]}
            images={[
              {
                src: '/mdsv-capital/competitors.webp',
                alt: 'Competitor Analysis',
                description: 'Market research and competitive analysis'
              },
              {
                src: '/mdsv-capital/sketches.webp',
                alt: 'Design Sketches',
                description: 'Early design explorations and wireframes'
              },
              {
                src: '/mdsv-capital/low_fidelity.webp',
                alt: 'Low Fidelity Wireframes',
                description: 'Initial wireframes and user flows'
              },
              {
                src: '/mdsv-capital/high_fidelity.webp',
                alt: 'High Fidelity Design',
                description: 'Detailed interface design and interactions'
              },
              {
                src: '/mdsv-capital/final.webp',
                alt: 'Final Implementation',
                description: 'Final product design and implementation'
              },
              {
                src: '/mdsv-capital/pitch.webp',
                alt: 'Pitch Deck',
                description: 'Investment pitch presentation materials'
              }
            ]}
            thumbnail={{
              src: '/mdsv-capital/logo.webp',
              alt: 'MDSV Capital Logo',
            }}
          />

          <ExperienceItem
            company="Underbelly"
            role="Product Design Lead"
            location="Salt Lake City, UT"
            date="Nov 2021 - Jan 2023"
            contract="W-2"
            points={[
              "At Underbelly, I found my stride leading intensive design sprints that consistently turned into substantial contracts. The key was bringing stakeholders together early in the process to ensure our solutions aligned with their vision. While managing project budgets was crucial, my greatest satisfaction came from mentoring our UX design team - many of whom have gone on to become design leaders at prominent tech companies."
            ]}
            thumbnail={{
              src: '/underbelly/logo.webp',
              alt: 'Underbelly Logo',
            }}
            images={[]}
          />

          <ExperienceItem
            company="Slide"
            role="Product Designer"
            location="Remote"
            date="Jun 2022 - Sep 2022"
            contract="1099"
            points={[
              "The challenge at Slide was reimagining their insurance claims process from the ground up. Through collaborative design sprints and continuous validation with stakeholders, we identified core business problems that were causing friction. Our solution was a more intuitive, self-service system that significantly reduced the burden on customer support while keeping the UX team and stakeholders aligned throughout the transformation."
            ]}
            images={[
              {
                src: '/slide/hotline_number.webp',
                alt: 'Customer Support',
                description: 'Customer support interface and hotline system'
              },
              {
                src: '/slide/executives.webp',
                alt: 'Executive Dashboard',
                description: 'Management analytics and reporting interface'
              },
              {
                src: '/slide/sketches.webp',
                alt: 'Design Sketches',
                description: 'Early design explorations and wireframes'
              },
              {
                src: '/slide/flow.webp',
                alt: 'Claims Process Flow',
                description: 'Redesigned insurance claims user journey'
              },
              {
                src: '/slide/specs.webp',
                alt: 'Design Specifications',
                description: 'Technical specifications and design documentation'
              },
              {
                src: '/slide/screens.webp',
                alt: 'Interface Screens',
                description: 'Key interface screens and user flows'
              },
              {
                src: '/slide/user_test.webp',
                alt: 'User Testing',
                description: 'User testing results and feedback implementation'
              },
              {
                src: '/slide/acquisition.webp',
                alt: 'Acquisition Announcement',
                description: 'Company acquisition and team integration'
              }
            ]}
            thumbnail={{
              src: '/slide/logo.webp',
              alt: 'Slide Logo',
            }}
          />

          <ExperienceItem
            company="Square"
            role="Product Designer"
            location="Remote"
            date="Aug 2021 - Nov 2021"
            contract="1099"
            points={[
              "Square faced a critical challenge with phishing scams targeting their sellers. Working closely with the UX Writing team, we completely overhauled the email design system to combat this issue. The project expanded into establishing Design Operations across departments, ultimately leading to increased seller confidence through consistent visual identity and data-driven improvements from our split testing efforts."
            ]}
            images={[
              {
                src: '/square/phishing.webp',
                alt: 'Anti-phishing Features',
                description: 'Security patterns and phishing prevention'
              },
              {
                src: '/square/figjam.webp',
                alt: 'Design Collaboration',
                description: 'Cross-functional team workshop outcomes'
              },
              {
                src: '/square/all_departments.webp',
                alt: 'Department Integration',
                description: 'Design system implementation across teams'
              },
              {
                src: '/square/components.webp',
                alt: 'Component Library',
                description: 'Email design system components'
              },
              {
                src: '/square/final.webp',
                alt: 'Final Implementation',
                description: 'Final email design system implementation'
              }
            ]}
            thumbnail={{
              src: '/square/logo.webp',
              alt: 'Square Logo',
            }}
          />

          <ExperienceItem
            company="Meta"
            role="Product Designer"
            location="Remote"
            date="Mar 2021 - Aug 2021"
            contract="1099"
            points={[
              "My focus at Meta centered on enhancing engagement between Public Figures and their audiences. Collaborating with UX Researchers, we created robust A/B testing environments to validate new features. The work involved careful optimization of key UI elements to better serve user needs, while ensuring all solutions aligned with Meta's established design system through close partnership with engineers and design leadership."
            ]}
            images={[
              {
                src: '/facebook/before.webp',
                alt: 'Original Interface',
                description: 'Initial state of the public figure engagement features'
              },
              {
                src: '/facebook/research.webp',
                alt: 'User Research',
                description: 'Research findings and user insights'
              },
              {
                src: '/facebook/sketches.webp',
                alt: 'Design Sketches',
                description: 'Early design explorations and concepts'
              },
              {
                src: '/facebook/variants.webp',
                alt: 'Design Variants',
                description: 'A/B testing variations and iterations'
              },
              {
                src: '/facebook/winner.webp',
                alt: 'Winning Design',
                description: 'Final selected design solution'
              },
              {
                src: '/facebook/handoff.webp',
                alt: 'Developer Handoff',
                description: 'Technical specifications and implementation guidelines'
              }
            ]}
            thumbnail={{
              src: '/facebook/logo.webp',
              alt: 'Meta Logo',
            }}
          />

          <ExperienceItem
            company="Data 4 Good, Inc."
            role="UX Designer"
            location="Los Angeles, CA"
            date="Nov 2019 - Dec 2020"
            contract="W-2"
            points={[
              "Data 4 Good needed a complete reimagining of their marketing website to boost user engagement. Through extensive usability testing and iterative improvements, we transformed their digital presence. A key part of this evolution was creating a comprehensive component library that not only maintained design consistency but significantly reduced development time. The end result was a highly accessible platform that perfectly balanced form and function."
            ]}
            images={[
              {
                src: '/penguin.jpeg',
                alt: 'Website redesign',
                description: 'Marketing website improvements'
              },
              {
                src: '/seagul.jpg',
                alt: 'Component library',
                description: 'Reusable UI components showcase'
              }
            ]}
            thumbnail={{
              src: '/penguin.jpeg',
              alt: 'Website redesign',
            }}
          />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Resume;
export { ExperienceItem }; 