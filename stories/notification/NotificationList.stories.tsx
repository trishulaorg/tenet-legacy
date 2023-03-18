import type { ComponentMeta } from '@storybook/react'
import { NotificationList } from '../../ui/notification/NotificationList'
import { PersonaState } from '../../states/UserState'
import { NotificationState } from '../../states/NotificationState'
import type { PersonaIconUrl } from '@/models/persona/PersonaIconUrl'
import type { PersonaId } from '@/models/persona/PersonaId'
import type { PersonaName } from '@/models/persona/PersonaName'
import type { PersonaScreenName } from '@/models/persona/PersonaScreenName'

export default {
  title: 'Notification/NotificationList',
  component: NotificationList,
} as ComponentMeta<typeof NotificationList>

const persona = new PersonaState({
  id: '1' as PersonaId,
  name: 'John' as PersonaName,
  iconUrl: 'https://via.placeholder.com/150' as PersonaIconUrl,
  screenName: 'John' as PersonaScreenName,
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
