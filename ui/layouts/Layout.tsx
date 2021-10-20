import React from 'react'
import { observer } from 'mobx-react'

export const PageLayout: React.FC<{ size: number }> = (props) => {
  return <div className={`w-${props.size}/3`}>{props.children}</div>
}

export const Layout: React.FC<{ Main: React.FC; Side: React.FC }> = observer(({ Main, Side }) => {
  return (
    <div className="mt-5 mx-auto max-w-4xl">
      <div className="flex justify-center">
        <PageLayout size={2}>
          <Main />
        </PageLayout>
        <div className="pl-5" />
        <PageLayout size={1}>
          <Side />
        </PageLayout>
      </div>
    </div>
  )
})
