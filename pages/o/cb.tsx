import { Header } from '../../ui/header/Header'
import { HeaderState, HeaderStateContext } from '../../states/HeaderState'
import React, { useEffect } from 'react'
import { getUser, UserStateContext } from '../../states/UserState'
import { PageContentLayout } from '../../ui/layouts/PageContentLayout'
import { useRouter } from 'next/router'
import { CreateNewBoard } from '../../ui/board/CreateNewBoard'
import { PageBaseLayout } from '../../ui/layouts/PageBaseLayout'

const IndexPage: React.FC = () => {
  const router = useRouter()
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
    <PageBaseLayout>
      <UserStateContext.Provider value={user}>
        <HeaderStateContext.Provider value={new HeaderState(user)}>
          <Header />
        </HeaderStateContext.Provider>
        <PageContentLayout main={<CreateNewBoard />} side={<div className="max-w-xs">test</div>} />
      </UserStateContext.Provider>
    </PageBaseLayout>
  )
}

export default IndexPage
