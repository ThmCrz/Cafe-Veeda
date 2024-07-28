import transporter from '../configs/nodemailer.js';

const sendAuthCode = (email, authCodeRef, Mode) => {
  console.log("Sending email to:", email);  // Debug statement to check email

  const RegisterMailOptions = {
    from: "Cafe-Veeda no-reply <no-reply@cafe-veeda-website.onrender.com>",
    to: email,
    subject: "Welcome! Your Registration Authentication Code",
    text: `Hello,\n\n
    Welcome to Cafe Veeda! To complete your registration, please use the following authentication code: \n\n 
    ${authCodeRef}\n\n
    If you did not request this registration, you can safely ignore this message.\n\n
    Best regards,\n
    The Cafe Veeda Team`,
};

  const ForgotPassMailOptions = {
    from: "Cafe-Veeda no-reply <no-reply@cafe-veeda-website.onrender.com>",
    to: email,
    subject: "Password Reset Code",
    text: `Hello,\n\n
    We received a request to reset your password. \n
    Please use the following code to proceed with resetting your password: \n\n
    ${authCodeRef} \n\n
    If you did not request this change, you can ignore this email.\n\n
    Best regards,\n
    The Cafe Veeda Team`,
};


  if (Mode === "register") {
    return new Promise((resolve, reject) => {
      transporter.sendMail(RegisterMailOptions, (err, info) => {
        if (err) {
          console.error("Error sending email:", err);
          return reject(err);
        }
        console.log("Email sent:", info.response);
        resolve(info);
      });
    });
  }else if (Mode === "forgotPass"){
    return new Promise((resolve, reject) => {
      transporter.sendMail(ForgotPassMailOptions, (err, info) => {
        if (err) {
          console.error("Error sending email:", err);
          return reject(err);
        }
        console.log("Email sent:", info.response);
        resolve(info);
      });
    });
  }else{
    return Error("Invalid mode: " + Mode);
  }
  
};

export default sendAuthCode;
