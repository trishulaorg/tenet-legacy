import type { NextPage } from 'next'
import { PageContentLayout } from '../../ui/layouts/PageContentLayout'
import { PersonaCreateSteps } from '../../ui/onboarding/PersonaCreateSteps'

const OnboardingPage: NextPage = () => {
  return (
    <PageContentLayout main={<PersonaCreateSteps />} side={<div className="max-w-xs">test</div>} />
  )
}

export default OnboardingPage
