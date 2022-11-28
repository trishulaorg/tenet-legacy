import { NotificationsTabs } from "./tabs"

export const Notifications: React.FC = () => {

    return(
        <>
            <h1 className="flex-row my-4 text-med dark:text-med-dark text-2xl">Notifications</h1>
            <NotificationsTabs />
        </>
    )
}