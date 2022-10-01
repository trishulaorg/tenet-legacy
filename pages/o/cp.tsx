import { Header } from '../../ui/header/Header'
import { HeaderState, HeaderStateContext } from '../../states/HeaderState'
import React, { useEffect } from 'react'
import { defaultUser, UserState, UserStateContext } from '../../states/UserState'
import { getGqlToken } from '../../libs/cookies'
import { PageContentLayout } from '../../ui/layouts/PageContentLayout'
import { useRouter } from 'next/router'
import { PageBaseLayout } from '../../ui/layouts/PageBaseLayout'
import { CreateNewPost } from '../../ui/board/CreateNewPost'

const IndexPage: React.FC = () => {
  const token = getGqlToken()
  const router = useRouter()
  let user = defaultUser()
  if (token) user = new UserState(token, [], 0)

  useEffect(() => {
    const f = async (): Promise<void> => {
      if (user) {
        await user.request()
        if (user.isValidUser && !user.currentPersona) {
          await router.push('/persona/onboarding')
        }
      }
    }
    f()
  }, [token, router, user])
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
