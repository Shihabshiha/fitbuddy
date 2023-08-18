import dotenv from 'dotenv';

dotenv.config();

const config = {
  database: {
    connectionString: process.env.DATABASE_CONNECTION_STRING || '',
  },
  jwtSecret: process.env.JWT_SECRET_KEY || '',
  EMAIL_NODE_MAILER : process.env.EMAIL_NODE_MAILER,
  EMAIL_PASSWORD : process.env.EMAIL_PASSWORD,
};

export default config;