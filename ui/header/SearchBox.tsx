import { useRouter } from 'next/router'
import React, { useState } from 'react'

export const SearchBox = () => {
  const router = useRouter()
  const [text, setText] = useState('')
  const onClick = () => router.push(`/s/${text}`)
  return (
    <div>
      <input
        className="border rounded"
        type="text"
        value={text}
        onChange={(e) => setText(e.currentTarget.value)}
      />
      <button className="border rounded px-2" onClick={onClick}>
        Search
      </button>
    </div>
  )
}
