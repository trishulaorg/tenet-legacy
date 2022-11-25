/* eslint-disable */
import React from 'react'

type Props = {
  authorUserId: string
  authorScreenName: string
  body: string
  likesCount: number
  createdAt: Date
  userIcon?: string
}

export default function Thread(/* props: Props */) {
  const { authorUserId, authorScreenName, body, likesCount, createdAt, userIcon } = props

  return (
    <div>
      <img />
    </div>
  )
}
