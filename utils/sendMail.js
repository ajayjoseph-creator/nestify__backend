import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false, // true only if port is 465
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const sendOTP = async (to, otp) => {
  const mailOptions = {
    from: process.env.MAIL_USER,
    to,
    subject: "Nestify - Your OTP Code",
    html: `
      <div style="font-family: sans-serif; padding: 20px;">
        <h2 style="color:#2E7D32;">🔐 OTP Verification</h2>
        <p>Your One-Time Password is:</p>
        <h1 style="letter-spacing: 3px; color:#2E7D32;">${otp}</h1>
        <p>It expires in <b>5 minutes</b>.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
