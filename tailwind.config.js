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
            transform : 'translate(-50%, 0%)'
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
        },
        blob : {
          '0%' : {
            transform : 'scale(1) translate(0%, 0%)'
          },
          '25%' : {
            transform : 'scale(1.1) translate(-20%, 5%)',
          },
          '50%' : {
            transform : 'scale(1) translate(-15%, 15%)',
          },
          '75%' : {
            transform : 'scale(0.9) translate(10%, -5%)'
          },
          '100%' : {
            transform : 'scale(1) translate(0%, 0%)'
          },
        }
      },
      animation : {
        sectionfadein : 'sectionfadein .5s ease-in-out 1',
        fadein : 'fadein .3s ease-in-out 1',
        blob : 'blob 10s ease-in-out infinite'
      }
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('hocus-active', ['&:focus', '&:hover', '&:active'])
      addVariant('italic-child', '& > i')
      addVariant('child', '& > *')
    }),
    plugin(({ addUtilities }) => {
      addUtilities(animationDelayClasses)
    })
  ],
}
