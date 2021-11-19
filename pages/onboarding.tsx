import { Header } from '../ui/header/Header'
import { HeaderState, HeaderStateContext } from '../states/HeaderState'
import React from 'react'
import { defaultUser, UserState } from '../states/UserState'
import { getGqlToken } from '../libs/cookies'
import { Layout } from '../ui/layouts/Layout'
import { PersonaCreateSteps } from '../ui/onboarding/PersonaCreateSteps'

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
    <div className="bg-gray-600 bg-opacity-5">
      <HeaderStateContext.Provider value={new HeaderState(user)}>
        <Header></Header>
      </HeaderStateContext.Provider>
      <Layout Main={main} Side={() => <div className="max-w-xs">test</div>} />
    </div>
  )
}

export default OnboardingPage
