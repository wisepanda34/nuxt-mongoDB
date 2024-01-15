// server/service/mail-service.js
import nodemailer from 'nodemailer';

const MailService = {
  sendActivationMail: async (to, link) => {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Activate your account on ${process.env.API_URL}`,
      text: '',
      html: `
        <div>
          <h1>to activate follow the link</h1>
          <a href="${link}">${link}</a>
        </div>
      `,
    });
  },
};

export default MailService;
