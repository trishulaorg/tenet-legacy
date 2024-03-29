import type { ComponentMeta, ComponentStory } from '@storybook/react'
import { NotificationList } from '@/src/ui/notification/NotificationList'
import type { PersonaIconUrl } from '@/src/domain/models/persona/PersonaIconUrl'
import type { PersonaId } from '@/src/domain/models/persona/PersonaId'
import type { PersonaName } from '@/src/domain/models/persona/PersonaName'
import type { PersonaScreenName } from '@/src/domain/models/persona/PersonaScreenName'
import type { Persona } from '@/src/domain/models/persona/Persona'
import { NotificationStateImpl } from '@/src/infrastructure/states/NotificationStateImpl'

export default {
  title: 'Notification/NotificationList',
  component: NotificationList,
} as ComponentMeta<typeof NotificationList>

const persona: Persona = {
  id: '1' as PersonaId,
  name: 'John' as PersonaName,
  iconUrl: 'https://via.placeholder.com/150' as PersonaIconUrl,
  screenName: 'John' as PersonaScreenName,
}

const notifications = [
  new NotificationStateImpl({
    type: 'like',
    sender: persona,
    message: 'liked your post',
    createdAt: new Date(),
  }),
  new NotificationStateImpl({
    type: 'follow',
    sender: persona,
    message: 'followed you',
    createdAt: new Date(),
  }),
  new NotificationStateImpl({
    type: 'comment',
    sender: persona,
    message: 'commented on your post',
    createdAt: new Date(),
  }),
]

export const NotificationListStory: ComponentStory<typeof NotificationList> = () => (
  <NotificationList notifications={notifications} />
)
