import { AppProps } from 'next/app'
import { ReactElement } from 'react'
import { UserProvider } from '@auth0/nextjs-auth0'
import '../styles/global.css'

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}

export default MyApp
