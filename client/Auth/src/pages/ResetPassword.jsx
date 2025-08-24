import React, { useState } from "react";
import { assets } from "../assets/assets";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password reset logic here
    console.log("Reset link sent to:", email);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-400 relative overflow-hidden font-[Outfit,sans-serif]">
      {/* Logo */}
      <img
        src={assets.logo}
        alt="Logo"
        className="absolute left-6 top-6 w-28 sm:w-32 cursor-pointer"
      />

      {/* Auth Card */}
      <div className="relative z-10 bg-white p-10 rounded-2xl shadow-2xl w-[380px] sm:w-[420px]">
        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
          Forgot Password
        </h2>
        <p className="text-gray-500 text-center mb-8">
          Enter your email to receive a password reset link
        </p>

        {/* Form */}
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col text-left">
            <label className="text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Send Reset Link
          </button>
        </form>

        {/* Back to Login */}
        <p className="text-sm text-gray-600 mt-6 text-center">
          Remembered your password?{" "}
          <span
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
            onClick={() => (window.location.href = "/login")} // Replace with your login route
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
