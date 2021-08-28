module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.css',
    './src/**/*.jsx',
    './src/**/*.tsx',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    screens: {
      'phone': '500px',
      'tablet': '780px',
      'laptop': '1024px',
      'desktop': '1280px',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
