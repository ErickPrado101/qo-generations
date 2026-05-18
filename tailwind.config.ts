import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      keyframes: {
        slide: {
          "0%, 26%": { transform: "translateX(0)" },
          "33%, 59%": { transform: "translateX(-33.333%)" },
          "66%, 92%": { transform: "translateX(-66.666%)" },
          "100%": { transform: "translateX(0)" }
        }
      },
      animation: {
        slide: "slide 12s infinite"
      },
      colors: {
        bg: {
          950: "#030303",
          900: "#0b0c0d",
          850: "#111316",
          800: "#17191b"
        }
      },
      boxShadow: {
        glass: "0 25px 80px rgba(0,0,0,.55)",
        soft: "0 12px 40px rgba(0,0,0,.45)"
      }
    }
  },
  plugins: []
};

export default config;
