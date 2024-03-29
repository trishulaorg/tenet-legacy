import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { PageContentLayout } from '@/src/ui/layouts/PageContentLayout'
import { CreateNewPost } from '@/src/ui/board/CreateNewPost'
import type { BoardId } from '@/src/domain/models/board/BoardId'

const CreatePostPage: NextPage = () => {
  const router = useRouter()
  return (
    <PageContentLayout
      main={<CreateNewPost boardId={router.query['boardId'] as BoardId} />}
      side={<div className="max-w-xs">test</div>}
    />
  )
}

export default CreatePostPage
