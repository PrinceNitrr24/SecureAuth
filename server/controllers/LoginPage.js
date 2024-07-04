import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const LoginPage = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User doesn't exist in DB!" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password!" });
    }
    const token = jwt.sign({ username: user.username }, process.env.KEY, {
      expiresIn: "1h",
    });
    res.cookie("token", token, { httpOnly: true, maxAge: 360000 });
    return res.status(200).json({ status: true, message: "Login successful!" });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Something went wrong!",
      error: error.message,
    });
  }
};

export default LoginPage;
