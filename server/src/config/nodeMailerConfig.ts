import nodemailer from 'nodemailer';
import config from './config';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: config.EMAIL_NODE_MAILER,
    pass: config.EMAIL_PASSWORD,
  },
});

export default transporter;
