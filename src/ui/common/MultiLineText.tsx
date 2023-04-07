import type { FC } from 'react'

const MultiLineText: FC<{ text: string }> = ({ text }: { text: string }) => {
  const splittedTexts = text.split('\n')
  const result = splittedTexts.map((item, index) => {
    return <div key={index}>{item}</div>
  })
  return <>{result}</>
}

export { MultiLineText }
