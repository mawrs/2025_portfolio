const Footer = () => {
  return (
    <section className="px-4 mx-auto max-w-screen-xl lg:px-0 relative">
      {/* Glow effect */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r 
        dark:from-gray-500/10 dark:via-white/20 dark:to-gray-500/10
        from-gray-900/10 via-gray-800/20 to-gray-900/10
        blur-sm" />
      
      {/* Border gradient */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r 
        dark:from-gray-500/30 dark:via-white/30 dark:to-gray-500/30
        from-gray-900/30 via-gray-800/30 to-gray-900/30" />

      {/* Footer content */}
      <div className="py-8 mt-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 sm:gap-0">
          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
            <a 
              href="mailto:hi@martintejeda.com" 
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              hi@martintejeda.com
            </a>
            <p className="text-gray-700 dark:text-gray-300">619.646.5321</p>
          </div>

          {/* Social Links */}
          <div className="w-full sm:w-auto">
            <div className="flex flex-wrap sm:flex-nowrap gap-4 sm:gap-6">
              <a 
                href="https://twitter.com/mawrs" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Twitter
              </a>
              <a 
                href="https://linkedin.com/in/mawrs" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <a 
                href="https://instagram.com/mawrrs" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Instagram
              </a>
              <a 
                href="https://github.com/mawrs" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer; 