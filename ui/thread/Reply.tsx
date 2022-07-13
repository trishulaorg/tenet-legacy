import { observer } from 'mobx-react'
import React, { useContext } from 'react'
import { PostState } from '../../states/PostState'
import { UserStateContext } from '../../states/UserState'

import { Author } from '../common/Author'
import { CardContent } from '../common/CardContent'
import { CardIcons } from '../common/CardIcons'
import { CardMeta } from '../common/CardMeta'
import { CreatedAt } from '../common/CreatedAt'

export interface ReplyProps {
  posts: PostState[]
}

export const Reply: React.FC<ReplyProps> = observer((props) => {
  const userState = useContext(UserStateContext)
  return (
    <ul className="pl-4">
      {props.posts.map((v, i) => {
        return (
          <li key={i} className="pt-4">
            <Author
              screenName={v.author.screenName}
              name={v.author.name}
              iconUrl={v.author.iconUrl}
            />
            <div className="ml-2 border-gray-200	border-l-4">
              <CardContent content={v.content} isPost={false} />
              <CardMeta isPost={false}>
                <CardIcons
                  commentNumber={v.responseNumber}
                  upvote={v.upvote}
                  downvote={v.downvote}
                  isPost={false}
                  showCommentNumber={false}
                  showTrashIcon={v.author.name === userState.currentPersona?.name}
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
