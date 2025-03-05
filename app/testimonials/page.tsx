"use client";

import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Image from 'next/image';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    quote: "Martin has been such a positive impact on the team in so many ways. Few people have his level of drive and ambition.",
    author: "Anthony Lagoon",
    role: "CEO",
    company: "Underbelly",
    image: "/testimonials/anthony.jpeg"
  },
  {
    id: '2',
    quote: "Shoutout to Martin for being the best manager a girl could ask for. He shows he truly cares about my growth during our 1:1's & working sessions.",
    author: "Michelle Harvancik",
    role: "Product Designer",
    company: "Underbelly",
    image: "/testimonials/michelle.jpeg"
  },
  {
    id: '8',
    quote: "Martin has impressed so many people with this designs and presentation skills. I love how he can take a complex problem and break it down into simple steps that are easy to understand.",
    author: "Sam Purnell",
    role: "Product Manager",
    company: "MDSV Capital",
    image: "/testimonials/sam.png"
  },
  {
    id: '4',
    quote: "Martin impressed the team with his ability to grasp our design system quickly and become an effective contributor almost immediately.",
    author: "Terri McNutty",
    role: "Product Design Manager",
    company: "Facebook",
    image: "/testimonials/terri.jpeg"
  },
  {
    id: '5',
    quote: "Martin delivered on initial needs must faster than anticipated, which allowed for more time to work on our email design systems.",
    author: "Bryan Reese",
    role: "Product Design Manager",
    company: "Square",
    image: "/testimonials/bryan.jpeg"
  },
  {
    id: '6',
    quote: "Martin was integral in dissecting our problem and creating a meaningful prototype we could run with.",
    author: "Bruce Lucas",
    role: "CEO",
    company: "Slide",
    image: "/testimonials/bruce.jpeg"
  },
  {
    id: '7',
    quote: "Martin's ability to lead the design discussions during the team meetings was commendable and positively impacted overall team collaboration during the project.",
    author: "Charmy Adesata",
    role: "Product Designer",
    company: "Data 4 Good",
    image: "/testimonials/charmy.jpeg"
  },
  {
    id: '3',
    quote: "Martin, I appreciate you taking on the service pages and collaborating with the departments to ensure our vision was carried out",
    author: "Taylor Powers",
    role: "Product Manager",
    company: "Underbelly",
    image: "/testimonials/taylor.jpeg"
  },
  {
    id: '10',
    quote: "Martin & Michael were super helpful in dissecting our problem and creating a meaningful prototype for us to run with.",
    author: "Dru Dalton",
    role: "CEO",
    company: "Real Thread",
    image: "/testimonials/dru.jpeg"
  },
  {
    id: '11',
    quote: "Martin brings the passion, dedication, and energy of 10 people! His preparing and execution on work has impacted more than just the design team.",
    author: "Bex Bossart",
    role: "Product Design Manager",
    company: "Underbelly",
    image: "/testimonials/bex.jpeg"
  }
];

const Testimonials = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-background-dark">
      <Navigation />
      
      <main className="py-20 px-4">
        <div className="max-w-screen-xl mx-auto">
          {/* Header */}
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2 mb-16">
            Testimonials
          </h3>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="h-full">
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="relative group h-full">
      {/* Glow effect */}
      <div className="absolute -inset-px bg-gradient-to-r 
        dark:from-gray-500/10 dark:via-white/20 dark:to-gray-500/10
        from-gray-900/10 via-gray-800/20 to-gray-900/10
        rounded-2xl blur-sm group-hover:blur-md transition-all duration-300" />
      
      {/* Border gradient */}
      <div className="absolute -inset-px bg-gradient-to-r 
        dark:from-gray-500/30 dark:via-white/30 dark:to-gray-500/30
        from-gray-900/30 via-gray-800/30 to-gray-900/30
        rounded-2xl" />

      {/* Content */}
      <div className="relative p-6 rounded-2xl bg-white dark:bg-[#0E1117] transition-all h-full flex flex-col">
        {/* Company Logo or Name */}
        <div className="text-gray-600 dark:text-gray-400 text-sm mb-4">
          {testimonial.company}
        </div>

        {/* Quote */}
        <blockquote className="text-gray-700 dark:text-gray-300 mb-6 flex-grow">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
        
        {/* Author Info with Avatar */}
        <div className="flex items-center gap-3 mt-auto">
          <div className="size-10 rounded-full overflow-hidden relative">
            <Image
              src={testimonial.image}
              alt={testimonial.author}
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
          <div>
            <div className="font-medium text-gray-900 dark:text-white">
              {testimonial.author}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {testimonial.role}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials; 