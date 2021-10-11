import { observer } from 'mobx-react'
import React, { useContext } from 'react'
import { BoardStateContext } from '../../states/PostState'
import { Post } from '../thread/Thread'

export const Board: React.FC = observer(() => {
  const state = useContext(BoardStateContext)
  return (
    <ul>
      {state.posts.map((p, idx) => (
        <li key={idx}>
          <Post post={p} />
        </li>
      ))}
    </ul>
  )
})
