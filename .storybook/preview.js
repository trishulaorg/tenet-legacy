import '../styles/global.css'
import '!style-loader!css-loader!postcss-loader!tailwindcss/tailwind.css'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  nextRouter: {
    push() {}, // override with an empty function.
  },
}