'use client'
import React, { FC, useState } from "react";

const Sidebar:FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        className="md:hidden p-0 m-2  text-blue-400 font-bold absolute top-0 left-0 z-50 cursor-pointer"
        onClick={() => setIsOpen(true)}
        aria-label="Open sidebar"
      >
        ☰
      </button>

      {/* Overlay (mobile only) */}
      <div
        className={`fixed inset-0  bg-transparent z-40 transition-opacity ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } md:hidden`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-50 bg-blue-50 shadow-lg z-50
          transform transition-transform duration-300 ease-in-out border-r-2 border-gray-200
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static md:shadow-none
        `}
      >
        <div className="flex justify-between items-center p-4 border-b md:hidden">
          <h2 className="text-xl font-bold">Menu</h2>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close sidebar"
            className="text-gray-600 hover:text-gray-900"
          >
            ✕
          </button>
        </div>

        {/* Sidebar content */}
        <nav className="p-4">
          <ul className="space-y-4">
            <li>
              <a href="#" className="block text-gray-700 hover:text-blue-600">
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="block text-gray-700 hover:text-blue-600">
                Profile
              </a>
            </li>
            <li>
              <a href="#" className="block text-gray-700 hover:text-blue-600">
                Settings
              </a>
            </li>
            <li>
              <a href="#" className="block text-gray-700 hover:text-blue-600">
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
