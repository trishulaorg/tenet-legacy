import '../styles/global.css'
import '!style-loader!css-loader!postcss-loader!tailwindcss/tailwind.css'
import { themes } from '@storybook/theming'

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
  darkMode: {
    // Override the default dark theme
    dark: { ...themes.dark, appBg: 'black' },
    // Set the initial theme
    current: 'dark',
    classTarget: 'html',
    stylePreview: true,
  }
}