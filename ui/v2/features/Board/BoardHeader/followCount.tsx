type BoardFollowCountProps = {
    count?: number
}

export default function BoardBackground(props: BoardFollowCountProps) {
    const { count } = props
    return (
      <div className="text-white">
          {count} Followers
      </div>
    )
  }