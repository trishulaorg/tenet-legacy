import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import type { ReactElement } from 'react'
import { useState, useEffect } from 'react'
import '../styles/global.css'
import { PageBaseLayout } from '../ui/layouts/PageBaseLayout'
import { Header } from '../ui/header/Header'
import { HeaderState, HeaderStateContext } from '../states/HeaderState'
import { PersonaState, UserState, UserStateContext } from '../states/UserState'
import { apiClientMockImpl } from '@/infrastructure/apiClientMockImpl'
import { ApiClientProvider } from '@/states/ApiClientState'

export default function App({ Component, pageProps }: AppProps): ReactElement {
  const [userState, setUserState] = useState<UserState | null>(null)

  useEffect(() => {
    ;(async () => {
      const user = await apiClientMockImpl.getMe()
      if (user == null) {
        return
      }
      setUserState(
        new UserState(
          user.personas.map(
            (persona) =>
              new PersonaState({
                id: persona.id,
                name: persona.name,
                screenName: persona.screenName,
                iconUrl: persona.iconUrl,
              })
          )
        )
      )
    })()
  }, [])

  return (
    <ThemeProvider attribute="class">
      <PageBaseLayout>
        <ApiClientProvider value={apiClientMockImpl}>
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
