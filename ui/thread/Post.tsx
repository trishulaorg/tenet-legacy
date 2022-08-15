import { observer } from 'mobx-react'
import React, { useContext } from 'react'
import type { PostState } from '../../states/PostState'

import { Thread } from './Thread'
import { CardTitle } from '../common/CardTitle'
import { Author } from '../common/Author'
import { CardContent } from '../common/CardContent'
import { CardIcons } from '../common/CardIcons'
import { CardMeta } from '../common/CardMeta'
import { CreatedAt } from '../common/CreatedAt'
import type { TypingStateNotification } from '../../states/UserState'
import { UserStateContext } from '../../states/UserState'
import { client, fetcher, tokenToDefaultHeader } from '../../libs/fetchAPI'
import { mutate } from 'swr'
import { queryDocuments } from '../../server/graphql-schema/queryDocuments'
import { ulid } from 'ulid'
import { BoardStateContext } from '../../states/PostState'
import { PostFormStateContext } from '../../states/PostFormState'
import { usePublishWritingStatus } from '../board/PublishWritingStatus'
import { TypingMemberListLabel } from '../common/TypingMemberListLabel'
import { parseISO, differenceInSeconds } from 'date-fns'
import { useDebounce } from 'use-debounce'

export interface PostProps {
  post: PostState
}

export const Post: React.FC<PostProps> = observer((props) => {
  const boardState = useContext(BoardStateContext)
  const userState = useContext(UserStateContext)
  const postForm = useContext(PostFormStateContext)
  const publishWritingStatus = usePublishWritingStatus()

  const [debouncedMembers] = useDebounce(
    [
      ...new Set(
        (userState.notifications as TypingStateNotification[])
          .filter(
            (v) =>
              v.channel === props.post.id &&
              v.eventName === 'typing' &&
              v.data.authorPersonaId !== userState.currentPersona?.id &&
              differenceInSeconds(new Date(), parseISO(v.data.createdAt)) < 4
          )
          .map((v) => v.data.authorPersonaScreenName)
      ),
    ],
    1000
  )

  const onSubmit: (comment: string, files: File[]) => void = async (comment, files) => {
    const {
      createThread: { id },
    } = await fetcher(
      queryDocuments.Mutation.createThread,
      {
        id: ulid(),
        title: 'dummy',
        content: comment,
        persona_id: userState.currentPersona?.id ?? -1,
        post_id: props.post.id,
        board_id: props.post.boardId,
      },
      userState.token
    )
    await client.putAttachedImage(
      { postId: id, files: files },
      tokenToDefaultHeader(userState.token)
    )
    await mutate(boardState.fetcherDocument)
  }

  return (
    <div className="rounded-lg p-4 bg-white">
      <CardTitle title={props.post.title} />
      <Author
        screenName={props.post.author.screenName}
        name={props.post.author.name}
        iconUrl={props.post.author.iconUrl}
      />
      <CardContent content={props.post.content} imageUrls={props.post.imageUrls} />
      <CardMeta>
        <CardIcons
          commentNumber={props.post.responseNumber}
          upvote={props.post.upvote}
          downvote={props.post.downvote}
          replyCallback={() => {
            postForm.replyTo = props.post
            postForm.onSubmit = onSubmit
            postForm.onChange = () => publishWritingStatus(props.post.id)
          }}
          showTrashIcon={props.post.author.name === userState.currentPersona?.name}
        />
        <div className="pb-2" />
        <CreatedAt created={props.post.createdAt} />
        <TypingMemberListLabel members={debouncedMembers} />
      </CardMeta>
      <div className="pb-5" />
      {props.post.hasRepsponse ? (
        <Thread posts={props.post.responses} parent={props.post} />
      ) : (
        <div>No Comments Yet</div>
      )}
    </div>
  )
})
