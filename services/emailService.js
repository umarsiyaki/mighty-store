// ../services/emailService.js
const nodemailer = require('nodemailer');

exports.sendEmail = async ({ to, subject, body }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // e.g., Gmail
      auth: {
        user: process.env.EMAIL_USER, // Add your email here
        pass: process.env.EMAIL_PASS, // Add your password here
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text: body,
    };

    const info = await transporter.sendMail(mailOptions);
    return { success: true, info };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
};