import NotificationCard from './card/index'

type Props = {
    notifications: string[][] /* List of notifications, [i][0] = category, [i][1] = title, [i][2] = body */
    currentFilter: String
}

export default function NotificationList(props: Props) {
  const { notifications, currentFilter } = props
    return (
    <>
      {notifications?.map((notification) => {
        if(notification[0]! == currentFilter || currentFilter == "All"){
            return(<NotificationCard 
                type={notification[0]!}
                title={notification[1]!}
                body={notification[2]!}
            />)
        }
        else{
            return(
                <></>
            )
        }
      })}
    </>
  )
}