import type { AppProps } from 'next/app'
import { SnackbarProvider as NotistackProvider } from 'notistack'
import { ThemeProvider } from 'next-themes'
import type { ReactElement } from 'react'
import { useState, useEffect } from 'react'
import '../styles/global.css'
import { PageBaseLayout } from '../ui/layouts/PageBaseLayout'
import { Header } from '../ui/header/Header'
import { apiClientMockImpl } from '@/infrastructure/apiClientMockImpl'
import { ApiClientProvider } from '@/states/ApiClientState'
import type { UserState } from '@/application/states/UserState'
import { UserStateImpl } from '@/infrastructure/states/UserStateImpl'
import { UserStateProvider } from '@/states/UserState'
import { HeaderStateProvider } from '@/states/HeaderState'
import { HeaderStateImpl } from '@/infrastructure/states/HeaderStateImpl'
import { SnackbarProvider } from '@/ui/snackbar/SnackbarProvider'
import { useSnackbarImpl } from '@/ui/snackbar/useSnackbarImpl'

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
      <NotistackProvider>
        <DependenciesInjector>
          <ApiClientProvider value={apiClientMockImpl}>
            <UserStateProvider value={userState}>
              <PageBaseLayout
                header={
                  <HeaderStateProvider
                    value={userState == null ? null : new HeaderStateImpl(userState)}
                  >
                    <Header />
                  </HeaderStateProvider>
                }
              >
                <Component {...pageProps} />
              </PageBaseLayout>
            </UserStateProvider>
          </ApiClientProvider>
        </DependenciesInjector>
      </NotistackProvider>
    </ThemeProvider>
  )
}

const DependenciesInjector: React.FC = ({ children }) => {
  // useStackbarImpl depends on Provider of notistack.
  const snackbarImpl = useSnackbarImpl()
  return <SnackbarProvider value={snackbarImpl}>{children}</SnackbarProvider>
}
