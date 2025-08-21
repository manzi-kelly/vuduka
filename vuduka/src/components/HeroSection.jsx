import React from 'react';
import { FaCar, FaClock } from 'react-icons/fa';

function HeroSection({ onBookNowClick }) {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between mb-16">
      <div className="md:w-1/2 mb-10 md:mb-0">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
          Ride with <span className="text-blue-600">confidence</span> and comfort
        </h1>
        <p className="mt-4 text-gray-600 text-lg max-w-lg">
          Book your ride in seconds. Arrive in style. Vuduka connects you with reliable drivers at affordable prices.
        </p>
        <div className="mt-8 flex space-x-4">
          <button 
            onClick={onBookNowClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition duration-300"
          >
            Book Now
          </button>
          <button className="bg-white hover:bg-gray-100 text-gray-800 px-6 py-3 rounded-lg font-medium border border-gray-300 transition duration-300">
            Learn More
          </button>
        </div>
      </div>
      <div className="md:w-1/2 relative">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl w-full h-96 flex items-center justify-center">
          <div className="text-white text-center p-8">
            <FaCar className="text-white text-6xl mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Instant Ride Booking</h2>
            <p className="opacity-90">Your driver arrives in minutes</p>
          </div>
        </div>
        <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg border border-gray-200 w-64">
          <div className="flex items-center">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mr-3">
              <FaClock className="text-blue-600" />
            </div>
            <div>
              <p className="font-medium">Average wait time</p>
              <p className="text-gray-600 text-sm">Under 5 minutes</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;