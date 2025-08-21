import React from 'react';
import { FaCar, FaStar, FaUser } from 'react-icons/fa';

function ServicesSection() {
  return (
    <section id="services" className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Services</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">Choose from our range of premium ride options tailored to your needs</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-gray-200 rounded-lg p-8 hover:border-blue-500 transition duration-300">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-lg bg-blue-100 flex items-center justify-center mr-4">
                  <FaCar className="text-blue-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Economy Rides</h3>
              </div>
              <p className="text-gray-600 mb-6">Affordable, reliable rides for everyday travel</p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <span>Lowest prices</span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <span>Quick pickups</span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <span>Everyday cars</span>
                </li>
              </ul>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-8 hover:border-yellow-500 transition duration-300">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-lg bg-yellow-100 flex items-center justify-center mr-4">
                  <FaStar className="text-yellow-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Premium Rides</h3>
              </div>
              <p className="text-gray-600 mb-6">Luxury vehicles with professional drivers</p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <span>High-end vehicles</span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <span>Top-rated drivers</span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <span>Comfort priority</span>
                </li>
              </ul>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-8 hover:border-green-500 transition duration-300">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-lg bg-green-100 flex items-center justify-center mr-4">
                  <FaUser className="text-green-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Group Rides</h3>
              </div>
              <p className="text-gray-600 mb-6">Spacious vehicles for groups and luggage</p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <span>SUVs and vans</span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <span>Extra luggage space</span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <span>Group discounts</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
  );
}

export default ServicesSection;