// src/components/BookingForm.jsx
import React, { useState, useCallback, useRef, useEffect } from 'react';
import axios from 'axios';
import { 
  FaCar, FaStar, FaRoad, FaUsers, FaSuitcase, FaShieldAlt, 
  FaCheckCircle, FaClock, FaCalendarAlt, FaMapMarkerAlt, FaTimes,
  FaArrowLeft, FaUser, FaPhone, FaCreditCard, FaRoute,
  FaMap, FaExclamationTriangle
} from 'react-icons/fa';

import MapComponent from './MapComponent';
import PaymentForm from './PaymentForm';
import { locationService } from '../api/locationService';

/* ---------- LocationInput component ---------- */
const LocationInput = ({ label, value, onChange, placeholder, icon: Icon, error }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const abortRef = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    // cleanup on unmount
    return () => {
      if (abortRef.current) abortRef.current.abort();
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const fetchSuggestions = async (q) => {
    if (!q || q.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      setApiError(null);
      return;
    }

    // abort previous
    if (abortRef.current) {
      abortRef.current.abort();
    }
    abortRef.current = new AbortController();

    setIsLoading(true);
    setApiError(null);

    try {
      const data = await locationService.getSuggestions(q, abortRef.current.signal);
      // ensure we have array
      setSuggestions(Array.isArray(data) ? data : []);
      setShowSuggestions(true);
    } catch (err) {
      // aborted - don't show error
      if (err?.code === 'ERR_CANCELED' || err?.name === 'CanceledError' || err?.name === 'AbortError') {
        // ignore
      } else {
        console.error('Suggestion API error', err);
        setApiError('Failed to load suggestions. Try again.');
        setSuggestions([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    onChange(val);
    setApiError(null);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchSuggestions(val);
    }, 350);
  };

  const handleSuggestionClick = (s) => {
    // suggestions may be objects like { text, magicKey, isCollection }
    // normalize to a string value when calling parent onChange
    const value = typeof s === 'string' ? s : (s && s.text) ? s.text : String(s);
    onChange(value);
    setShowSuggestions(false);
    setSuggestions([]);
    setApiError(null);
  };

  const handleClear = () => {
    onChange('');
    setSuggestions([]);
    setShowSuggestions(false);
    setApiError(null);
    if (abortRef.current) abortRef.current.abort();
  };

  return (
    <div className="relative">
      <label className="text-sm font-semibold text-gray-700 mb-3 block">{label}</label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <Icon className="text-blue-600 text-lg" />
        </div>
        <input
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onFocus={() => value.length >= 2 && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 180)}
          className="pl-12 pr-10 h-14 border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 bg-white rounded-xl text-base w-full hover:border-blue-300 transition-all duration-200"
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <FaTimes />
          </button>
        )}
      </div>

      {isLoading && (
        <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
        </div>
      )}

      {apiError && (
        <div className="absolute z-20 w-full mt-1 bg-yellow-50 border border-yellow-200 rounded-xl shadow-lg p-3">
          <div className="flex items-center">
            <FaExclamationTriangle className="text-yellow-500 mr-2" />
            <span className="text-yellow-700 text-sm">{apiError}</span>
          </div>
        </div>
      )}

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((s, i) => {
            const text = typeof s === 'string' ? s : (s && s.text) ? s.text : String(s);
            return (
              <div
                key={i}
                onClick={() => handleSuggestionClick(s)}
                className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors duration-150 border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-blue-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-800 font-medium">{text}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-2 font-medium">{error}</p>}
    </div>
  );
};

/* ---------- BookingForm ---------- */
export default function BookingForm() {
  const [step, setStep] = useState(1);
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [selectedRide, setSelectedRide] = useState(null);
  const [order, setOrder] = useState(null);
  const [errors, setErrors] = useState({});
  const [rideTimeOption, setRideTimeOption] = useState('now');
  const [routeInfo, setRouteInfo] = useState(null);
  const [calculatedPrice, setCalculatedPrice] = useState(null);
  const [showMapAfterBooking, setShowMapAfterBooking] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [rideHistory, setRideHistory] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const rideTypes = [
    { id: 'economy', name: 'Economy', icon: FaCar, basePrice: 1500, time: '5 min', description: 'Affordable everyday rides', features: [{ text: 'AC' }, { text: 'Standard Comfort' }, { text: 'Safe Ride' }] },
    { id: 'premium', name: 'Premium', icon: FaStar, basePrice: 2500, time: '7 min', description: 'Luxury comfort rides', features: [{ text: 'Premium Car' }, { text: 'Top Rated Driver' }, { text: 'Luxury Interior' }] },
    { id: 'suv', name: 'SUV', icon: FaRoad, basePrice: 3000, time: '10 min', description: 'Spacious for groups', features: [{ text: '6-8 Seats' }, { text: 'Extra Luggage Space' }, { text: 'Family Friendly' }] },
  ];

  const calculatePrice = useCallback((distance, rideType) => {
    const ride = rideTypes.find(r => r.id === rideType);
    if (!ride || !distance) return null;
    const baseFare = 2000;
    const distanceFare = distance * ride.basePrice;
    const total = baseFare + distanceFare;
    return Math.round(total / 500) * 500;
  }, [rideTypes]);

  const handleRouteCalculate = (routeData) => {
    setRouteInfo(routeData);
    if (selectedRide && routeData) {
      const price = calculatePrice(routeData.distance, selectedRide);
      setCalculatedPrice(price);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!pickupLocation.trim()) newErrors.pickupLocation = 'Pickup location is required';
    if (!dropoffLocation.trim()) newErrors.dropoffLocation = 'Dropoff location is required';
    if (!selectedRide) newErrors.ride = 'Please select a ride type';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      // simulate backend booking creation
      await new Promise(res => setTimeout(res, 800));
      const ride = rideTypes.find(r => r.id === selectedRide);
      const displayDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      const displayTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
      const price = calculatedPrice ? `${calculatedPrice.toLocaleString()} RWF` : 'Price Unavailable';
      const newOrder = {
        id: Date.now().toString(),
        pickup: pickupLocation,
        dropoff: dropoffLocation,
        type: ride ? ride.name : selectedRide,
        price,
        date: displayDate,
        time: displayTime,
        immediate: rideTimeOption === 'now',
        distance: routeInfo?.distance,
        duration: routeInfo?.time,
        timestamp: new Date().toISOString(),
        status: 'confirmed'
      };
      setOrder(newOrder);
      setStep(2);
      setShowMapAfterBooking(true);
    } catch (err) {
      console.error('booking error', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBookNow = () => setShowPaymentForm(true);
  const handleBackToBooking = () => { setStep(1); setShowMapAfterBooking(false); setShowPaymentForm(false); };

  const handlePaymentSubmit = async (paymentData) => {
    setIsSubmitting(true);
    try {
      await new Promise(res => setTimeout(res, 1200));
      const completedOrder = { ...order, paymentData, status: 'completed', completedAt: new Date().toISOString(), paymentStatus: 'paid' };
      setRideHistory(prev => [completedOrder, ...prev]);
      // reset
      setStep(1);
      setPickupLocation('');
      setDropoffLocation('');
      setSelectedRide(null);
      setRideTimeOption('now');
      setRouteInfo(null);
      setCalculatedPrice(null);
      setOrder(null);
      setShowMapAfterBooking(false);
      setShowPaymentForm(false);
      console.log('Payment success', completedOrder);
    } catch (err) {
      console.error('payment failed', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const showMap = pickupLocation && dropoffLocation && selectedRide;

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl mb-6 shadow-lg">
            <FaCar className="text-white w-10 h-10" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Book Your Ride</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Experience premium transportation with our reliable and comfortable ride service across Rwanda
          </p>
        </div>

        <div className="space-y-8">
          {/* STEP 1 */}
          {step === 1 && !showPaymentForm && (
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <LocationInput label="Pickup Location" value={pickupLocation} onChange={setPickupLocation} placeholder="Enter pickup location in Rwanda" icon={FaMapMarkerAlt} error={errors.pickupLocation} />
                <LocationInput label="Dropoff Location" value={dropoffLocation} onChange={setDropoffLocation} placeholder="Enter dropoff location in Rwanda" icon={FaMapMarkerAlt} error={errors.dropoffLocation} />
              </div>

              <div className="mb-8">
                <label className="text-sm font-semibold text-gray-700 mb-4 block">When do you need the ride?</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className={`flex items-center justify-center p-5 border-2 rounded-xl cursor-pointer transition-all duration-200 ${rideTimeOption === 'now' ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'}`}>
                    <input type="radio" name="rideTime" value="now" checked={rideTimeOption === 'now'} onChange={() => setRideTimeOption('now')} className="mr-3 text-blue-500 focus:ring-blue-500" />
                    <FaClock className="mr-3 text-blue-600 text-lg" />
                    <span className="font-medium">Right Now</span>
                  </label>
                  <label className={`flex items-center justify-center p-5 border-2 rounded-xl cursor-pointer transition-all duration-200 ${rideTimeOption === 'schedule' ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'}`}>
                    <input type="radio" name="rideTime" value="schedule" checked={rideTimeOption === 'schedule'} onChange={() => setRideTimeOption('schedule')} className="mr-3 text-blue-500 focus:ring-blue-500" />
                    <FaCalendarAlt className="mr-3 text-blue-600 text-lg" />
                    <span className="font-medium">Schedule Later</span>
                  </label>
                </div>
              </div>

              <div className="mb-8">
                <label className="text-xl font-bold text-gray-900 mb-6 block">Choose Your Ride</label>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {rideTypes.map((ride) => {
                    const Icon = ride.icon;
                    const isSelected = selectedRide === ride.id;
                    const price = calculatedPrice && isSelected ? `${calculatedPrice.toLocaleString()} RWF` : ride.basePrice < 2000 ? '15,000-20,000 RWF' : '25,000-35,000 RWF';
                    return (
                      <div key={ride.id} onClick={() => setSelectedRide(ride.id)} className={`cursor-pointer border-2 rounded-xl p-6 transition-all duration-300 ${isSelected ? 'border-blue-500 bg-blue-50 shadow-lg' : 'border-gray-200 hover:border-blue-300 hover:shadow-lg'}`}>
                        <div className="flex items-center mb-4">
                          <div className={`w-12 h-12 flex items-center justify-center rounded-xl mr-4 ${isSelected ? 'bg-blue-600' : 'bg-blue-100'}`}>
                            <Icon className={`text-lg ${isSelected ? 'text-white' : 'text-blue-600'}`} />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-800 text-lg">{ride.name}</h3>
                            <p className="text-gray-600 text-sm">{ride.description}</p>
                          </div>
                        </div>
                        <div className="space-y-2 mb-4">
                          {ride.features.map((f, i) => (
                            <div key={i} className="flex items-center space-x-3">
                              <FaCheckCircle className="w-4 h-4 text-blue-600" />
                              <span className="text-sm text-gray-700">{f.text}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-gray-900 font-bold text-lg">{price}</div>
                          <div className="flex items-center text-blue-600 text-sm font-medium">
                            <FaClock className="w-4 h-4 mr-2" /> {ride.time} ETA
                          </div>
                        </div>
                        {routeInfo && isSelected && (
                          <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-600">
                            <div className="flex justify-between"><span>Distance:</span><span className="font-medium">{routeInfo.distance} km</span></div>
                            <div className="flex justify-between"><span>Est. Time:</span><span className="font-medium">{routeInfo.time} min</span></div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                {errors.ride && <p className="text-red-500 text-sm mt-4 font-medium">{errors.ride}</p>}
              </div>

              <div className="flex justify-center">
                <button onClick={handleSubmit} disabled={!showMap || isSubmitting} className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 sm:px-12 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                  {isSubmitting ? (<div className="flex items-center"><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>Processing...</div>) : 'Confirm & Book Ride'}
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && order && !showPaymentForm && (
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaCheckCircle className="text-green-500 text-3xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Ride Confirmed!</h2>
                  <p className="text-gray-600">Your driver is on the way to pick you up</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                    <h3 className="font-semibold text-gray-800 mb-4 text-lg">Trip Details</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center text-sm text-gray-600 mb-2"><div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>Pickup Location</div>
                        <div className="font-medium text-gray-800 ml-6">{order.pickup}</div>
                      </div>
                      <div>
                        <div className="flex items-center text-sm text-gray-600 mb-2"><div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>Drop-off Location</div>
                        <div className="font-medium text-gray-800 ml-6">{order.dropoff}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                        <div><div className="text-sm text-gray-600">Ride Type</div><div className="font-medium text-gray-800">{order.type}</div></div>
                        <div><div className="text-sm text-gray-600">Date</div><div className="font-medium text-gray-800">{order.date}</div></div>
                        <div><div className="text-sm text-gray-600">Time</div><div className="font-medium text-gray-800">{order.time}</div></div>
                        <div><div className="text-sm text-gray-600">Total Fare</div><div className="font-medium text-blue-600">{order.price}</div></div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                    <h3 className="font-semibold text-gray-800 mb-4 text-lg">Route Information</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between"><span className="text-gray-600">Distance:</span><span className="font-medium">{order.distance || 'N/A'} km</span></div>
                      <div className="flex justify-between"><span className="text-gray-600">Estimated Time:</span><span className="font-medium">{order.duration || 'N/A'} minutes</span></div>
                      <div className="flex justify-between"><span className="text-gray-600">Ride Type:</span><span className="font-medium">{order.type}</span></div>
                      <div className="pt-4 border-t border-gray-200"><div className="flex justify-between text-lg font-bold"><span>Total Amount:</span><span className="text-blue-600">{order.price}</span></div></div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button onClick={handleBackToBooking} className="flex-1 border-2 border-gray-300 text-gray-700 py-4 rounded-xl font-semibold flex items-center justify-center hover:bg-gray-50 transition-all duration-200"><FaArrowLeft className="mr-3" /> Book Another Ride</button>
                  <button onClick={handleBookNow} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg">Proceed to Payment</button>
                </div>
              </div>

              {showMapAfterBooking && (
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center"><FaMap className="mr-3 text-blue-600" />Your Route Map</h3>
                    {routeInfo && calculatedPrice && (<div className="bg-blue-50 px-4 py-2 rounded-lg border border-blue-200"><div className="text-sm text-blue-700 font-semibold">Total: {calculatedPrice.toLocaleString()} RWF</div></div>)}
                  </div>

                  <MapComponent pickupLocation={pickupLocation} dropoffLocation={dropoffLocation} routeInfo={routeInfo} onRouteCalculate={handleRouteCalculate} />
                </div>
              )}
            </div>
          )}

          {showPaymentForm && order && (
            <PaymentForm order={order} onPaymentSubmit={handlePaymentSubmit} onClose={() => setShowPaymentForm(false)} onPaymentSuccess={() => {}} isSubmitting={isSubmitting} />
          )}

          {step === 1 && showMap && !showPaymentForm && (
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Route Preview</h3>
                {routeInfo && calculatedPrice && (<div className="bg-blue-50 px-4 py-2 rounded-lg border border-blue-200"><div className="text-sm text-blue-700 font-semibold">Estimated: {calculatedPrice.toLocaleString()} RWF</div></div>)}
              </div>

              <div className="h-64 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <FaRoute className="text-blue-500 text-4xl mx-auto mb-4" />
                  <p className="text-gray-600 font-medium">Complete booking to see detailed map</p>
                  <p className="text-gray-500 text-sm mt-2">Route: {pickupLocation} → {dropoffLocation}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
