import { asNexusMethod, scalarType } from 'nexus'
import { GraphQLDate } from 'graphql-iso-date'
import { GraphQLError, GraphQLScalarType } from 'graphql'
import { BadRequestError } from '../../errors/BadRequest/BadRequestError'
import type { FileUpload, Upload } from 'graphql-upload'
import { DateTimeResolver } from 'graphql-scalars'

const isUpload = (value: unknown): value is Upload => {
  return !!value && typeof (value as Upload).file === 'object'
}

export const UploadScalar = scalarType({
  name: 'Upload',
  description: 'Upload type compatible with graphql-upload',
  serialize: () => {
    throw new GraphQLError('Upload serialization unsupported.')
  },
  parseValue: async (value: unknown): Promise<FileUpload> => {
    if (!isUpload(value)) {
      throw new BadRequestError('file data is broken.')
    }

    const upload = await value.file
    if (typeof upload === 'undefined') {
      throw new BadRequestError('file data is undefined.')
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
type UploadType = File
const GQLDate = asNexusMethod(GraphQLDate, 'date')
const GQLDate2 = asNexusMethod(new GraphQLScalarType(DateTimeResolver), 'dateTime')

export { GQLUpload, GQLDate, GQLDate2 }
export type { UploadType as Upload }
