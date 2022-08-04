import { observer } from 'mobx-react'
import React, { useContext, useState } from 'react'
import type { PostState } from '../../states/PostState'

import { Reply } from './Reply'
import { Author } from '../common/Author'
import { CardContent } from '../common/CardContent'
import { CardIcons } from '../common/CardIcons'
import { CardMeta } from '../common/CardMeta'
import { CreatedAt } from '../common/CreatedAt'
import { UserStateContext } from '../../states/UserState'
import { fetcher } from '../../libs/fetchAPI'
import { CommentInput } from './CommentInput'
import { mutate } from 'swr'
import { queryDocuments } from '../../server/graphql-schema/queryDocuments'
import { ulid } from 'ulid'
import { BoardStateContext } from '../../states/PostState'

export interface ThreadProps {
  posts: PostState[]
}

export const Thread: React.FC<ThreadProps> = observer((props) => {
  const [commentVisibility, setCommentVisibility] = useState<Set<string>>(new Set())
  const boardState = useContext(BoardStateContext)
  const userState = useContext(UserStateContext)
  const onSubmit: (comment: string, thread: PostState) => void = async (comment, thread) => {
    await fetcher(
      queryDocuments.Mutation.createReply,
      {
        id: ulid(),
        title: 'dummy',
        content: comment,
        persona_id: userState.currentPersona?.id ?? -1,
        thread_id: thread.id,
      },
      userState.token
    )
    await mutate(boardState.fetcherDocument)
    setCommentVisibility(new Set())
  }
  return (
    <ul className="pl-4">
      {props.posts.map((v, i) => (
        <li key={i} className="py-4">
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
                replyCallback={() => {
                  setCommentVisibility(commentVisibility.has(v.id) ? new Set([]) : new Set([v.id]))
                }}
                showTrashIcon={v.author.name === userState.currentPersona?.name}
              />
              <div className="pb-2" />
              <CreatedAt created={v.createdAt} />
            </CardMeta>
            {commentVisibility.has(v.id) ? (
              <CommentInput onSubmit={(comment) => onSubmit(comment, v)} />
            ) : undefined}
            {v.hasRepsponse ? <Reply posts={v.responses} /> : undefined}
          </div>
        </li>
      ))}
    </ul>
  )
})
