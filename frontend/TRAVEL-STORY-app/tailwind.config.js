/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#05B6D3",
        secondary: "#EF863E",
      },
      backgroundImage: {
        'login-img': "url('./src/assets/images/bg-image.webp')", // Ensure this path is correct
      },
    },
  },
  plugins: [],
}