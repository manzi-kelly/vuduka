import React, { useState, useRef } from 'react';
import { FaCar, FaThumbsUp } from 'react-icons/fa';

import Header from './components/Header';
import MobileMenu from './components/MobileMenu';
import PaymentForm from './components/PaymentForm';
import HeroSection from './components/HeroSection';
import BookingForm from './components/BookingForm';
import ServicesSection from './components/ServicesSection';
import WhyChooseUsSection from './components/WhyChooseUsSection';
import TestimonialsSection from './components/TestimonialsSection';
import DownloadAppSection from './components/DownloadAppSection';
import Footer from './components/Footer';
import OrderHistory from './components/OrderHistory';

function App() {
  const [order, setOrder] = useState(null);
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [rideType, setRideType] = useState('economy');
  const [step, setStep] = useState(1);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState([]);
  const [showOrderAnimation, setShowOrderAnimation] = useState(false);
  const [animationPosition, setAnimationPosition] = useState({x: 0, y: 0, targetX: 100, targetY: 100});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [paymentOrder, setPaymentOrder] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [orderHistory, setOrderHistory] = useState([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  
  const orderButtonRef = useRef(null);
  const bookingFormRef = useRef(null);
  <Header 
  onMenuClick={() => setIsMobileMenuOpen(true)}
  onHistoryClick={() => setIsHistoryOpen(true)}
  onAboutClick={() => setShowAbout(true)}
  hasOrderHistory={orderHistory.length > 0}
  />




  {showAbout && (
  <div 
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    onClick={() => setShowAbout(false)}
  >
    <div 
      className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Your About modal content from HeroSection */}
    </div>
  </div>
)}



  // Scroll to booking form with highlight effect
  const scrollToBookingForm = () => {
    if (bookingFormRef.current) {
      bookingFormRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      // Add a slight highlight effect
      bookingFormRef.current.classList.add('ring-2', 'ring-blue-500', 'ring-opacity-50');
      setTimeout(() => {
        bookingFormRef.current.classList.remove('ring-2', 'ring-blue-500', 'ring-opacity-50');
      }, 1500);
    }
  };

  // Handle payment submission
  const handlePaymentSubmit = (paymentData) => {
    console.log('Payment submitted:', paymentData);
    setPaymentSuccess(true);
    setShowPaymentForm(false);
    
    // Add the completed order to history
    if (paymentOrder) {
      const orderWithPayment = {
        ...paymentOrder,
        payment: paymentData,
        id: Date.now(), // unique ID for the order
        status: 'completed',
        timestamp: new Date().toISOString(),
        driver: getRandomDriverName(),
        rating: (Math.random() * (5 - 4) + 4).toFixed(1),
        duration: `${Math.floor(Math.random() * (30 - 10 + 1) + 10)} min`
      };
      
      setOrderHistory(prev => [orderWithPayment, ...prev]);
      localStorage.setItem('rideOrderHistory', JSON.stringify([orderWithPayment, ...orderHistory]));
    }
  };

  // Helper function to generate random driver names
  const getRandomDriverName = () => {
    const names = ['Jean Claude', 'Marie Aimee', 'Paul R.', 'Alice M.', 'John D.', 'Chantal U.', 'Eric K.', 'Divine I.'];
    return names[Math.floor(Math.random() * names.length)];
  };

  const handleOrderSubmit = (orderData) => {
    setOrder(orderData);
    console.log('Order submitted:', orderData);
  };

  const handleReset = () => {
    setStep(1);
    setOrder(null);
  };

  const handleLocationInput = (type, value) => {
    if (type === 'pickup') setPickupLocation(value);
    else setDropoffLocation(value);
  };

  const handleSuggestionClick = (type, value) => {
    if (type === 'pickup') setPickupLocation(value);
    else setDropoffLocation(value);
  };

  // Load order history from localStorage on component mount
  React.useEffect(() => {
    const savedOrderHistory = localStorage.getItem('rideOrderHistory');
    if (savedOrderHistory) {
      setOrderHistory(JSON.parse(savedOrderHistory));
    }
  }, []);

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

      {/* Order History Modal */}
      {isHistoryOpen && (
        <OrderHistory 
          orders={orderHistory} 
          isOpen={isHistoryOpen} 
          onClose={() => setIsHistoryOpen(false)} 
        />
      )}

      <Header 
        onMenuClick={() => setIsMobileMenuOpen(true)}
        onHistoryClick={() => setIsHistoryOpen(true)}
        hasOrderHistory={orderHistory.length > 0}
      />

      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />

      <main className="mt-24 md:mt-28 flex-1 w-full max-w-6xl mx-auto px-4 py-8">
        <HeroSection onBookNowClick={scrollToBookingForm} />

        <div ref={bookingFormRef}>
          <BookingForm 
            step={step}
            order={order}
            pickupLocation={pickupLocation}
            dropoffLocation={dropoffLocation}
            rideType={rideType}
            pickupSuggestions={pickupSuggestions}
            dropoffSuggestions={dropoffSuggestions}
            onOrderSubmit={handleOrderSubmit}
            onReset={handleReset}
            onLocationInput={handleLocationInput}
            onSuggestionClick={handleSuggestionClick}
            onRideTypeChange={setRideType}
            orderButtonRef={orderButtonRef}
          />
        </div>

        <ServicesSection />
        <WhyChooseUsSection />
        <TestimonialsSection />
        <DownloadAppSection />
      </main>

      <Footer />
    </div>
  );
}

export default App;