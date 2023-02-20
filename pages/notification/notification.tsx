import type { ReactElement } from 'react'
import type { NotificationData } from '../../states/NotificationState'
import { NotificationState, NotificationStateContext } from '../../states/NotificationState'
import { NotificationList } from '../../ui/notification/NotificationList' //TODO: Make notification list component
// import { PageTitle } from '../../ui/PageTitle'; // TODO: Make page title component
import { useObserver } from 'mobx-react-lite'
// import { NotificationCard } from '../../ui/notification/NotificationCard';

export default function NotificationPage(): ReactElement {
  const notifications = [
    new NotificationState({ type: 'follow', createdAt: new Date() }),
    new NotificationState({ type: 'like', message: 'Your post was liked!', createdAt: new Date() }),
    new NotificationState({
      type: 'comment',
      message: 'You have a new comment!',
      createdAt: new Date(),
    }),
  ]

  // const notificationElements = notifications.map((notification) => (
  //   <NotificationCard
  //     sender={notification.sender}
  //     recepient={notification.recepient}
  //     message={notification.message}
  //     type={notification.type}
  //     key={notification.createdAt.toISOString()}
  //   />
  // ));

  const handleAddNotification = (): void => {
    const data: NotificationData = {
      type: 'follow',
      createdAt: new Date(),
    }
    const notification = new NotificationState(data)
    notifications.push(notification)
  }

  return useObserver(() => (
    <NotificationStateContext.Provider value={notifications}>
      <div className="flex flex-col gap-4">
        <NotificationList notifications={notifications} />
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded"
          onClick={handleAddNotification}
        >
          Add Notification
        </button>
      </div>
    </NotificationStateContext.Provider>
  ))
}
