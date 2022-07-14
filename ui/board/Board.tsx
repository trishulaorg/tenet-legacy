import { observer } from 'mobx-react'
import React, { useContext } from 'react'
import { BoardStateContext } from '../../states/PostState'
import { Post } from '../thread/Post'

export const Board: React.FC = observer(() => {
  const state = useContext(BoardStateContext)
  console.log(state)
  return (
    <div>
      <h1 className="my-4 text-slate-600 text-2xl">#{state.title}</h1>
      <ul>
        {state.posts.map((p, idx) => (
          <li key={idx} className="mb-5">
            <Post post={p} />
          </li>
        ))}
      </ul>
    </div>
  )
})
