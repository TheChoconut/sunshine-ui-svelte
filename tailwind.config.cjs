module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: {
          100: '#98ECFE',
          200: '#60CCFE',
          300: '#0093F9',
          500: '#0078D4',
          700: '#005EB7',
          800: '#003D92',
          900: '#001968'
        }
      }
    }
  }
}
