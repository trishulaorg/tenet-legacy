import { observer } from 'mobx-react'
import React from 'react'

import { Reply } from './Reply'
import { AuthorAndBoardLink } from '../common/AuthorAndBoardLink'
import { CardContent } from '../common/CardContent'
import { CardIcons } from '../common/CardIcons'
import { CardMeta } from '../common/CardMeta'
import { CreatedAt } from '../common/CreatedAt'
import { usePublishWritingStatus } from '../board/PublishWritingStatus'
import { motion } from 'framer-motion'
import { useApiClient } from '../../states/ApiClientState'
import type { ReplyContent } from '@/src/domain/models/reply/ReplyContent'
import type { PostId } from '@/src/domain/models/post/PostId'
import { useUserState } from '@/src/states/UserState'
import type { Thread as ThreadModel } from '@/src/domain/models/thread/Thread'
import { useBoard } from '@/src/states/BoardState'
import { usePostFormState } from '@/src/states/PostFormState'
import type { Post } from '@/src/domain/models/post/Post'

export interface ThreadProps {
  parent: Post
  threads: ThreadModel[]
}

export const Thread: React.FC<ThreadProps> = observer((props) => {
  const boardState = useBoard()
  const userState = useUserState()
  const postForm = usePostFormState()
  const publishWritingStatus = usePublishWritingStatus()
  const apiClient = useApiClient()

  const onSubmit: (comment: string, files: File[], thread: ThreadModel) => void = async (
    comment,
    files,
    thread
  ) => {
    if (userState == null || userState.currentPersona?.id == null) {
      throw new Error('user is not logged in')
    }
    const { id } = await apiClient.createReply({
      content: comment as ReplyContent,
      personaId: userState.currentPersona.id,
      threadId: thread.id,
    })
    await apiClient.putAttachedImage({
      // TODO: I am not sure if this is the right way to use it, so I will check.
      postId: id as unknown as PostId,
      files,
    })
    await publishWritingStatus(props.parent.id)
  }
  return (
    <ul className="pl-4">
      {props.threads.map((thread, i) => (
        <motion.li
          layout
          initial={{ y: 80, opacity: 0, borderRadius: 0 }}
          animate={{ y: 0, opacity: 0.85, borderRadius: 20, transition: { duration: 0.1 } }}
          className="my-4 ml-4 drop-shadow-lg p-6 bg-contentbg dark:bg-contentbg-dark mb-5 text-med dark:text-med-dark transition-colors duration-350 cursor-pointer"
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
                numberOfComment={thread.replies.length}
                upvote={thread.upvote}
                downvote={thread.downvote}
                replyCallback={() => {
                  postForm.setPostFormState({
                    replyTo: thread,
                    onSubmit: (comment: string, files: File[]) => onSubmit(comment, files, thread),
                    boardState: {
                      id: boardState.id,
                      title: boardState.title,
                      description: boardState.description,
                    },
                    onChange: () => publishWritingStatus(props.parent.id),
                  })
                }}
              />
              <div className="pb-2" />
              <CreatedAt createdAt={new Date(thread.createdAt)} />
            </CardMeta>
            {thread.replies.length > 0 ? <Reply replies={thread.replies} /> : null}
          </div>
        </motion.li>
      ))}
    </ul>
  )
})
