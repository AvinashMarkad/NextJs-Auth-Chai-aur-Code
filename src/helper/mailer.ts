import { verify } from "crypto";
import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bccryptjs from "bcryptjs";

export const sendMail = async (email: any, emailType: any, userId: any) => {
  try {
    //TODO: Implement the logic to send email
    const hashedToken = await bccryptjs.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verificationToken: hashedToken,
        verificationTokenExpires: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        verificationTokenExpire: Date.now() + 3600000,
      });
    }
    // .............
    // Looking to send emails in production? Check out our Email API/SMTP product!
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "51e5512658a48d",
        pass: "09e3121955d535",
      },
    });
    // .................
    const mailOption = await transport.sendMail({
      from: "markadavi3719@gmail.com", // sender address
      to: email, // list of receivers
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your Passowrd", // Subject line
      html: "<p>click <a href='${process.env.DOMAIN}/verifyemail?token=${hashedToken}'>here<a/>to {emailType === 'VERIFY' ? 'verify your email':'reset your password'}</p>", // html body
    });

    const mailResponse = await transport.sendMail(mailOption);
    console.log("Message sent: %s", mailResponse.messageId);
    //return mailResponse;
  } catch (error) {
    console.log("Error sending email");
    console.log(error);
  }
};
