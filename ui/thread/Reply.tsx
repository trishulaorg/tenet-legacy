import { observer } from 'mobx-react'
import React from 'react'
import { PostState } from '../../states/PostState'

import { Author } from '../common/Author'
import { CardContent } from '../common/CardContent'
import { CardIcons } from '../common/CardIcons'
import { CardMeta } from '../common/CardMeta'
import { CreatedAt } from '../common/CreatedAt'

export interface ThreadProps {
  posts: PostState[]
}

export const Reply: React.FC<ThreadProps> = observer((props) => {
  return (
    <ul className="pl-4">
      {props.posts.map((v, i) => {
        return (
          <li key={i} className="pt-4">
            <Author name={v.author.name} iconUrl={v.author.iconUrl} />
            <div className="ml-2 border-gray-200	border-l-4">
              <CardContent content={v.content} isPost={false} />
              <CardMeta isPost={false}>
                <CardIcons
                  commentNumber={v.responseNumber}
                  upvote={v.upvote}
                  downvote={v.downvote}
                  isPost={false}
                />
                <div className="pb-2" />
                <CreatedAt created={v.createdAt} />
              </CardMeta>
            </div>
          </li>
        )
      })}
    </ul>
  )
})
