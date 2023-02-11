import '../styles/global.css'
import '!style-loader!css-loader!postcss-loader!tailwindcss/tailwind.css'
import { themes } from '@storybook/theming'
import { RouterContext } from "next/dist/shared/lib/router-context";
import { initialize, mswDecorator } from 'msw-storybook-addon';

// Initialize MSW
initialize({
  onUnhandledRequest: 'bypass',
});
// Provide the MSW addon decorator globally
export const decorators = [mswDecorator];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
  decorators: [ mswDecorator ],
  darkMode: {
    // Override the default dark theme
    dark: { ...themes.dark, appBg: 'black' },
    // Set the initial theme
    current: 'dark',
    classTarget: 'html',
    stylePreview: true,
  }
}