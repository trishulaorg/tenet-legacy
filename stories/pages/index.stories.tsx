import type { ComponentStory } from '@storybook/react'
import { ComponentMeta } from '@storybook/react'
import { PersonaState, UserState, UserStateContext } from '../../states/UserState'
import IndexPage from '../../pages/index'
import iconImage from '../static/icon.png'
import { graphql } from 'msw'
import type { Query } from '../../mocks/generated/types'
import { GetActivitiesDocument } from '../../mocks/generated/types'
import { aPost } from '../../mocks/generated/mocks'

const coton = graphql.link('https://coton.vercel.app/api/graphql')

export default {
  title: 'Pages/IndexPage',
  component: IndexPage,
  parameters: {
    msw: {
      handlers: [
        coton.query<Partial<Query>>(GetActivitiesDocument, (_, res, ctx) =>
          res(
            ctx.data({
              activities: Array(10)
                .fill(null)
                .map((_, i) =>
                  aPost({
                    id: i.toString(),
                    title: `lorem ipsum ${i + 1}`,
                    content:
                      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  })
                ),
            })
          )
        ),
      ],
    },
  },
  args: { initialData: {} },
} satisfies ComponentMeta<typeof IndexPage>

export const LoggedIn: ComponentStory<typeof IndexPage> = (args) => (
  <UserStateContext.Provider
    value={
      new UserState(
        'token',
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
    <IndexPage {...args} />
  </UserStateContext.Provider>
)

export const NotLoggedIn: ComponentStory<typeof IndexPage> = (args) => (
  <UserStateContext.Provider
    value={
      new UserState(
        'INVALID_TOKEN',
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
    <IndexPage {...args} />
  </UserStateContext.Provider>
)
