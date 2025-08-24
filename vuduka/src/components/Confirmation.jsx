import React from 'react'

export default function Confirmation({ order, onReset }) {
  if (!order) return null

  return (
    <div className="p-4 bg-white border border-gray-100 rounded-lg">
      <h3 className="font-semibold text-gray-800">✅ Ride Confirmed</h3>
      <p className="text-sm text-gray-600 mt-2">Order ID: {order.id}</p>
      <ul className="mt-2 text-gray-700 list-disc list-inside">
        <li>
          <strong>Passenger:</strong> {order.name}
        </li>
        <li>
          <strong>Pickup:</strong> {order.pickup}
        </li>
        <li>
          <strong>Destination:</strong> {order.destination}
        </li>
        <li>
          <strong>Ride Type:</strong> {order.rideType}
        </li>
        <li>
          <strong>ETA:</strong> {order.etaMinutes} minutes
        </li>
        <li>
          <strong>Estimate:</strong> {order.priceEstimate}
        </li>
        <li>
          <strong>Submitted at:</strong> {order.time}
        </li>
      </ul>

      <div className="mt-4 flex gap-2">
        <button onClick={onReset} className="px-3 py-1 bg-gray-100 rounded-lg">
          Close
        </button>
      </div>
    </div>
  )
}