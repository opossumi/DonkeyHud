/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "2.5rem",
          sm: "2.5rem",
        },
      },
      colors: {
        primary: "#0c9852",
        "primary-light": "#4cf082",
        "primary-dark": "rgb(8, 106, 57)",
        secondary: "#f50057",
        "secondary-light": "rgb(247, 51, 120)",
        "secondary-dark": "rgb(171, 0, 60)",
        text: "#fff",
        "text-secondary": "rgba(255, 255, 255, 0.7)",
        "text-disabled": "rgba(255, 255, 255, 0.5)",
        background: "rgba(var(--background-primary))",
        background2: "rgba(var(--background-secondary))",
        border: "rgba(var(--border-color))",
        textcolor: "rgba(var(--text-color))",
        button: "rgba(var(--button-color))",
      },
      animation: {
        "fade-in": "fadeIn 0.1s ease",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
