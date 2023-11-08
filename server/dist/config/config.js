"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    database: {
        connectionString: process.env.DATABASE_CONNECTION_STRING || '',
    },
    jwtSecret: process.env.JWT_SECRET_KEY || '',
    EMAIL_NODE_MAILER: process.env.EMAIL_NODE_MAILER,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    CLOUDINARY_NAME: process.env.CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
    AWS_REGION: process.env.AWS_REGION,
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
    CLOUDFRONT_DOMAIN: process.env.CLOUDFRONT_DOMAIN,
    STRIPE_API_SECRET_KEY: process.env.SRIPE_API_SECRET_KEY,
    FRONT_END_BASE_URL: process.env.FRONT_END_URL,
};
exports.default = config;
