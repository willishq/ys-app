/* eslint-disable */
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './**/*.vue',
    './colours/*.ts'
  ],
  theme: {
    colors: {
      primary: colors.violet,
      secondary: colors.emerald,
      accent: colors.amber,
      info: colors.blue,
      success: colors.green,
      error: colors.rose,
      warning: colors.yellow,
      neutral: colors.slate,
      black: colors.black,
      white: colors.white,
      categories: {
        'financial-support': '#2E7D42',
        'housing-and-homelessness': '#a141a1',
        'relationships-and-sexual-health': '#E91E33',
        'legal-support': '#1A339E',
        'addiction-support': '#ABA0AD',
        'child-protection-and-wellness': '#9CCC35',
        'education-and-employment': '#FF9800',
        'physical-health': '#D50000',
        'social-care-and-community-support': '#bb9126',
        'mental-health-and-wellbeing': '#2196F3',
        'behavioural-support': '#009668',
        'digital-wellness': '#6A1B9A',
        therapies: '#44a4de'
      }
    },

    extend: {
      fontFamily: {
        sans: ['Nunito', ...defaultTheme.fontFamily.sans]
      }
    }
  },

  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@headlessui/tailwindcss')({ prefix: 'ui' })

  ]
}
