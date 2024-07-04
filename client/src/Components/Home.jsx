import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    axios
      .get("http://localhost:3000/auth/logout")
      .then((res) => {
        if (res.data.status) {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-10 text-gray-700 md:p-20">
      <h2 className="text-2xl font-medium mb-8">Home</h2>
      <div className="flex space-x-4">
        <button className="relative group">
          <Link
            to="/dashboard"
            className="px-6 py-3 text-sm uppercase bg-blue-500 text-white rounded-lg"
          >
            Dashboard
          </Link>
          <div className="mirror-effect absolute inset-0 bg-blue-500 opacity-50 transform scale-y-[-1] blur-md group-hover:opacity-75"></div>
        </button>
        <button className="relative group" onClick={handleLogout}>
          <Link
            to="/login"
            className="px-6 py-3 text-sm uppercase bg-red-500 text-white rounded-lg"
          >
            Logout
          </Link>
          <div className="mirror-effect absolute inset-0 bg-red-500 opacity-50 transform scale-y-[-1] blur-md group-hover:opacity-75"></div>
        </button>
      </div>
    </div>
  );
};

export default Home;
