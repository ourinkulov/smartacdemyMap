/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{jsx,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1600px",
    },
    extend: {
      colors: {
        bodyBackgroundColor: "#141b2d",
        headerFooterBackground: "#1f2a40",
        textColor: "#eff2f7",
        toggleBackground: "#f59504",
        borderColor: "#585858",
        lightColor: "#fff",
        darkColor: "#2d2c2e",
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
};
