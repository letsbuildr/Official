// const nodemailer = require('nodemailer');
const brevo = require('@getbrevo/brevo');
const catchAsync = require('./catchAsync');

const brevoClient = new brevo.TransactionalEmailsApi();
// brevoClient.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;
brevoClient.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BOMCEL_BREVO_API_KEY
);

const sendEmail = catchAsync(async (options) => {
  try {
    const emailData = {
      sender: {
        name: 'Bomcel Digital Services',
        email: process.env.EMAIL_FROM,
      },
      to: [{ email: options.email }],
      subject: options.subject,
      textContent: options.message,
    };

    await brevoClient.sendTransacEmail(emailData);
  } catch (err) {
    console.error('Error sending email', err);
  }
});

module.exports = sendEmail;
