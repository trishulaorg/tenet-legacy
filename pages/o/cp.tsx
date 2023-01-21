import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { PageContentLayout } from '../../ui/layouts/PageContentLayout'
import { CreateNewPost } from '../../ui/board/CreateNewPost'

const CreatePostPage: NextPage = () => {
  const router = useRouter()
  return (
    <PageContentLayout
      main={<CreateNewPost boardId={router.query['boardId'] as string} />}
      side={<div className="max-w-xs">test</div>}
    />
  )
}

export default CreatePostPage
