import { Header } from '../ui/header/Header'
import { HeaderState, HeaderStateContext } from '../states/HeaderState'
import React, { useEffect } from 'react'
import { UserState } from '../states/UserState'
import { getGqlToken } from '../libs/cookies'
import { Layout } from '../ui/layouts/Layout'
import { useRouter } from 'next/router'
import { PersonaCreateSteps } from '../ui/onboarding/PersonaCreateSteps'
import { fetchAPI } from '../libs/fetchAPI'

const OnboardingPage: React.FC = () => {
  let user: UserState | undefined = undefined
  const token = getGqlToken()
  user = token ? new UserState(token, [], 0) : undefined
  const router = useRouter()
  const query = `
    Mutation {
      
    }
  `
  fetchAPI(query, token)

  useEffect(() => {
    if (user?.personas.length !== 0) {
      router.push('/')
    }
  })

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
