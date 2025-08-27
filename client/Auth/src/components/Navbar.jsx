import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src={assets.logo}
            alt="Logo"
            className="w-28 sm:w-32 cursor-pointer"
          />
        </div>
        {/* Login Button */}
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 border border-gray-500
                rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100
              transition-all"
        >
          Login <img src={assets.arrow_icon} alt="" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
