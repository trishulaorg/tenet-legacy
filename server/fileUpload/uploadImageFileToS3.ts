import { BadRequestError } from '../errors/BadRequest/BadRequestError'
import { ulid } from 'ulid'
import { uploadFileToS3 } from './s3Handler'
import type { FileUpload } from 'graphql-upload'

const uploadImageFileToS3 = async (
  file: Promise<FileUpload>,
  directoryKey: string
): Promise<string> => {
  const fileObject = await file
  if (typeof fileObject === 'undefined') {
    throw new BadRequestError('No file data is supplied.')
  }

  const filenameMatch = fileObject.filename.match(/^.*\.(jpeg|jpg|png|svg)$/i)
  if (!filenameMatch) {
    throw new BadRequestError('Please upload Image file.')
  }
  const [, fileExtension] = filenameMatch
  const fileKey = `${directoryKey}/${ulid()}.${fileExtension}`

  const { createReadStream, mimetype } = fileObject
  const stream = createReadStream()
  const chunks: Buffer[] = []
  const buffer = await new Promise<Buffer>((resolve, reject) => {
    stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)))
    stream.on('error', (err) => reject(err))
    stream.on('end', () => resolve(Buffer.concat(chunks)))
  })

  if (buffer.length > 5 * 1000 * 1000) {
    throw new BadRequestError('Icon filesize exceeds the limit. (< 5MB)')
  }

  const fileUrl = await uploadFileToS3(fileKey, buffer, mimetype, true)
  return fileUrl
}

export { uploadImageFileToS3 }
