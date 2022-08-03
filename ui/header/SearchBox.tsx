import { useRouter } from 'next/router'
import type { KeyboardEventHandler } from 'react'
import React, { useState } from 'react'

import { SearchIcon } from '@heroicons/react/solid'
export const SearchBox: React.FC = () => {
  const router = useRouter()
  const [text, setText] = useState('')
  const submitSearch = async (): Promise<boolean> =>
    text !== '' && (await router.push(`/s/${text}`))
  const onKeyDown: KeyboardEventHandler = async (e) => {
    if (e.code === 'Enter') await submitSearch()
  }
  return (
    <div className="border rounded flex">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.currentTarget.value)}
        onKeyDown={onKeyDown}
        className="flex-1 outline-0"
      />
      <button onClick={submitSearch}>
        <SearchIcon className="h-5 w-5 text-gray-400 hover:text-gray-700 " />
      </button>
    </div>
  )
}
