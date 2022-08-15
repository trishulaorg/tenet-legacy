import { asNexusMethod, scalarType } from 'nexus'
import { GraphQLDate } from 'graphql-iso-date'
import { GraphQLError, GraphQLScalarType } from 'graphql'
import { BadRequestError } from '../../errors/BadRequest/BadRequestError'
import type { FileUpload } from 'graphql-upload'
import { DateTimeResolver } from 'graphql-scalars'

const isFileUpload = (value: unknown): value is FileUpload => {
  return !!value && typeof (value as FileUpload).createReadStream === 'function'
}
export const UploadScalar = scalarType({
  name: 'Upload',
  description: 'Upload type compatible with graphql-upload',
  serialize: () => {
    throw new GraphQLError('Upload serialization unsupported.')
  },
  parseValue: async (value: unknown): Promise<FileUpload> => {
    const upload = await value
    if (!isFileUpload(upload)) {
      throw new BadRequestError('file data is broken.')
    }
    const stream = upload.createReadStream()
    const fileType = await (await import('file-type')).fileTypeFromStream(stream)

    if (fileType?.mime !== upload.mimetype)
      throw new GraphQLError('Mime type does not match file content.')

    return upload
  },
  parseLiteral: (ast) => {
    throw new GraphQLError('Upload literal unsupported.', ast)
  },
})

// @ts-expect-error hoge
const GQLUpload = asNexusMethod(UploadScalar, 'upload')
type Upload = File
const GQLDate = asNexusMethod(GraphQLDate, 'date')
const GQLDate2 = asNexusMethod(new GraphQLScalarType(DateTimeResolver), 'dateTime')

export { GQLUpload, GQLDate, GQLDate2 }
export type { Upload }
