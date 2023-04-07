import type { NextPage } from 'next'
import { PageContentLayout } from '../../../ui/layouts/PageContentLayout'
import { PersonaIconForm } from '../../../ui/settings/PersonaIconForm'

const SetPersonaIconPage: NextPage = () => {
  return (
    <PageContentLayout main={<PersonaIconForm />} side={<div className="max-w-xs">test</div>} />
  )
}

export default SetPersonaIconPage
