import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/flowbite-react/**/*.js'
  ],
  theme: {
    extend: {
      fontFamily: {
        graphik: ['Graphik', 'sans-serif'],
        minerva: ['MinervaModern', 'serif'],
      },
      fontWeight: {
        normal: '400',    // Graphik Regular
        semibold: '600',  // Graphik Semibold
      },
      colors: {
        background: {
          dark: '#121212', // Very dark gray
          // Alternative options:
          // dark: '#141414', // Slightly lighter
          // dark: '#101010', // Slightly darker
        },
        // You can customize these colors to match your preference
        highlight: {
          purple: 'rgba(216, 180, 254, 0.5)', // for purple highlights
          yellow: 'rgba(253, 224, 71, 0.5)',  // for yellow highlights
          green: 'rgb(46, 160, 67)',  // More vibrant green from the screenshot
          blue: 'rgb(0, 84, 240)',  // Bright blue from the image
          // Alternative options:
          // green: '#166534', // green-800 for darker
          // green: '#22c55e', // green-500 for brighter
        }
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('tailwind-scrollbar-hide')
  ],
}

export default config
