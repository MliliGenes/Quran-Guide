/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppin: ["Poppins", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        arabic: ["Arabic", "sans-serif"],
        uthmani: ["Uthmani", "sans-serif"],
        number: ["Arabic-Number", "sans-serif"],
      },
      textAlign: {
        justify: "justify",
      },
    },
  },
  plugins: [require("tailwindcss-rtl")],
  darkMode: "class",
};
