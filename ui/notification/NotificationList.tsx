// ui/notification/NotificationList.tsx
import type { NotificationCardProps } from './NotificationCard'
import { NotificationCard } from './NotificationCard'
import type { NotificationState } from '../../states/NotificationState'

export interface NotificationListProps {
  notifications: NotificationState[]
}

export const NotificationList: React.FC<NotificationListProps> = ({ notifications }) => {
  const renderNotificationCard = (
    notification: NotificationState
  ): React.ReactElement<NotificationCardProps> => {
    return (
      <NotificationCard
        sender={notification.sender}
        recepient={notification.recepient}
        message={notification.message}
        type={notification.type}
        key={notification.createdAt.toISOString()}
      />
    )
  }

  return <div>{notifications.map(renderNotificationCard)}</div>
}
