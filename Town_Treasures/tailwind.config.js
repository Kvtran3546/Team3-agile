/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,tsx,ts}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#00040f",
        secondary: "#FAFAFA",
        font: "#171717",
        main: "#F2F2F2",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        navigator: ["Nunito", "sans-serif"],
        oswald: ["Oswald", "sans-serif"],
        smg: ["Sorts Mill Goudy", "sans-serif"],
        garamond: ["Garamond", "sans-serif"],
        lato: ["Lato", "sans-serif"]
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};