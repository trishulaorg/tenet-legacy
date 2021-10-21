import { observer } from 'mobx-react'
import React, { useContext } from 'react'
import { BoardStateContext } from '../../states/PostState'
import { Post } from '../thread/Post'

export const Board: React.FC = observer(() => {
  const state = useContext(BoardStateContext)
  return (
    <ul>
      {state.posts.map((p, idx) => (
        <li key={idx} className="mb-5">
          <Post post={p} />
        </li>
      ))}
    </ul>
  )
})
