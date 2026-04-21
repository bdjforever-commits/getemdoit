import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#050505",
        "hero-start": "#0D1F2D",
        platinum: "#E5E4E2",
        text: "#E5E4E2",
        ultraviolet: "#7F00FF",
        accent: "#7F00FF",
        gold: "#D4AF37",
        surface: "#121212",
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "sans-serif"],
      },
      letterSpacing: {
        display: "0.22em",
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(circle at 20% 0%, rgba(127,0,255,0.18), rgba(5,5,5,0) 45%), linear-gradient(165deg, #0D1F2D 0%, #050505 65%)",
      },
      boxShadow: {
        ultraviolet: "0 0 48px rgba(127, 0, 255, 0.2)",
      },
    },
  },
  plugins: [],
};

export default config;
