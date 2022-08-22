import type { FC } from 'react'
import { Fragment } from 'react'

const MultiLineText: FC<{ text: string }> = ({ text }: { text: string }) => {
  const texts = text.split('\n').map((item, index) => {
    return (
      <Fragment key={index}>
        {item}
        <br />
      </Fragment>
    )
  })
  return <>{texts}</>
}

export { MultiLineText }
