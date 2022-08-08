export const AttachedImage = (props: { src: string }) => {
  return (
    <div>
      <img src={props.src} width={200} />
    </div>
  )
}
