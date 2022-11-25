import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { apiHooks } from '../../libs/fetchAPI'
import { SearchBoxTextField } from './SearchBoxTextField'

export const SearchBox: React.FC = () => {
  const [query, setQuery] = useState('')
  const [visibility, setVisibility] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const mouseDownHandler = (ev: MouseEvent): void => {
    if (ref.current && !ref.current.contains(ev.target as HTMLElement)) setVisibility(false)
  }

  const queryArguments = { query }

  const { data } = apiHooks.useSearch(
    () => query && apiHooks.useSearch.name + JSON.stringify(queryArguments),
    queryArguments
  )
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setQuery(e.currentTarget.value)
    setVisibility(true)
  }
  useEffect(() => {
    document.addEventListener('mousedown', mouseDownHandler)
    return () => document.removeEventListener('mousedown', mouseDownHandler)
  }, [ref])
  return (
    <div className="relative" ref={ref}>
      <SearchBoxTextField query={query} onChange={onChange} onFocus={() => setVisibility(true)} />
      {visibility ? (
        <div className="absolute bg-contentbg dark:bg-contentbg-dark transition-colors duration-350 w-full rounded border dark:border-low z-10">
          <ul>
            {data?.search.slice(0, 10).map((v) => (
              <Link key={v.id} href={`/board/${v.id}`}>
                <li className="px-4 cursor-pointer">{v.title}</li>
              </Link>
            ))}
          </ul>
          {query !== '' && (
            <Link href={`/search/${query}`}>
              <button className="mx-4 mt-4 h-6">Show full results</button>
            </Link>
          )}
          <Link href={`/o/cb`}>
            <button className="mx-4 h-6">Create new board</button>
          </Link>
        </div>
      ) : null}
    </div>
  )
}
