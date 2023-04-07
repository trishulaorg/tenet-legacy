import type { ReactElement } from 'react'
import React from 'react'
import { ActivityCard } from '../../ui/home/ActivityCard'
import type { PersonaScreenName } from '@/src/domain/models/persona/PersonaScreenName'
import type { PersonaName } from '@/src/domain/models/persona/PersonaName'
import type { PersonaIconUrl } from '@/src/domain/models/persona/PersonaIconUrl'
import type { PersonaId } from '@/src/domain/models/persona/PersonaId'
import type { BoardId } from '@/src/domain/models/board/BoardId'
import type { Persona } from '@/src/domain/models/persona/Persona'
import type { Post } from '@/src/domain/models/post/Post'
import type { PostContent } from '@/src/domain/models/post/PostContent'
import type { PostTitle } from '@/src/domain/models/post/PostTitle'
import type { PostId } from '@/src/domain/models/post/PostId'
import type { DateString } from '@/src/domain/models/common/DateString'
import type { BoardDescription } from '@/src/domain/models/board/BoardDescription'
import type { BoardTitle } from '@/src/domain/models/board/BoardTitle'

export default {
  title: 'Home/ActivityCard',
  component: ActivityCard,
}

const exampleAuthor: Persona = {
  screenName: 'Mitchell' as PersonaScreenName,
  name: 'MTL' as PersonaName,
  iconUrl:
    'https://i.pinimg.com/originals/ae/24/87/ae24874dd301843548c034a3d2973658.png' as PersonaIconUrl,
  id: '' as PersonaId,
}

const examplePost: Post = {
  id: '1' as PostId,
  title: 'Test post' as PostTitle,
  author: exampleAuthor,
  content:
    "This is an example post. I'll put some text here for testing purposes: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." as PostContent,
  upvote: 0,
  downvote: 0,
  imageUrls: [],
  board: {
    id: '1' as BoardId,
    title: 'lorem ipsum' as BoardTitle,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." as BoardDescription,
  },
  privilege: {
    deleteSelf: true,
  },
  threads: [],
  createdAt: new Date().toISOString() as DateString,
}

export const Card = (): ReactElement => <ActivityCard post={examplePost} />
