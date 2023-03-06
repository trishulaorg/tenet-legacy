import type { NextPage } from 'next'
import { PersonaState, PersonaStateContext, useUserState } from '../../states/UserState'
import { PageContentLayout } from '../../ui/layouts/PageContentLayout'
import { PersonaCreateSteps } from '../../ui/onboarding/PersonaCreateSteps'

const OnboardingPage: NextPage = () => {
  const userState = useUserState()
  return (
    <PersonaStateContext.Provider
      value={new PersonaState(userState?.currentPersona ?? { id: '', name: '', screenName: '' })}
    >
      <PageContentLayout
        main={<PersonaCreateSteps />}
        side={<div className="max-w-xs">test</div>}
      />
    </PersonaStateContext.Provider>
  )
}

export default OnboardingPage
