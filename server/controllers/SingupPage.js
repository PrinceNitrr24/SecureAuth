import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
const SignupPage = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "User already existed!" });
  }
  const hashpassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({
    username,
    email,
    password: hashpassword,
  });
  await newUser.save();
  return res.status(201).json({ status: true, message: "record registerd!" });
};

export default SignupPage;
