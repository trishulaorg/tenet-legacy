import type { ComponentStory } from '@storybook/react'
import { ComponentMeta } from '@storybook/react'
import { aBoard } from '../../generated/mocks'
import BoardPage from '../../pages/board/[board_id]'
import { UserStateContext, UserState, PersonaState } from '../../states/UserState'
import iconImage from '../static/icon.png'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import { routerValue } from '../utils/routerValue'

export default {
  title: 'Pages/BoardPage',
  component: BoardPage,
  args: {
    boardData: aBoard(),
  },
} satisfies ComponentMeta<typeof BoardPage>

export const SignedIn: ComponentStory<typeof BoardPage> = (args) => (
  <UserStateContext.Provider
    value={
      new UserState(
        [
          new PersonaState({
            id: '1',
            name: 'john_doe',
            iconUrl: iconImage as unknown as string,
            screenName: 'John Doe',
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
              id: '1',
              name: 'john_doe',
              iconUrl: iconImage as unknown as string,
              screenName: 'John Doe',
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
