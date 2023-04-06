import { observer } from 'mobx-react'
import React from 'react'
import { Post } from '../post/Post'
import { PostForm } from '../common/PostForm'
import { useBoard } from '@/states/BoardState'
import { BoardHeader } from './BoardHeader'

type BoardProps = {
  showPostCreate?: boolean
  followButtonType?: 'follow' | 'unfollow'
  onFollowButtonClick?: () => Promise<void>
}

export const Board: React.FC<BoardProps> = observer(
  ({ showPostCreate = true, followButtonType = 'follow', onFollowButtonClick }) => {
    const state = useBoard()

    return (
      <div>
        <BoardHeader
          showPostCreate={showPostCreate}
          followButtonType={followButtonType}
          onFollowButtonClick={onFollowButtonClick}
        />
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
