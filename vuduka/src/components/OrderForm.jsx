import React, { useState } from 'react'
import { FaMapMarkerAlt, FaRoute, FaCarSide, FaUser } from 'react-icons/fa'

export default function OrderForm({ onOrder }) {
  // local form state as requested (useState)
  const [passengerName, setPassengerName] = useState('')
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [rideType, setRideType] = useState('economy')

  function estimatePrice(type, from, to) {
    const base = type === 'economy' ? 2 : type === 'premium' ? 4 : 6
    const roughDistanceFactor = Math.max(1, Math.abs(from.length - to.length) / 5)
    const price = (base * roughDistanceFactor * 2).toFixed(2)
    return `~ $${price}`
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!pickup.trim() || !destination.trim()) {
      alert('Please enter both pickup and destination.')
      return
    }

    const order = {
      id: Math.random().toString(36).slice(2, 9).toUpperCase(),
      name: passengerName || 'Guest',
      pickup: pickup.trim(),
      destination: destination.trim(),
      rideType,
      etaMinutes: Math.floor(Math.random() * 10) + 3,
      priceEstimate: estimatePrice(rideType, pickup, destination),
      time: new Date().toLocaleString(),
    }

    // pass order up to parent
    onOrder(order)
  }

  function handleReset() {
    setPassengerName('')
    setPickup('')
    setDestination('')
    setRideType('economy')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col">
        <label className="text-sm text-gray-700 mb-1">Your name (optional)</label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
            <FaUser />
          </span>
          <input
            value={passengerName}
            onChange={(e) => setPassengerName(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
            placeholder="e.g., Jane Doe"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label className="text-sm text-gray-700 mb-1">Pickup location</label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
            <FaMapMarkerAlt />
          </span>
          <input
            required
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
            placeholder="Enter pickup location"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label className="text-sm text-gray-700 mb-1">Destination</label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
            <FaRoute />
          </span>
          <input
            required
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
            placeholder="Enter destination"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label className="text-sm text-gray-700 mb-1">Ride type</label>
        <select
          value={rideType}
          onChange={(e) => setRideType(e.target.value)}
          className="w-full pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
        >
          <option value="economy">Economy</option>
          <option value="premium">Premium</option>
          <option value="suv">SUV</option>
        </select>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        >
          <span className="mr-2">Order Ride</span>
          <FaCarSide />
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-100"
        >
          Reset
        </button>
      </div>
    </form>
  )
}