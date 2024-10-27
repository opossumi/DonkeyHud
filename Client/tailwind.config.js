/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#4ef485',
        'secondary': '#dddbff',
        'accent': '#443dff',
        background: "rgba(var(--background-primary))",
        background2: "rgba(var(--background-secondary))",
        border: "rgba(var(--border-color))",
        textcolor: "rgba(var(--text-color))",
        button: "rgba(var(--button-color))",
      },
    },
  },
  plugins: [],
}

