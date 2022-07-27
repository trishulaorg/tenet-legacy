import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import useSWR from 'swr'
import { getGqlToken } from '../../libs/cookies'
import { fetcher } from '../../libs/fetchAPI'
import { HeaderState, HeaderStateContext } from '../../states/HeaderState'
import { defaultUser, UserState } from '../../states/UserState'
import { Header } from '../../ui/header/Header'
import { Layout } from '../../ui/layouts/Layout'
import { gql } from 'apollo-server-micro'

const SearchResultList: React.FC = (props) => {
  return <ul>{props.children}</ul>
}

interface ResultT {
  search: {
    kind: 'board'
    id: number
    title: string
  }[]
}

const IndexPage: React.FC = () => {
  const token = getGqlToken()
  let user = defaultUser()
  if (token) user = new UserState(token, [], 0)
  useEffect(() => {
    const f = async (): Promise<void> => {
      if (user) {
        await user.request()
      }
    }
    f()
  }, [token, user])
  const router = useRouter()
  const { word } = router.query

  const document = gql`
    query Search($query: String!) {
      search(query: $query) {
        kind
        id
        title
      }
    }
  `

  const { data } = useSWR<ResultT>(document, (document) =>
    fetcher(document, { query: word }, token)
  )
  const main: React.FC = () => (
    <>
      <h1 className="text-xl">Search Result</h1>
      <SearchResultList>
        {data?.search.map((c, idx) => (
          <li
            key={idx}
            className="flex my-2 p-2 rounded bg-white/75 hover:bg-white cursor-pointer border"
          >
            <div className="w-8 text-slate-400">#{idx + 1}</div>
            <div className="flex-1 text-slate-700">
              <div className="text-2xl	text-slate-900">
                <Link href={`/t/${c.id}`}>{c.title}</Link>
              </div>
              <div className="">Kind: {c.kind}</div>
            </div>
          </li>
        ))}
      </SearchResultList>
    </>
  )
  return (
    <div className="bg-gray-100">
      <HeaderStateContext.Provider value={new HeaderState(user)}>
        <Header />
      </HeaderStateContext.Provider>
      <Layout Main={main} Side={() => <div className="max-w-xs">test</div>} />
      <style global jsx>{`
        html,
        body,
        body > div:first-child,
        div#__next {
          height: 100%;
        }
      `}</style>
    </div>
  )
}

export default IndexPage
