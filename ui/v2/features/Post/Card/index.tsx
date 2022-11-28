/* eslint-disable */
import React from 'react'
import AttachedImages from './AttachedImages'
import BodyText from './BodyText'
import ReactionButtons from './ReactionButtons'
import Timestamp from './Timestamp'
import UserIcon from './UserIcon'
import UserName from './UserName'

type Props = {
  authorUserId: string
  authorScreenName: string
  body: string
  likesCount: number
  repliesCount: number
  createdAt: Date
  userIcon?: string
  attachedImages?: string[]
}

export default function Card(props: Props) {
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

  return (
  <div className ="flex flex-col">
    <div className='flex flex-col justify-between'>
      <div className="flex flex-row">
        <div>
          { userIcon ? <UserIcon src={userIcon}/> : <UserIcon/>}
        </div>
        <UserName id={authorUserId} name={authorScreenName}/>
      </div>
      <Timestamp createdAt={createdAt}/>
    </div>
    <BodyText text={body}/>
    <div>
      { attachedImages ? <AttachedImages src={attachedImages} /> : <></>}
    </div>
    <div className='w-full flex flex-row items-end'>
      <ReactionButtons likesCount={likesCount} repliesCount={repliesCount} />
    </div>
  </div>
  )
}
