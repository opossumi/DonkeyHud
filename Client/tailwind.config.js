/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0c9852',
        "primary-light": 'rgb(60, 172, 116)',
        "primary-dark": 'rgb(8, 106, 57)',
        secondary: '#f50057',
        "secondary-light": 'rgb(247, 51, 120)',
        "secondary-dark": 'rgb(171, 0, 60)',
        text: '#fff',
        "text-secondary": 'rgba(255, 255, 255, 0.7)',
        "text-disabled": 'rgba(255, 255, 255, 0.5)',
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

