import { observer } from 'mobx-react'
import React, { useContext } from 'react'
import type { PostState } from '../../states/PostState'

import { Reply } from './Reply'
import { AuthorAndBoardLink } from '../common/AuthorAndBoardLink'
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
import { motion } from 'framer-motion'

export interface ThreadProps {
  parent: PostState
  threads: PostState[]
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
      personaId: userState.currentPersona?.id ?? -1,
      threadId: thread.id,
    })
    await client.putAttachedImage({ postId: id, files: files })

    await mutate(boardState.id)
    await mutate(props.parent.id)
    await publishWritingStatus(props.parent.id)
  }
  return (
    <ul className="pl-4">
      {props.threads.map((thread, i) => (
        <motion.li
          layout
          initial={{ y: 20, opacity: 0, borderRadius: 100 }}
          animate={{ y: 0, opacity: 1, borderRadius: 20 }}
          className="my-4 ml-4 drop-shadow-lg p-6 bg-contentbg dark:bg-contentbg-dark mb-5 opacity-95 text-med dark:text-med-dark transition-colors duration-350 cursor-pointer"
          key={i}
        >
          <AuthorAndBoardLink
            screenName={thread.author.screenName}
            name={thread.author.name}
            iconUrl={thread.author.iconUrl}
          />
          <div className="ml-2 transition-colors duration-350">
            <CardContent content={thread.content} isPost={false} imageUrls={thread.imageUrls} />
            <CardMeta isPost={false}>
              <CardIcons
                showCommentIcon={true}
                commentNumber={thread.responseNumber}
                upvote={thread.upvote}
                downvote={thread.downvote}
                replyCallback={() => {
                  postForm.replyTo = thread
                  postForm.onSubmit = (comment: string, files: File[]) =>
                    onSubmit(comment, files, thread)
                  postForm.boardState = boardState
                  postForm.onChange = () => publishWritingStatus(props.parent.id)
                }}
              />
              <div className="pb-2" />
              <CreatedAt created={thread.createdAt} />
            </CardMeta>
            {thread.hasRepsponse ? <Reply replies={thread.responses} /> : undefined}
          </div>
        </motion.li>
      ))}
    </ul>
  )
})
