import type { AppProps } from 'next/app'
import type { ReactElement } from 'react'
import { ThemeProvider } from 'next-themes'
import '../styles/global.css'

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
