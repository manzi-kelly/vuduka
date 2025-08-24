// App.js
import React, { useState, useEffect, useRef } from 'react';
import { FaClock, FaShieldAlt, FaDollarSign, FaThumbsUp, FaCar, FaStar, FaMapMarkerAlt, FaUser, FaRoad, FaShoppingCart, FaTimes, FaBars } from 'react-icons/fa';

function Header({ cartCount, onCartClick, onMenuClick }) {
  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Hamburger Menu */}
          <div className="flex items-center">
            <button 
              onClick={onMenuClick}
              className="md:hidden text-gray-600 mr-2"
            >
              <FaBars className="text-xl" />
            </button>
            <div className="flex items-center">
              <div className="bg-blue-600 w-10 h-10 rounded-lg flex items-center justify-center">
                <FaCar className="text-white text-xl" />
              </div>
              <h1 className="ml-3 text-xl font-bold text-gray-800">Vuduka</h1>
            </div>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button 
                onClick={onCartClick}
                className="text-gray-600 hover:text-blue-600 relative"
              >
                <FaShoppingCart className="text-xl" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8 py-2 border-t border-gray-100">
          <a href="#book" className="text-blue-600 font-medium pb-2 border-b-2 border-blue-600">Book a Ride</a>
          <a href="#services" className="text-gray-600 hover:text-blue-600 transition">Services</a>
          <a href="#why" className="text-gray-600 hover:text-blue-600 transition">Why Us</a>
          <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition">Testimonials</a>
        </nav>
      </div>
    </header>
  );
}

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

