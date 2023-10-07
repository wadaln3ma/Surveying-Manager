/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
      extend: {
          fontFamily: {
        'handlee': ['Handlee', ...defaultTheme.fontFamily.sans],
        'roboto': ['Roboto', ...defaultTheme.fontFamily.sans],
      },
            keyframes:{
                'wavey':{
                    '0%':{
                        backgroundPosition: '0% 50%',
                    },
                    '50%':{
                        backgroundPosition: '100% 50%',
                    },
                    '100%':{
                        backgroundPosition: '0% 50%',
                    },
                },
                'rotate-one':{
                    '0%':{transform: 'rotateX(35deg) rotateY(-45deg) rotateZ(0deg)'},
                    '100%':{transform: 'rotateX(35deg) rotateY(-45deg) rotateZ(360deg)'},
                },
                'rotate-two':{
                    '0%':{transform: 'rotateX(50deg) rotateY(10deg) rotateZ(0deg)'},
                    '100%':{transform: 'rotateX(50deg) rotateY(10deg) rotateZ(360deg)'},
                },
                'rotate-three':{
                    '0%':{transform: 'rotateX(35deg) rotateY(55deg) rotateZ(0deg)'},
                    '100%':{transform: 'rotateX(35deg) rotateY(55deg) rotateZ(360deg)'},
                },
            },
            animation:{
                'wave-bg': 'wavey 2s linear infinite',
                'rotate-one': 'rotate-one 1s linear infinite',
                'rotate-two': 'rotate-two 1s linear infinite',
                'rotate-three': 'rotate-three 1s linear infinite',
            },


    },
  },

    plugins: [
        require('@kamona/tailwindcss-perspective'),
    ],
}
