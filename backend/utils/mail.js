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


 const sendOtpMail = async(to,otp)=>{
    //to: jisko mail bhjene h
    await transporter.sendMail({
    from:  process.env.EMAIL,
    to, //key value same
    subject: "Reset your Password",
    text: "Hello world?", // Plain-text version of the message
    html: `<b>Your otp is </b>${otp}`, // HTML version of the message
  });
}

module.exports = {sendOtpMail}