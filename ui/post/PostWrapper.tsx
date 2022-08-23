import { observer } from 'mobx-react'
import React, { useContext } from 'react'
import { BoardStateContext } from '../../states/PostState'
import { Post } from './Post'
import { PostForm } from '../common/PostForm'

export const PostWrapper: React.FC = observer(() => {
  const state = useContext(BoardStateContext)

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
