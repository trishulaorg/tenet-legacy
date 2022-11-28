import NotificationBody from './body'
import NotificationTitle from './title'
import NotificationType from './type'
// import { NotificationUserIcon } from './UserIcon'

export default function NotificationCard(){
    return (
        <>
            <div className="flex flex-row">
                <NotificationType type="like"/>
                <div className="flex flex-col">
                    <NotificationTitle />
                    <NotificationBody />
                </div>
            </div>
        </>
    )
}