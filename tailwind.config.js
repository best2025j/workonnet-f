import { colors } from "./tailwind.theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
    // './vueform.config.ts', // or where `vueform.config.js` is located. Change `.js` to `.ts` if required.
    // './node_modules/@vueform/vueform/themes/tailwind/**/*.vue',
    // './node_modules/@vueform/vueform/themes/tailwind/**/*.js',
  ],
  options: {
    safelist: [
      "bg-clip-text",
      "text-transparent",
      "bg-gradient-to-r",
      "from-purple-400",
      "via-pink-500",
      "to-red-500",
    ],
  },

  theme: {
    extend: {
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        scroll: "scroll 20s linear infinite",
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(284.94deg, #B7680C 1.22%, #FE8900 100%)",
      },
      colors: {
        ...colors,
      },
      spacing: {
        3.5: "14px",
        4.5: "18px",
        13: "52px",
        22: "88px",
        19: "76px",
      },
      borderRadius: {
        none: "0",
        sm: "0.125rem",
        5: "5px",
        8: "8px",
        10: "10px",
        12: "12px",
        20: "100px",
      },
      fontFamily: {
        'font-text': ['Georgia'], 
      },
      transformOrigin: {
        0: "0%",
      },
      zIndex: {
        "-1": "-1",
      },
      screens: {
        'sm': { 'max': '600px' },   // Small devices (phones)
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        maintheme: {
          primary: "#00AEF8",
          secondary: "#040C21",
          "primary-content": "#ffffff",
          "secondary-content": "#ffffff",
        },
      },
    ],
  },
};
