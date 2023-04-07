import { observer } from 'mobx-react'
import React from 'react'

import { Thread } from '@/src/ui/thread/Thread'
import { CardTitle } from '@/src/ui/common/CardTitle'
import { AuthorAndBoardLink } from '@/src/ui/common/AuthorAndBoardLink'
import { CardContent } from '@/src/ui/common/CardContent'
import { CardIcons } from '@/src/ui/common/CardIcons'
import { CardMeta } from '@/src/ui/common/CardMeta'
import { CreatedAt } from '@/src/ui/common/CreatedAt'
import { usePostFormState } from '@/src/states/PostFormState'
import { usePublishWritingStatus } from '@/src/ui/board/PublishWritingStatus'
import { TypingMemberListLabel } from '@/src/ui/common/TypingMemberListLabel'
import { parseISO, differenceInSeconds } from 'date-fns'
import { useDebounce } from 'use-debounce'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useApiClient } from '@/src/states/ApiClientState'
import type { PostId } from '@/src/domain/models/post/PostId'
import type { ThreadContent } from '@/src/domain/models/thread/ThreadContent'
import type { TypingStateNotification } from '@/src/domain/models/notification/TypingStateNotification'
import { useUserState } from '@/src/states/UserState'
import { useBoard } from '@/src/states/BoardState'
import type { Post as PostModel } from '@/src/domain/models/post/Post'
import type { NotificationChannel } from '@/src/domain/models/notification/NotificationChannel'

export interface PostProps {
  post: PostModel
  showThreads: boolean
}

export const Post: React.FC<PostProps> = observer(({ post, showThreads }) => {
  const boardState = useBoard()
  const postForm = usePostFormState()
  const publishWritingStatus = usePublishWritingStatus()
  const userState = useUserState()
  const apiClient = useApiClient()

  const [debouncedMembers] = useDebounce(
    [
      ...new Set(
        userState == null
          ? []
          : (userState.notifications as TypingStateNotification[])
              .filter(
                (v) =>
                  v.channel === (post.id as unknown as NotificationChannel) &&
                  v.eventName === 'typing' &&
                  v.data.authorPersonaId !== userState.currentPersona?.id &&
                  differenceInSeconds(new Date(), parseISO(v.data.createdAt)) < 4
              )
              .map((v) => v.data.authorPersonaScreenName)
      ),
    ],
    1000
  )

  const { route } = useRouter()
  const isInPostPage = route.startsWith('/post/')

  const onSubmit: (comment: string, files: File[]) => void = async (comment, files) => {
    if (userState == null || userState.currentPersona == null) {
      throw new Error('userState or userState.currentPersona is null')
    }
    const { id } = await apiClient.createThread({
      content: comment as ThreadContent,
      personaId: userState.currentPersona.id,
      postId: post.id,
      boardId: post.board.id,
    })
    await apiClient.putAttachedImage({
      postId: id as unknown as PostId,
      files,
    })
  }

  const onPostDelete = async (): Promise<void> => {
    if (userState == null || userState.currentPersona == null) {
      throw new Error('userState or userState.currentPersona is null')
    }
    if (prompt('Type "delete" if you really want to delete:') === 'delete') {
      await apiClient.deletePost({
        personaId: userState.currentPersona.id,
        postId: post.id,
      })
    }
  }

  const variants = {
    hidden: { y: 20, opacity: 0, borderRadius: 100 },
    visible: { y: 0, opacity: 0.85, borderRadius: 10 },
  }

  const content = (
    <div>
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        className="break-words drop-shadow-lg rounded-lg p-4 bg-contentbg dark:bg-contentbg-dark transition-colors duration-350"
        layout
      >
        <CardTitle title={post.title} />
        {isInPostPage ? (
          <AuthorAndBoardLink
            screenName={post.author.screenName}
            name={post.author.name}
            iconUrl={post.author.iconUrl}
            boardLink={{
              boardId: post.board.id,
              boardName: boardState.title,
            }}
          />
        ) : (
          <AuthorAndBoardLink
            screenName={post.author.screenName}
            name={post.author.name}
            iconUrl={post.author.iconUrl}
          />
        )}
        <CardContent content={post.content} imageUrls={post.imageUrls} />
        <CardMeta>
          <CardIcons
            showCommentIcon={isInPostPage}
            numberOfComment={post.threads.length}
            upvote={post.upvote}
            downvote={post.downvote}
            replyCallback={() => {
              postForm.setPostFormState({
                replyTo: post,
                onSubmit,
                boardState: {
                  id: boardState.id,
                  title: boardState.title,
                  description: boardState.description,
                },
                onChange: () => publishWritingStatus(post.id),
              })
            }}
            deleteCallback={onPostDelete}
          />

          <div className="pb-2" />
          <CreatedAt createdAt={new Date(post.createdAt)} />
          <TypingMemberListLabel members={debouncedMembers} />
        </CardMeta>
        <div className="pb-5" />
      </motion.div>
      {showThreads &&
        (post.threads.length > 0 ? (
          <Thread threads={post.threads} parent={post} />
        ) : (
          <div>No Comments Yet</div>
        ))}
    </div>
  )

  return showThreads ? content : <Link href={'/post/' + post.id}>{content}</Link>
})
