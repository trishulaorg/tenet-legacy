import type { NextPage } from 'next'
import { PageContentLayout } from '@/src/ui/layouts/PageContentLayout'
import { CreateNewBoard } from '@/src/ui/board/CreateNewBoard'

const CbPage: NextPage = () => {
  return <PageContentLayout main={<CreateNewBoard />} side={<div className="max-w-xs">test</div>} />
}

export default CbPage
