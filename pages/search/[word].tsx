import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { getGqlToken } from '../../libs/cookies'
import { apiHooks, setAuthToken } from '../../libs/fetchAPI'
import { HeaderState, HeaderStateContext } from '../../states/HeaderState'
import { defaultUser, UserState } from '../../states/UserState'
import { Header } from '../../ui/header/Header'
import { PageContentLayout } from '../../ui/layouts/PageContentLayout'
import { PageBaseLayout } from '../../ui/layouts/PageBaseLayout'

const SearchResultList: React.FC = (props) => {
  return <ul>{props.children}</ul>
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
      if (token) {
        setAuthToken(token)
      }
    }
    f()
  }, [token, user])
  const router = useRouter()
  const {
    isReady,
    query: { word: rawWord },
  } = router

  const word = isReady && typeof rawWord === 'string' ? rawWord : ''
  const searchQuery = { query: word }

  const { data } = apiHooks.useSearch(
    () => word && apiHooks.useSearch.name + JSON.stringify(searchQuery),
    searchQuery
  )

  const main: React.FC = () => (
    <PageBaseLayout>
      <h1 className="text-xl">Search Result</h1>
      <SearchResultList>
        {data &&
          data.search.map((c, idx) => (
            <li
              key={idx}
              className="flex my-2 p-2 rounded bg-contentbg/75 hover:bg-contentbg dark:bg-contentbg-dark/75 dark:hover:bg-contentbg-dark transition-colors duration-350 cursor-pointer border dark:border-med"
            >
              <div className="w-8 text-low dark:text-low-dark">#{idx + 1}</div>
              <div className="flex-1 text-med dark:text-med-dark">
                <div className="text-2xl	text-high dark:text-high-dark">
                  <Link href={`/board/${c.id}`}>{c.title}</Link>
                </div>
                <div className="">Kind: {c.kind}</div>
              </div>
            </li>
          ))}
      </SearchResultList>
    </PageBaseLayout>
  )
  return (
    <div className="bg-pagebg dark:bg-pagebg-dark transition-colors duration-350">
      <HeaderStateContext.Provider value={new HeaderState(user)}>
        <Header />
      </HeaderStateContext.Provider>
      <PageContentLayout Main={main} Side={() => <div className="max-w-xs">test</div>} />
    </div>
  )
}

export default IndexPage
