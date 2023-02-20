import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import type { ReactElement } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import '../styles/global.css'
import { PageBaseLayout } from '../ui/layouts/PageBaseLayout'
import { Header } from '../ui/header/Header'
import { HeaderState, HeaderStateContext } from '../states/HeaderState'
import type { UserState } from '../states/UserState'
import { getUser, UserStateContext } from '../states/UserState'
import { init } from '../libs/initFirebase'
import { isValidAuthInstance } from '../libs/isValidAuthInstance'
import { getCookies } from '../libs/cookies'
import jwt from 'jsonwebtoken'
import { apiClientImpl, ApiClientProvider } from '../states/ApiClientState'

if (process.env['NEXT_PUBLIC_API_MOCKING'] === 'enabled') {
  require('../mocks')
}

export default function App({ Component, pageProps }: AppProps): ReactElement {
  // To prevent hydration errors, userState should be null in the initial rendering.
  const [userState, setUserState] = useState<UserState | null>(null)

  useEffect(() => {
    ;(async () => {
      const { auth } = init()
      const user = getUser()
      if (!isValidAuthInstance(auth) || !auth.currentUser) {
        setUserState(user)
        return
      }
      if (getCookies().has('gqltoken') && getCookies().get('gqltoken') !== '') {
        user.token = getCookies().get('gqltoken') ?? ''
        setUserState(user)
        return
      }
      const localToken = jwt.sign(
        { uid: auth.currentUser.uid },
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        process.env['NEXT_PUBLIC_API_TOKEN_SECRET']!
      )
      document.cookie = `gqltoken=${localToken}`
      user.token = localToken
      setUserState(user)
    })()
  }, [])

  return (
    <ThemeProvider attribute="class">
      <PageBaseLayout>
        <ApiClientProvider value={apiClientImpl}>
          <UserStateContext.Provider value={userState}>
            <HeaderStateContext.Provider
              value={userState == null ? null : new HeaderState(userState)}
            >
              <Header />
            </HeaderStateContext.Provider>
            <Component {...pageProps} />
          </UserStateContext.Provider>
        </ApiClientProvider>
      </PageBaseLayout>
    </ThemeProvider>
  )
}
