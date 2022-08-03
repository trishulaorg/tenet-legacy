import { observer } from 'mobx-react'
import React, { useContext, useState } from 'react'
import type { PostState } from '../../states/PostState'

import { Thread } from './Thread'
import { CardTitle } from '../common/CardTitle'
import { Author } from '../common/Author'
import { CardContent } from '../common/CardContent'
import { CardIcons } from '../common/CardIcons'
import { CardMeta } from '../common/CardMeta'
import { CreatedAt } from '../common/CreatedAt'
import { CommentInput } from './CommentInput'
import { UserStateContext } from '../../states/UserState'
import { fetcher } from '../../libs/fetchAPI'
import { mutate } from 'swr'
import { queryDocuments } from '../../server/graphql-schema/queryDocuments'

export interface PostProps {
  post: PostState
}

export const Post: React.FC<PostProps> = observer((props) => {
  const [commentVisibility, setCommentVisibility] = useState(false)
  const userState = useContext(UserStateContext)
  const onSubmit: (comment: string) => void = async (comment: string) => {
    console.log('string:' + comment)
    await fetcher(
      queryDocuments.Mutation.createThread,
      {
        title: 'dummy',
        content: comment,
        persona_id: userState.currentPersona?.id ?? -1,
        post_id: props.post.id,
        board_id: props.post.boardId,
      },
      userState.token
    )
    await mutate(queryDocuments.Query.board)
    setCommentVisibility(false)
  }
  return (
    <div className="rounded-lg p-4 bg-white">
      <CardTitle title={props.post.title} />
      <Author
        screenName={props.post.author.screenName}
        name={props.post.author.name}
        iconUrl={props.post.author.iconUrl}
      />
      <CardContent content={props.post.content} />
      <CardMeta>
        <CardIcons
          commentNumber={props.post.responseNumber}
          upvote={props.post.upvote}
          downvote={props.post.downvote}
          replyCallback={() => {
            setCommentVisibility(!commentVisibility)
          }}
          showTrashIcon={props.post.author.name === userState.currentPersona?.name}
        />
        <div className="pb-2" />
        <CreatedAt created={props.post.createdAt} />
      </CardMeta>
      <div className="pb-5" />
      {commentVisibility ? <CommentInput onSubmit={onSubmit} /> : undefined}
      <div className="pt-8 pb-2 border-b-2 border-black border-opacity-10">Sort by BEST</div>
      <div className="pb-8" />
      {props.post.hasRepsponse ? (
        <Thread posts={props.post.responses} />
      ) : (
        <div>No Comments Yet</div>
      )}
    </div>
  )
})
