import React from 'react';
import { FaBars, FaUser, FaHistory } from 'react-icons/fa';

const Header = ({ onMenuClick, onHistoryClick, hasOrderHistory, onAboutClick }) => {
  // Function to handle navigation link clicks
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    
    if (targetId === 'about') {
      // If it's the About link, call the onAboutClick function
      onAboutClick();
      return;
    }
    
    // For other links, scroll to the target section
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <button onClick={onMenuClick} className="mr-4 md:hidden">
            <FaBars className="text-xl text-gray-700" />
          </button>
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
              <FaUser className="text-white text-lg" />
            </div>
            <h1 className="text-xl font-bold text-gray-800">RideShare</h1>
          </div>
        </div>

        <nav className="hidden md:flex space-x-8">
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, 'home')}
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Home
          </a>
          <a 
            href="#services" 
            onClick={(e) => handleNavClick(e, 'services')}
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Services
          </a>
          <a 
            href="#about" 
            onClick={(e) => handleNavClick(e, 'about')}
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            About
          </a>
          <a 
            href="#contact" 
            onClick={(e) => handleNavClick(e, 'contact')}
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Contact
          </a>
        </nav>

        <div className="flex space-x-4">
          {hasOrderHistory && (
            <button 
              onClick={onHistoryClick} 
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              <FaHistory className="text-xl text-gray-700" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;