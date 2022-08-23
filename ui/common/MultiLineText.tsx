import Linkify from 'linkify-react'
import type { FC } from 'react'
import { Fragment } from 'react'

const MultiLineText: FC<{ text: string }> = ({ text }: { text: string }) => {
  const splittedTexts = text.split('\n')
  const result = splittedTexts.map((item, index) => {
    return (
      <Fragment key={index}>
        <Linkify tagName="span">{item}</Linkify>
        {index !== splittedTexts.length - 1 ? <br /> : null}
      </Fragment>
    )
  })
  return <>{result}</>
}

export { MultiLineText }
