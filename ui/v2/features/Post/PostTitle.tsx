/* eslint-disable */
import React from 'react'

type Props = {
  text: string
}

export default function PostTitle(props: Props) {
  const { text } = props

  return (
    <div>
      <h2>{text}</h2>
    </div>
  )
}
