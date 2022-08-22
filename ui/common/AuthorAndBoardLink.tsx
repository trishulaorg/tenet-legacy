import React from 'react'
import { UserIcon } from './UserIcon'
import Link from 'next/link'

export const AuthorAndBoardLink: React.FC<{
  name: string
  screenName: string
  iconUrl: string
  boardLink?: { boardId: string; boardName: string }
}> = ({ name, screenName, iconUrl, boardLink }) => {
  return (
    <div className="flex items-center font-medium relative">
      <UserIcon size={'small'} src={iconUrl} />
      <p className="pl-1">
        <span className="pr-1">{screenName}</span>
        <span className="text-gray-400 font-thin">@{name}</span>
      </p>
      {boardLink && (
        <div className={'absolute right-8'}>
          <Link href={`/b/${boardLink.boardId}`}>{`Post from #${boardLink.boardName}`}</Link>
        </div>
      )}
    </div>
  )
}
