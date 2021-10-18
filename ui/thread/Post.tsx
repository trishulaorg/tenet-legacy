import { observer } from 'mobx-react'
import React from 'react'
import { PostState } from '../../states/PostState'

import { UserIcon } from '../common/UserIcon'
import { Thread } from './Thread'

export interface PostProps {
  post: PostState
}

export const Post: React.FC<PostProps> = observer((props) => {
  return (
    <div className="bg-white filter drop-shadow p-4">
      <div className="text-2xl">{props.post.title}</div>
      <div>
        <UserIcon size="small" />
        {props.post.author.name}
      </div>
      <div>{props.post.content}</div>
      {props.post.hasRepsponse ? <Thread posts={props.post.responses} /> : undefined}
    </div>
  )
})
