import type { ComponentMeta } from '@storybook/react'
import { NotificationList } from '../../ui/notification/NotificationList'
import { PersonaState } from '../../states/UserState'
import { NotificationState } from '../../states/NotificationState'

export default {
  title: 'Notification/NotificationList',
  component: NotificationList,
} as ComponentMeta<typeof NotificationList>

const persona = new PersonaState({
  id: '1',
  name: 'John',
  iconUrl: 'https://via.placeholder.com/150',
  screenName: 'John',
})

const notifications = [
  new NotificationState({
    type: 'like',
    sender: persona,
    message: 'liked your post',
    createdAt: new Date(),
  }),
  new NotificationState({
    type: 'follow',
    sender: persona,
    message: 'followed you',
    createdAt: new Date(),
  }),
  new NotificationState({
    type: 'comment',
    sender: persona,
    message: 'commented on your post',
    createdAt: new Date(),
  }),
]

export const NotificationListStory = () => <NotificationList notifications={notifications} />
