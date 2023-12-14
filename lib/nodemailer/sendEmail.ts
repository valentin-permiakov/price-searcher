'use server';

import { EmailContent } from '@/types';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  pool: true,
  service: 'hotmail',
  port: 2525,
  auth: {
    user: process.env.NEXT_PUBLIC_HOTMAIL_EMAIL,
    pass: process.env.NEXT_PUBLIC_HOTMAIL_PASS,
  },
  maxConnections: 1,
});

const sendEmail = async (emailContent: EmailContent, sendTo: string[]) => {
  console.log(
    process.env.NEXT_PUBLIC_HOTMAIL_EMAIL,
    process.env.NEXT_PUBLIC_HOTMAIL_PASS
  );
  const mailOptions = {
    from: process.env.NEXT_PUBLIC_HOTMAIL_EMAIL,
    to: sendTo,
    html: emailContent.body,
    subject: emailContent.subject,
  };

  transporter.sendMail(mailOptions, (error: any, info: any) => {
    if (error) console.log(error);
    console.log('email sent', info);
  });
};

export default sendEmail;
