/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          lime: '#C9F31D',
          'lime-dark': '#ADD40C',
          dark: '#04000B',
          surface: '#0E0F11',
          card: '#232323',
          gray: '#F2F3EF',
          soft: '#EFF2E4',
          muted: '#666666',
          border: '#DDDDDD',
          'border-light': '#E7E7E7',
          'border-dark': '#343232',
        }
      },
      fontFamily: {
        barlow: ['Barlow', 'sans-serif'],
      },
      maxWidth: {
        '285': '71.25rem', // 1140px
      }
    },
  },
  plugins: [],
}
