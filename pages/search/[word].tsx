import { apiClientMockImpl } from '@/infrastructure/apiClientMockImpl'
import type { SearchQuery } from '@/domain/models/search/SearchQuery'
import type { SearchResult } from '@/domain/models/search/SearchResult'
import type { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { PageContentLayout } from '../../ui/layouts/PageContentLayout'

type Props = { searchData: SearchResult[] }

const SearchResultPage: NextPage<Props> = ({ searchData }) => {
  return (
    <div className="bg-pagebg dark:bg-pagebg-dark transition-colors duration-350">
      <PageContentLayout
        main={
          <>
            <h1 className="text-xl">Search Result</h1>
            <ul>
              {searchData.map((c, idx) => (
                <li
                  key={c.id}
                  className="flex my-2 p-2 rounded bg-contentbg/75 hover:bg-contentbg dark:bg-contentbg-dark/75 dark:hover:bg-contentbg-dark transition-colors duration-350 cursor-pointer border dark:border-med"
                >
                  <div className="w-8 text-low dark:text-low-dark">#{idx + 1}</div>
                  <div className="flex-1 text-med dark:text-med-dark">
                    <div className="text-2xl	text-high dark:text-high-dark">
                      <Link href={`/board/${c.id}`} legacyBehavior>
                        {c.title}
                      </Link>
                    </div>
                    <div className="">Kind: {c.kind}</div>
                  </div>
                </li>
              ))}
            </ul>
          </>
        }
        side={<div className="max-w-xs">test</div>}
      />
    </div>
  )
}

type Params = {
  word: SearchQuery
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async (context) => {
  const { params } = context
  if (!params) throw new Error('params is undefined')
  const { word } = params
  const searchData = await apiClientMockImpl.search({
    query: word,
  })
  return {
    props: {
      searchData,
    },
  }
}

export default SearchResultPage
