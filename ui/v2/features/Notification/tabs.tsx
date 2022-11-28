import { SetStateAction, useState } from 'react'
type  Props = {
    label : string
    state : string
    setter : React.Dispatch<SetStateAction<string>>
}
function Tab(props: Props) {
    const { label, state, setter } = props
    return(
        <div
          className={
            state == label
              ? 'cursor-pointer font-bold border-b-2 border-high dark:border-high-dark transition-all'
              : 'cursor-pointer transition-all'
          }
          onClick={() => setter(label)}
        >
          {label}
        </div>
    )
}

export default function NotificationsTabs(){
  const [currentTab, setCurrentTab] = useState('All')
  return (
    <>
      <div className="flex flex-row justify-evenly pb-2">
        <Tab label="All" state={currentTab} setter={setCurrentTab}/>
        <Tab label="Comments" state={currentTab} setter={setCurrentTab}/>
        <Tab label="Likes" state={currentTab} setter={setCurrentTab}/>
        <Tab label="Followers" state={currentTab} setter={setCurrentTab}/>
      </div>
    </>
  )
}