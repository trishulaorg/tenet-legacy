import type { NextPage } from 'next'
import { getUser, PersonaState, PersonaStateContext } from '../../states/UserState'
import { PageContentLayout } from '../../ui/layouts/PageContentLayout'
import { PersonaCreateSteps } from '../../ui/onboarding/PersonaCreateSteps'

const OnboardingPage: NextPage = () => {
  const user = getUser()
  return (
    <PersonaStateContext.Provider
      value={new PersonaState(user.currentPersona ?? { id: -1, name: '', screenName: '' })}
    >
      <PageContentLayout
        main={<PersonaCreateSteps />}
        side={<div className="max-w-xs">test</div>}
      />
    </PersonaStateContext.Provider>
  )
}

export default OnboardingPage
