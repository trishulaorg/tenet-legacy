import '@/src/styles/global.css'
import '!style-loader!css-loader!postcss-loader!tailwindcss/tailwind.css'
import { themes } from '@storybook/theming'
import { RouterContext } from "next/dist/shared/lib/router-context";
import { SnackbarProvider } from '@/ui/snackbar/SnackbarProvider'
import { ApiClientProvider } from '@/states/ApiClientState'
import { apiClientMockImpl } from '@/infrastructure/apiClientMockImpl'

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
  darkMode: {
    // Override the default dark theme
    dark: { ...themes.dark, appBg: 'black' },
    // Set the initial theme
    current: 'dark',
    classTarget: 'html',
    stylePreview: true,
  }
}
<<<<<<< HEAD:.storybook/preview.jsx

export const decorators = [
  (Story) => (
    <SnackbarProvider
      value={{
        enqueueError: () => {
          return
        },
        clearError: () => {
          return
        },
      }}
    >
      <ApiClientProvider value={apiClientMockImpl}>
        <Story />
      </ApiClientProvider>
    </SnackbarProvider>
  ),
]
=======
>>>>>>> v2:.storybook/preview.js
