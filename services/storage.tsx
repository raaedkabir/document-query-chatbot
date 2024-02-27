import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
  DeleteObjectCommand,
  CreateMultipartUploadCommand,
  UploadPartCommand,
  CompleteMultipartUploadCommand,
} from '@aws-sdk/client-s3'
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const getS3Client = (idToken: string) =>
  new S3Client({
    region: process.env.AWS_DEPLOYMENT_REGION,
    credentials: fromCognitoIdentityPool({
      clientConfig: { region: process.env.AWS_DEPLOYMENT_REGION },
      identityPoolId: process.env.IDENTITY_POOL_ID!,
      logins: {
        [process.env.USER_POOL_ENDPOINT!]: idToken,
      },
    }),
  })

export const listObjects = async (idToken: string, prefix: string) => {
  const client = getS3Client(idToken)

  const command = new ListObjectsV2Command({
    Bucket: process.env.BUCKET_NAME,
    Prefix: prefix,
  })

  return await client.send(command)
}

export const getS3Object = async (idToken: string, key: string) => {
  const client = getS3Client(idToken)

  const command = new GetObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: key,
  })

  return await getSignedUrl(client, command, {
    expiresIn: 300, // 5 minutes
  })
}

export const deleteS3Object = async (idToken: string, key: string) => {
  const client = getS3Client(idToken)

  const command = new DeleteObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: key,
  })

  return await client.send(command)
}

export const createMultipartUpload = async (idToken: string, key: string) => {
  const client = getS3Client(idToken)

  const command = new CreateMultipartUploadCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: key,
    ContentType: 'application/pdf',
  })

  return await client.send(command)
}

export const uploadPart = async (
  idToken: string,
  key: string,
  body: Uint8Array,
  uploadId: string,
  partNumber: number
) => {
  const client = getS3Client(idToken)

  const command = new UploadPartCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: key,
    Body: body,
    UploadId: uploadId,
    PartNumber: partNumber,
  })

  return await client.send(command)
}

export const completeMultipartUpload = async (
  idToken: string,
  key: string,
  uploadId: string,
  parts: { ETag: string; PartNumber: number }[]
) => {
  const client = getS3Client(idToken)

  const command = new CompleteMultipartUploadCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: key,
    UploadId: uploadId,
    MultipartUpload: {
      Parts: parts,
    },
  })

  return await client.send(command)
}
