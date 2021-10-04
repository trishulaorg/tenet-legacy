import { observer } from 'mobx-react'
import React from 'react'
import { PostState } from '../../states/PostState'

import { UserIcon } from '../common/UserIcon'

export interface ThreadProps {
  posts: PostState[]
}

export interface PostProps {
  post: PostState
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

export const Thread: React.FC<ThreadProps> = observer((props) => {
  return (
    <ul className="pl-4 bg-gray-50">
      {props.posts.map((v, i) => {
        return (
          <li key={i} className="py-4">
            <div className="text-xl">{v.title}</div>
            <div>
              <UserIcon size="small" />
              {v.author.name}
            </div>
            <div>{v.content}</div>
            {v.hasRepsponse ? <Reply posts={v.responses} /> : undefined}
          </li>
        )
      })}
    </ul>
  )
})

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
