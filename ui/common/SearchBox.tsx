import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { fetcher } from '../../libs/fetchAPI'
import { queryDocuments } from '../../server/graphql-schema/queryDocuments'
import { SearchBoxTextField } from './SearchBoxTextField'

interface ResultT {
  search: {
    kind: string
    id: string
    title: string
  }[]
}

export const SearchBox: React.FC = () => {
  const [query, setQuery] = useState('')

  const { data, mutate } = useSWR<ResultT>(
    () => (query !== '' ? queryDocuments.Query.search : null),
    (document) => fetcher(document, { query })
  )
  useEffect(() => {
    mutate()
  }, [query, mutate])
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setQuery(e.currentTarget.value)
  }
  return (
    <div className="relative">
      <SearchBoxTextField query={query} onChange={onChange} />
      <div className="absolute bg-white w-full">
        <ul>
          {data?.search.map((v) => (
            <li key={v.id}>
              <Link href={`/b/${v.id}`}>{v.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
