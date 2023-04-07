import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import type { ReactElement } from 'react'
import { useState, useEffect } from 'react'
import '@/src/styles/global.css'
import { PageBaseLayout } from '@/src/ui/layouts/PageBaseLayout'
import { Header } from '@/src/ui/header/Header'
import { apiClientMockImpl } from '@/src/infrastructure/apiClientMockImpl'
import { ApiClientProvider } from '@/src/states/ApiClientState'
import type { UserState } from '@/src/application/states/UserState'
import { UserStateImpl } from '@/src/infrastructure/states/UserStateImpl'
import { UserStateProvider } from '@/src/states/UserState'
import { HeaderStateProvider } from '@/src/states/HeaderState'
import { HeaderStateImpl } from '@/src/infrastructure/states/HeaderStateImpl'

export default function App({ Component, pageProps }: AppProps): ReactElement {
  const [userState, setUserState] = useState<UserState | null>(null)

  useEffect(() => {
    ;(async () => {
      const user = await apiClientMockImpl.getMe()
      if (user == null) {
        return
      }
      setUserState(
        new UserStateImpl(
          user.personas.map((persona) => ({
            id: persona.id,
            name: persona.name,
            screenName: persona.screenName,
            iconUrl: persona.iconUrl,
          }))
        )
      )
    })()
  }, [])

  return (
    <ThemeProvider attribute="class">
      <PageBaseLayout>
        <ApiClientProvider value={apiClientMockImpl}>
          <UserStateProvider value={userState}>
            <HeaderStateProvider value={userState == null ? null : new HeaderStateImpl(userState)}>
              <Header />
            </HeaderStateProvider>
            <Component {...pageProps} />
          </UserStateProvider>
        </ApiClientProvider>
      </PageBaseLayout>
    </ThemeProvider>
  )
}
