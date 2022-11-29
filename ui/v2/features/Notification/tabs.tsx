import { Dispatch, SetStateAction } from 'react'

type  TabProps = {
    label : string
    state : string
    setter : React.Dispatch<SetStateAction<string>>
}

function Tab(props: TabProps) {
    const { label, state, setter } = props
    return(
        <div
          className={
            state == label
              ? 'w-full cursor-pointer text-center font-bold pb-2 border-b-[3px] border-high dark:border-high-dark transition-all'
              : 'w-full cursor-pointer text-center font-bold pb-2 transition-all'
          }
          onClick={() => setter(label)}
        >
          {label}
        </div>
    )
}

type Props = {
    filterSetter: Dispatch<SetStateAction<string>>
    currentFilter: string
}

export default function NotificationsTabs(props:Props){
//   const [currentTab, setCurrentTab] = useState('All')
  const { filterSetter, currentFilter } = props
  return (
    <>
      <div className="flex flex-row justify-evenly pb-2">
        <Tab label="All" state={currentFilter} setter={filterSetter}/>
        <Tab label="Comments" state={currentFilter} setter={filterSetter}/>
        <Tab label="Likes" state={currentFilter} setter={filterSetter}/>
        <Tab label="Followers" state={currentFilter} setter={filterSetter}/>
      </div>
    </>
  )
}