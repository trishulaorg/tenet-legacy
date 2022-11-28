/* eslint-disable */
import React from 'react'

type Props = {
  id: string
  name: string
}

export default function UserName(props: Props) {
  const { id, name } = props

  return <div>
    <p>
      <span className="pr-1 text-high dark:text-high-dark">{name}</span>
      <span className="text-low dark:text-low-dark font-thin">@{id}</span>
    </p>
  </div>
}
