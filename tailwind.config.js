/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ByteBly Custom Palette
        primary: "#0066FF",
        secondaryCyan: "#00D9FF",
        neonPurple: "#8B5CF6",
        darkBg: "#0A0A0F",
        glassWhite: "rgba(255, 255, 255, 0.03)",
      },
      fontFamily: {
        // Linking the Google Fonts from index.html
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      },
      backgroundImage: {
        // Custom gradient for that "Digital Excellence" look
        'hero-gradient': "radial-gradient(circle at 50% 50%, rgba(0, 102, 255, 0.15) 0%, rgba(10, 10, 15, 0) 70%)",
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [
    // Adding the scrollbar-hide utility for the ChatBot
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      });
    },
  ],
}