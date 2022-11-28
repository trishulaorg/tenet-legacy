import { SetStateAction, useState } from 'react'
interface Props{
    label : string
    state : string
    setter : React.Dispatch<SetStateAction<string>>
}
const Tab: React.FC<Props> =  ({label, state, setter}) => {
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

export const NotificationsTabs: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('All')
  return (
    <>
      <div className="flex flex-row justify-evenly">
        <Tab label="All" state={currentTab} setter={setCurrentTab}/>
        <Tab label="Comments" state={currentTab} setter={setCurrentTab}/>
        <Tab label="Likes" state={currentTab} setter={setCurrentTab}/>
        <Tab label="Followers" state={currentTab} setter={setCurrentTab}/>
      </div>
      
      {/* Placeholder cards */}
      <div className="flex flex-col">
        <div className="h-[200px] w-[100%] p-[20px] m-[20px] bg-contentbg dark:bg-contentbg-dark rounded">
            Post 1
        </div>
        <div className="h-[200px] w-[100%] p-[20px] m-[20px] bg-contentbg dark:bg-contentbg-dark rounded">
            Post 2
        </div>
      </div>
    </>
  )
}