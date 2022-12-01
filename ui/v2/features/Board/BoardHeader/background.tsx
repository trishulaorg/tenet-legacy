type BoardBackgroundProps = {
    src?: string | undefined
    children?: React.ReactNode
}
/* Note: Had to use normal styling (not tailwind) to make backgrounds work. (Also used a random pic as a placeholder for testing) */
export default function BoardBackground(props: BoardBackgroundProps) {
    const { src = "https://i.imgur.com/eMMDrp2.jpeg"} = props /* TODO: Replace placeholder background img with something more official */
    return (
      <div className="w-full h-[25vh] bg-cover bg-center flex items-end md:rounded-lg overflow-hidden"
      style={{backgroundImage: `url(${src})`}}>
          {props.children}
      </div>
    )
  }