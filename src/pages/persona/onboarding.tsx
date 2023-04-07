import type { NextPage } from 'next'
import { PageContentLayout } from '@/src/ui/layouts/PageContentLayout'
import { PersonaCreateSteps } from '@/src/ui/onboarding/PersonaCreateSteps'

const OnboardingPage: NextPage = () => {
  return (
    <PageContentLayout main={<PersonaCreateSteps />} side={<div className="max-w-xs">test</div>} />
  )
}

export default OnboardingPage
