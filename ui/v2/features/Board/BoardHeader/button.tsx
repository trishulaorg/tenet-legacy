type BoardButtonProps = {
    buttonType?: 'follow' | 'unfollow'
    buttonOnClick?: () => Promise<void>
}

export default function BoardButton(props: BoardButtonProps) {
    const { buttonType, buttonOnClick } = props
    return (
      <div>
        {/* TODO: implement follow/unfollow button */}
        <button onClick={buttonOnClick}> {buttonType} </button>
      </div>
    )
  }