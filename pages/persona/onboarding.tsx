import { Header } from '../../ui/header/Header'
import { HeaderState, HeaderStateContext } from '../../states/HeaderState'
import React, { useEffect } from 'react'
import { getUser, PersonaState, PersonaStateContext } from '../../states/UserState'
import { PageContentLayout } from '../../ui/layouts/PageContentLayout'
import { PersonaCreateSteps } from '../../ui/onboarding/PersonaCreateSteps'
import { PageBaseLayout } from '../../ui/layouts/PageBaseLayout'
import router from 'next/router'

const OnboardingPage: React.FC = () => {
  const user = getUser()

  useEffect(() => {
    ;(async (): Promise<void> => {
      if (user) {
        await user.request()
        if (user.token !== 'INVALID_TOKEN' && !user.currentPersona) {
          await router.push('/persona/onboarding')
        }
      }
    })()
  }, [router, user])
  const main: React.FC = () => (
    <>
      <PersonaCreateSteps />
    </>
  )
  return (
    <PageBaseLayout>
      <HeaderStateContext.Provider value={new HeaderState(user)}>
        <Header />
      </HeaderStateContext.Provider>
      <PersonaStateContext.Provider
        value={new PersonaState(user.currentPersona ?? { id: -1, name: '', screenName: '' })}
      >
        <PageContentLayout Main={main} Side={() => <div className="max-w-xs">test</div>} />
      </PersonaStateContext.Provider>
    </PageBaseLayout>
  )
}

export default OnboardingPage
