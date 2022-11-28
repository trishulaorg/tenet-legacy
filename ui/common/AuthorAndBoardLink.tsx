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
    <div className="flex items-center font-medium text-med dark:text-med-dark relative">
      <UserIcon size={'small'} src={iconUrl} />
      <p className="pl-1">
        <span className="pr-1 text-high dark:text-high-dark">{screenName}</span>
        <span className="text-low dark:text-low-dark font-thin">@{name}</span>
      </p>
      {boardLink && (
        <div className={'absolute right-8'}>
          <Link href={`/board/${boardLink.boardId}`} legacyBehavior>{`Post from #${boardLink.boardName}`}</Link>
        </div>
      )}
    </div>
  );
}
