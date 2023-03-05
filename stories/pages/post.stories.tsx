import type { ComponentStory } from '@storybook/react'
import { ComponentMeta } from '@storybook/react'
import { aPost } from '../../generated/mocks'
import PostPage from '../../pages/post/[post_id]'

export default {
  title: 'Pages/PostPage',
  component: PostPage,
  args: {
    postData: aPost(),
  },
} satisfies ComponentMeta<typeof PostPage>

export const Default: ComponentStory<typeof PostPage> = (args) => <PostPage {...args} />
