import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { FaCar } from 'react-icons/fa';

function MobileMenu({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden">
      <div className="fixed inset-y-0 left-0 w-64 bg-white z-50 shadow-lg">
        <div className="flex justify-end p-4">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes className="text-xl" />
          </button>
        </div>
        <nav className="flex flex-col space-y-4 p-6">
          <a href="#book" className="text-blue-600 font-medium" onClick={onClose}>Book a Ride</a>
          <a href="#services" className="text-gray-600 hover:text-blue-600 transition" onClick={onClose}>Services</a>
          <a href="#why" className="text-gray-600 hover:text-blue-600 transition" onClick={onClose}>Why Us</a>
          <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition" onClick={onClose}>Testimonials</a>
        </nav>
      </div>
    </div>
  );
}

export default MobileMenu;