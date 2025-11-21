// App.jsx
import React, { useState, useRef, useEffect } from 'react';
import { FaCar, FaThumbsUp, FaUser, FaSignOutAlt } from 'react-icons/fa';

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
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';

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
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [authMessage, setAuthMessage] = useState('');
  
  const orderButtonRef = useRef(null);
  const bookingFormRef = useRef(null);
  const servicesRef = useRef(null);
  const testimonialsRef = useRef(null);

  // Load user and order history from localStorage on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('rideAppUser');
    const savedOrderHistory = localStorage.getItem('rideOrderHistory');
    
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    if (savedOrderHistory) {
      setOrderHistory(JSON.parse(savedOrderHistory));
    }
  }, []);

  // User registration function
  const handleRegister = (userData) => {
    // Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem('rideAppUsers') || '[]');
    const userExists = existingUsers.find(user => user.email === userData.email);
    
    if (userExists) {
      setAuthMessage('User already exists with this email');
      return false;
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      ...userData,
      createdAt: new Date().toISOString(),
      orderHistory: []
    };

    // Save to users list
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem('rideAppUsers', JSON.stringify(updatedUsers));

    // Auto-login after registration
    setCurrentUser(newUser);
    localStorage.setItem('rideAppUser', JSON.stringify(newUser));
    setShowRegistrationForm(false);
    setAuthMessage('Registration successful! Welcome to Ufit.');
    
    return true;
  };

  // User login function
  const handleLogin = (credentials) => {
    const existingUsers = JSON.parse(localStorage.getItem('rideAppUsers') || '[]');
    const user = existingUsers.find(u => 
      u.email === credentials.email && u.password === credentials.password
    );

    if (user) {
      setCurrentUser(user);
      localStorage.setItem('rideAppUser', JSON.stringify(user));
      setShowLoginForm(false);
      setAuthMessage('Login successful!');
      return true;
    } else {
      setAuthMessage('Invalid email or password');
      return false;
    }
  };

  // Google OAuth login function
  const handleGoogleLogin = async () => {
    try {
      // Simulate Google OAuth flow - in a real app, this would integrate with Google OAuth2
      // For demo purposes, we'll create a mock Google user
      
      // Show loading state
      setAuthMessage('Connecting to Google...');
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock Google user data
      const googleUser = {
        id: `google_${Date.now()}`,
        name: 'Google User',
        email: `googleuser${Math.floor(Math.random() * 1000)}@gmail.com`,
        isGoogleUser: true,
        createdAt: new Date().toISOString(),
        orderHistory: []
      };

      // Check if user already exists in local storage
      const existingUsers = JSON.parse(localStorage.getItem('rideAppUsers') || '[]');
      let existingUser = existingUsers.find(user => user.email === googleUser.email);
      
      if (!existingUser) {
        // Add new Google user to users list
        const updatedUsers = [...existingUsers, googleUser];
        localStorage.setItem('rideAppUsers', JSON.stringify(updatedUsers));
        existingUser = googleUser;
      }

      // Log in the user
      setCurrentUser(existingUser);
      localStorage.setItem('rideAppUser', JSON.stringify(existingUser));
      setShowLoginForm(false);
      setAuthMessage('Google login successful! Welcome to Ufit.');
      
      return true;
    } catch (error) {
      console.error('Google login failed:', error);
      setAuthMessage('Google login failed. Please try again.');
      return false;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('rideAppUser');
    setCurrentUser(null);
    setAuthMessage('You have been logged out');
  };

  // Switch between login and registration forms
  const switchToRegister = () => {
    setShowLoginForm(false);
    setShowRegistrationForm(true);
    setAuthMessage('');
  };

  const switchToLogin = () => {
    setShowRegistrationForm(false);
    setShowLoginForm(true);
    setAuthMessage('');
  };

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
        if (bookingFormRef.current) {
          bookingFormRef.current.classList.remove('ring-2', 'ring-blue-500', 'ring-opacity-50');
        }
      }, 1500);
    }
  };

  // Scroll to services section with highlight effect
  const scrollToServices = () => {
    if (servicesRef.current) {
      servicesRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      // Add a slight highlight effect
      servicesRef.current.classList.add('ring-2', 'ring-blue-500', 'ring-opacity-50');
      setTimeout(() => {
        if (servicesRef.current) {
          servicesRef.current.classList.remove('ring-2', 'ring-blue-500', 'ring-opacity-50');
        }
      }, 1500);
    }
  };

  // Scroll to testimonials section with highlight effect
  const scrollToTestimonials = () => {
    if (testimonialsRef.current) {
      testimonialsRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      // Add a slight highlight effect
      testimonialsRef.current.classList.add('ring-2', 'ring-blue-500', 'ring-opacity-50');
      setTimeout(() => {
        if (testimonialsRef.current) {
          testimonialsRef.current.classList.remove('ring-2', 'ring-blue-500', 'ring-opacity-50');
        }
      }, 1500);
    }
  };

  // Handle navigation from auth forms
  const handleNavigateFromAuth = (section) => {
    setShowLoginForm(false);
    setShowRegistrationForm(false);
    
    switch(section) {
      case 'booking':
        scrollToBookingForm();
        break;
      case 'services':
        scrollToServices();
        break;
      case 'testimonials':
        scrollToTestimonials();
        break;
      default:
        scrollToBookingForm();
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
        id: Date.now(),
        status: 'completed',
        timestamp: new Date().toISOString(),
        driver: getRandomDriverName(),
        rating: (Math.random() * (5 - 4) + 4).toFixed(1),
        duration: `${Math.floor(Math.random() * (30 - 10 + 1) + 10)} min`
      };
      
      const updatedHistory = [orderWithPayment, ...orderHistory];
      setOrderHistory(updatedHistory);
      localStorage.setItem('rideOrderHistory', JSON.stringify(updatedHistory));
      
      // Also update user's order history if logged in
      if (currentUser) {
        const existingUsers = JSON.parse(localStorage.getItem('rideAppUsers') || '[]');
        const updatedUsers = existingUsers.map(user => 
          user.id === currentUser.id 
            ? { ...user, orderHistory: [orderWithPayment, ...user.orderHistory] }
            : user
        );
        localStorage.setItem('rideAppUsers', JSON.stringify(updatedUsers));
      }
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
    console.log(`Location input for ${type}:`, value);
    if (type === 'pickup') setPickupLocation(value);
    else setDropoffLocation(value);
  };

  const handleSuggestionClick = (type, value) => {
    if (type === 'pickup') setPickupLocation(value);
    else setDropoffLocation(value);
  };

  // Handle order animation
  const triggerOrderAnimation = (buttonRect) => {
    setAnimationPosition({
      x: buttonRect.left + buttonRect.width / 2,
      y: buttonRect.top + buttonRect.height / 2,
      targetX: window.innerWidth - 100,
      targetY: 100
    });
    setShowOrderAnimation(true);
    
    setTimeout(() => {
      setShowOrderAnimation(false);
    }, 1000);
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

      {/* Auth Message Toast */}
      {authMessage && (
        <div className="fixed top-4 right-4 z-50 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out">
          <div className="flex items-center space-x-2">
            <FaThumbsUp className="text-white" />
            <span>{authMessage}</span>
            <button 
              onClick={() => setAuthMessage('')}
              className="text-white hover:text-gray-200 ml-2"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Login Form Modal */}
      <LoginForm 
        isOpen={showLoginForm}
        onClose={() => {
          setShowLoginForm(false);
          setAuthMessage('');
        }}
        onLogin={handleLogin}
        onGoogleLogin={handleGoogleLogin}
        onSwitchToRegister={switchToRegister}
        onNavigateToSection={handleNavigateFromAuth}
        authMessage={authMessage}
      />

      {/* Registration Form Modal */}
      <RegistrationForm 
        isOpen={showRegistrationForm}
        onClose={() => {
          setShowRegistrationForm(false);
          setAuthMessage('');
        }}
        onRegister={handleRegister}
        onSwitchToLogin={switchToLogin}
        onNavigateToSection={handleNavigateFromAuth}
        authMessage={authMessage}
      />

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
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-200"
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
        onBookingClick={scrollToBookingForm}
        onServicesClick={scrollToServices}
        onTestimonialsClick={scrollToTestimonials}
        onLoginClick={() => setShowLoginForm(true)}
        onRegisterClick={() => setShowRegistrationForm(true)}
        hasOrderHistory={orderHistory.length > 0}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)}
        onLoginClick={() => {
          setIsMobileMenuOpen(false);
          setShowLoginForm(true);
        }}
        onRegisterClick={() => {
          setIsMobileMenuOpen(false);
          setShowRegistrationForm(true);
        }}
        onBookingClick={() => {
          setIsMobileMenuOpen(false);
          scrollToBookingForm();
        }}
        onServicesClick={() => {
          setIsMobileMenuOpen(false);
          scrollToServices();
        }}
        onTestimonialsClick={() => {
          setIsMobileMenuOpen(false);
          scrollToTestimonials();
        }}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      <main className="mt-24 md:mt-28 flex-1 w-full max-w-6xl mx-auto px-4 py-8">
        <HeroSection 
          onBookNowClick={scrollToBookingForm}
          currentUser={currentUser}
          onLoginClick={() => setShowLoginForm(true)}
          onRegisterClick={() => setShowRegistrationForm(true)}
        />

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
            currentUser={currentUser}
            onLoginRequired={() => setShowLoginForm(true)}
            onRegisterRequired={() => setShowRegistrationForm(true)}
            onPaymentRequired={(orderData) => {
              setPaymentOrder(orderData);
              setShowPaymentForm(true);
            }}
            onOrderAnimation={triggerOrderAnimation}
          />
        </div>

        <div ref={servicesRef}>
          <ServicesSection />
        </div>

        <WhyChooseUsSection />
        
        <div ref={testimonialsRef}>
          <TestimonialsSection />
        </div>

        <DownloadAppSection />
      </main>

      <Footer />
    </div>
  );
}

export default App;