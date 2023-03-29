import type { Reply as ReplyModel } from '@/domain/models/reply/Reply'
import { useUserState } from '@/states/UserState'
import { observer } from 'mobx-react'
import React from 'react'

import { AuthorAndBoardLink } from '../common/AuthorAndBoardLink'
import { CardContent } from '../common/CardContent'
import { CardIcons } from '../common/CardIcons'
import { CardMeta } from '../common/CardMeta'
import { CreatedAt } from '../common/CreatedAt'

export interface ReplyProps {
  replies: ReplyModel[]
}

export const Reply: React.FC<ReplyProps> = observer((props) => {
  const userState = useUserState()
  return (
    <ul className="pl-4">
      {props.replies.map((reply, i) => {
        return (
          <li key={i} className="pt-4">
            <AuthorAndBoardLink
              screenName={reply.author.screenName}
              name={reply.author.name}
              iconUrl={reply.author.iconUrl}
            />
            <div className="ml-2 border-gray-200 dark:border-gray-800	border-l-4">
              <CardContent content={reply.content} isPost={false} imageUrls={reply.imageUrls} />
              <CardMeta isPost={false}>
                {reply.author.name === userState?.currentPersona?.name ? (
                  <CardIcons
                    showCommentIcon={false}
                    numberOfComment={0}
                    upvote={reply.upvote}
                    downvote={reply.downvote}
                    deleteCallback={() => {
                      return
                    }}
                  />
                ) : (
                  <CardIcons
                    showCommentIcon={false}
                    numberOfComment={0}
                    upvote={reply.upvote}
                    downvote={reply.downvote}
                  />
                )}
                <div className="pb-2" />
                <CreatedAt createdAt={new Date(reply.createdAt)} />
              </CardMeta>
            </div>
          </li>
        )
      })}
    </ul>
  )
})
