import { Header } from '../../../ui/header/Header'
import { HeaderState, HeaderStateContext } from '../../../states/HeaderState'
import React, { useEffect } from 'react'
import { getUser, UserStateContext } from '../../../states/UserState'
import { PageContentLayout } from '../../../ui/layouts/PageContentLayout'

import { PageBaseLayout } from '../../../ui/layouts/PageBaseLayout'
import { PersonaIconForm } from '../../../ui/settings/PersonaIconForm'
import router from 'next/router'

const SetPersonaIconPage: React.FC = () => {
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

  return (
    <UserStateContext.Provider value={user}>
      <HeaderStateContext.Provider value={new HeaderState(user)}>
        <Header />
      </HeaderStateContext.Provider>
      <PageContentLayout main={<PersonaIconForm />} side={<div className="max-w-xs">test</div>} />
    </UserStateContext.Provider>
  )
}

export default SetPersonaIconPage
