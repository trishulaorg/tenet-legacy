import { observer } from 'mobx-react'
import React, { useContext } from 'react'
import { BoardStateContext } from '../../states/PostState'
import { Post } from '../post/Post'
import { PostForm } from '../common/PostForm'
import Link from 'next/link'
import { ChatIcon, MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/solid'
import { MultiLineText } from '../common/MultiLineText'
import { WithPrimaryButtonStyling } from '../common/Primitives'

type BoardProps = {
  showPostCreate?: boolean
  followButtonType?: 'follow' | 'unfollow'
  onFollowButtonClick?: () => Promise<void>
}

const FollowButton: React.FC<{ onClick: React.MouseEventHandler }> = ({ onClick }) => (
  <WithPrimaryButtonStyling>
    <button
      onClick={onClick}
      className="flex block py-2 -my-2 px-2 -mx-2 md:px-4 md:-mx-4 lg:px-6 lg:-mx-6"
    >
      <PlusCircleIcon width={24} />
      <span className="px-2">Follow</span>
    </button>
  </WithPrimaryButtonStyling>
)

const UnfollowButton: React.FC<{ onClick: React.MouseEventHandler }> = ({ onClick }) => (
  <WithPrimaryButtonStyling>
    <button
      onClick={onClick}
      className="flex block py-2 -my-2 px-2 -mx-2 md:px-4 md:-mx-4 lg:px-6 lg:-mx-6"
    >
      <MinusCircleIcon width={24} />
      <span className="px-2">Unfollow</span>
    </button>
  </WithPrimaryButtonStyling>
)

export const Board: React.FC<BoardProps> = observer(
  ({ showPostCreate = true, followButtonType = 'follow', onFollowButtonClick }) => {
    const state = useContext(BoardStateContext)

    return (
      <div>
        <div className="flex flex-col">
          <h1 className="flex-row my-4 text-med dark:text-med-dark text-2xl">
            <Link href={`/board/${state.id}`} legacyBehavior>
              <span className="cursor-pointer">#{state.title}</span>
            </Link>
          </h1>
          <div className="text-med dark:text-med-dark">
            <MultiLineText text={state.description} />
          </div>
          <div className={'flex ml-auto'}>
            {onFollowButtonClick ? (
              followButtonType === 'follow' ? (
                <FollowButton onClick={onFollowButtonClick} />
              ) : (
                <UnfollowButton onClick={onFollowButtonClick} />
              )
            ) : null}
            {showPostCreate ? (
              <WithPrimaryButtonStyling>
                <Link href={{ pathname: `/o/cp`, query: { boardId: state.id } }} legacyBehavior>
                  <button className="flex block py-2 -my-2 px-2 -mx-2 md:px-4 md:-mx-4 lg:px-6 lg:-mx-6">
                    <ChatIcon width={24} />
                    <span className="px-2">New Post</span>
                  </button>
                </Link>
              </WithPrimaryButtonStyling>
            ) : null}
          </div>
        </div>
        <ul>
          {state.posts.map((p, idx) => (
            <li key={idx} className="mb-5">
              <Post post={p} showThreads={false} />
            </li>
          ))}
        </ul>
        <PostForm />
      </div>
    );
  }
)
