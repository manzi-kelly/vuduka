import React from 'react'
import { FaCarSide, FaHome, FaInfoCircle, FaPhoneAlt } from 'react-icons/fa'

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FaCarSide className="text-2xl text-indigo-600" />
          <span className="text-xl font-semibold text-gray-800">Vuduka</span>
        </div>

        <nav className="flex items-center gap-6 text-gray-600">
          <a href="#home" className="flex items-center gap-2 hover:text-indigo-600">
            <FaHome /> <span className="hidden sm:inline">Home</span>
          </a>
          <a href="#about" className="flex items-center gap-2 hover:text-indigo-600">
            <FaInfoCircle /> <span className="hidden sm:inline">About</span>
          </a>
          <a href="#contact" className="flex items-center gap-2 hover:text-indigo-600">
            <FaPhoneAlt /> <span className="hidden sm:inline">Contact</span>
          </a>
        </nav>
      </div>
    </header>
  )
}