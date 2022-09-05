import { observer } from 'mobx-react'
import React, { useContext } from 'react'
import { BoardStateContext } from '../../states/PostState'
import { Post } from '../post/Post'
import { PostForm } from '../common/PostForm'
import Link from 'next/link'
import { ChatIcon, MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/solid'
import { MultiLineText } from '../common/MultiLineText'

type BoardProps = {
  showPostCreate?: boolean
  followButtonType?: 'follow' | 'unfollow'
  onFollowButtonClick?: () => Promise<void>
}

export const Board: React.FC<BoardProps> = observer(
  ({ showPostCreate = true, followButtonType = 'follow', onFollowButtonClick }) => {
    const state = useContext(BoardStateContext)

    return (
      <div>
        <div className="flex flex-col">
          <h1 className="flex-row my-4 text-slate-600 text-2xl">
            <Link href={`/b/${state.id}`}>
              <span className="cursor-pointer">#{state.title}</span>
            </Link>
          </h1>
          <div className={'flex ml-auto'}>
            {onFollowButtonClick ? (
              followButtonType === 'follow' ? (
                <button
                  onClick={onFollowButtonClick}
                  className="flex mb-4 py-2 px-2 md:px-4 lg:px-6 block text-white bg-teal-400 hover:bg-teal-600 rounded-xl border border-slate-300"
                >
                  <PlusCircleIcon width={24} />
                  <span className="px-2">Follow</span>
                </button>
              ) : (
                <button
                  onClick={onFollowButtonClick}
                  className="flex mb-4 py-2 px-2 md:px-4 lg:px-6 block text-white bg-gray-400 hover:bg-gray-700 rounded-xl border border-slate-300"
                >
                  <MinusCircleIcon width={24} />
                  <span className="px-2">Unfollow</span>
                </button>
              )
            ) : null}
            {showPostCreate ? (
              <Link href={{ pathname: `/o/cp`, query: { boardId: state.id } }}>
                <button className="flex ml-2 lg:ml-4 mb-4 py-2 px-2 md:px-4 lg:px-6 block text-white bg-teal-400 hover:bg-teal-600 rounded-xl border border-slate-300">
                  <ChatIcon width={24} />
                  <span className="px-2">New Post</span>
                </button>
              </Link>
            ) : null}
          </div>
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