function PaymentForm({ order, onPaymentSubmit, onClose }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    nationalId: '',
    gender: 'male',
    paymentMethod: 'mtn',
    mobilePaymentNumber: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMobilePaymentMessage, setShowMobilePaymentMessage] = useState(false);
  
  // Validate Rwandan phone number
  const validatePhone = (phone) => {
    const rwandaRegex = /^(07[2389]|078)\d{7}$/;
    return rwandaRegex.test(phone);
  };
  
  // Validate National ID (16 digits)
  const validateNationalId = (id) => {
    return /^\d{16}$/.test(id);
  };
  
  // Validate card number
  const validateCardNumber = (number) => {
    return /^\d{16}$/.test(number.replace(/\s/g, ''));
  };
  
  // Validate expiry date (MM/YY format)
  const validateExpiry = (expiry) => {
    return /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry);
  };
  
  // Validate CVV
  const validateCvv = (cvv) => {
    return /^\d{3,4}$/.test(cvv);
  };
  
  const validateForm = () => {
    const newErrors = {};
    const { paymentMethod } = formData;
    
    // Common validations
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Invalid Rwandan phone number (07X XXX XXXX)';
    }
    
    if (!formData.nationalId.trim()) {
      newErrors.nationalId = 'National ID is required';
    } else if (!validateNationalId(formData.nationalId)) {
      newErrors.nationalId = 'National ID must be 16 digits';
    }
    
    // Payment method specific validations
    if (paymentMethod === 'mtn' || paymentMethod === 'airtel') {
      if (!formData.mobilePaymentNumber.trim()) {
        newErrors.mobilePaymentNumber = 'Payment number is required';
      } else if (!validatePhone(formData.mobilePaymentNumber)) {
        newErrors.mobilePaymentNumber = 'Invalid mobile money number';
      }
    }
    
    if (paymentMethod === 'card') {
      if (!formData.cardNumber.trim()) {
        newErrors.cardNumber = 'Card number is required';
      } else if (!validateCardNumber(formData.cardNumber)) {
        newErrors.cardNumber = 'Invalid card number (16 digits)';
      }
      
      if (!formData.cardExpiry.trim()) {
        newErrors.cardExpiry = 'Expiry date is required';
      } else if (!validateExpiry(formData.cardExpiry)) {
        newErrors.cardExpiry = 'Invalid expiry (MM/YY)';
      }
      
      if (!formData.cardCvv.trim()) {
        newErrors.cardCvv = 'CVV is required';
      } else if (!validateCvv(formData.cardCvv)) {
        newErrors.cardCvv = 'Invalid CVV (3-4 digits)';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
    
    // Format card number as user types
    if (name === 'cardNumber') {
      const formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim();
      setFormData(prev => ({ ...prev, cardNumber: formattedValue }));
    }
    
    // Format expiry date as user types
    if (name === 'cardExpiry') {
      let formattedValue = value;
      if (/^\d{2}$/.test(value)) {
        formattedValue = value + '/';
      }
      setFormData(prev => ({ ...prev, cardExpiry: formattedValue }));
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Show mobile payment message if applicable
      if (formData.paymentMethod === 'mtn' || formData.paymentMethod === 'airtel') {
        setShowMobilePaymentMessage(true);
      }
      
      // Simulate payment processing
      setTimeout(() => {
        setIsSubmitting(false);
        setShowMobilePaymentMessage(false);
        onPaymentSubmit();
      }, 3000);
    }
  };
  
  return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-70 flex items-center justify-center">
      <div className="bg-gray-900 text-white rounded-xl w-full max-w-md mx-4 overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Complete Payment</h3>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-white transition"
            >
              <FaTimes />
            </button>
          </div>
          
          {/* Order Summary */}
          <div className="bg-gray-800 rounded-xl p-4 mb-6 border border-gray-700">
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Ride:</span>
              <span className="font-medium">{order.pickup} → {order.dropoff}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Amount:</span>
              <span className="font-medium text-blue-400">{order.price}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Date:</span>
              <span className="font-medium">{order.date}</span>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            {/* Personal Information */}
            <div className="mb-6">
              <h4 className="text-lg font-medium mb-4 pb-2 border-b border-gray-700">Personal Information</h4>
              
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.fullName ? 'border border-red-500' : ''
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.phone ? 'border border-red-500' : ''
                    }`}
                    placeholder="07X XXX XXXX"
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">National ID</label>
                  <input
                    type="text"
                    name="nationalId"
                    value={formData.nationalId}
                    onChange={handleChange}
                    maxLength={16}
                    className={`w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.nationalId ? 'border border-red-500' : ''
                    }`}
                    placeholder="16-digit ID number"
                  />
                  {errors.nationalId && (
                    <p className="text-red-400 text-sm mt-1">{errors.nationalId}</p>
                  )}
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-gray-300 mb-2">Gender</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={formData.gender === 'male'}
                      onChange={handleChange}
                      className="mr-2 accent-blue-500"
                    />
                    Male
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={formData.gender === 'female'}
                      onChange={handleChange}
                      className="mr-2 accent-blue-500"
                    />
                    Female
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="other"
                      checked={formData.gender === 'other'}
                      onChange={handleChange}
                      className="mr-2 accent-blue-500"
                    />
                    Other
                  </label>
                </div>
              </div>
            </div>
            
            {/* Payment Method Selection */}
            <div className="mb-6">
              <h4 className="text-lg font-medium mb-4 pb-2 border-b border-gray-700">Payment Method</h4>
              
              <div className="space-y-3">
                <label className={`flex items-center bg-gray-800 p-4 rounded-xl cursor-pointer transition-all ${
                  formData.paymentMethod === 'mtn' ? 'ring-2 ring-blue-500' : ''
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="mtn"
                    checked={formData.paymentMethod === 'mtn'}
                    onChange={handleChange}
                    className="mr-3 accent-blue-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center">
                      <div className="bg-yellow-500 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                        <span className="font-bold text-black">M</span>
                      </div>
                      <div>
                        <div className="font-medium">MTN Mobile Money</div>
                        <div className="text-sm text-gray-400">Pay with your MTN account</div>
                      </div>
                    </div>
                  </div>
                </label>
                
                <label className={`flex items-center bg-gray-800 p-4 rounded-xl cursor-pointer transition-all ${
                  formData.paymentMethod === 'airtel' ? 'ring-2 ring-blue-500' : ''
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="airtel"
                    checked={formData.paymentMethod === 'airtel'}
                    onChange={handleChange}
                    className="mr-3 accent-blue-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center">
                      <div className="bg-red-600 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                        <span className="font-bold text-white">A</span>
                      </div>
                      <div>
                        <div className="font-medium">Airtel Money</div>
                        <div className="text-sm text-gray-400">Pay with your Airtel account</div>
                      </div>
                    </div>
                  </div>
                </label>
                
                <label className={`flex items-center bg-gray-800 p-4 rounded-xl cursor-pointer transition-all ${
                  formData.paymentMethod === 'card' ? 'ring-2 ring-blue-500' : ''
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleChange}
                    className="mr-3 accent-blue-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center">
                      <div className="bg-blue-600 w-8 h-8 rounded-lg flex items-center justify-center mr-3">
                        <FaDollarSign className="text-white" />
                      </div>
                      <div>
                        <div className="font-medium">Credit/Debit Card</div>
                        <div className="text-sm text-gray-400">Pay with Visa or Mastercard</div>
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            </div>
            
            {/* Payment Method Specific Fields */}
            {formData.paymentMethod === 'mtn' || formData.paymentMethod === 'airtel' ? (
              <div className="mb-6 bg-gray-800 rounded-xl p-4">
                <h4 className="text-lg font-medium mb-4">
                  {formData.paymentMethod === 'mtn' ? 'MTN Mobile Money' : 'Airtel Money'} Payment
                </h4>
                
                <div className="mb-4">
                  <label className="block text-gray-300 mb-2">
                    {formData.paymentMethod === 'mtn' ? 'MTN' : 'Airtel'} Payment Number
                  </label>
                  <input
                    type="tel"
                    name="mobilePaymentNumber"
                    value={formData.mobilePaymentNumber}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.mobilePaymentNumber ? 'border border-red-500' : ''
                    }`}
                    placeholder="07X XXX XXXX"
                  />
                  {errors.mobilePaymentNumber && (
                    <p className="text-red-400 text-sm mt-1">{errors.mobilePaymentNumber}</p>
                  )}
                </div>
                
                {showMobilePaymentMessage && (
                  <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-3 mt-4">
                    <div className="flex items-start">
                      <FaClock className="text-yellow-400 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-yellow-300">Payment Processing</p>
                        <p className="text-yellow-500 text-sm mt-1">
                          Please be patient. Check your phone for payment prompt. 
                          <span className="block mt-1">
                            <span className="font-medium">Kinyarwanda:</span> Ubu buryo bw'ishyura ntiratangira gukora, mube mwihanganye, ubikore no kuri mobile money.
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
            
            {formData.paymentMethod === 'card' && (
              <div className="mb-6 bg-gray-800 rounded-xl p-4">
                <h4 className="text-lg font-medium mb-4">Card Information</h4>
                
                <div className="mb-4">
                  <label className="block text-gray-300 mb-2">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    maxLength={19}
                    className={`w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.cardNumber ? 'border border-red-500' : ''
                    }`}
                    placeholder="0000 0000 0000 0000"
                  />
                  {errors.cardNumber && (
                    <p className="text-red-400 text-sm mt-1">{errors.cardNumber}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Expiry Date</label>
                    <input
                      type="text"
                      name="cardExpiry"
                      value={formData.cardExpiry}
                      onChange={handleChange}
                      maxLength={5}
                      className={`w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.cardExpiry ? 'border border-red-500' : ''
                      }`}
                      placeholder="MM/YY"
                    />
                    {errors.cardExpiry && (
                      <p className="text-red-400 text-sm mt-1">{errors.cardExpiry}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 mb-2">CVV</label>
                    <input
                      type="text"
                      name="cardCvv"
                      value={formData.cardCvv}
                      onChange={handleChange}
                      maxLength={4}
                      className={`w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.cardCvv ? 'border border-red-500' : ''
                      }`}
                      placeholder="123"
                    />
                    {errors.cardCvv && (
                      <p className="text-red-400 text-sm mt-1">{errors.cardCvv}</p>
                    )}
                  </div>
                </div>
                
                <div className="mt-4 flex items-center">
                  <FaShieldAlt className="text-blue-500 mr-2" />
                  <span className="text-sm text-gray-400">Your payment details are securely encrypted</span>
                </div>
              </div>
            )}
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition duration-300 flex items-center justify-center ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {formData.paymentMethod === 'card' 
                    ? 'Processing Payment...' 
                    : formData.paymentMethod === 'mtn' 
                      ? 'Requesting MTN Payment...' 
                      : 'Requesting Airtel Payment...'}
                </>
              ) : (
                `Pay ${order.price}`
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

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

function App() {
  const [order, setOrder] = useState(null);
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [rideType, setRideType] = useState('economy');
  const [step, setStep] = useState(1); // 1: Form, 2: Driver Matching, 3: Confirmation
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState([]);
  const [showOrderAnimation, setShowOrderAnimation] = useState(false);
  const [animationPosition, setAnimationPosition] = useState({x: 0, y: 0});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [paymentOrder, setPaymentOrder] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const orderButtonRef = useRef(null);
  const cartButtonRef = useRef(null);

  // Rwandan locations with districts and sectors
  const rwandanLocations = [
    // Kigali City
    { type: 'district', name: 'Gasabo', sectors: ['Gisozi', 'Gatsata', 'Jali', 'Remera', 'Kinyinya'] },
    { type: 'district', name: 'Kicukiro', sectors: ['Gatenga', 'Kicukiro', 'Niboye', 'Gikondo', 'Kanombe'] },
    { type: 'district', name: 'Nyarugenge', sectors: ['Nyarugenge', 'Muhima', 'Gitega', 'Nyamirambo', 'Rwezamenyo'] },
    
    // Northern Province
    { type: 'district', name: 'Burera', sectors: ['Bungwe', 'Butaro', 'Cyanika', 'Rugendabari', 'Ruhunde'] },
    { type: 'district', name: 'Gakenke', sectors: ['Busengo', 'Coko', 'Cyabingo', 'Gakenke', 'Rushashi'] },
    { type: 'district', name: 'Gicumbi', sectors: ['Bukure', 'Base', 'Bwisige', 'Byumba', 'Muko'] },
    { type: 'district', name: 'Musanze', sectors: ['Busogo', 'Cyuve', 'Gacaca', 'Gataraga', 'Kimonyi'] },
    { type: 'district', name: 'Rulindo', sectors: ['Base', 'Burega', 'Buyoga', 'Cyinzuzi', 'Rwiko'] },
    
    // Eastern Province
    { type: 'district', name: 'Bugesera', sectors: ['Gashora', 'Juru', 'Kamabuye', 'Mareba', 'Mayange'] },
    { type: 'district', name: 'Gatsibo', sectors: ['Gatsibo', 'Gitoki', 'Kabarore', 'Kageyo', 'Murambi'] },
    { type: 'district', name: 'Kayonza', sectors: ['Gahini', 'Kabare', 'Kabuga', 'Murundi', 'Mwiri'] },
    { type: 'district', name: 'Ngoma', sectors: ['Gashanda', 'Jarama', 'Kazo', 'Kibungo', 'Rukira'] },
    { type: 'district', name: 'Nyagatare', sectors: ['Matimba', 'Mimuri', 'Rukomo', 'Rwempasha', 'Tabagwe'] },
    { type: 'district', name: 'Rwamagana', sectors: ['Fumbwe', 'Gahengeri', 'Karenge', 'Mwulire', 'Rwamagana'] },
    
    // Southern Province
    { type: 'district', name: 'Gisagara', sectors: ['Gikonko', 'Gishubi', 'Kansi', 'Muganza', 'Rugango'] },
    { type: 'district', name: 'Huye', sectors: ['Gishamvu', 'Karama', 'Kigoma', 'Kinazi', 'Mukura'] },
    { type: 'district', name: 'Kamonyi', sectors: ['Gacurabwenge', 'Karama', 'Kayenzi', 'Rugalika', 'Runda'] },
    { type: 'district', name: 'Muhanga', sectors: ['Cyeza', 'Kabacuzi', 'Nyamabuye', 'Rongi', 'Shyogwe'] },
    { type: 'district', name: 'Nyamagabe', sectors: ['Gasaka', 'Kaduha', 'Kamegeri', 'Musebeya', 'Tare'] },
    { type: 'district', name: 'Nyanza', sectors: ['Busasamana', 'Busoro', 'Cyabakamyi', 'Muyira', 'Rwabicuma'] },
    { type: 'district', name: 'Nyaruguru', sectors: ['Kibeho', 'Mata', 'Munini', 'Nyagisozi', 'Ruheru'] },
    { type: 'district', name: 'Ruhango', sectors: ['Kinazi', 'Byimana', 'Ruhango', 'Ntongwe', 'Mbuye'] },
    
    // Western Province
    { type: 'district', name: 'Karongi', sectors: ['Bwishyura', 'Gishyita', 'Gitesi', 'Mubuga', 'Murundi'] },
    { type: 'district', name: 'Ngororero', sectors: ['Bwira', 'Gahunga', 'Kageyo', 'Kavumu', 'Matyazo'] },
    { type: 'district', name: 'Nyabihu', sectors: ['Bigogwe', 'Jenda', 'Mukamira', 'Rambura', 'Shyira'] },
    { type: 'district', name: 'Nyamasheke', sectors: ['Bushekeri', 'Bushenge', 'Cyato', 'Gihombo', 'Karengera'] },
    { type: 'district', name: 'Rubavu', sectors: ['Gisenyi', 'Bugeshi', 'Kanama', 'Nyamyumba', 'Rubavu'] },
    { type: 'district', name: 'Rusizi', sectors: ['Bugarama', 'Butare', 'Gihundwe', 'Giheke', 'Nkanka'] },
    { type: 'district', name: 'Rutsiro', sectors: ['Boneza', 'Gihango', 'Kigeyo', 'Manihira', 'Ruhango'] }
  ];

  const rideTypes = [
    { id: 'economy', name: 'Economy', icon: <FaCar className="text-blue-500" />, price: '15,000-20,000 RWF', time: '5 min', description: 'Affordable everyday rides' },
    { id: 'premium', name: 'Premium', icon: <FaStar className="text-yellow-500" />, price: '25,000-35,000 RWF', time: '7 min', description: 'Luxury comfort rides' },
    { id: 'suv', name: 'SUV', icon: <FaRoad className="text-green-500" />, price: '30,000-40,000 RWF', time: '10 min', description: 'Spacious for groups' }
  ];

  const handleLocationInput = (value, setValue, setSuggestions) => {
    setValue(value);
    if (value.length > 1) {
      const filtered = [];
      
      // Search districts
      rwandanLocations.forEach(district => {
        if (district.name.toLowerCase().includes(value.toLowerCase())) {
          filtered.push({ type: 'district', name: district.name, fullName: `${district.name} District` });
        }
      });
      
      // Search sectors
      rwandanLocations.forEach(district => {
        district.sectors.forEach(sector => {
          if (sector.toLowerCase().includes(value.toLowerCase())) {
            filtered.push({ type: 'sector', name: sector, fullName: `${sector}, ${district.name}` });
          }
        });
      });
      
      setSuggestions(filtered.slice(0, 10));
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion, setValue, setSuggestions) => {
    setValue(suggestion.fullName);
    setSuggestions([]);
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    if (!pickupLocation || !dropoffLocation) {
      alert('Please enter both locations');
      return;
    }
    
    // Move to driver matching screen
    setStep(2);
    
    // Simulate driver matching delay
    setTimeout(() => {
      const orderData = {
        id: Math.floor(Math.random() * 1000),
        pickup: pickupLocation,
        dropoff: dropoffLocation,
        type: rideType,
        price: rideTypes.find(r => r.id === rideType).price,
        date: new Date().toLocaleString(),
        driver: {
          name: 'Michael Johnson',
          rating: 4.9,
          car: 'Toyota Camry',
          license: 'AB-1234',
          eta: '5 min'
        }
      };
      setOrder(orderData);
      setStep(3);
    }, 3000);
  };

  const handleReset = () => {
    setOrder(null);
    setPickupLocation('');
    setDropoffLocation('');
    setRideType('economy');
    setStep(1);
  };

  const handleAddToCart = () => {
    if (!order) return;
    
    // Get position for animation
    if (orderButtonRef.current) {
      const buttonRect = orderButtonRef.current.getBoundingClientRect();
      const cartRect = cartButtonRef.current?.getBoundingClientRect();
      
      setAnimationPosition({
        x: buttonRect.left + buttonRect.width / 2,
        y: buttonRect.top + buttonRect.height / 2,
        targetX: cartRect?.left + cartRect?.width / 2 || 0,
        targetY: cartRect?.top + cartRect?.height / 2 || 0
      });
    }
    
    setShowOrderAnimation(true);
    
    setTimeout(() => {
      setCart([...cart, order]);
      setShowOrderAnimation(false);
      setIsCartOpen(true);
    }, 1000);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const handlePay = (order) => {
    setPaymentOrder(order);
    setShowPaymentForm(true);
    setIsCartOpen(false);
  };
  
  const handlePaymentSubmit = () => {
    setPaymentSuccess(true);
    setTimeout(() => {
      setPaymentSuccess(false);
      setShowPaymentForm(false);
      // Remove the paid order from cart
      const newCart = cart.filter(o => o.id !== paymentOrder.id);
      setCart(newCart);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Order animation */}
      {showOrderAnimation && (
        <div 
          className="fixed z-50 animate-fly"
          style={{
            top: animationPosition.y,
            left: animationPosition.x,
            transform: 'translate(-50%, -50%)',
            '--target-x': `${animationPosition.targetX}px`,
            '--target-y': `${animationPosition.targetY}px`,
          }}
        >
          <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center">
            <FaCar className="text-xl" />
          </div>
        </div>
      )}
      
      {/* Payment Form */}
      {showPaymentForm && paymentOrder && (
        <PaymentForm 
          order={paymentOrder} 
          onPaymentSubmit={handlePaymentSubmit} 
          onClose={() => setShowPaymentForm(false)} 
        />
      )}
      
      {/* Payment Success Modal */}
      {paymentSuccess && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaThumbsUp className="text-green-600 text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Payment Successful!</h3>
            <p className="text-gray-600 mb-6">Your ride payment has been processed successfully</p>
            <button 
              onClick={() => setPaymentSuccess(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Continue
            </button>
          </div>
        </div>
      )}
      
      <Header 
        cartCount={cart.length} 
        onCartClick={() => setIsCartOpen(true)}
        onMenuClick={() => setIsMobileMenuOpen(true)}
        cartButtonRef={cartButtonRef}
      />
      
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
      
      <Cart 
        orders={cart} 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        onRemove={removeFromCart}
        onPay={handlePay}
      />

      <main className="mt-24 md:mt-28 flex-1 w-full max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
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
                onClick={() => document.getElementById('book').scrollIntoView({ behavior: 'smooth' })}
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

        {/* Booking Form */}
        <section id="book" className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Book Your Ride</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">Get where you need to go with our reliable and affordable service</p>
          </div>
          
          <div className="bg-white rounded-xl p-8 border border-gray-200">
            {step === 1 && (
              <form onSubmit={handleOrderSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="relative">
                    <label className="block text-gray-700 font-medium mb-2">Pickup Location</label>
                    <div className="relative">
                      <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Enter pickup location in Rwanda"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={pickupLocation}
                        onChange={(e) => handleLocationInput(e.target.value, setPickupLocation, setPickupSuggestions)}
                      />
                    </div>
                    {pickupSuggestions.length > 0 && (
                      <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-60 overflow-auto">
                        {pickupSuggestions.map((suggestion, index) => (
                          <div
                            key={index}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                            onClick={() => handleSuggestionClick(suggestion, setPickupLocation, setPickupSuggestions)}
                          >
                            <FaMapMarkerAlt className="text-blue-500 mr-2" />
                            <div>
                              <div className="font-medium">{suggestion.fullName}</div>
                              <div className="text-xs text-gray-500">
                                {suggestion.type === 'district' ? 'District' : 'Sector'}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="relative">
                    <label className="block text-gray-700 font-medium mb-2">Dropoff Location</label>
                    <div className="relative">
                      <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Enter dropoff location in Rwanda"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={dropoffLocation}
                        onChange={(e) => handleLocationInput(e.target.value, setDropoffLocation, setDropoffSuggestions)}
                      />
                    </div>
                    {dropoffSuggestions.length > 0 && (
                      <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-60 overflow-auto">
                        {dropoffSuggestions.map((suggestion, index) => (
                          <div
                            key={index}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                            onClick={() => handleSuggestionClick(suggestion, setDropoffLocation, setDropoffSuggestions)}
                          >
                            <FaMapMarkerAlt className="text-blue-500 mr-2" />
                            <div>
                              <div className="font-medium">{suggestion.fullName}</div>
                              <div className="text-xs text-gray-500">
                                {suggestion.type === 'district' ? 'District' : 'Sector'}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mb-8">
                  <label className="block text-gray-700 font-medium mb-4">Select Ride Type</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {rideTypes.map((type) => (
                      <div 
                        key={type.id}
                        className={`border rounded-lg p-4 cursor-pointer transition duration-300 flex flex-col ${
                          rideType === type.id 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                        onClick={() => setRideType(type.id)}
                      >
                        <div className="flex items-center mb-3">
                          <div className="text-2xl">{type.icon}</div>
                          <h3 className="ml-3 font-semibold text-gray-800">{type.name}</h3>
                        </div>
                        <p className="text-gray-600 text-sm mb-2 flex-grow">{type.description}</p>
                        <div className="flex justify-between mt-3">
                          <span className="text-gray-700 font-medium">{type.price}</span>
                          <span className="text-gray-500 text-sm">{type.time} ETA</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium text-lg transition duration-300"
                >
                  Confirm & Book Ride
                </button>
              </form>
            )}
            
            {step === 2 && (
              <div className="flex flex-col items-center py-12">
                <div className="mb-8 relative w-full max-w-md h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="absolute top-0 left-0 h-full bg-blue-600 animate-progress" style={{ width: '65%' }}></div>
                  <div className="absolute -top-2 left-[calc(65%-12px)] animate-bounce">
                    <FaCar className="text-blue-600 text-3xl" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Finding your perfect driver</h3>
                <p className="text-gray-600 mb-8">We're matching you with the best available driver in your area</p>
              </div>
            )}
            
            {step === 3 && order && (
              <div className="py-6">
                <div className="bg-green-50 p-6 rounded-lg border border-green-200 mb-8">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                      <FaThumbsUp className="text-green-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">Ride Confirmed!</h3>
                      <p className="text-gray-600">Your driver is on the way to your location</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                  <div className="p-6 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-700 mb-4 pb-2 border-b border-gray-200">Ride Details</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">From:</span>
                        <span className="font-medium">{order.pickup || '123 Main St'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">To:</span>
                        <span className="font-medium">{order.dropoff || '456 Park Ave'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Ride Type:</span>
                        <span className="font-medium capitalize">{order.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Price:</span>
                        <span className="font-medium text-blue-600">{order.price}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-700 mb-4 pb-2 border-b border-gray-200">Driver Info</h4>
                    <div className="flex items-center mb-4">
                      <div className="bg-gray-200 rounded-xl w-16 h-16 mr-4" />
                      <div>
                        <h5 className="font-bold text-lg">{order.driver.name}</h5>
                        <div className="flex items-center">
                          <FaStar className="text-yellow-400 mr-1" />
                          <span>{order.driver.rating} (256 rides)</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FaCar className="text-gray-500 mr-2" />
                      <span>{order.driver.car} • {order.driver.license}</span>
                    </div>
                  </div>
                  
                  <div className="p-6 border border-blue-200 rounded-lg bg-blue-50">
                    <h4 className="font-medium text-gray-700 mb-4 pb-2 border-b border-blue-200">Arrival Time</h4>
                    <div className="text-center py-4">
                      <div className="text-3xl font-bold text-blue-600 mb-2">{order.driver.eta}</div>
                      <p className="text-gray-600">Estimated arrival time</p>
                    </div>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition duration-300">
                      Track Driver
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button 
                    onClick={handleReset}
                    className="bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-lg font-medium transition duration-300"
                  >
                    Book Another Ride
                  </button>
                  <button 
                    ref={orderButtonRef}
                    onClick={handleAddToCart}
                    className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition duration-300 flex items-center justify-center"
                  >
                    <FaShoppingCart className="mr-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Services Section */}
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

        {/* Why Choose Us */}
        <section id="why" className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Vuduka</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">Experience the difference with our premium ride service</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 border border-gray-200 rounded-lg">
              <div className="flex items-start mb-6">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mr-4">
                  <FaClock className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Fast Arrival</h3>
                  <p className="text-gray-600">Average pickup time under 5 minutes in metro areas</p>
                </div>
              </div>
            </div>
            
            <div className="p-8 border border-gray-200 rounded-lg">
              <div className="flex items-start mb-6">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mr-4">
                  <FaShieldAlt className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Safety First</h3>
                  <p className="text-gray-600">All drivers background checked and vehicles inspected</p>
                </div>
              </div>
            </div>
            
            <div className="p-8 border border-gray-200 rounded-lg">
              <div className="flex items-start mb-6">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mr-4">
                  <FaDollarSign className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Best Prices</h3>
                  <p className="text-gray-600">Competitive pricing with no surprise fees</p>
                </div>
              </div>
            </div>
            
            <div className="p-8 border border-gray-200 rounded-lg">
              <div className="flex items-start mb-6">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mr-4">
                  <FaThumbsUp className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Rider Guarantee</h3>
                  <p className="text-gray-600">24/7 support and satisfaction guarantee</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Riders Say</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">Don't just take our word for it - hear from our satisfied customers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 border border-gray-200 rounded-lg">
              <div className="flex items-center mb-6">
                <div className="bg-gray-200 rounded-xl w-16 h-16 mr-4" />
                <div>
                  <h4 className="font-bold">Sarah Johnson</h4>
                  <div className="flex text-yellow-400">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Vuduka has transformed my daily commute. The drivers are always on time and the app is so easy to use. Highly recommend!"
              </p>
            </div>
            
            <div className="p-8 border border-gray-200 rounded-lg">
              <div className="flex items-center mb-6">
                <div className="bg-gray-200 rounded-xl w-16 h-16 mr-4" />
                <div>
                  <h4 className="font-bold">Michael Chen</h4>
                  <div className="flex text-yellow-400">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "I've tried many ride services, but Vuduka stands out with their professional drivers and clean vehicles. Worth every penny!"
              </p>
            </div>
            
            <div className="p-8 border border-gray-200 rounded-lg">
              <div className="flex items-center mb-6">
                <div className="bg-gray-200 rounded-xl w-16 h-16 mr-4" />
                <div>
                  <h4 className="font-bold">Emma Rodriguez</h4>
                  <div className="flex text-yellow-400">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Booking with Vuduka is always a pleasure. The app is intuitive and the customer support team is incredibly responsive."
              </p>
            </div>
          </div>
        </section>

        {/* Download App */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-10 text-white">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h2 className="text-3xl font-bold mb-4">Download Our App</h2>
                <p className="mb-6 opacity-90">Get the best experience with our mobile app. Book rides faster, track drivers in real-time, and enjoy exclusive offers.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium flex items-center transition duration-300">
                    <div className="mr-3">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.56-1.701z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs text-left">Download on the</div>
                      <div className="font-bold text-lg">App Store</div>
                    </div>
                  </button>
                  <button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium flex items-center transition duration-300">
                    <div className="mr-3">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M1.571 23.664c.267.043.537.075.811.094.58.041 1.17-.032 1.736-.227.197-.07.377-.172.54-.3.202-.153.365-.35.478-.578.134-.272.2-.57.193-.871-.007-.355-.081-.704-.219-1.03-.146-.345-.358-.658-.625-.92a2.05 2.05 0 0 0-.666-.447 2.143 2.143 0 0 0-1.08-.173c-.343.04-.67.165-.947.362-.235.17-.426.39-.56.643-.15.281-.224.596-.217.915.005.314.078.623.215.905.117.25.285.473.492.654.19.164.41.29.648.37.232.078.476.107.721.085zM6.695 19.96c.09.04.183.074.28.101.437.123.894.137 1.338.04.177-.039.348-.104.506-.194.22-.124.4-.307.52-.526.138-.25.21-.533.206-.82-.005-.338-.085-.669-.236-.968-.16-.32-.4-.6-.698-.816a2.01 2.01 0 0 0-.787-.373 2.1 2.1 0 0 0-1.008.031c-.316.09-.6.265-.824.504-.196.207-.34.46-.42.738-.09.31-.107.638-.05.96.05.3.173.583.357.826.163.215.37.394.608.522.205.113.436.19.674.224zM4.017 11.354c.063.13.14.252.23.367.344.445.82.768 1.348.92.186.053.378.086.572.096.5.026.998-.09 1.433-.33.25-.137.468-.326.636-.554.19-.262.31-.568.347-.886.031-.297-.025-.596-.163-.865-.118-.23-.294-.428-.51-.575a1.92 1.92 0 0 0-.719-.316 2.1 2.1 0 0 0-1.02.03c-.33.094-.62.282-.838.538-.195.226-.33.5-.392.79-.056.26-.038.528.052.78.07.189.178.363.308.515zM12.816 21.356c.136.226.3.43.488.61.53.51 1.2.81 1.908.85.196.01.393-.01.587-.06.528-.135.98-.47 1.275-.937.17-.265.28-.568.32-.883.03-.3-.03-.602-.172-.87-.12-.24-.31-.44-.54-.58a1.93 1.93 0 0 0-.76-.28 2.1 2.1 0 0 0-1.02.1c-.32.1-.6.29-.8.55-.18.23-.3.5-.35.79-.05.26-.02.53.08.78.08.2.2.38.35.53zM10.483 12.735c.16.39.45.71.82.91.13.07.27.13.42.17.42.11.87.07 1.27-.12.22-.1.41-.26.55-.46.15-.22.24-.48.26-.75.01-.28-.06-.56-.19-.8-.12-.24-.32-.43-.56-.56a1.83 1.83 0 0 0-.79-.2c-.35.02-.68.15-.95.37-.24.19-.42.45-.51.75-.08.28-.07.58.03.86.07.2.19.38.33.53z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs text-left">GET IT ON</div>
                      <div className="font-bold text-lg">Google Play</div>
                    </div>
                  </button>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="relative">
                  <div className="bg-white bg-opacity-20 rounded-xl w-64 h-96 flex items-center justify-center">
                    <div className="text-center">
                      <FaCar className="text-white text-6xl mx-auto mb-4" />
                      <p className="font-bold text-xl">Vuduka App</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-blue-600 w-10 h-10 rounded-lg flex items-center justify-center">
                  <FaCar className="text-white text-xl" />
                </div>
                <h3 className="ml-3 text-xl font-bold">Vuduka</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Premium ride booking service with a focus on safety, reliability, and comfort.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-700">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Press</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-700">Support</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-700">Cities</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Kigali</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Musanze</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Rubavu</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Huye</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2023 Vuduka Technologies, Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;