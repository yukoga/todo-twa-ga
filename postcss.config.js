// const tailwindcss = require('tailwindcss')
// const autoprefixer = require('autoprefixer')

// const config = {
export default {
  // plugins: [
  //   tailwindcss(),
  //   autoprefixer,
  // ]
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
  },
}
// module.exports = config
