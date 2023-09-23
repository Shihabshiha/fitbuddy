import { S3Client } from '@aws-sdk/client-s3'
import config from './config'

const s3 = new S3Client({
  credentials: {
    accessKeyId: config.AWS_ACCESS_KEY_ID ,
    secretAccessKey: config.AWS_SECRET_KEY ,
  },
  region: config.AWS_REGION,
});

export default s3;