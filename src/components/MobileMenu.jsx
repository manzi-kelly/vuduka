// components/MobileMenu.jsx
import React from 'react';
import { FaUser, FaSignOutAlt, FaTimes } from 'react-icons/fa';

const MobileMenu = ({ isOpen, onClose, onLoginClick, currentUser, onLogout }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden">
      <div className="fixed right-0 top-0 h-full w-64 bg-white shadow-xl">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gray-800">Menu</span>
            <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
              <FaTimes />
            </button>
          </div>
        </div>
        
        <div className="p-4 space-y-4">
          <button className="block w-full text-left text-gray-700 hover:text-blue-600 py-2">
            Home
          </button>
          <button className="block w-full text-left text-gray-700 hover:text-blue-600 py-2">
            About
          </button>
          <button className="block w-full text-left text-gray-700 hover:text-blue-600 py-2">
            Services
          </button>
          
          {currentUser ? (
            <>
              <div className="border-t pt-4">
                <p className="text-gray-600">Welcome, {currentUser.fullName}</p>
              </div>
              <button 
                onClick={() => { onLogout(); onClose(); }}
                className="flex items-center space-x-2 w-full text-left text-gray-700 hover:text-red-600 py-2"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <button 
              onClick={() => { onLoginClick(); onClose(); }}
              className="flex items-center space-x-2 w-full text-left text-gray-700 hover:text-blue-600 py-2"
            >
              <FaUser />
              <span>Login</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;