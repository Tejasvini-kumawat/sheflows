// src/pages/Profile/ProfileLayout.jsx
import React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaBriefcase,
  FaUsers,
  FaPaintBrush,
  FaRegCalendarAlt,
} from "react-icons/fa";

const ProfileLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-orange-100 to-white shadow-lg p-6">
        {/* Home Icon */}
        <div className="mb-8">
          <Link
            to="/"
            className="flex items-center text-orange-700 hover:text-orange-900 transition-colors"
          >
            <FaHome className="mr-3 text-3xl" />
            <span className="text-xl font-bold">Home</span>
          </Link>
        </div>
        {/* Navigation Links */}
        <nav className="space-y-4">
          <Link
            to="/profile"
            className="flex items-center px-4 py-3 rounded-lg text-gray-800 hover:bg-orange-200 hover:text-orange-800 transition-colors"
          >
            <FaUser className="mr-3 text-lg" />
            <span className="font-medium">Profile</span>
          </Link>
          <Link
            to="/profile/work"
            className="flex items-center px-4 py-3 rounded-lg text-gray-800 hover:bg-orange-200 hover:text-orange-800 transition-colors"
          >
            <FaBriefcase className="mr-3 text-lg" />
            <span className="font-medium">Work</span>
          </Link>
          <Link
            to="/profile/family"
            className="flex items-center px-4 py-3 rounded-lg text-gray-800 hover:bg-orange-200 hover:text-orange-800 transition-colors"
          >
            <FaUsers className="mr-3 text-lg" />
            <span className="font-medium">Family</span>
          </Link>
          <Link
            to="/profile/hobbies"
            className="flex items-center px-4 py-3 rounded-lg text-gray-800 hover:bg-orange-200 hover:text-orange-800 transition-colors"
          >
            <FaPaintBrush className="mr-3 text-lg" />
            <span className="font-medium">Hobbies</span>
          </Link>
          <Link
            to="/profile/calendar"
            className="flex items-center px-4 py-3 rounded-lg text-gray-800 hover:bg-orange-200 hover:text-orange-800 transition-colors"
          >
            <FaRegCalendarAlt className="mr-3 text-lg" />
            <span className="font-medium">Unified Calendar</span>
          </Link>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default ProfileLayout;
