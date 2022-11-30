import Linkify from 'linkify-react'
import 'linkify-plugin-mention'
import type { FC } from 'react'
import { Fragment } from 'react'

const options = {
  formatHref: {
    mention: (href: string) => '/user/' + href.replace('@', ''),
  },
}

const MultiLineText: FC<{ text: string }> = ({ text }: { text: string }) => {
  const splittedTexts = text.split('\n')
  const result = splittedTexts.map((item, index) => {
    return (
      <Fragment key={index}>
        <Linkify options={options} tagName="div">
          {item}
        </Linkify>
        {index !== splittedTexts.length - 1 ? <br /> : null}
      </Fragment>
    )
  })
  return <>{result}</>
}

export { MultiLineText }
