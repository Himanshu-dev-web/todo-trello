"use client";
import React from "react";
import Link from "next/link";
import axios from "axios";
import {
  FaHome,
  FaClipboardList,
  FaCog,
  FaUsers,
  FaChartBar,
  FaSun,
  FaMoon,
  FaPlus,
  FaDownload,
} from "react-icons/fa";
import { IoPersonCircleOutline } from "react-icons/io5";
import { BsPlusCircleFill } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";

const Sidebar = () => {
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
    } catch (error: any) {
     console.error("message ", error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-white shadow-lg w-72">
      {/* User Info and Logout */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <span className="text-gray-900 text-3xl">
            <IoPersonCircleOutline />
          </span>
          <span className="ml-2  text-black font-bold">Joe Gardner</span>
        </div>
        <button
          onClick={logout}
          className="px-2 py-1 text-bold  text-gray-600  border-gray-300 rounded hover:bg-gray-200 bg-gray-300 "
        >
          Logout
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 mb-8 space-y-2">
        <Link
          href="/"
          className="flex items-center p-2 space-x-3 text-lg font-semibold text-gray-900 rounded hover:bg-gray-100"
        >
          <FaHome />
          <span>Home</span>
        </Link>
        <Link
          href="/boards"
          className="flex items-center p-2 space-x-3 text-lg font-semibold text-gray-900 rounded hover:bg-gray-100"
        >
          <FaClipboardList />
          <span>Boards</span>
        </Link>
        <Link
          href="/settings"
          className="flex items-center p-2 space-x-3 text-lg font-semibold text-gray-900 rounded hover:bg-gray-100"
        >
          <FaCog />
          <span>Settings</span>
        </Link>
        <Link
          href="/teams"
          className="flex items-center p-2 space-x-3 text-lg font-semibold text-gray-900 rounded hover:bg-gray-100"
        >
          <FaUsers />
          <span>Teams</span>
        </Link>
        <Link
          href="/analytics"
          className="flex items-center p-2 space-x-3 text-lg font-semibold text-gray-900 rounded hover:bg-gray-100"
        >
          <FaChartBar />
          <span>Analytics</span>
        </Link>
        <button className="flex items-center justify-center w-full p-3 text-lg font-bold text-white bg-purple-800 rounded shadow hover:bg-purple-700">
          Create new task
          <BsPlusCircleFill className="mr-2 mx-2" />
        </button>
      </nav>

      {/* Create New Task Button */}
      {/* <div className="mb-8">
               
            </div> */}

      {/* Download App Section */}
      <div className="mt-auto">
        <div className="p-4 text-center bg-gray-100 rounded shadow">
          <FaDownload className="mb-2 text-gray-600" />
          <p className="text-sm font-semibold text-gray-700">
            Download the app
          </p>
          <p className="text-xs text-gray-500">Get the full experience</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
