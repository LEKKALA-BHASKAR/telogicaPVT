import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const sanitize = (value = '') => value.trim();
const stripSpaces = (value = '') => value.replace(/\s+/g, '');

const emailUser = sanitize(process.env.EMAIL_USER || '');
const emailPassword = stripSpaces(process.env.EMAIL_PASSWORD || '');

const requiredEnv = [
  { key: 'EMAIL_USER', value: emailUser },
  { key: 'EMAIL_PASSWORD', value: emailPassword }
];

requiredEnv.forEach(({ key, value }) => {
  if (!value) {
    console.error(`❌ Missing required environment variable: ${key}`);
  }
});

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 465,
  secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : true,
  auth: {
    user: emailUser,
    pass: emailPassword
  }
});

const verifyTransporter = async () => {
  try {
    await transporter.verify();
    console.log('✅ Email server is ready to send emails');
  } catch (error) {
    console.error('❌ Email transporter verification failed:', error.message);
  }
};

verifyTransporter();

export default transporter;
