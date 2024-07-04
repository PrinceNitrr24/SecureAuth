import express from "express";
import SignupPage from "../controllers/SingupPage.js";
import LoginPage from "../controllers/LoginPage.js";
import ForgotPassword from "../controllers/ForgotPassword.js";
import ResetPassword from "../controllers/ResetPassword.js";
const router = express.Router();
// import ProtectedRoute from "../controllers/ProtectedRoute.js";
// import { VerifyUser } from "../server.js";
// import Logout from "../controllers/Logout.js";

router.post("/signup", SignupPage);
router.post("/login", LoginPage);
router.post("/forgot-password", ForgotPassword);
router.post("/reset-password/:token", ResetPassword);
// router.get("/verify", VerifyUser, ProtectedRoute);
// router.get("/logout", Logout);

export default router;
