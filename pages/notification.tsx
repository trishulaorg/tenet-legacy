import type { ReactElement } from 'react'
import { NotificationList } from '../ui/notification/NotificationList' //TODO: Make notification list component
// import { PageTitle } from '../../ui/PageTitle'; // TODO: Make page title component
import { useObserver } from 'mobx-react-lite'
import { NotificationStateImpl } from '@/infrastructure/states/NotificationStateImpl'
import { NotificationStateProvider } from '@/states/NotificationState'
import type { NotificationData } from '@/domain/models/notification/NotificationData'
// import { NotificationCard } from '../../ui/notification/NotificationCard';

export default function NotificationPage(): ReactElement {
  const notifications = [
    new NotificationStateImpl({ type: 'follow', createdAt: new Date() }),
    new NotificationStateImpl({
      type: 'like',
      message: 'Your post was liked!',
      createdAt: new Date(),
    }),
    new NotificationStateImpl({
      type: 'comment',
      message: 'You have a new comment!',
      createdAt: new Date(),
    }),
  ]

  const handleAddNotification = (): void => {
    const data: NotificationData = {
      type: 'follow',
      createdAt: new Date(),
    }
    const notification = new NotificationStateImpl(data)
    notifications.push(notification)
  }

  return useObserver(() => (
    <NotificationStateProvider value={notifications}>
      <div className="flex flex-col gap-4 p-4 items-center">
        <NotificationList notifications={notifications} />
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded"
          onClick={handleAddNotification}
        >
          Add Notification
        </button>
      </div>
    </NotificationStateProvider>
  ))
}
