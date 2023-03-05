import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import type { ReactElement } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import '../styles/global.css'
import { PageBaseLayout } from '../ui/layouts/PageBaseLayout'
import { Header } from '../ui/header/Header'
import { HeaderState, HeaderStateContext } from '../states/HeaderState'
import { PersonaState, UserState } from '../states/UserState'
import { UserStateContext } from '../states/UserState'
import { apiClientImplMock, ApiClientProvider } from '../states/ApiClientState'

export default function App({ Component, pageProps }: AppProps): ReactElement {
  const [userState, setUserState] = useState<UserState | null>(null)

  useEffect(() => {
    ;(async () => {
      const user = (await apiClientImplMock.getMe()).me
      if (user == null) {
        return
      }
      setUserState(
        new UserState(
          user.personas.map(
            (persona) =>
              new PersonaState({
                id: String(persona.id),
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
        <ApiClientProvider value={apiClientImplMock}>
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
