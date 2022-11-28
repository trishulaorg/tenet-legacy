import NotificationsTabs from "./tabs"
import NotificationList from "./notificationList"

export default function Notifications(){

    return(
        <>
            <h1 className="flex-row my-4 text-med dark:text-med-dark text-2xl">Notifications</h1>
            <NotificationsTabs />
            <NotificationList />
        </>
    )
}