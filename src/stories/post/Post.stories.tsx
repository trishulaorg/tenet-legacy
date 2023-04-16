import type { BoardDescription } from '@/src/domain/models/board/BoardDescription'
import type { BoardId } from '@/src/domain/models/board/BoardId'
import type { BoardTitle } from '@/src/domain/models/board/BoardTitle'
import type { DateString } from '@/src/domain/models/common/DateString'
import type { PersonaIconUrl } from '@/src/domain/models/persona/PersonaIconUrl'
import type { PersonaId } from '@/src/domain/models/persona/PersonaId'
import type { PersonaName } from '@/src/domain/models/persona/PersonaName'
import type { PersonaScreenName } from '@/src/domain/models/persona/PersonaScreenName'
import type { PostContent } from '@/src/domain/models/post/PostContent'
import type { PostId } from '@/src/domain/models/post/PostId'
import type { PostImageUrl } from '@/src/domain/models/post/PostImageUrl'
import type { PostTitle } from '@/src/domain/models/post/PostTitle'
import type { ComponentStory } from '@storybook/react'
import { Post } from '@/src/ui/post/Post'
import iconImage from '@/src/stories/static/icon.png'

export default {
  title: 'Post/Post',
  component: Post,
}

const Template: ComponentStory<typeof Post> = (args) => <Post {...args} />

export const Default = Template.bind({})
Default.args = {
  post: {
    id: '1' as PostId,
    title: 'title' as PostTitle,
    content: 'content' as PostContent,
    imageUrls: [] as PostImageUrl[],
    createdAt: '2021-01-01T00:00:00.000Z' as DateString,
    board: {
      id: '1' as BoardId,
      title: 'board title' as BoardTitle,
      description: 'board description' as BoardDescription,
    },
    author: {
      id: '1' as PersonaId,
      name: 'author_name' as PersonaName,
      screenName: 'author screen name' as PersonaScreenName,
      iconUrl: iconImage.src as PersonaIconUrl,
    },
    privilege: {
      deleteSelf: true,
    },
    threads: [],
    upvote: 10,
    downvote: 5,
  },
  showThreads: true,
}
