// storybook story for <NotificationCard/>
import { ComponentMeta } from '@storybook/react'
import { NotificationCard } from '../../ui/notification/NotificationCard'
import { PersonaState } from '../../states/UserState'
import type { PersonaIconUrl } from '@/models/persona/PersonaIconUrl'
import type { PersonaId } from '@/models/persona/PersonaId'
import type { PersonaName } from '@/models/persona/PersonaName'
import type { PersonaScreenName } from '@/models/persona/PersonaScreenName'

export default {
  title: 'Notification/NotificationCard',
  component: NotificationCard,
} satisfies ComponentMeta<typeof NotificationCard>

const persona = new PersonaState({
  id: '1' as PersonaId,
  name: 'John' as PersonaName,
  iconUrl: 'https://via.placeholder.com/150' as PersonaIconUrl,
  screenName: 'John' as PersonaScreenName,
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
