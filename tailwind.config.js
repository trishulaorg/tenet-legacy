module.exports = {
  //content: ["./ui/**/*.{ts,tsx}", "./pages/**/*.{ts,tsx}"],
  content: ["ui/**/*.{ts,tsx}", "pages/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        /* theme colors */
        'primary': {
          'DEFAULT': '#33AEBC',
          'dark': '#814bdc'
        },
        'secondary': {
          'DEFAULT' : '#00EB9C'
        },
        'teritary': {
          'DEFAULT' :'#EB0C54'
        },
        
        /* background colors */
        'pagebg': { /* background for empty space on the page */
          'DEFAULT': '#F3F4F6',
          'dark' : '#111111'
        },
        'contentbg': { /* background for posts, following board, navbar, dropdowns, etc. (background for text) */
          'DEFAULT' : 'white',
          'dark' : '#2E2E2E'
        },

        /* font colors */
        'low' : { /* Low contrast text: subtle but legible */
          'DEFAULT' : '#9CA3AF',
          'dark' : '#AAAAAA'
        }, 
        'med' : { /* Medium contrast text: comfortably legible; Used for most text, including board titles, post titles and post content */
          'DEFAULT' : '#374151',
          'dark' : '#DDDDDD'
        },
        'high' : { /* High contrast text, very bold; Used for following boards title, TOS link */
          'DEFAULT' : 'black',
          'dark' : 'white'
        } 
      }
    },
  },
  plugins: [],
}
