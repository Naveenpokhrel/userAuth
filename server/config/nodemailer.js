import nodemailer from 'nodemailer'
import { config, configDotenv } from "dotenv";

configDotenv();

console.log(
  "Nodemailer transporter initialized",
  process.env.SMTP_USER,
  process.env.SMTP_PASS
);
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});


export default transporter;