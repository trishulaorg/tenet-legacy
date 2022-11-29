import BoardBackground from './background'
import FollowerCount from './followCount'
// import BoardButton from './button'

type BoardHeaderProps = {
    followers?: number
    background?: string
    // followButtonType?: 'follow' | 'unfollow'
    // onFollowButtonClick?: () => Promise<void>
}

export default function BoardHeader(props: BoardHeaderProps) {
    const { followers = 0, background = "" } = props
    return (
      <>
          <BoardBackground src={background}>
            <FollowerCount count={followers} />
            {/* TODO: Fix board button props */}
            {/* <BoardButton buttonType={followButtonType} buttonOnClick={onFollowButtonClick} /> */}
          </BoardBackground>
          <h1 className="flex-row my-4 text-med dark:text-med-dark text-2xl"></h1>
      </>
    )
  }