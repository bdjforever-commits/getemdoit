import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-text-primary)",
        ens: {
          obsidian: "#050505",
          platinum: "#E5E4E2",
          ultraviolet: "#7F00FF",
          gold: "#D4AF37",
          surface: "#121212",
        },
      },
      fontFamily: {
        body: ["var(--font-body)", "Inter", "system-ui", "sans-serif"],
        technical: ["var(--font-technical)", "monospace"],
      },
      letterSpacing: {
        display: "1.5rem",
      },
    },
  },
  plugins: [],
};
export default config;
