/* eslint-disable */
import React from 'react'

type Props = {
  authorUserId: string
  authorScreenName: string
  body: string
  likesCount: number
  repliesCount: number
  createdAt: Date
  userIcon?: string
}

export default function Reply(props: Props) {
  const { authorUserId, authorScreenName, body, likesCount, repliesCount, createdAt, userIcon } =
    props

  return (
    <div>
      <img />
    </div>
  )
}
