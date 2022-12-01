import Link from 'next/link'
import BoardBackground from './background'
import FollowerCount from './followCount'
import BoardButton from './button'

type BoardHeaderProps = {
  followers?: number
  background?: string
  title?: string
  id?: string
  followButtonType?: 'follow' | 'unfollow'
  onFollowButtonClick?: () => Promise<void>
  showPostCreate?: boolean
}

export default function BoardHeader(props: BoardHeaderProps) {
  const {
    followers = 0,
    background,
    title = '',
    id = '',
    followButtonType = 'follow',
    onFollowButtonClick,
    showPostCreate,
  } = props
  return (
    <>
      <BoardBackground src={background}>
        <div className="w-full flex flex-row justify-between items-center px-4 bg-black bg-opacity-[15%] backdrop-blur-[2px]">
          <FollowerCount count={followers} />
          <div className="flex flex-row">
            <BoardButton buttonType={followButtonType} buttonOnClick={onFollowButtonClick as any} />
            {showPostCreate ? <BoardButton buttonType="post" id={id} /> : <></>}
          </div>
        </div>
      </BoardBackground>
      <h1 className="flex-row mt-4 mb-2 text-med dark:text-med-dark text-2xl font-semibold">
        <Link href={`/board/${id}`} legacyBehavior>
          <span className="cursor-pointer">#{title}</span>
        </Link>
      </h1>
    </>
  )
}
