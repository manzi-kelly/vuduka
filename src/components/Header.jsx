// components/Header.jsx
import React from 'react';
import { FaCar, FaUser, FaSignOutAlt } from 'react-icons/fa';

const Header = ({ 
  onMenuClick, 
  onHistoryClick, 
  onBookingClick, 
  onServicesClick, 
  onTestimonialsClick,
  onLoginClick, 
  hasOrderHistory, 
  currentUser, 
  onLogout 
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-lg z-40">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 text-white p-2 rounded-lg">
            <FaCar className="text-xl" />
          </div>
          <span className="text-xl font-bold text-gray-800">RideShare</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {/* Home - stays on current page */}
          <button className="text-gray-700 hover:text-blue-600 transition duration-200">
            Home
          </button>
          
          {/* Booking - goes to booking form */}
          <button 
            onClick={onBookingClick}
            className="text-gray-700 hover:text-blue-600 transition duration-200"
          >
            Booking
          </button>
          
          {/* Services - goes to services section */}
          <button 
            onClick={onServicesClick}
            className="text-gray-700 hover:text-blue-600 transition duration-200"
          >
            Services
          </button>
          
          {/* Testimonials - goes to "What Our Riders Say" section */}
          <button 
            onClick={onTestimonialsClick}
            className="text-gray-700 hover:text-blue-600 transition duration-200"
          >
            Testimonials
          </button>
          
          {hasOrderHistory && (
            <button 
              onClick={onHistoryClick}
              className="text-gray-700 hover:text-blue-600 transition duration-200"
            >
              Order History
            </button>
          )}

          {currentUser ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {currentUser.fullName}</span>
              <button 
                onClick={onLogout}
                className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition duration-200"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <button 
              onClick={onLoginClick}
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition duration-200"
            >
              <FaUser />
              <span>Login</span>
            </button>
          )}
        </nav>

        {/* Mobile menu button */}
        <button 
          onClick={onMenuClick}
          className="md:hidden bg-blue-600 text-white p-2 rounded-lg"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;