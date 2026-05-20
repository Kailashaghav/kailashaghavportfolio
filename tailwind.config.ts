import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        void: "#050508",
        obsidian: "#0a0a0f",
        slate: "#12121a",
        ember: "#ff4d1c",
        aurora: "#00ffd1",
        plasma: "#7c3aed",
        ghost: "#e8e8f0",
        muted: "#5a5a72",
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255,77,28,0.3)" },
          "50%": { boxShadow: "0 0 60px rgba(255,77,28,0.8)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(255,77,28,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,77,28,0.05) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "80px 80px",
      },
    },
  },
  plugins: [],
};

export default config;
