/* eslint-disable */
import React from 'react'

type Props = {
  authorUserId: string
  authorScreenName: string
  body: string
  likesCount: number
  repliesCount: number
  createdAt: Date
  title?: string
  userIcon?: string
  attachedImages?: string[]
}

export default function Post(props: Props) {
  const {
    authorUserId,
    authorScreenName,
    body,
    likesCount,
    repliesCount,
    createdAt,
    userIcon,
    attachedImages,
  } = props
  console.log(authorUserId,
    authorScreenName,
    body,
    likesCount,
    repliesCount,
    createdAt,
    userIcon,
    attachedImages,)
  return <div>{/* TODO */}</div>
}
