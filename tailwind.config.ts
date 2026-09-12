import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bebas: ["var(--font-bebas-neue)", "sans-serif"],
        zilla: ["'Zilla Slab Highlight'", "'Zilla Slab'", "var(--font-zilla)", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
