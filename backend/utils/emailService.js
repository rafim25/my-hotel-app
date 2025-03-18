const nodemailer = require('nodemailer');
const config = require('../config/config');
const { getReportEmailTemplate } = require('./emailTemplates');

const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  secure: config.email.port === 465,
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
});

const sendEmail = async (options) => {
  const mailOptions = {
    from: config.email.from,
    to: options.to,
    subject: options.subject,
    html: options.html,
  };

  await transporter.sendMail(mailOptions);
};

exports.sendWelcomeEmail = async (user) => {
  await sendEmail({
    to: user.email,
    subject: 'Welcome to Unnata Forest View',
    html: `
      <h1>Welcome to Unnata Forest View!</h1>
      <p>Dear ${user.name},</p>
      <p>Thank you for registering with us. We're excited to have you as our guest!</p>
      <p>Start exploring our luxurious rooms and make your first booking today.</p>
      <p>Best regards,<br>The Unnata Forest View Team</p>
    `,
  });
};

exports.sendBookingConfirmation = async (booking, user) => {
  await sendEmail({
    to: user.email,
    subject: 'Booking Confirmation - Unnata Forest View',
    html: `
      <h1>Booking Confirmation</h1>
      <p>Dear ${user.name},</p>
      <p>Your booking has been confirmed!</p>
      <p>Booking Details:</p>
      <ul>
        <li>Booking Reference: ${booking.booking_reference}</li>
        <li>Check-in: ${booking.check_in}</li>
        <li>Check-out: ${booking.check_out}</li>
        <li>Room: ${booking.room_name}</li>
        <li>Total Amount: $${booking.total_amount}</li>
      </ul>
      <p>We look forward to hosting you!</p>
      <p>Best regards,<br>The Unnata Forest View Team</p>
    `,
  });
};

exports.sendPasswordReset = async (user, resetToken) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

  await sendEmail({
    to: user.email,
    subject: 'Password Reset - Unnata Forest View',
    html: `
      <h1>Password Reset Request</h1>
      <p>Dear ${user.name},</p>
      <p>You requested to reset your password. Click the link below to reset it:</p>
      <p><a href="${resetUrl}">Reset Password</a></p>
      <p>If you didn't request this, please ignore this email.</p>
      <p>Best regards,<br>The Unnata Forest View Team</p>
    `,
  });
};

exports.sendReportEmail = async (email, subject, reportData, reportType) => {
  const template = getReportEmailTemplate(reportType, reportData);
  
  await sendEmail({
    to: email,
    subject: subject,
    html: template,
    attachments: [
      {
        filename: `${reportType}_report.csv`,
        content: reportData
      }
    ]
  });
}; 