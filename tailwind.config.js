/** @type {import('tailwindcss').Config} */
export default {
  content: ['node_modules/preline/dist/*.js', './src/**/*.{html, js}'],
  theme: {
    extend: {}
  },
  plugins: [require('preline/plugin')]
};
