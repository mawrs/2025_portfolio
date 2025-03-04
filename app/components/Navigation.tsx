import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-sm bg-white/80 dark:bg-background-dark/80 border-b border-gray-200/20 dark:border-gray-800/20">
      <div className="max-w-screen-xl mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
          <Link 
            href="/" 
            className="text-gray-900 dark:text-white text-xl font-semibold hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            Martin Tejeda
          </Link>
          
          <div className="flex items-center gap-8">
            <Link 
              href="/projects" 
              className={`transition-colors ${
                pathname === '/projects' 
                  ? 'text-gray-900 dark:text-white' 
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
              }`}
            >
              Projects
            </Link>
            <Link 
              href="/miscellaneous" 
              className={`transition-colors ${
                pathname === '/miscellaneous' 
                  ? 'text-gray-900 dark:text-white' 
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
              }`}
            >
              Testimonials
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 