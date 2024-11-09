/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        "sky-blue": "#02B3BD",
        "light-blue": "#02B3BD0F",
        "dark-blue-800": "#2E2F5D",
        "fade-dark-blue": "#2E2F5DBF",
      }
    },
  },
  plugins: [],
};
