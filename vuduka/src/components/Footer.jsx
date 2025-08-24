import React from 'react'
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600">© {new Date().getFullYear()} Vuduka. All rights reserved.</div>
        <div className="flex items-center gap-3 text-gray-600">
          <a href="#" aria-label="facebook" className="hover:text-indigo-600">
            <FaFacebook />
          </a>
          <a href="#" aria-label="twitter" className="hover:text-indigo-600">
            <FaTwitter />
          </a>
          <a href="#" aria-label="instagram" className="hover:text-indigo-600">
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  )
}