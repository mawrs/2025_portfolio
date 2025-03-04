"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative">
      {/* Glow effect */}
      <div className="absolute -inset-[1px] bg-gradient-to-r 
        dark:from-gray-500/10 dark:via-white/20 dark:to-gray-500/10
        from-gray-900/10 via-gray-800/20 to-gray-900/10
        rounded-full blur-sm" />
      
      {/* Border gradient */}
      <div className="absolute -inset-[1px] bg-gradient-to-r 
        dark:from-gray-500/30 dark:via-white/30 dark:to-gray-500/30
        from-gray-900/30 via-gray-800/30 to-gray-900/30
        rounded-full" />

      {/* Your existing toggle design */}
      <div className="relative flex items-center gap-1.5 bg-gray-200 dark:bg-gray-800 p-1.5 rounded-full">
        {/* Light mode icon */}
        <button
          onClick={() => setTheme("light")}
          className={`p-1.5 rounded-full transition-colors ${
            theme === "light" ? "bg-white text-gray-900" : "text-gray-500"
          }`}
          aria-label="Light mode"
        >
          <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </button>

        {/* Dark mode icon */}
        <button
          onClick={() => setTheme("dark")}
          className={`p-1.5 rounded-full transition-colors ${
            theme === "dark" ? "bg-gray-700 text-white" : "text-gray-500"
          }`}
          aria-label="Dark mode"
        >
          <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ThemeToggle; 