/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        blueColor : '#095aab',
        darkBlueColor : '#084480',
        darkerBlueColor : '#182a3d',
        grayColor : '#bebebe',
        lightGrayColor : '#F4F4F4'
      },
      fontSize: {
        h1: '2rem',
        h2: '1.5rem',
        h3: '1.17rem',
        h4: '1rem',
        h5: '0.83rem',
        h6: '0.67rem'
      },
      container: {
        padding: {
          DEFAULT: 'calc(var(--gutter-x) * 0.5) !important',
          sm : 'calc(var(--gutter-x) * 1) !important'
        },
        center: true
      }
    },
  },
  plugins: [],
  important : true,
  darkMode : 'class'
}