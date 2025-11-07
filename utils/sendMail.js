import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

// ----------------- ✉️ Send OTP via Brevo HTTP API -----------------
export const sendOTP = async (to, otp) => {
  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: { name: "Nestify", email: process.env.MAIL_USER },
        to: [{ email: to }],
        subject: "Nestify - Your OTP Code",
        htmlContent: `
          <div style="font-family: sans-serif; padding: 20px;">
            <h2 style="color:#2E7D32;">OTP Verification</h2>
            <p>Your One-Time Password is:</p>
            <h1 style="letter-spacing: 3px; color:#2E7D32;">${otp}</h1>
            <p>It expires in <b>5 minutes</b>.</p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    console.log("✅ OTP email sent via Brevo HTTP API");
  } catch (error) {
    console.error("❌ Failed to send OTP email:", error);
    throw error; // allow controller to handle
  }
};
