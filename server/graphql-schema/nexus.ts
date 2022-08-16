import { makeSchema } from 'nexus'
import { GQLDate, GQLDate2, GQLUpload } from './scalars/scalarDefinitions'
import { join } from 'path'
import * as objectTypes from './nexus-types/nexusSchema'

const schema = makeSchema({
  types: { ...objectTypes, GQLDate, GQLUpload, GQLDate2 },
  contextType: {
    module: join(process.cwd(), 'server/index.ts'),
    export: 'Context',
  },
  outputs: {
    typegen: join(process.cwd(), 'server/nexus-typegen.ts'),
    schema: join(process.cwd(), 'server/schema.graphql'),
  },
  plugins: [],
})

export default schema
