// import { json } from "express";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// dotenv.config();

// export const VerifyUser = async (req, res, next) => {
//   try {
//     const token = req.cookies.token;
//     if (!token) {
//       return res.json({ status: false, message: "no token" });
//     }
//     const decoded = await jwt.verify(token, process.env.KEY);
//     next();
//   } catch (error) {
//     return res.json({ status: false, message: "unauthorized" });
//   }
// };
// const ProtectedRoute = (req, res) => {
//   return res.json({ status: true, message: "authorized" });
// };

// export default ProtectedRoute;
