import { observer } from 'mobx-react'
import React from 'react'
import { Post } from './Post'
import { PostForm } from '../common/PostForm'
import { useBoard } from '@/src/states/BoardState'

export const PostWrapper: React.FC = observer(() => {
  const state = useBoard()

  return (
    <div>
      <ul>
        {state.posts.map((p, idx) => (
          <li key={idx} className="mb-5">
            <Post post={p} showThreads={true} />
          </li>
        ))}
      </ul>
      <PostForm />
    </div>
  )
})
