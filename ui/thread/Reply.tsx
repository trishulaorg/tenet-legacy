import { observer } from 'mobx-react'
import React from 'react'
import { PostState } from '../../states/PostState'

import { UserIcon } from '../common/UserIcon'

export interface ThreadProps {
  posts: PostState[]
}

export const Reply: React.FC<ThreadProps> = observer((props) => {
  return (
    <ul className="pl-8 border-gray-200	border-l-4">
      {props.posts.map((v, i) => {
        return (
          <li key={i} className="py-4">
            <div className="text-xl">{v.title}</div>
            <div>
              <UserIcon size="small" />
              {v.author.name}
            </div>
            <div>{v.content}</div>
          </li>
        )
      })}
    </ul>
  )
})
