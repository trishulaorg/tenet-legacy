// storybook story for <NotificationCard/>
import type { ComponentStory } from '@storybook/react'
import { ComponentMeta } from '@storybook/react'
import { NotificationCard } from '@/src/ui/notification/NotificationCard'
import type { PersonaIconUrl } from '@/src/domain/models/persona/PersonaIconUrl'
import type { PersonaId } from '@/src/domain/models/persona/PersonaId'
import type { PersonaName } from '@/src/domain/models/persona/PersonaName'
import type { PersonaScreenName } from '@/src/domain/models/persona/PersonaScreenName'
import type { Persona } from '@/src/domain/models/persona/Persona'

export default {
  title: 'Notification/NotificationCard',
  component: NotificationCard,
} satisfies ComponentMeta<typeof NotificationCard>

const persona: Persona = {
  id: '1' as PersonaId,
  name: 'John' as PersonaName,
  iconUrl: 'https://via.placeholder.com/150' as PersonaIconUrl,
  screenName: 'John' as PersonaScreenName,
}
export const NotificationCardLikeStory: ComponentStory<typeof NotificationCard> = () => (
  <NotificationCard type="like" sender={persona} recipient={persona} message={'liked your post'} />
)
export const NotificationCardFollowStory: ComponentStory<typeof NotificationCard> = () => (
  <NotificationCard type="follow" sender={persona} recipient={persona} message={'follow you'} />
)
export const NotificationCardCommentStory: ComponentStory<typeof NotificationCard> = () => (
  <NotificationCard
    type="comment"
    sender={persona}
    recipient={persona}
    message={'commented on your post'}
  />
)
