import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { token } = useParams(); // Corrected useParams

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { password };
    try {
      const response = await axios.post(
        `http://localhost:3000/auth/reset-password/${token}`, // Corrected URL concatenation
        data
      );
      console.log(response); // Log the response for debugging
      if (
        response.status === 200 &&
        response.data.message === "Updated Password Successfully!"
      ) {
        toast.success("Your password has been reset!");
        setTimeout(() => navigate("/login"), 2000); // Delay navigation
        console.log(response.data);
      } else {
        toast.error(response.data.message || "Failed to reset password.");
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <Toaster />
      <div className="w-full max-w-md overflow-hidden rounded-lg bg-white shadow-lg p-8">
        <h1 className="text-3xl font-black text-slate-700 text-center">
          Reset Password
        </h1>
        <form className="mt-8" onSubmit={handleSubmit}>
          <div className="relative mt-4 w-full">
            <label htmlFor="password" className="block text-sm text-gray-700">
              New Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-lg bg-blue-600 py-2 text-white shadow-lg hover:bg-blue-400"
          >
            Reset
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
