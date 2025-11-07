/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#5A67D8', // Blu Intelligenza
        'secondary': '#8B5CF6', // Viola Creatività
        'background': '#FFFFFF', // Bianco Neve
        'surface': '#F7FAFC', // Bianco Ghiaccio
        'text-primary': '#1A202C', // Nero Profondo
        'text-secondary': '#718096', // Grigio Ardesia
        'success': '#38A169', // Verde Speranza
        'error': '#E53E3E', // Rosso Pericolo
        'warning': '#D69E2E', // Giallo Sole
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
