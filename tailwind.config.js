const configStyles = require('./src/Config/config.styles.js')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'default': configStyles.defaultColorBg
      },
      textColor: {
        'default': configStyles.defaultColorText
      },
      colors: {
        'default': configStyles.defaultColor
      }
    },
  },
  plugins: [],
  important: true
}
