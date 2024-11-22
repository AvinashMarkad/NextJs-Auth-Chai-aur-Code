import nodemailer from "nodemailer";

export const sendMail = async (email: any, emailType: any, userId: any) => {
  try {
    //TODO: Implement the logic to send email

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: "maddison53@ethereal.email",
        pass: "jn7jnAPss4f63QBp6D",
      },
    });

    const mailOption = await transporter.sendMail({
      from: "markadavi3719@gmail.com", // sender address
      to: email, // list of receivers
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your Passowrd", // Subject line
      html: "<b>Hello world?</b>", // html body
    });

    const mailResponse = await transporter.sendMail(mailOption);
    console.log("Message sent: %s", mailResponse.messageId);
    //return mailResponse;
  } catch (error) {
    console.log("Error sending email");
    console.log(error);
  }
};
