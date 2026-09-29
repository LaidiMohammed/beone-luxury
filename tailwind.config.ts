import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        noir: "#0A0A0B",
        coal: "#141416",
        smoke: "#1E1E21",
        champagne: "#C9A96A",
        champagnelight: "#E9D6A7",
        ivoire: "#F5F1E8",
        stonewarm: "#A8A29A",
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', '"Playfair Display"', "Georgia", "serif"],
        sans: ['"Jost"', '"Manrope"', "system-ui", "sans-serif"],
      },
      letterSpacing: { widest2: "0.35em" },
      animation: {
        marquee: "marquee 28s linear infinite",
        kenburns: "kenburns 18s ease-in-out infinite alternate",
        floaty: "floaty 7s ease-in-out infinite",
      },
      keyframes: {
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        kenburns: { "0%": { transform: "scale(1.12)" }, "100%": { transform: "scale(1.02)" } },
        floaty: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-12px)" } },
      },
    },
  },
  plugins: [],
};

export default config;
