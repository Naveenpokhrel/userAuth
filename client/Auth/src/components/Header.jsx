import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
   <header className="flex flex-col items-center text-center px-6 py-20 mt-12 bg-gradient-to-b from-blue-50 to-white">
  {/* Profile / Logo Image */}
  <img
    src={assets.header_img}
    alt="Header"
    className="w-36 h-36 rounded-full mb-6 shadow-lg border-4 border-blue-100"
  />

  {/* Title */}
  <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 flex items-center gap-2">
    Hey Developer
    <img
      className="w-8 h-8 animate-waving-hand"
      src={assets.hand_wave}
      alt="Wave"
    />
  </h1>

  {/* Subtitle */}
  <h2 className="text-lg sm:text-xl text-gray-600 mt-2">
    Welcome to our app
  </h2>

  {/* Description */}
  <p className="text-gray-500 max-w-xl mt-4">
    Let’s start with a quick product tour and we’ll have you up and running in
    no time!
  </p>

  {/* CTA Button */}
  <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-700 transition">
    Get Started
  </button>
</header>

  );
};

export default Header;
