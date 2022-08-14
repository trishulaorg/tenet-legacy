import { observer } from 'mobx-react'
import React, { useContext } from 'react'
import type { PostState } from '../../states/PostState'

import { Reply } from './Reply'
import { Author } from '../common/Author'
import { CardContent } from '../common/CardContent'
import { CardIcons } from '../common/CardIcons'
import { CardMeta } from '../common/CardMeta'
import { CreatedAt } from '../common/CreatedAt'
import { UserStateContext } from '../../states/UserState'
import { fetcher, mutator } from '../../libs/fetchAPI'
import { mutate } from 'swr'
import { queryDocuments } from '../../server/graphql-schema/queryDocuments'
import { ulid } from 'ulid'
import { BoardStateContext } from '../../states/PostState'
import { PostFormStateContext } from '../../states/PostFormState'
import gql from 'graphql-tag'
import { usePublishWritingStatus } from '../board/PublishWritingStatus'

export interface ThreadProps {
  parent: PostState
  posts: PostState[]
}

export const Thread: React.FC<ThreadProps> = observer((props) => {
  const boardState = useContext(BoardStateContext)
  const userState = useContext(UserStateContext)
  const postForm = useContext(PostFormStateContext)
  const publishWritingStatus = usePublishWritingStatus()

  const onSubmit: (comment: string, files: File[], thread: PostState) => void = async (
    comment,
    files,
    thread
  ) => {
    const {
      createReply: { id },
    } = await fetcher(
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
    await mutator(
      gql(queryDocuments.Mutation.putAttachedImage),
      { postId: id, files: files },
      userState.token
    )
    await mutate(boardState.fetcherDocument)
    await publishWritingStatus(props.parent.id)
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
            <CardContent content={v.content} isPost={false} imageUrls={v.imageUrls} />
            <CardMeta isPost={false}>
              <CardIcons
                commentNumber={v.responseNumber}
                upvote={v.upvote}
                downvote={v.downvote}
                isPost={false}
                replyCallback={() => {
                  postForm.replyTo = v
                  postForm.onSubmit = (comment: string, files: File[]) =>
                    onSubmit(comment, files, v)
                }}
                showTrashIcon={v.author.name === userState.currentPersona?.name}
              />
              <div className="pb-2" />
              <CreatedAt created={v.createdAt} />
            </CardMeta>
            {v.hasRepsponse ? <Reply posts={v.responses} /> : undefined}
          </div>
        </li>
      ))}
    </ul>
  )
})
