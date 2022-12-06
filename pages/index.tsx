import { Header } from '../ui/header/Header'
import jwt from 'jsonwebtoken'
import { HeaderState, HeaderStateContext } from '../states/HeaderState'
import React, { useEffect, useState } from 'react'
import { UserStateContext, getUser } from '../states/UserState'
import { ActivityCard } from '../ui/home/ActivityCard'
import { PostState } from '../states/PostState'
import { getCookies } from '../libs/cookies'
import { PageContentLayout } from '../ui/layouts/PageContentLayout'
import { useRouter } from 'next/router'
import { PageBaseLayout } from '../ui/layouts/PageBaseLayout'
import { PostFormState, PostFormStateContext } from '../states/PostFormState'
import Link from 'next/link'
import { FollowingBoardCard } from '../ui/menu/FollowingBoardCard'
import { init } from '../libs/initFirebase'
import { isValidAuthInstance } from '../libs/isValidAuthInstance'
import { observer } from 'mobx-react'
import type { NextPage } from 'next'
import { GraphQLClient } from 'graphql-request'
import { CommentInput } from '../ui/thread/CommentInput'
import {client, operations} from '../libs/getClient'

const IndexPage: NextPage = () => {
  const [user] = useState(getUser())
  const [personaId, setPersonaId] = useState<number | undefined>(undefined)
  const router = useRouter()
  console.log(user)

  // const { data: activitiesData } = apiHooks.useGetActivities(
  //   () => swrKey.useGetActivities(undefined), // TODO: Not personalized yet
  //   {},
  //   {
  //     fallbackData: initialData,
  //   }
  // )

  // const { data: followingBoardsData } = apiHooks.useGetFollowingBoard(
  //   () => (personaId ? swrKey.useGetFollowingBoard({ personaId }) : undefined),
  //   { personaId: personaId ?? 0 }
  // )

  // useEffect(() => {
  //   const f = async (): Promise<void> => {
  //     if (user.token !== 'INVALID_TOKEN' && !user.requested) {
  //       await user.request()
  //       if (user.personas.length < 1) {
  //         await router.push('/persona/onboarding')
  //       }
  //       if (user.currentPersona?.id) {
  //         setPersonaId(user.currentPersona.id)
  //       }
  //     }
  //   }
  //   f()
  // })
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    ;(async () => {
      const r = init()
      const { auth } = r
      if (!isValidAuthInstance(auth) || !auth.currentUser) return
      if (getCookies().has('gqltoken') && getCookies().get('gqltoken') !== '') {
        user.token = getCookies().get('gqltoken') ?? ''

  const result = client('https://coton.vercel.app/api/graphql', operations.getMe, null, {
    authorization: 'Bearer '  + user.token
  }).then(v => console.log(v))
        return
      }
      const localToken = jwt.sign(
        { uid: auth.currentUser.uid },
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        process.env['NEXT_PUBLIC_API_TOKEN_SECRET']!
      )
      document.cookie = `gqltoken=${localToken}`
      user.token = localToken

    })()
  })
  const onSubmit: (comment: string) => void = async (comment: string) => {
    // setAuthToken(user.token)
    // await client.createPost({
    //   title: 'memo',
    //   content: comment,
    //   personaId: user.currentPersona?.id ?? -1,
    // })
  }
  const main: React.FC = () => (
    <div>
      <CommentInput onSubmit={onSubmit} />
      <ul>
        {/* {(activitiesData?.activities ?? [])
          .map((v) => PostState.fromPostTypeJSON(v))
          .map((v) => (
            <li key={v.id}>
              <ActivityCard post={v} />
            </li>
          ))} */}
      </ul>
    </div>
  )
  return (
    <PageBaseLayout>
      <UserStateContext.Provider value={user}>
        <PostFormStateContext.Provider value={new PostFormState({})}>
          <HeaderStateContext.Provider value={new HeaderState(user)}>
            <Header />
          </HeaderStateContext.Provider>
          <PageContentLayout
            Main={main}
            Side={() => (
              <div className="w-56">
                {/* <FollowingBoardCard boards={followingBoardsData?.getFollowingBoard ?? []} /> */}
                <div className="rounded overflow-hidden my-2 py-2 text-high dark:text-high-dark">
                  <Link href="/tos">Terms of Service</Link>
                </div>
              </div>
            )}
          />
        </PostFormStateContext.Provider>
      </UserStateContext.Provider>
    </PageBaseLayout>
  )
}

// export async function getStaticProps() {
//   const client = getSdk(new GraphQLClient('https://coton.vercel.app/api/graphql'))
//   const initialData = await client.getActivities()
//   return {
//     props: {
//       initialData,
//     },
//   }
// }

export default observer(IndexPage)
