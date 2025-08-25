import React, { useState } from "react";
import { assets } from "../assets/assets";
import signupUser from "../components/context/ResgisterContext";
const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await signupUser(formData);
      setSuccess(response.message || "Account created successfully!");
      console.log("Signup Response:", response);
    } catch (err) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
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
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
          Create Account
        </h2>
        <p className="text-gray-500 text-center mb-8">
          Join us and start your journey
        </p>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col text-left">
            <label className="text-gray-700 font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="flex flex-col text-left">
            <label className="text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="flex flex-col text-left">
            <label className="text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Processing..." : "Sign Up"}
          </button>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
        </form>

        <p className="text-sm text-gray-600 mt-6 text-center">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
          >
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
