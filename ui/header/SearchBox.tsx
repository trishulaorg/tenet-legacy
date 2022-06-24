import { useRouter } from 'next/router'
import React, { KeyboardEventHandler, useState } from 'react'

import { SearchIcon } from '@heroicons/react/solid'
export const SearchBox = () => {
  const router = useRouter()
  const [text, setText] = useState('')
  const move = () => text !== '' && router.push(`/s/${text}`)
  const onKeyDown: KeyboardEventHandler = (e) => {
    if (e.code === 'Enter') move()
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
      <button onClick={move}>
        <SearchIcon className="h-5 w-5 text-gray-400 hover:text-gray-700 "></SearchIcon>
      </button>
    </div>
  )
}
