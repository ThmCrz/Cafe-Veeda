import transporter from '../configs/nodemailer.js';

const sendAuthCode = (email, authCodeRef) => {
  console.log("Sending email to:", email);  // Debug statement to check email

  const mailOptions = {
    from: "no-reply <no-reply@cafe-veeda-website.onrender.com>",
    to: email,
    subject: "Authentication Code for Registration",
    text: `Hey!, seems you are a new user. Here is your Authentication Code: ${authCodeRef}. If you did not request this, just ignore it.`,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending email:", err);
        return reject(err);
      }
      console.log("Email sent:", info.response);
      resolve(info);
    });
  });
};

export default sendAuthCode;
