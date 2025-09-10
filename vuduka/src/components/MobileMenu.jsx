import React from 'react';
import { FaTimes } from 'react-icons/fa';

const MobileMenu = ({ isOpen, onClose }) => {
  return (
    <div className={`fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Menu</h2>
          <button onClick={onClose} className="p-2">
            <FaTimes className="text-gray-600" />
          </button>
        </div>
        <nav className="p-4 space-y-4">
          <a href="#home" className="block text-gray-700 hover:text-blue-600 py-2">Home</a>
          <a href="#services" className="block text-gray-700 hover:text-blue-600 py-2">Services</a>
          <a href="#about" className="block text-gray-700 hover:text-blue-600 py-2">About</a>
          <a href="#contact" className="block text-gray-700 hover:text-blue-600 py-2">Contact</a>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;