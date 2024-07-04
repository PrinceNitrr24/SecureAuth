import express from "express";
import dotenv from "dotenv";
import ConnectDB from "./config/ConnectDb.js";
import router from "./routes/User.js";
import cors from "cors";
import cookieParser from "cookie-parser";
// import jwt from "jsonwebtoken";

// Load environment variables from .env file
dotenv.config();

// Create an Express app
const app = express();

// Middleware to verify user authentication
// export const VerifyUser = async (req, res, next) => {
//   try {
//     const token = req.cookies.token;
//     if (!token) {
//       return res.json({ status: false, message: "no token" });
//     }
//     await jwt.verify(token, process.env.KEY);

//     next();
//   } catch (error) {
//     console.error("Token verification error:", error);
//     return res.status(401).json({ status: false, message: "unauthorized" });
//   }
// };

// Middleware to parse JSON bodies
app.use(
  cors({
    origin: ["http://localhost:5173"], // Adjust origin as per your setup
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// API endpoint for authentication-related routes
app.use("/auth", router); // Applying VerifyUser middleware here

// Define a basic route
app.get("/", (req, res) => {
  res.send("Home Page");
});

// Connect to MongoDB
ConnectDB(); // Assuming this function sets up MongoDB connection

// Define the port
const port = process.env.PORT || 5000;

// Start the server
const server = app.listen(port, () => {
  console.log(`Server is listening on PORT ${port}`);
});

// Event handler for server errors
server.on("error", (error) => {
  console.error("Server error:", error);
});
