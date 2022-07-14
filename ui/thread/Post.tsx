import { observer } from 'mobx-react'
import React, { useContext, useState } from 'react'
import { PostState } from '../../states/PostState'

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

export interface PostProps {
  post: PostState
}

export const Post: React.FC<PostProps> = observer((props) => {
  const [commentVisibility, setCommentVisibility] = useState(false)
  const userState = useContext(UserStateContext)
  const document = `
  mutation CreateThread($title: String!, $content: String!, $post_id: Int!, $persona_id: Int!, $board_id: Int!) {
    createThread(
      title: $title
      content: $content
      contentType: TEXT
      personaId: $persona_id
      boardId: $board_id
      postId: $post_id) {
      id
    }
  }
  `
  const onSubmit: (comment: string) => void = (comment: string) => {
    console.log('string:' + comment)
    fetcher(
      document,
      {
        title: 'dummy',
        content: comment,
        persona_id: userState.currentPersona?.id ?? -1,
        post_id: props.post.id,
        board_id: props.post.boardId,
      },
      userState.token
    )
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
