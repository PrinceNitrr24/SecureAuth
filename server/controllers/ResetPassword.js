import UserModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";

const ResetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.KEY);
    const id = decoded.id;
    const hashedPassword = await bcrypt.hash(password, 10);

    await UserModel.findByIdAndUpdate(
      { _id: id },
      { password: hashedPassword }
    );

    return res.status(200).json({
      status: true,
      message: "Updated Password Successfully!",
    });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(400).json({
        status: false,
        message: "Invalid token!",
      });
    }
    console.error("Error resetting password:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

export default ResetPassword;
