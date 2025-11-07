import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// ----------------- 📨 Nodemailer Transporter -----------------
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,      // e.g., smtp.brevo.com
  port: Number(process.env.MAIL_PORT) || 587,
  secure: Number(process.env.MAIL_PORT) === 465, // true for 465, false for 587
  auth: {
    user: process.env.MAIL_USER,    // Your Brevo registered email
    pass: process.env.BREVO_API_KEY // Brevo SMTP API key
  },
});

// ----------------- ✉️ Send OTP Function -----------------
export const sendOTP = async (to, otp) => {
  try {
    const mailOptions = {
      from: `"Nestify" <${process.env.MAIL_USER}>`,
      to,
      subject: "Nestify - Your OTP Code",
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2 style="color:#2E7D32;">OTP Verification</h2>
          <p>Your One-Time Password is:</p>
          <h1 style="letter-spacing: 3px; color:#2E7D32;">${otp}</h1>
          <p>It expires in <b>5 minutes</b>.</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ OTP email sent:", info.messageId);
  } catch (error) {
    console.error("❌ Failed to send OTP email:", error);
    throw error; // allow controller to handle error
  }
};
