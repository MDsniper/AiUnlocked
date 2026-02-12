/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'goose-down': 'oklch(97.74% 0.02 97.52)',
        'dark-cream': '#f8eed2',
        'fresh-hay': '#e9e4a6',
        'chocolate': '#3b110c',
        'cocoa': '#5d3d3a',
        'lavender': '#bdb7fc',
        'coffee': '#a05f1a',
        'gander-red': '#da1c1c',
        'cinnamon': '#8b372b',
        'sunset-orange': '#dd5013',
      },
    },
  },
  plugins: [],
};
