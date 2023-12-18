import 'dotenv/config';
import nodemailer from 'nodemailer';
import { Email } from '../types/Email';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

async function send({ email, subject, html }: Email) {
  return transporter.sendMail({
    to: email,
    subject: subject,
    html: html,
  });
}

const sendActivationEmail = (email: string, token: string) => {
  const href = `http://localhost:3005/activation/${token}`;

  const html = `
  <h1>Activate Account</h1>
  <a href="${href}">activation link</a>
  `;

  return send({
    email,
    html,
    subject: 'Activate Account',
  });
};

export const emailService = {
  sendActivationEmail,
  send,
};
