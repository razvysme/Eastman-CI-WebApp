
const colors = require('tailwindcss/colors')

module.exports = {
    content: [ './src/**/*.svelte', './src/**/*.css', './pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './app/**/*.{js,ts,jsx,tsx}', ], 
    //purge: ['./src/**/*.svelte', './src/**/*.css'],
    darkMode: false,
    theme: {
      extend: {}
  },
  variants: {
    extend: {},
  },
  plugins: [],
}