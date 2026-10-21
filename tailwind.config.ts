import type { Config } from "tailwindcss";

/** Neutral OS-desktop palette: cool blues and grays, frosted surfaces, soft shadows. */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        hand: ["var(--font-caveat)", "ui-serif", "cursive"],
      },
      colors: {
        desk: {
          from: "#5b7fb5",
          via: "#3f5f8f",
          to: "#2a3f5f",
        },
        glass: {
          light: "rgba(255, 255, 255, 0.72)",
          panel: "rgba(255, 255, 255, 0.86)",
          bar: "rgba(255, 255, 255, 0.55)",
        },
        ink: {
          DEFAULT: "#1f2937",
          soft: "#4b5563",
          faint: "#6b7280",
        },
        accent: {
          DEFAULT: "#2563eb",
          soft: "#dbeafe",
        },
      },
      boxShadow: {
        window: "0 24px 64px -12px rgba(15, 23, 42, 0.45), 0 0 0 1px rgba(255,255,255,0.35) inset",
        taskbar: "0 -6px 24px -8px rgba(15, 23, 42, 0.35)",
        icon: "0 6px 16px -6px rgba(15, 23, 42, 0.5)",
        chat: "0 20px 50px -12px rgba(15, 23, 42, 0.5)",
      },
      backdropBlur: {
        os: "18px",
      },
      keyframes: {
        "chat-in": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "chat-in": "chat-in 220ms ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
