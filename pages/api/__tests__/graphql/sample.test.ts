import { getSdk } from '../../../../server/frontend-graphql-definition'
import { GraphQLClient } from 'graphql-request'

const baseApiUrl = 'http://localhost:3000/api/graphql'

const apiTestClient = getSdk(new GraphQLClient(baseApiUrl))

describe('sample test', () => {
  test('activities return value', async () => {
    const { activities } = await apiTestClient.getActivities()

    expect(activities).toEqual([])
  })
})
