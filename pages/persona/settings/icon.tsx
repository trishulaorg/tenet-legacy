import { Header } from '../../../ui/header/Header'
import { HeaderState, HeaderStateContext } from '../../../states/HeaderState'
import React, { useEffect } from 'react'
import { defaultUser, UserStateContext, UserState } from '../../../states/UserState'
import { getGqlToken } from '../../../libs/cookies'
import { PageContentLayout } from '../../../ui/layouts/PageContentLayout'

import { PageBaseLayout } from '../../../ui/layouts/PageBaseLayout'
import { PersonaIconForm } from '../../../ui/settings/PersonaIconForm'

const SetPersonaIconPage: React.FC = () => {
  const token = getGqlToken()
  let user = defaultUser()
  if (token) {
    user = new UserState(token, [], 0)
  }

  useEffect(() => {
    if (user) {
      ;(async () => {
        await user.request()
      })()
    }
  })
  const main: React.FC = () => (
    <>
      <PersonaIconForm />
    </>
  )
  return (
    <PageBaseLayout>
      <UserStateContext.Provider value={user}>
        <HeaderStateContext.Provider value={new HeaderState(user)}>
          <Header />
        </HeaderStateContext.Provider>
        <PageContentLayout Main={main} Side={() => <div className="max-w-xs">test</div>} />
      </UserStateContext.Provider>
    </PageBaseLayout>
  )
}

export default SetPersonaIconPage
