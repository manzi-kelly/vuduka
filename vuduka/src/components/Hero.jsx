import React from 'react'

export default function Hero() {
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
        Get a ride to your destination <span className="text-indigo-600">quickly</span> and{' '}
        <span className="text-indigo-600">safely</span>
      </h1>
      <p className="mt-4 text-gray-600">
        Order a ride in seconds — choose your pickup and destination, select a ride type, and we'll
        simulate an arrival. No backend required.
      </p>

      <div className="mt-6 flex gap-3 items-center">
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-sm hover:bg-indigo-500">
          Order Ride
        </button>
        <a href="#contact" className="text-sm text-gray-500 hover:text-indigo-600">
          Need help? Contact us
        </a>
      </div>
    </div>
  )
}