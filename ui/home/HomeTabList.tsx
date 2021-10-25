import React from 'react'
import { observer } from 'mobx-react'

export const HomeTab: React.FC<{ onClick: () => void; selected: boolean }> = (props) => {
  const style = props.selected
    ? 'text-xl font-bold mr-5 pb-1 border-solid border-b-2 border-gray-600 border-opacity-80'
    : 'text-xl font-bold mr-5 pb-1 border-solid border-b-2 border-gray-600 border-opacity-80 opacity-50'
  return (
    <button className="cursor-pointer" onClick={props.onClick}>
      <h3 className={style}>{props.children}</h3>
    </button>
  )
}

export const HomeTabList: React.FC = observer(() => {
  return (
    <div className="flex mb-5">
      <HomeTab onClick={() => console.log('someReceiverWeWillDefine')} selected={true} key="home">
        Home
      </HomeTab>
      <HomeTab
        onClick={() => console.log('someReceiverWeWillDefine')}
        selected={false}
        key="activities"
      >
        Activities
      </HomeTab>
      <HomeTab
        onClick={() => console.log('someReceiverWeWillDefine')}
        selected={false}
        key="hottopics"
      >
        Hot Topics
      </HomeTab>
    </div>
  )
})
