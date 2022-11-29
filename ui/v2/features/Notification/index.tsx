import { useState } from 'react'
import NotificationsTabs from './tabs'
import NotificationList from './notificationList'

export default function Notifications() {
  const [typeFilter, setTypeFilter] = useState('All')

  const exampleNotifications = [
    ["Likes", "@gutchom liked your post!", "gutchom liked your post, 'testing posting'!"],
    ["Comments", "@fumetsu commented on 'testing posting'", "fumetsu commented on 'testing posting': 'wow nice post!'"],
    ["Followers", "@ka followed you!", "New follower, @ka. Say hi!"],
  ]

  return (
    <>
        <h1 className="flex-row my-4 text-med dark:text-med-dark text-2xl">Notifications</h1>
        <NotificationsTabs filterSetter={setTypeFilter} currentFilter={typeFilter}/>
        <NotificationList notifications={exampleNotifications} currentFilter={typeFilter}/>
    </>
  )
}