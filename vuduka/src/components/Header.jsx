import React from 'react';
import { FaCar, FaShoppingCart, FaBars } from 'react-icons/fa';

function Header({ cartCount, onCartClick, onMenuClick }) {
  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button 
              onClick={onMenuClick}
              className="md:hidden text-gray-600 mr-2"
            >
              <FaBars className="text-xl" />
            </button>
            <div className="flex items-center">
              <div className="bg-blue-600 w-10 h-10 rounded-lg flex items-center justify-center">
                <FaCar className="text-white text-xl" />
              </div>
              <h1 className="ml-3 text-xl font-bold text-gray-800">Vuduka</h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button 
                onClick={onCartClick}
                className="text-gray-600 hover:text-blue-600 relative"
              >
                  <FaCar className="text-xl" />
  {cartCount > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
      {cartCount}
    </span>
                )}
              </button>
            </div>
          </div>
        </div>

        <nav className="hidden md:flex space-x-8 py-2 border-t border-gray-100">
          <a href="#book" className="text-blue-600 font-medium pb-2 border-b-2 border-blue-600">Book a Ride</a>
          <a href="#services" className="text-gray-600 hover:text-blue-600 transition">Services</a>
          <a href="#why" className="text-gray-600 hover:text-blue-600 transition">Why Us</a>
          <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition">Testimonials</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;