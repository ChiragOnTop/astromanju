import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        void: "#03030F",
        antique: "#C5A880",
        royal: "#5B3FD6",
        nebula: "#22104A",
      },
      fontFamily: {
        serif: ["var(--font-editorial)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        aureate: "0 0 50px rgba(197, 168, 128, 0.18)",
        violet: "0 0 70px rgba(91, 63, 214, 0.24)",
      },
    },
  },
  plugins: [],
};

export default config;
