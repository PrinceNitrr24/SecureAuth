import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email };
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/forgot-password",
        data
      );
      console.log(response); // Log the response for debugging
      if (response.status === 200 && response.data.message === "Email sent!") {
        toast.success("Check your email for reset password link!");
        console.log("Toast success should be shown");
        // setTimeout(() => navigate("/login"), 2000); // Delay navigation
      } else {
        toast.error(
          response.data.message || "Failed to send reset password email."
        );
      }
    } catch (err) {
      console.log(err);
      toast.error("Please check your email!");
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <Toaster />
      <div className="w-full max-w-md overflow-hidden rounded-lg bg-white shadow-lg p-8">
        <h1 className="text-3xl font-black text-slate-700 text-center">
          Forgot Password
        </h1>
        <form className="mt-8" onSubmit={handleSubmit}>
          <div className="relative mt-4 w-full">
            <label htmlFor="email" className="block text-sm text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-lg bg-blue-600 py-2 text-white shadow-lg hover:bg-blue-400"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
