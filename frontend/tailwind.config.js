/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          50: '#f0f4ff',
          100: '#e0e7ff',
          600: '#5865f2',
          700: '#4c51d8',
        },
        green: {
          500: '#10b981',
        },
        orange: {
          500: '#f59e0b',
        },
        red: {
          500: '#ef4444',
        },
        yellow: {
          500: '#eab308',
        },
      },
    },
  },
  plugins: [],
}