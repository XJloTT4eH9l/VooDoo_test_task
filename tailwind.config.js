/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      fontWeight: {
        regular: '400',
        medium: '500',
        bold: '700'
      },
      textColor: {
        'black': '#000',
        'white': '#fff'
      },
      backgroundColor: {
        'yellow': '#FCF7E6',
        'black': '#000000',
        'white': '#ffffff'
      },
      screens: {
        'extra-sm': '400px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        'custom-sm': '700px'
      },
    },
  },
  plugins: [],
}