import type { NextPage } from 'next'
import { PageContentLayout } from '@/src/ui/layouts/PageContentLayout'
import { PersonaIconForm } from '@/src/ui/settings/PersonaIconForm'

const SetPersonaIconPage: NextPage = () => {
  return (
    <PageContentLayout main={<PersonaIconForm />} side={<div className="max-w-xs">test</div>} />
  )
}

export default SetPersonaIconPage
