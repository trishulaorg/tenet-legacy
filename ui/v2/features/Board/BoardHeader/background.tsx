type BoardBackgroundProps = {
    src: string | undefined
    children?: React.ReactNode
}

export default function BoardBackground(props: BoardBackgroundProps) {
    const { src } = props
    return (
      <div className={/*`bg-[url(${src}})]`*/ ``}>
          {/* follower count & button as child props */}
          {src}
          {props.children}
      </div>
    )
  }