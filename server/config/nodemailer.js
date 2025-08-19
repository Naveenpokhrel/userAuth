import nodemailer from 'nodemailer'
import { config, configDotenv } from "dotenv";

configDotenv();

console.log(
  "Nodemailer transporter initialized",
  process.env.SMTP_USER,
  process.env.SMTP_PASS
);
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export default transporter;