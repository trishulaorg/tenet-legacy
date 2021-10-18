import { observer } from 'mobx-react'
import React from 'react'
import { PostState } from '../../states/PostState'

import { Reply } from './Reply'
import { Author } from '../common/Author'
import { CardContent } from '../common/CardContent'
import { CardIcons } from '../common/CardIcons'
import { CardMeta } from '../common/CardMeta'
import { CreatedAt } from '../common/CreatedAt'

export interface ThreadProps {
  posts: PostState[]
}

export const Thread: React.FC<ThreadProps> = observer((props) => {
  return (
    <ul className="pl-4">
      {props.posts.map((v, i) => {
        return (
          <li key={i} className="py-4">
            <Author name={v.author.name} iconUrl={v.author.iconUrl} />
            <div className="ml-2 border-gray-200	border-l-4">
              <CardContent content={v.content} isPost={false} />
              <CardMeta isPost={false}>
                <CardIcons
                  commentNumber={v.responseNumber}
                  upvote={v.upvote}
                  downvote={v.downvote}
                />
                <div className="pb-2" />
                <CreatedAt created={v.createdAt} />
              </CardMeta>
              {v.hasRepsponse ? <Reply posts={v.responses} /> : undefined}
            </div>
          </li>
        )
      })}
    </ul>
  )
})
