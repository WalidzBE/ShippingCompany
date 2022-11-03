/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend:{
    colors:{
      'primary':'#2500ff',
      'secondary':'#1586ff',
    }
  }
  },
  plugins: [],
}
