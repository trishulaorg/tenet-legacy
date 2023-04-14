// ui/notification/NotificationList.tsx
import type { NotificationState } from '@/src/application/states/NotificationState'
import type { NotificationCardProps } from './NotificationCard'
import { NotificationCard } from './NotificationCard'

export interface NotificationListProps {
  notifications: NotificationState[]
}

export const NotificationList: React.FC<NotificationListProps> = ({ notifications }) => {
  const renderNotificationCard = (
    notification: NotificationState,
    i: number
  ): React.ReactElement<NotificationCardProps> => {
    return (
      <NotificationCard
        key={i}
        sender={notification.sender}
        recipient={notification.recipient}
        message={notification.message}
        type={notification.type}
      />
    )
  }

  return <>{notifications.map(renderNotificationCard)}</>
}
