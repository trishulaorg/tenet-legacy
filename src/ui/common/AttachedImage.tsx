import type { ReactElement } from 'react'

export const AttachedImage = (props: { src: string; alt: string }): ReactElement => {
  return (
    <div>
      <img src={props.src} width={200} alt={props.alt} />
    </div>
  )
}
