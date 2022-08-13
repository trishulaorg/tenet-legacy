export const AttachedImage = (props: { src: string; alt: string }) => {
  return (
    <div>
      <img src={props.src} width={200} alt={props.alt} />
    </div>
  )
}
