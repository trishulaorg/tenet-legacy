import type { getSdk } from '@/generated/types'
import { createApiClientImpl } from '@/infrastructure/apiClientImpl'
import type { PostId } from '@/models/post/PostId'
import type { ComponentStory } from '@storybook/react'
import { ComponentMeta } from '@storybook/react'
import { aPost } from '../../generated/mocks'
import PostPage from '../../pages/post/[post_id]'

export default {
  title: 'Pages/PostPage',
  component: PostPage,
  args: {
    postData: await createApiClientImpl({
      ...({} as ReturnType<typeof getSdk>),
      async getPost() {
        return {
          post: aPost(),
        }
      },
    }).getPost({ id: '1' as PostId }),
  },
} satisfies ComponentMeta<typeof PostPage>

export const Default: ComponentStory<typeof PostPage> = (args) => <PostPage {...args} />
