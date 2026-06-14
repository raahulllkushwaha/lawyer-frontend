/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0b1f3a',
          50: '#eef2f7',
          100: '#d3dded',
          200: '#a7bbdb',
          300: '#7b99c9',
          400: '#4f77b7',
          500: '#2f5896',
          600: '#234578',
          700: '#17325a',
          800: '#0b1f3a',
          900: '#06122a',
        },
        gold: {
          DEFAULT: '#c8a96a',
          light: '#e2cfa3',
          dark: '#a8884a',
        },
        cream: '#f7f3ec',
        ink: '#16181d',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(11,31,58,0.25)',
        gold: '0 8px 30px -8px rgba(200,169,106,0.45)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease-out both',
        shimmer: 'shimmer 1.6s linear infinite',
      },
    },
  },
  plugins: [],
};
