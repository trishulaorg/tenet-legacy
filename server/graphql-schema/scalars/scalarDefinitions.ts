import { asNexusMethod, scalarType } from 'nexus'
import { GraphQLDate } from 'graphql-iso-date'
import { GraphQLError } from 'graphql'
import { BadRequestError } from '../../errors/BadRequest/BadRequestError'
import type { FileUpload } from 'graphql-upload'

const isFileUpload = (value: unknown): value is FileUpload => {
  return !!value && typeof (value as FileUpload).createReadStream === 'function'
}
export const UploadScalar = scalarType({
  name: 'Upload',
  asNexusMethod: 'upload', // We set this to be used as a method later as `t.upload()` if needed
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
const GQLDate = asNexusMethod(GraphQLDate, 'date')

export { GQLUpload, GQLDate }
