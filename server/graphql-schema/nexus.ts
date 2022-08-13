import { makeSchema } from 'nexus'
import { GQLDate, GQLUpload } from './scalars/scalarDefinitions'
import { join } from 'path'
import * as objectTypes from './nexus-types/nexusSchema'

const schema = makeSchema({
  types: { ...objectTypes, GQLDate, GQLUpload },
  outputs: {
    typegen: join(__dirname, '..', 'nexus-typegen.ts'), // 2
    schema: join(__dirname, '..', 'schema.graphql'), // 3
  },
})

export default schema
