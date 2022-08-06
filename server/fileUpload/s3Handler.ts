import type { PutObjectCommandInput } from '@aws-sdk/client-s3'
import { S3 } from '@aws-sdk/client-s3'

const {
  STORAGE_BUCKET_NAME,
  STORAGE_ENDPOINT,
  STORAGE_REGION,
  STORAGE_ACCESS_KEY_ID,
  STORAGE_SECRET_ACCESS_KEY,
} = process.env

const uploadFileToS3 = async (
  fileKey: string,
  fileBuffer: Buffer,
  contentType: string,
  publicRead = false
): Promise<string> => {
  const s3Client = new S3({
    apiVersion: '2006-03-01',
    endpoint: STORAGE_ENDPOINT ?? '',
    region: STORAGE_REGION ?? 'us-east-1',
    credentials: {
      accessKeyId: STORAGE_ACCESS_KEY_ID ?? '',
      secretAccessKey: STORAGE_SECRET_ACCESS_KEY ?? '',
    },
  })
  const params: PutObjectCommandInput = {
    Bucket: STORAGE_BUCKET_NAME,
    Key: fileKey,
    Body: fileBuffer,
    ContentType: contentType,
  }

  if (publicRead) {
    Object.assign(params, { ACL: 'public-read' })
  }

  await s3Client.putObject(params)

  const bucketEndpointUrl = STORAGE_ENDPOINT?.replace('://', `://${STORAGE_BUCKET_NAME}.`)
  const fileUrl = `${bucketEndpointUrl}/${fileKey}`
  return fileUrl
}

export { uploadFileToS3 }
