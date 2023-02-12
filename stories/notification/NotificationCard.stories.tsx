// storybook story for <NotificationCard/>
import { ComponentMeta } from '@storybook/react'
import { NotificationCard } from '../../ui/notification/NotificationCard'
import { PersonaState } from '../../states/UserState'

export default {
  title: 'Notification/NotificationCard',
  component: NotificationCard,
} satisfies ComponentMeta<typeof NotificationCard>

const persona = new PersonaState({
  id: '1',
  name: 'John',
  iconUrl: 'https://via.placeholder.com/150',
  screenName: 'John',
})
export const NotificationCardLikeStory = () => (
  <NotificationCard type="like" sender={persona} recepient={persona} message={'liked your post'} />
)
export const NotificationCardFollowStory = () => (
  <NotificationCard type="follow" sender={persona} recepient={persona} message={'follow you'} />
)
export const NotificationCardCommentStory = () => (
  <NotificationCard
    type="comment"
    sender={persona}
    recepient={persona}
    message={'commented on your post'}
  />
)
