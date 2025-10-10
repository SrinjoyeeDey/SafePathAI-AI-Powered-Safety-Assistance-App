/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#32CD32', // Lime Green
        secondary: '#1E90FF', // Dodger Blue
        background: '#FFFFFF',
        darkbg: '#111111',
        text: '#000000',
      },
      boxShadow: {
        soft: '0 8px 24px rgba(2,6,23,0.08)',
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