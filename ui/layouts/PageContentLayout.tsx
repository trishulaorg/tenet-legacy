import React from 'react'
import { observer } from 'mobx-react'

export const PageLayout: React.FC<{ size: number; displayName: string }> = (props) => {
  const style =
    props.displayName === 'Main'
      ? `w-full md:w-${props.size}/3`
      : `hidden md:block md:w-${props.size}/3`
  return <div className={style}>{props.children}</div>
}

export const PageContentLayout: React.FC<{ Main: React.FC; Side: React.FC }> = observer(
  ({ Main, Side }) => {
    return (
      <div className="max-w-md mt-5 mx-auto md:max-w-4xl px-2 md:pl-2 md:pr-0">
        <div className="flex justify-center fixed">
          <PageLayout size={2} displayName={'Main'}>
            <Main />
          </PageLayout>
          <div className="hidden md:block md:pl-5" />
          <PageLayout size={1} displayName={'Side'}>
            <Side />
          </PageLayout>
        </div>
      </div>
    )
  }
)
