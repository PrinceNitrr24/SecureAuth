import UserModel from "../models/UserModel.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const ForgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const VerifyEmail = await UserModel.findOne({ email: email });
    if (!VerifyEmail) {
      return res
        .status(400)
        .json({ message: "Email doesn't exist in the DB!" });
    }
    const token = jwt.sign({ id: VerifyEmail._id }, process.env.KEY, {
      expiresIn: "5m",
    });

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    var mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Password!",
      text: `Please click the following link to reset your password: http://localhost:5173/forgot-password/${token}`, // Optional text fallback
      html: `
        <div style="font-family: Arial, sans-serif; color: #000; background: linear-gradient(to right, #9959EB, #F58C5A); padding: 20px;">
          <p style="color: #000;">Welcome to <strong>&lt;PrinceDevChat❤/&gt;</strong></p>
          <p style="color: #000;">We received a request to reset your password. Click the link below to choose a new one:</p>
          <a href="http://localhost:5173/forgot-password/${token}" style="display: inline-block; margin: 10px 0; padding: 10px 20px; color: #fff; background-color: #4CAF50; text-decoration: none; border-radius: 5px;">Reset Password</a>
          <p style="color: #000;">If you did not request a password reset, please ignore this email.</p>
          <p style="color: #000;">Thank you,<br>PrinceDevChat</p>
          <hr style="border: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #000;">Here is an image:</p>
          <img src="https://cdn.pixabay.com/photo/2018/09/19/18/31/keyboard-3689228_1280.jpg" alt="Example Image" style="width: 100%; max-width: 600px; height: auto; display: block; margin: 0 auto;"/>
          <hr style="border: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #000;">Here is a video:</p>
          <div style="text-align: center;">
            <video width="600" autoplay loop muted style="width: 100%; max-width: 600px; height: auto;">
              <source src="https://cdn.pixabay.com/video/2020/04/08/35427-407130886_large.mp4" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </div>
          <p style="color: #000;">If the video doesn't play, <a href="https://cdn.pixabay.com/video/2020/04/08/35427-407130886_large.mp4" target="_blank" style="color: #4CAF50;">click here to watch it</a>.</p>
        </div>
      `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Error sending email:", error);
        return res.status(500).json({ message: "Error sending email!" });
      } else {
        return res.status(200).json({ message: "Email sent!" });
      }
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default ForgotPassword;
