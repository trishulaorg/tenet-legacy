import NotificationBody from './body'
import NotificationTitle from './title'
import NotificationType from './type'
// import { NotificationUserIcon } from './UserIcon'

type Props = {
    type: string
    title: string
    body: string
}

export default function NotificationCard(props: Props){
    const { type, title, body } = props
    return (
        <>
            <div className="flex flex-row w-full py-3">
                <NotificationType type={type}/>
                <div className="flex flex-col w-full">
                    <NotificationTitle title={title}/>
                    <NotificationBody body={body}/>
                </div>
            </div>
        </>
    )
}