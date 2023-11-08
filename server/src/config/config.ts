import dotenv from 'dotenv';

dotenv.config();

const config = {
  
  DB_CONNECTION_STRING : process.env.DATABASE_CONNECTION_STRING as string,
  PORT : process.env.PORT,
  jwtSecret: process.env.JWT_SECRET_KEY || '',
  EMAIL_NODE_MAILER : process.env.EMAIL_NODE_MAILER,
  EMAIL_PASSWORD : process.env.EMAIL_PASSWORD,
  CLOUDINARY_NAME : process.env.CLOUD_NAME,
  CLOUDINARY_API_KEY : process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET : process.env.CLOUDINARY_API_SECRET,
  GOOGLE_CLIENT_ID : process.env.GOOGLE_CLIENT_ID,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID as string,
  AWS_SECRET_KEY : process.env.AWS_SECRET_KEY as string,
  AWS_REGION: process.env.AWS_REGION as string,
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME as string,
  CLOUDFRONT_DOMAIN : process.env.CLOUDFRONT_DOMAIN,
  STRIPE_API_SECRET_KEY : process.env.SRIPE_API_SECRET_KEY as string,
  FRONT_END_BASE_URL : process.env.FRONT_END_URL,
};

export default config;