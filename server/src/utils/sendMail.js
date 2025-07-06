// utils/mailer.js
import nodemailer from "nodemailer";
import "./config.env.js"


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

 
const sendMail = async (email, userName, otp ) => {

  const info = await transporter.sendMail({
    from: `"Team" <${process.env.MAIL_USER}>`,
    to:email,
    subject: "Your OTP for Password Reset",
    text: `Hi ${userName}, your OTP is ${otp}. Please use this to reset your password.`,
    html: `
       <div style="
        max-width: full;
        margin: auto;
        padding: 1.5rem;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background:linear-gradient(to bottom right, #0a0f3c, #2d5da9,#0a0f3c);
        border-radius: 0.75rem;
        border: none;
        color: #fff;
      ">
        <h2 style="font-size: 1.5rem; font-weight: 600; color: #fff;">
          Hello, ${userName} 👋
        </h2>
        <p style="margin: 0.75rem 0;">
          We received a request to reset your password. Use the OTP below to proceed:
        </p>
        <div style="
          font-size: 1.875rem;
          font-weight: bold;
          letter-spacing: 2px;
          padding: 0.75rem 1.25rem;
          text-align: center;
          box-shadow:0px 4px 5px black inset;
          background-color: transparent;
          backdrop-filter:blur(3px);
          color:#0a0f3c;
          border-radius: 0.5rem;
          margin: 1rem 0;
        "><code>
          ${otp}
        </code>
        </div>
        <br>
        <p style="margin-bottom: 1rem;text-align:center;">
          If you didn’t request this, feel free to ignore this message.
        </p>
        <hr style="border: none; border-top: 1px solid #0a0f3c; margin: 1.5rem 0;" />
        <p style="font-size: 0.875rem; color: #fff;">
          Never share your OTP or password with anyone. This message was sent to: ${email}
        </p>
      </div>
    `,
  });

  console.log("✅ Email sent:", info.messageId);
};

export default sendMail;
