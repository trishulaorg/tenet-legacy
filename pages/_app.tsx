import type { AppProps } from 'next/app'
import type { ReactElement } from 'react'
import { ThemeProvider } from 'next-themes'
import '../styles/global.css'
import { PageBaseLayout } from '../ui/layouts/PageBaseLayout'

export default function App({ Component, pageProps }: AppProps): ReactElement {
  return (
    <ThemeProvider attribute="class">
      <PageBaseLayout>
        <Component {...pageProps} />
      </PageBaseLayout>
    </ThemeProvider>
  )
}
