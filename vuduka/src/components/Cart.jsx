import React from 'react';
import { FaTimes, FaShoppingCart } from 'react-icons/fa';

function Cart({ orders, isOpen, onClose, onRemove, onPay }) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Your Ride Orders</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                <FaTimes />
              </button>
            </div>
            
            {orders.length === 0 ? (
              <div className="text-center py-8">
                <FaShoppingCart className="mx-auto text-4xl text-gray-300 mb-4" />
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-800">
                          {order.pickup} → {order.dropoff}
                        </h4>
                        <p className="text-gray-600 text-sm">{order.type} • {order.price}</p>
                        <p className="text-gray-500 text-xs mt-1">{order.date}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <button 
                          onClick={() => onRemove(index)}
                          className="text-red-500 hover:text-red-700 mb-2"
                        >
                          Remove
                        </button>
                        <button 
                          onClick={() => onPay(order)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                        >
                          Pay
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;