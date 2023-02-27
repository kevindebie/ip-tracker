/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}",
            "./index.html"],
  theme: {
    extend: {
      colors: {
        'medium-gray': '#969696',
        'dark-gray': '#2b2b2b',
      },
    },
  },
  plugins: [],
}
