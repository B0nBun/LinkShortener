/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

function* range(start, end, step = 1) {
  let x = start - step
  while (x < end - step) yield x += step
}

let animationDelayClasses = {}

for (let delay of range(100, 1600, 100)) {
  animationDelayClasses[`animation-delay-${delay}`] = {
    'animation-delay' : `${delay}ms`
  }
}

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
    },
    extend: {

      keyframes : {
        sectionfadein : {
          '0%' : {
            opacity : 0,
            transform : 'translate(-100%, 0%)'
          },
          '100%' : {
            opacity : 1,
            transform : 'translate(0%, 0%)'
          }
        },
        fadein : {
          '0%' : {
            opacity : 0
          },
          '100%' : {
            opacity : 1
          }
        }
      },
      animation : {
        sectionfadein : 'sectionfadein .5s ease-in-out 1',
        fadein : 'fadein .3s ease-in-out 1'
      }
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('hocus-active', ['&:focus', '&:hover', '&:active'])
      addVariant('italic-child', '& > i')
    }),
    plugin(({ addUtilities }) => {
      addUtilities(animationDelayClasses)
    })
  ],
}
