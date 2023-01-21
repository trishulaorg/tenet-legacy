import React from 'react'
import { observer } from 'mobx-react'

type Props = {
  main: React.ReactNode
  side: React.ReactNode
}

export const PageContentLayout = observer((props: Props) => {
  const { main, side } = props

  return (
    <div className="max-w-md mt-5 mx-auto md:max-w-4xl px-2 md:pl-2 md:pr-0">
      <div className="flex justify-center">
        <div className="w-full md:w-2/3">{main}</div>
        <div className="hidden md:block md:pl-5" />
        <div className="hidden md:block md:w-1/3">{side}</div>
      </div>
    </div>
  )
})
