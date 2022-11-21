module.exports = {
  //content: ["./ui/**/*.{ts,tsx}", "./pages/**/*.{ts,tsx}"],
  content: ["ui/**/*.{ts,tsx}", "pages/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary': {
          'DEFAULT': '#33AEBC',
          'dark': '#116999',
        },
        'secondary': '#00EB9C',
        'teritary': '#EB0C54',
      }
    },
  },
  plugins: [],
}
