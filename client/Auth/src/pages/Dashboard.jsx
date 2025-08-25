import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  // Fetch user info if needed
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/user/me", {
          method: "GET",
          credentials: "include", // send cookies
        });
        const data = await res.json();
        if (res.ok) setUser(data.user);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Header */}
      <Header />

      {/* Main Dashboard Content */}
      <main className="flex-1 p-6 md:p-10 w-full max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome {user ? user.name : "User"}!
        </h1>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Profile</h2>
            <p className="text-gray-500">
              View and edit your personal information.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Orders</h2>
            <p className="text-gray-500">Check your recent orders and status.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Settings</h2>
            <p className="text-gray-500">Update preferences and account settings.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 text-center text-gray-500 bg-white mt-auto shadow-inner">
        © 2025 YourApp. All rights reserved.
      </footer>
    </div>
  );
};

export default Dashboard;
