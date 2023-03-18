import type { ComponentStory } from '@storybook/react'
import { ComponentMeta } from '@storybook/react'
import { aBoard } from '../../generated/mocks'
import BoardPage from '../../pages/board/[board_id]'
import { UserStateContext, UserState, PersonaState } from '../../states/UserState'
import iconImage from '../static/icon.png'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import { routerValue } from '../utils/routerValue'
import type { PersonaIconUrl } from '@/models/persona/PersonaIconUrl'
import type { PersonaId } from '@/models/persona/PersonaId'
import type { PersonaName } from '@/models/persona/PersonaName'
import type { PersonaScreenName } from '@/models/persona/PersonaScreenName'
import type { getSdk } from '@/generated/types'
import { createApiClientImpl } from '@/infrastructure/apiClientImpl'
import type { TopicId } from '@/models/board/TopicId'

export default {
  title: 'Pages/BoardPage',
  component: BoardPage,
  args: {
    boardData: await createApiClientImpl({
      ...({} as ReturnType<typeof getSdk>),
      async getBoard() {
        return {
          board: aBoard(),
        }
      },
    }).getBoard({ topicId: '' as TopicId }),
  },
} satisfies ComponentMeta<typeof BoardPage>

export const SignedIn: ComponentStory<typeof BoardPage> = (args) => (
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
    <BoardPage {...args} />
  </UserStateContext.Provider>
)

export const SignedInWithBoardId: ComponentStory<typeof BoardPage> = (args) => (
  <RouterContext.Provider
    value={{
      ...routerValue,
      query: {
        board_id: '1',
      },
      isReady: true,
    }}
  >
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
      <BoardPage {...args} />
    </UserStateContext.Provider>
  </RouterContext.Provider>
)

export const NotSignedIn: ComponentStory<typeof BoardPage> = (args) => (
  <UserStateContext.Provider value={null}>
    <BoardPage {...args} />
  </UserStateContext.Provider>
)
