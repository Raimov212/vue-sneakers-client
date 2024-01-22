/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  plugins: [require('daisyui')],
  theme: {
    extend: {
      colors: {
        primary: '#eaff7b'
      },
      textColor: {
        primary: 'rgb(156 163 175);'
      }
    }
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['cyberpunk'],
          '.btn-twitter': {
            'background-color': '#1EA1F1',
            'border-color': '#1EA1F1'
          },
          '.btn-twitter:hover': {
            'background-color': '#1C96E1',
            'border-color': '#1C96E1'
          }
        }
      }
    ]
  }
}
