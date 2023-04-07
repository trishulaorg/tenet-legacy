import { useRouter } from 'next/router'
import type { KeyboardEventHandler } from 'react'
import React from 'react'

import { SearchIcon } from '@heroicons/react/solid'
export const SearchBoxTextField: React.FC<{
  query: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  onFocus: React.FocusEventHandler
}> = ({ query, onChange, onFocus }) => {
  const router = useRouter()
  const submitSearch = async (): Promise<void> => {
    if (query !== '') {
      await router.push(`/search/${query}`)
    }
  }
  const onKeyDown: KeyboardEventHandler = async (e) => {
    if (e.code === 'Enter') await submitSearch()
  }
  return (
    <div className="border dark:border-low rounded flex">
      <input
        type="text"
        value={query}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        className="flex-1 outline-0 bg-contentbg dark:bg-contentbg-dark"
      />
      <button onClick={submitSearch}>
        <SearchIcon className="h-5 w-5 text-gray-400 hover:text-gray-700 dark:text-light-dark dark:hover:text-high-dark transition-colors " />
      </button>
    </div>
  )
}
