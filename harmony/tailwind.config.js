/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        harmony: ["Harmony", "sans-serif"],
        dancing: ["Dancing", "sans-serif"],
      },
    },
  },
  plugins: [],
};
