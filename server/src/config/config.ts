import dotenv from 'dotenv';

dotenv.config();

const config = {
  database: {
    connectionString: process.env.DATABASE_CONNECTION_STRING || '',
  },
  jwtSecret: process.env.JWT_SECRET_KEY || '',
  EMAIL_NODE_MAILER : process.env.EMAIL_NODE_MAILER,
  EMAIL_PASSWORD : process.env.EMAIL_PASSWORD,
  CLOUDINARY_NAME : process.env.CLOUD_NAME,
  CLOUDINARY_API_KEY : process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET : process.env.CLOUDINARY_API_SECRET,
  GOOGLE_CLIENT_ID : process.env.GOOGLE_CLIENT_ID,
};

export default config;