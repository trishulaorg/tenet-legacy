import { useRouter } from 'next/router'
import React, { KeyboardEventHandler, useState } from 'react'

export const SearchBox = () => {
  const router = useRouter()
  const [text, setText] = useState('')
  const move = () => text !== '' && router.push(`/s/${text}`)
  const onKeyDown: KeyboardEventHandler = (e) => {
    if (e.code === 'Enter') move()
  }
  return (
    <div>
      <input
        className="border rounded"
        type="text"
        value={text}
        onChange={(e) => setText(e.currentTarget.value)}
        onKeyDown={onKeyDown}
      />
    </div>
  )
}
