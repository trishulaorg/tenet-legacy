import { graphql } from 'msw'
import { aQuery } from './generated/mocks'
import type { Query } from './generated/types'
import { GetFollowingBoardDocument } from './generated/types'
import { GetPostDocument } from './generated/types'
import { GetMeDocument } from './generated/types'
import { GetBoardDocument } from './generated/types'
import { GetActivitiesDocument } from './generated/types'

const coton = graphql.link('https://coton.vercel.app/api/graphql')

export const handlers = [
  GetActivitiesDocument,
  GetBoardDocument,
  GetMeDocument,
  GetFollowingBoardDocument,
  GetPostDocument,
].map((doc) => coton.query<Partial<Query>>(doc, (_, res, ctx) => res(ctx.data(aQuery()))))
