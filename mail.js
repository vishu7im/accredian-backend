const nodemailer = require("nodemailer");

const dotenv = require("dotenv");

dotenv.config();

// const transporter = nodemailer.createTransport({
//   host: process.env.MAIL_HOST,
//   port: 465, // secure
//   secure: true,
//   auth: {
//     user: process.env.SENDER_MAIL,
//     pass: process.env.MAIL_PWD,s
//   },
// });

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SENDER_MAIL,
    pass: process.env.MAIL_PWD,
  },
});

const sendmail = (
  referrer_name,

  referee_name,
  referee_email,
  referrer_code
) => {
  const mailOptions = {
    from: `"Accredian " <${process.env.SENDER_MAIL}>`, // sender address
    to: referee_email,
    subject: "You have been referred to a course",
    html: `<h1>Hi ${referee_name},</h1>
           <p>You are referred by your friend ${referrer_name} for a course.</p>
           <p>Here is your referral link:</p>
           <a href="http://example.com/${referrer_code}">http://example.com/${referrer_code}</a>
           <p>Best regards,<br>Accredian Team</p>
           `,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return error;
    } else {
      // do something useful
      console.log("mail sent");
      return info;
    }
  });
};

module.exports = { sendmail };
