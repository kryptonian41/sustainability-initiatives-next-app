module.exports = {
  purge: [
    './**/*.html',
    './**/*.css',
    './**/*.jsx',
    './**/*.tsx',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    screens: {
      'phone': '500px',
      'tablet': '768px',
      'laptop': '1024px',
      'desktop': '1536px',
    }
  },
  variants: {
    extend: {
      margin: ['first']
    },
  },
  plugins: [],
}
