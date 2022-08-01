import { Header } from '../ui/header/Header'
import { HeaderState, HeaderStateContext } from '../states/HeaderState'
import React from 'react'
import { defaultUser, UserState } from '../states/UserState'
import { getGqlToken } from '../libs/cookies'
import { PageContentLayout } from '../ui/layouts/PageContentLayout'
import { PersonaCreateSteps } from '../ui/onboarding/PersonaCreateSteps'
import { PageBaseLayout } from '../ui/layouts/PageBaseLayout'

const OnboardingPage: React.FC = () => {
  const token = getGqlToken()
  let user = defaultUser()
  if (token) user = new UserState(token, [], 0)

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
      <PageContentLayout Main={main} Side={() => <div className="max-w-xs">test</div>} />
    </PageBaseLayout>
  )
}

export default OnboardingPage
