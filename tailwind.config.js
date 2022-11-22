module.exports = {
  //content: ["./ui/**/*.{ts,tsx}", "./pages/**/*.{ts,tsx}"],
  content: ["ui/**/*.{ts,tsx}", "pages/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary': {
          'DEFAULT': '#33AEBC',
          'dark': '#116999'
        },
        'secondary': '#00EB9C',
        'teritary': '#EB0C54',
        'pagebg': { /* background for empty space on the page */
          'DEFAULT': '#F3F4F6',
          'darkmode' : '#111111'
        },
        'contentbg': { /* background for posts, following board, navbar, dropdowns, etc. (background for text) */
          'DEFAULT' : 'white',
          'darkmode' : '#2E2E2E'
        },
        'fontcl' : {
          'light' : { /* @Usernames, light text elements */
            'DEFAULT' : '#9CA3AF',
            'darkmode' : '#AAAAAA'
          }, 
          'med' : { /* Most text, including board titles, post titles and post content */
            'DEFAULT' : '#374151',
            'darkmode' : '#DDDDDD'
          },
          'heavy' : { /* Bold text: Following boards title, TOS */
            'DEFAULT' : 'black',
            'darkmode' : 'white'
          } 
        }
      }
    },
  },
  plugins: [],
}
