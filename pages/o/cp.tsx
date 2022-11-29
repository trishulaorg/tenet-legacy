import { Header } from '../../ui/header/Header'
import { HeaderState, HeaderStateContext } from '../../states/HeaderState'
import React, { useEffect } from 'react'
import { getUser, UserStateContext } from '../../states/UserState'
import { PageContentLayout } from '../../ui/layouts/PageContentLayout'
import { useRouter } from 'next/router'
import { PageBaseLayout } from '../../ui/layouts/PageBaseLayout'
import { CreateNewPost } from '../../ui/board/CreateNewPost'

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
  const main: React.FC = () => (
    <>
      <CreateNewPost boardId={router.query['boardId'] as string} />
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

export default IndexPage
