import NotificationCard from './card/index'

export default function NotificationList() {
  return (
    <>
      <NotificationCard
        type="like"
        title="@gutchom liked your post!"
        body="gutchom liked your post, 'testing posting'!"
      />
      <NotificationCard
        type="comment"
        title="@fumetsu commented on 'testing posting'"
        body="fumetsu commented on 'testing posting': 'wow nice post!'"
      />
      <NotificationCard
        type="follower"
        title="@ka followed you!"
        body="New follower, @ka. Say hi!"
      />
    </>
  )
}