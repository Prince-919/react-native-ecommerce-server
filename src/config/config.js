import { config as conf } from "dotenv";
conf();

const _config = {
  port: process.env.PORT,
  databaseUrl: process.env.MONGO_CONNECTION_STRING,
  env: process.env.NODE_ENV,
  token: process.env.JWT_TOKEN,
  cloud_name: process.env.CLOUDINARY_NAME,
  cloud_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_key: process.env.CLOUDINARY_API_KEY,
  smtp_host: process.env.SMTP_HOST,
  smtp_port: process.env.SMTP_PORT,
  smtp_user: process.env.SMTP_USER,
  smtp_pass: process.env.SMTP_PASS,
};

export const config = Object.freeze(_config);
