// Generate board header like twitter

import { useBoard } from '@/states/BoardState'
import React from 'react'
import Link from 'next/link'
import { MultiLineText } from '../common/MultiLineText'
import { ChatIcon, MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/solid'
import { Button } from '../common/Button'

interface HeaderProps {
  src?: string
}

const FollowButton: React.FC<{ onClick: React.MouseEventHandler }> = ({ onClick }) => (
  <Button onClick={onClick} label="Follow" size="normal" icon={<PlusCircleIcon width={24} />} />
)

const UnfollowButton: React.FC<{ onClick: React.MouseEventHandler }> = ({ onClick }) => (
  <Button onClick={onClick} label="Unfollow" size="normal" icon={<MinusCircleIcon width={24} />} />
)

const HeaderImagePlaceHolder: React.FC<HeaderProps> = (props) => {
  return (
    <div
      className={`w-full rounded-t-xl mx-auto bg-cover bg-center h-56 bg-repeat-x bg-[url(${
        props.src ?? '/mock-header.jpg'
      })]`}
    >
      {props.children}
    </div>
  )
}
export type BoardHeaderProps = {
  showPostCreate?: boolean
  followButtonType?: 'follow' | 'unfollow'
  onFollowButtonClick?: (() => Promise<void>) | undefined
}
export const BoardHeader: React.FC<BoardHeaderProps> = ({
  showPostCreate = true,
  followButtonType = 'follow',
  onFollowButtonClick,
}) => {
  const board = useBoard()
  return (
    <div className="py-4">
      {/* TODO: add certain header image */}
      <HeaderImagePlaceHolder />
      <div className="w-full rounded-b-xl mx-auto bg-contentbg dark:bg-contentbg-dark h-40">
        <div className="relative -top-10 -left-[220px] mx-auto">
          <div className="rounded w-20 h-20 mx-auto bg-center bg-cover bg-[url(/android-chrome-512x512.png)]" />
        </div>
        <div className="relative -top-20 left-[120px]">
          <h1 className="flex-row my-1 text-med dark:text-med-dark text-2xl">
            <Link href={`/board/${board.id}`} legacyBehavior>
              <span className="cursor-pointer">#{board.title}</span>
            </Link>
          </h1>
          <div className="text-med dark:text-med-dark">
            <MultiLineText text={board.description ?? ''} />
          </div>

          <div className="relative -top-2 right-40">
            <div className="flex flex-col">
              <div className={'flex ml-auto'}>
                {onFollowButtonClick ? (
                  followButtonType === 'follow' ? (
                    <FollowButton onClick={onFollowButtonClick} />
                  ) : (
                    <UnfollowButton onClick={onFollowButtonClick} />
                  )
                ) : null}
                {showPostCreate ? (
                  <Link href={{ pathname: `/o/cp`, query: { boardId: board.id } }} legacyBehavior>
                    <Button icon={<ChatIcon width={24} />} label="New Post" size="normal" />
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
