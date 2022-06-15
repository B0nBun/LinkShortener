/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens : {
      tablet : '860px',
      desktop : '1200px'
    },
    colors : {
      white : '#F6F6F6',
      red : '#EE2B47',
      black : '#2C2E3E',
      'dark-grey' : '#34374C'
    },
    extend: {},
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('hocus-active', ['&:focus', '&:hover', '&:active'])
      addVariant('italic-child', '& > i')
    })
  ],
}
