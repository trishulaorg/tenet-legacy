import React from 'react'
import { observer } from 'mobx-react'

export const PageLayout: React.FC<{ size: number; displayName: string }> = (props) => {
  let style
  if (props.displayName === 'Main') {
    style = `w-full md:w-${props.size}/3`
  } else {
    style = `hidden md:block md:w-${props.size}/3`
  }
  return <div className={style}>{props.children}</div>
}

export const Layout: React.FC<{ Main: React.FC; Side: React.FC }> = observer(({ Main, Side }) => {
  return (
    <div className="max-w-md mt-5 mx-auto md:max-w-4xl px-2 md:pl-2 md:pr-0">
      <div className="flex justify-center">
        <PageLayout size={2} displayName={'Main'}>
          <Main />
        </PageLayout>
        <div className="hidden md:block md:pl-5"></div>
        <PageLayout size={1} displayName={'Side'}>
          <Side />
        </PageLayout>
      </div>
    </div>
  )
})
