/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          DEFAULT: '#2A9D8F',
          dark: '#238276',
          light: '#3FB5A7',
          50: '#F0F9F8',
          100: '#D5F0ED',
          200: '#A9E0DB',
          300: '#7DCFC8',
          400: '#51BFB6',
          500: '#2A9D8F',
          600: '#238276',
          700: '#1C665D',
          800: '#154A44',
          900: '#0E2E2B'
        },
        secondary: {
          DEFAULT: '#E9C46A',
          dark: '#E4B84D',
          light: '#EED08C'
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
} 