const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  // disable tailwind default container class
  corePlugins: {
    container: false
  },
  theme: {
    extend: {
      // add custom orange color
      colors: {
        shopee_orange: '#ee4d2d'
      }
    }
  },
  plugins: [
    // add custom container class
    plugin(function ({ addComponents, theme }) {
      addComponents({
        '.container': {
          maxWidth: theme('columns.7xl'),
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: theme('spacing.4'),
          paddingRight: theme('spacing.4')
        }
      })
    }),
    // https://tailwindcss.com/docs/line-clamp
    require('@tailwindcss/line-clamp')
  ]
}
