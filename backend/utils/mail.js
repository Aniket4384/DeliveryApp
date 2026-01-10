const nodemailer = require("nodemailer");
require("dotenv").config()
const transporter = nodemailer.createTransport({
  service : "Gmail",
  port: 465,
  secure: true, // Use true for port 465, false for port 587
  auth: {
    user: process.env.EMAIL,  // jiss email sa mail bhejoga vo email
    pass: process.env.APP_PASSWORD,    // and email ka App password
  },
});


 const sendOtpMail = async (to, { name, link }) => {
  await transporter.sendMail({
    from: process.env.EMAIL,
    to,
    subject: "Reset your password",
    html: `
      <div style="font-family: sans-serif; line-height: 1.5;">
        <p>Hello <b>${name}</b>,</p>
        <p>You requested to reset your password. Click the link below:</p>
        <p>
          <a href="${link}" target="_blank" rel="noopener noreferrer" style="color: #2ECC71; font-weight: bold;">
            Reset Password
          </a>
        </p>
        <p>This link will expire in 10 minutes.</p>
        <p>If you did not request this, ignore this email.</p>
      </div>
    `,
  });
};

module.exports = {sendOtpMail}