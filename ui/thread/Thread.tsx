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
import { client, setAuthToken } from '../../libs/fetchAPI'
import { mutate } from 'swr'
import { BoardStateContext } from '../../states/PostState'
import { PostFormStateContext } from '../../states/PostFormState'
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
    setAuthToken(userState.token)

    const {
      createReply: { id },
    } = await client.createReply({
      content: comment,
      persona_id: userState.currentPersona?.id ?? -1,
      thread_id: thread.id,
    })
    await client.putAttachedImage({ postId: id, files: files })

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
                  postForm.onChange = () => publishWritingStatus(props.parent.id)
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
