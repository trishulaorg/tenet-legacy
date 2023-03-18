import type { ComponentStory } from '@storybook/react'
import { ComponentMeta } from '@storybook/react'
import { PersonaState, UserState, UserStateContext } from '../../states/UserState'
import IndexPage from '../../pages/index'
import iconImage from '../static/icon.png'
import { aPost } from '../../generated/mocks'
import type { PersonaName } from '@/models/persona/PersonaName'
import type { PersonaId } from '@/models/persona/PersonaId'
import type { PersonaIconUrl } from '@/models/persona/PersonaIconUrl'
import type { PersonaScreenName } from '@/models/persona/PersonaScreenName'
import { createApiClientImpl } from '@/infrastructure/apiClientImpl'
import type { getSdk } from '@/generated/types'

export default {
  title: 'Pages/IndexPage',
  component: IndexPage,
  args: {
    activities: await createApiClientImpl({
      ...({} as ReturnType<typeof getSdk>),
      async getActivities() {
        return {
          activities: Array(10)
            .fill(null)
            .map((_, i) => {
              return aPost({ id: i.toString(), title: `title${i}` })
            }),
        }
      },
    }).getActivities(),
  },
} satisfies ComponentMeta<typeof IndexPage>

export const SignedIn: ComponentStory<typeof IndexPage> = (args) => (
  <UserStateContext.Provider
    value={
      new UserState(
        [
          new PersonaState({
            id: '1' as PersonaId,
            name: 'john_doe' as PersonaName,
            iconUrl: iconImage as unknown as PersonaIconUrl,
            screenName: 'John Doe' as PersonaScreenName,
          }),
        ],
        0
      )
    }
  >
    <IndexPage {...args} />
  </UserStateContext.Provider>
)

export const NotSignedIn: ComponentStory<typeof IndexPage> = (args) => (
  <UserStateContext.Provider value={null}>
    <IndexPage {...args} />
  </UserStateContext.Provider>
)
