import { config } from "dotenv";

config();

export const MONGODB__URL = process.env.MONGODB__URL;
export const PORT = process.env.PORT || 4000;
export const NODEMAILER_HOST = process.env.NODEMAILER_HOST;
export const NODEMAILER_PASS = process.env.NODEMAILER_PASS;
export const NODEMAILER_PORT = process.env.NODEMAILER_PORT;
export const NODEMAILER_USER = process.env.NODEMAILER_USER;
