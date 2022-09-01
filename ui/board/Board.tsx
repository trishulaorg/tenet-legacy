import { observer } from 'mobx-react'
import React, { useContext } from 'react'
import { BoardStateContext } from '../../states/PostState'
import { Post } from '../post/Post'
import { PostForm } from '../common/PostForm'
import Link from 'next/link'
import { ChatIcon, MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/solid'
import { MultiLineText } from '../common/MultiLineText'

interface BoardProps {
  showPostCreate?: boolean
  followButtonType?: 'follow' | 'unfollow'
  onFollowButtonClick?: () => Promise<void>
}

export const Board: React.FC<BoardProps> = observer(
  ({ showPostCreate = true, followButtonType = 'follow', onFollowButtonClick }) => {
    const state = useContext(BoardStateContext)

    return (
      <div>
        <div className="flex">
          <h1 className="my-4 text-slate-600 text-2xl flex-1">
            <Link href={`/b/${state.id}`}>
              <span className="cursor-pointer">#{state.title}</span>
            </Link>
          </h1>
          {onFollowButtonClick ? (
            followButtonType === 'follow' ? (
              <button
                onClick={onFollowButtonClick}
                className="my-4 py-2 px-8 block text-white bg-teal-400 hover:bg-teal-600	rounded-xl border border-slate-300 flex"
              >
                <PlusCircleIcon width={24} />
                <span className="px-2">Follow</span>
              </button>
            ) : (
              <button
                onClick={onFollowButtonClick}
                className="my-4 py-2 px-8 block text-white bg-gray-400 hover:bg-gray-700	rounded-xl border border-slate-300 flex"
              >
                <MinusCircleIcon width={24} />
                <span className="px-2">Unfollow</span>
              </button>
            )
          ) : null}
          {showPostCreate ? (
            <Link href={{ pathname: `/o/cp`, query: { boardId: state.id } }}>
              <button className="ml-4 my-4 py-2 px-8 block text-white bg-teal-400 hover:bg-teal-600	rounded-xl border border-slate-300 flex">
                <ChatIcon width={24} />
                <span className="px-2">New Post</span>
              </button>
            </Link>
          ) : null}
        </div>
        <div>
          <MultiLineText text={state.description} />
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
    )
  }
)
