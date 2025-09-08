import React, { useState } from 'react';
import { 
  FaMapMarkerAlt, FaCar, FaStar, FaRoad, FaUsers, FaSuitcase, FaShieldAlt, 
  FaCheckCircle, FaClock, FaPhone, FaArrowLeft, FaUser, FaCalendarAlt,
  FaChevronLeft, FaChevronRight
} from 'react-icons/fa';
import PaymentForm from './PaymentForm';

// Calendar Component (unchanged)
const Calendar = ({ selectedDate, onDateSelect, scheduledTime, onTimeChange }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };
  const getFirstDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };
  const isSelected = (date) => {
    if (!selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const today = isToday(date);
      const selected = isSelected(date);
      days.push(
        <div
          key={`day-${day}`}
          className={`h-10 flex items-center justify-center rounded-full cursor-pointer transition-colors
            ${today ? 'bg-blue-100 text-blue-600 font-semibold' : ''}
            ${selected ? 'bg-blue-600 text-white font-semibold' : ''}
            ${!today && !selected ? 'hover:bg-gray-100' : ''}
            ${date < new Date().setHours(0, 0, 0, 0) ? 'text-gray-300 cursor-not-allowed' : ''}
          `}
          onClick={() => {
            if (date >= new Date().setHours(0, 0, 0, 0)) {
              onDateSelect(date);
            }
          }}
        >
          {day}
        </div>
      );
    }
    return days;
  };
  const generateTimeSlots = () => {
    const times = [];
    for (let hour = 5; hour <= 23; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeValue = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const displayTime = new Date(`2000-01-01T${timeValue}`).toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        });
        times.push(
          <option key={timeValue} value={timeValue}>
            {displayTime}
          </option>
        );
      }
    }
    return times;
  };

  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={prevMonth}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <FaChevronLeft className="text-gray-600" />
        </button>
        <h3 className="font-semibold text-gray-800">{monthName}</h3>
        <button 
          onClick={nextMonth}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <FaChevronRight className="text-gray-600" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {dayNames.map(day => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {generateCalendarDays()}
      </div>

      {selectedDate && (
        <div className="mt-6 pt-4 border-t border-gray-100">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Time</label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <FaClock className="text-gray-400" />
            </div>
            <select
              value={scheduledTime}
              onChange={(e) => onTimeChange(e.target.value)}
              className="pl-10 h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 bg-white rounded-lg text-base w-full"
            >
              <option value="">Select a time</option>
              {generateTimeSlots()}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

function BookingForm() {
  const [step, setStep] = useState(1);
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [selectedRide, setSelectedRide] = useState(null);
  const [order, setOrder] = useState(null);
  const [errors, setErrors] = useState({});
  const [rideTimeOption, setRideTimeOption] = useState('now');
  const [scheduledTime, setScheduledTime] = useState('');
  const [scheduledDate, setScheduledDate] = useState(null);

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
    if (rideTimeOption === 'schedule') {
      if (!scheduledDate) {
        newErrors.scheduledDate = 'Please select a date';
      }
      if (!scheduledTime) {
        newErrors.scheduledTime = 'Please select a time';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    const ride = rideTypes.find(r => r.id === selectedRide);
    let displayDate, displayTime;
    if (rideTimeOption === 'now') {
      displayDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      displayTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    } else {
      displayDate = scheduledDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      const [hours, minutes] = scheduledTime.split(':');
      const hourInt = parseInt(hours, 10);
      const ampm = hourInt >= 12 ? 'PM' : 'AM';
      const formattedHour = hourInt % 12 || 12;
      displayTime = `${formattedHour}:${minutes} ${ampm}`;
    }
    const newOrder = {
      pickup: pickupLocation,
      dropoff: dropoffLocation,
      type: ride.name,
      price: ride.price,
      date: displayDate,
      time: displayTime,
      immediate: rideTimeOption === 'now'
    };
    setOrder(newOrder);
    setStep(2);
  };

  const handleBookNow = () => {
    setStep(3);
  };

  const handleBackToBooking = () => {
    setStep(1);
  };

  const handlePaymentClose = () => {
    setStep(2);
  };

  const handlePaymentSubmit = (paymentData) => {
    console.log('Payment submitted:', paymentData);
    setStep(1);
    setPickupLocation('');
    setDropoffLocation('');
    setSelectedRide(null);
    setRideTimeOption('now');
    setScheduledTime('');
    setScheduledDate(null);
  };

  // Confirmation Component (updated: includes phone and tel: call)
  const Confirmation = ({ order, onBookNow, onBack }) => {
    // Mock driver data (added phone)
    const driver = {
      name: "Michael Johnson",
      rating: 4.9,
      car: "Toyota Camry • White",
      plate: "AB-1234",
      arrivalTime: order.immediate ? "5 min" : "Scheduled",
      arrivalText: order.immediate
        ? `Today, ${new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}`
        : order.time,
      status: "Active",
      phone: "+250788123456" // <- sample phone number included
    };

    // prepare tel: href
    const phoneRaw = driver.phone || driver.phoneNumber || driver.contact || "";
    const cleanPhone = phoneRaw ? phoneRaw.toString().replace(/[^\d+]/g, "") : "";
    const telHref = cleanPhone ? `tel:${cleanPhone}` : null;

    return (
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="text-center mb-6">
          <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {order.immediate ? 'Ride Confirmed!' : 'Ride Scheduled!'}
          </h2>
          <p className="text-gray-600">
            {order.immediate ? 'Your driver is on the way to pick you up' : 'Your ride has been scheduled'}
          </p>
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

            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Date</span>
              <span className="font-medium">{order.date}</span>
            </div>

            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Time</span>
              <span className="font-medium">{order.time}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Estimated Fare</span>
              <span className="font-medium">{order.price}</span>
            </div>
          </div>

          {/* Driver Info - Only show if immediate ride */}
          {order.immediate && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Your Driver</h3>

              <div className="flex items-center mb-4">
                <div className="relative mr-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FaUser className="text-blue-600" />
                  </div>

                  {driver.status === "Active" && (
                    <span
                      className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-500 ring-2 ring-white"
                      title="Active driver"
                      aria-hidden={false}
                      aria-label="Active driver"
                    />
                  )}
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

              {/* Call driver: tel: link if phone exists, otherwise disabled */}
              {telHref ? (
                <a
                  href={telHref}
                  className="w-full inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm font-medium"
                  aria-label={`Call driver ${driver.name} at ${cleanPhone}`}
                >
                  <FaPhone className="mr-2" /> Call {cleanPhone}
                </a>
              ) : (
                <button
                  disabled
                  className="w-full bg-gray-200 text-gray-500 py-2 rounded-md text-sm font-medium cursor-not-allowed"
                  aria-disabled="true"
                  title="Phone number not available"
                >
                  <FaPhone className="mr-2" /> No phone number
                </button>
              )}
            </div>
          )}
        </div>

        {/* Arrival Time */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-100">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm text-gray-600">
                {order.immediate ? 'Arrival Time' : 'Scheduled For'}
              </div>
              <div className="text-2xl font-bold text-gray-800">{driver.arrivalTime}</div>
              <div className="text-sm text-gray-600">
                {order.immediate ? 'Driver arriving in' : 'Your ride is scheduled for'}
              </div>
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
            {order.immediate ? 'Book Now' : 'Confirm Booking'}
          </button>
        </div>

        <div className="text-center text-xs text-gray-500 mt-4">
          {order.immediate ? 'Booking now' : 'Scheduled booking'}
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
                    <FaMapMarkerAlt className="text-blue-600" />
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
                    <FaMapMarkerAlt className="text-blue-600" />
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

            {/* Ride Time Selection */}
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700 mb-3 block">When do you need the ride?</label>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <label className={`flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  rideTimeOption === 'now' ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-gray-200 hover:border-blue-300'
                }`}>
                  <input
                    type="radio"
                    name="rideTime"
                    value="now"
                    checked={rideTimeOption === 'now'}
                    onChange={() => setRideTimeOption('now')}
                    className="mr-2 text-blue-500"
                  />
                  <FaClock className="mr-2 text-blue-600" />
                  Right Now
                </label>
                <label className={`flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  rideTimeOption === 'schedule' ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-gray-200 hover:border-blue-300'
                }`}>
                  <input
                    type="radio"
                    name="rideTime"
                    value="schedule"
                    checked={rideTimeOption === 'schedule'}
                    onChange={() => setRideTimeOption('schedule')}
                    className="mr-2 text-blue-500"
                  />
                  <FaCalendarAlt className="mr-2 text-blue-600" />
                  Schedule Later
                </label>
              </div>

              {/* Calendar Component */}
              {rideTimeOption === 'schedule' && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <Calendar 
                    selectedDate={scheduledDate}
                    onDateSelect={setScheduledDate}
                    scheduledTime={scheduledTime}
                    onTimeChange={setScheduledTime}
                  />
                  {errors.scheduledDate && (
                    <p className="text-red-500 text-xs mt-2">{errors.scheduledDate}</p>
                  )}
                  {errors.scheduledTime && (
                    <p className="text-red-500 text-xs mt-2">{errors.scheduledTime}</p>
                  )}
                </div>
              )}
            </div>

            {/* Ride Types */}
            <div className="mb-8">
              <label className="text-lg font-semibold text-gray-900 mb-6 block">Choose Your Ride</label>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {rideTypes.map((ride) => {
                  const Icon = ride.icon;
                  const isSelected = selectedRide === ride.id;
                  return (
                    <div 
                      key={ride.id} 
                      onClick={() => setSelectedRide(ride.id)} 
                      className={`cursor-pointer border-2 rounded-lg p-4 transition-transform duration-300 ${
                        isSelected ? 'border-blue-500 shadow-lg' : 'border-gray-200 hover:border-blue-300 shadow-md'
                      }`}
                    >
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
              <button 
                onClick={handleSubmit} 
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
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