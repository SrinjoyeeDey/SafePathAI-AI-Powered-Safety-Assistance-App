/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // enables manual dark mode toggling via class
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#9333ea',
        accent: '#f43f5e',
      },
      boxShadow: {
        soft: '0 4px 10px rgba(0, 0, 0, 0.08)',
      },
      borderRadius: {
        '2xl': '1rem',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
