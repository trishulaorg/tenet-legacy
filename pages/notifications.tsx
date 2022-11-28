import { Header } from '../ui/header/Header'
import { HeaderState, HeaderStateContext } from '../states/HeaderState'
// import React, { useEffect, useState } from 'react'
import { defaultUser, UserState, UserStateContext } from '../states/UserState'
// import { BoardState, BoardStateContext, PostState } from '../states/PostState'
import { getGqlToken } from '../libs/cookies'
import { PageContentLayout } from '../ui/layouts/PageContentLayout'
// import { useRouter } from 'next/router'
// import { Board } from '../ui/board/Board'
// import { apiHooks, client, setAuthToken } from '../libs/fetchAPI'
import { setAuthToken } from '../libs/fetchAPI'
import { PageBaseLayout } from '../ui/layouts/PageBaseLayout'
// import { queryDocuments } from '../server/graphql-schema/queryDocuments'
// import { PostFormState, PostFormStateContext } from '../states/PostFormState'
// import { makePusher } from '../libs/usePusher'
// import type { Channel } from 'pusher-js'
// import { swrKey } from '../libs/swrKey'
import Notifications from '../ui/v2/features/Notification/index'

const NotificationsPage: React.FC = () => {
  const token = getGqlToken()
  let user: UserState | undefined
  if (!user) {
    user = defaultUser()
  }
  if (token) {
    setAuthToken(token)
    user = new UserState(token, [], 0)
  }
//   const [personaId, setPersonaId] = useState<number | undefined>(undefined)

  const main: React.FC = () => (
    <>
      <Notifications />
    </>
  )
  return (
    <PageBaseLayout>
      <UserStateContext.Provider value={user}>
          <HeaderStateContext.Provider value={new HeaderState(user)}>
            <Header />
          </HeaderStateContext.Provider>
          <PageContentLayout Main={main} Side={() => <></>} />
      </UserStateContext.Provider>
    </PageBaseLayout>
  )
}

export default NotificationsPage