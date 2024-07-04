import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { email, password };
    axios
      .post("http://localhost:3000/auth/login", data)
      .then((response) => {
        if (response.data.status) {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <div className="w-full max-w-md overflow-hidden rounded-lg bg-white shadow-lg p-8">
        <h1 className="text-3xl text-center font-black text-slate-700">
          Login
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
          <div className="relative mt-4 w-full">
            <label htmlFor="password" className="block text-sm text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="mt-6 w-full rounded-lg bg-blue-600 py-2 text-white shadow-lg hover:bg-blue-400"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link
            className="text-red-500 font-bold cursor-pointer"
            to="/forgot-password"
          >
            Forgot Password?
          </Link>
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-bold text-blue-600 no-underline hover:text-blue-400"
            >
              Sing up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
