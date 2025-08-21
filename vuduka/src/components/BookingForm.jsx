import React, { useState } from 'react';
import { 
  FaMapMarkerAlt, FaCar, FaStar, FaRoad, FaUsers, FaSuitcase, FaShieldAlt, 
  FaCheckCircle, FaClock, FaPhone, FaArrowLeft, FaUser 
} from 'react-icons/fa';
import PaymentForm from './PaymentForm';

function BookingForm() {
  const [step, setStep] = useState(1);
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [selectedRide, setSelectedRide] = useState(null);
  const [order, setOrder] = useState(null);
  const [errors, setErrors] = useState({});

  const rideTypes = [
    { 
      id: 'economy', 
      name: 'Economy', 
      icon: FaCar, 
      price: '15,000-20,000 RWF', 
      time: '5 min', 
      description: 'Affordable everyday rides',
      features: [
        { text: 'AC', icon: null },
        { text: 'Standard Comfort', icon: null },
        { text: 'Safe Ride', icon: FaShieldAlt }
      ]
    },
    { 
      id: 'premium', 
      name: 'Premium', 
      icon: FaStar, 
      price: '25,000-35,000 RWF', 
      time: '7 min', 
      description: 'Luxury comfort rides',
      features: [
        { text: 'Premium Car', icon: null },
        { text: 'Top Rated Driver', icon: null },
        { text: 'Luxury Interior', icon: null }
      ]
    },
    { 
      id: 'suv', 
      name: 'SUV', 
      icon: FaRoad, 
      price: '30,000-40,000 RWF', 
      time: '10 min', 
      description: 'Spacious for groups',
      features: [
        { text: '6-8 Seats', icon: FaUsers },
        { text: 'Extra Luggage Space', icon: FaSuitcase },
        { text: 'Family Friendly', icon: null }
      ]
    }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!pickupLocation.trim()) {
      newErrors.pickupLocation = 'Pickup location is required';
    }
    
    if (!dropoffLocation.trim()) {
      newErrors.dropoffLocation = 'Dropoff location is required';
    }
    
    if (!selectedRide) {
      newErrors.ride = 'Please select a ride type';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const ride = rideTypes.find(r => r.id === selectedRide);
    const newOrder = {
      pickup: pickupLocation,
      dropoff: dropoffLocation,
      type: ride.name,
      price: ride.price,
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      time: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
    setOrder(newOrder);
    setStep(2); // Move to confirmation
  };

  const handleBookNow = () => {
    setStep(3); // Move to payment
  };

  const handleBackToBooking = () => {
    setStep(1); // Return to booking form
  };

  const handlePaymentClose = () => {
    setStep(2); // Return to confirmation
  };

  const handlePaymentSubmit = (paymentData) => {
    console.log('Payment submitted:', paymentData);
    // After successful payment, you might want to reset the form
    setStep(1);
    setPickupLocation('');
    setDropoffLocation('');
    setSelectedRide(null);
  };

  // Confirmation Component
  const Confirmation = ({ order, onBookNow, onBack }) => {
    // Mock driver data
    const driver = {
      name: "Michael Johnson",
      rating: 4.9,
      car: "Toyota Camry • White",
      plate: "AB-1234",
      arrivalTime: "5 min",
      arrivalText: "Today, 2:30 PM"
    };

    return (
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="text-center mb-6">
          <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Ride Confirmed!</h2>
          <p className="text-gray-600">Your driver is on the way to pick you up</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Trip Details */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Trip Details</h3>
            
            <div className="mb-3">
              <div className="flex items-center text-sm text-gray-600 mb-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                Pickup Location
              </div>
              <div className="font-medium">{order.pickup}</div>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center text-sm text-gray-600 mb-1">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Drop-off Location
              </div>
              <div className="font-medium">{order.dropoff}</div>
            </div>
            
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Ride Type</span>
              <span className="font-medium">{order.type}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Estimated Fare</span>
              <span className="font-medium">{order.price}</span>
            </div>
          </div>

          {/* Driver Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Your Driver</h3>
            
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <FaUser className="text-blue-600" />
              </div>
              <div>
                <div className="font-medium">{driver.name}</div>
                <div className="flex items-center text-sm text-yellow-500">
                  {'★'.repeat(5)} <span className="text-gray-600 ml-1">{driver.rating}</span>
                </div>
              </div>
            </div>
            
            <div className="text-sm text-gray-600 mb-2">{driver.car}</div>
            <div className="text-sm text-gray-600 mb-4">Plate: {driver.plate}</div>
            
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm font-medium flex items-center justify-center">
              <FaPhone className="mr-2" /> Call Driver
            </button>
          </div>
        </div>

        {/* Arrival Time */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-100">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm text-gray-600">Arrival Time</div>
              <div className="text-2xl font-bold text-gray-800">{driver.arrivalTime}</div>
              <div className="text-sm text-gray-600">Driver arriving in</div>
              <div className="text-sm font-medium text-gray-800">{driver.arrivalText}</div>
            </div>
            <div className="text-4xl text-blue-600">
              <FaClock />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onBack}
            className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-md font-medium flex items-center justify-center"
          >
            <FaArrowLeft className="mr-2" /> Book Another Ride
          </button>
          <button
            onClick={onBookNow}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium"
          >
            Book Now
          </button>
        </div>

        <div className="text-center text-xs text-gray-500 mt-4">
          Booking now
        </div>
      </div>
    );
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-6">
            <FaCar className="text-white w-8 h-8" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Book Your Ride</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience premium transportation with our reliable and comfortable ride service
          </p>
        </div>

        {/* Step 1: Booking Form */}
        {step === 1 && (
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            {/* Location Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="text-sm font-medium text-gray-700">Pickup Location</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              </div>
              <input
                placeholder="Enter pickup location in Rwanda"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="pl-12 h-14 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 bg-white rounded-lg text-base w-full"
              />
            </div>
        
                {errors.pickupLocation && (
                  <p className="text-red-500 text-xs mt-1">{errors.pickupLocation}</p>
                )}
              </div>

              <div>
            <label className="text-sm font-medium text-gray-700">Dropoff Location</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              </div>
              <input
                placeholder="Enter dropoff location in Rwanda"
                value={dropoffLocation}
                onChange={(e) => setDropoffLocation(e.target.value)}
                className="pl-12 h-14 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 bg-white rounded-lg text-base w-full"
              />
            </div>
                {errors.dropoffLocation && (
                  <p className="text-red-500 text-xs mt-1">{errors.dropoffLocation}</p>
                )}
              </div>
            </div>

            {/* Ride Types */}
            <div className="mb-8">
          <label className="text-lg font-semibold text-gray-900 mb-6 block">Choose Your Ride</label>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {rideTypes.map((ride) => {
              const Icon = ride.icon;
              const isSelected = selectedRide === ride.id;
              return (
                <div key={ride.id} onClick={() => setSelectedRide(ride.id)} className={`cursor-pointer border-2 rounded-lg p-4 transition-transform duration-300 ${isSelected ? 'border-blue-500 shadow-lg' : 'border-gray-200 hover:border-blue-300 shadow-md'}`}>
                  <div className={`flex items-center mb-4 ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 mr-3">
                      <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-blue-600'}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{ride.name}</h3>
                      <p className="text-sm">{ride.description}</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    {ride.features.map((f, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <FaCheckCircle className="w-4 h-4 text-blue-600" />
                        <span>{f.text}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-gray-900 font-bold">{ride.price}</div>
                  <div className="flex items-center text-blue-600 text-sm">
                    <FaClock className="w-4 h-4 mr-1" /> {ride.time} ETA
                  </div>
                </div>
              );
            })}
          </div>
              {errors.ride && (
                <p className="text-red-500 text-xs mt-2">{errors.ride}</p>
              )}
            </div>

            {/* Confirm Button */}
            <div className="flex justify-center">
            
            <button onClick={handleSubmit} className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition">
            Confirm & Book Ride
          </button>
            </div>
            
            <p className="text-center text-gray-500 text-xs mt-2">
              Complete your booking
            </p>
          </div>
        )}

        {/* Step 2: Confirmation Component */}
        {step === 2 && order && (
          <Confirmation 
            order={order} 
            onBookNow={handleBookNow}
            onBack={handleBackToBooking}
          />
        )}

        {/* Step 3: Payment Form */}
        {step === 3 && order && (
          <PaymentForm 
            order={order} 
            onPaymentSubmit={handlePaymentSubmit}
            onClose={handlePaymentClose}
          />
        )}
      </div>
    </section>
  );
}

export default BookingForm;