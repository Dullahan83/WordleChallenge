import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  safelist: [
    "delay-[300ms]",
    "delay-[400ms]",

    "delay-[500ms]",
    "delay-[600ms]",
    "delay-[800ms]",

    "delay-[900ms]",

    "delay-[1000ms]",
    "delay-[1200ms]",

    "delay-[1500ms]",
    "delay-[1600ms]",

    "delay-[1800ms]",

    "delay-[2000ms]",
    "delay-[2100ms]",
    "delay-[2400ms]",

    "delay-[2500ms]",
    "delay-[2700ms]",
    "delay-[2800ms]",

    "delay-[3000ms]",
    "delay-[3200ms]",

    "delay-[3300ms]",

    "delay-[3500ms]",
    "delay-[3600ms]",
    "delay-[3800ms]",

    "delay-[4000ms]",
    "delay-[4200ms]",
    "delay-[4400ms]",

    "delay-[4500ms]",
    "delay-[4800ms]",

    "delay-[5000ms]",
    "delay-[5500ms]",
    "duration-[300ms]",
    "duration-[500ms]",
  ],
  theme: {
    extend: {
      backgroundColor: {
        dark: "#282a36",
        light: "#e5e7eb",
      },
      animation: {
        jump: "jump 0.5s ease-in-out forwards",
      },
      keyframes: {
        jump: {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
          "100%": { transform: "translateY(0)" },
        },
      },
    },
  },
  daisyui: {
    themes: [],
  },
  plugins: [daisyui],
};
