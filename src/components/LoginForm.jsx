// LoginForm.jsx
import React, { useState } from 'react';

const LoginForm = ({ isOpen, onClose, onLoginSuccess }) => {
  const [currentView, setCurrentView] = useState('login');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });
  const [loginData, setLoginData] = useState({
    emailOrPhone: '',
    password: ''
  });
  const [resetEmail, setResetEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  // Input validation
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const re = /^\+?[\d\s-]{10,}$/;
    return re.test(phone);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Simulate user storage (in real app, this would be an API call)
  const storeUser = (userData) => {
    localStorage.setItem('rideAppUser', JSON.stringify(userData));
    setUser(userData);
  };

  const getStoredUser = () => {
    const stored = localStorage.getItem('rideAppUser');
    return stored ? JSON.parse(stored) : null;
  };

  // Form submissions
  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    
    if (!validatePhone(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Valid phone number is required';
    }
    
    if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      // Simulate API call and user creation
      setTimeout(() => {
        const userData = {
          id: Date.now(),
          fullName: formData.fullName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          isVerified: false
        };
        
        storeUser(userData);
        alert('Verification email sent! Please check your inbox.');
        setCurrentView('login');
        setIsLoading(false);
        onClose(); // Close modal after signup
      }, 1000);
    } else {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const newErrors = {};
    
    if (!loginData.emailOrPhone) {
      newErrors.emailOrPhone = 'Email or phone number is required';
    } else if (!validateEmail(loginData.emailOrPhone) && !validatePhone(loginData.emailOrPhone)) {
      newErrors.emailOrPhone = 'Please enter a valid email or phone number';
    }
    
    if (!loginData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      // Simulate API call - check if user exists
      setTimeout(() => {
        const storedUser = getStoredUser();
        
        if (storedUser && 
            (storedUser.email === loginData.emailOrPhone || 
             storedUser.phoneNumber === loginData.emailOrPhone)) {
          
          setUser(storedUser);
          onLoginSuccess(storedUser);
          alert(`Welcome back, ${storedUser.fullName}!`);
          onClose();
        } else {
          setErrors({ emailOrPhone: 'Invalid credentials. Please try again or sign up.' });
        }
        setIsLoading(false);
      }, 1000);
    } else {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!validateEmail(resetEmail)) {
      setErrors({ resetEmail: 'Valid email is required' });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      alert('Password reset link sent to your email!');
      setCurrentView('login');
      setIsLoading(false);
    }, 1000);
  };

  const handleContinueWithEmail = () => {
    if (!validateEmail(loginData.emailOrPhone)) {
      setErrors({ emailOrPhone: 'Please enter a valid email address' });
      return;
    }
    
    alert(`Login continuation email sent to ${loginData.emailOrPhone}`);
  };

  const handleClose = () => {
    setCurrentView('login');
    setErrors({});
    setFormData({
      fullName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: ''
    });
    setLoginData({
      emailOrPhone: '',
      password: ''
    });
    setResetEmail('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-center">
            {currentView === 'login' && 'Welcome Back'}
            {currentView === 'signup' && 'Create Account'}
            {currentView === 'forgot' && 'Reset Password'}
          </h1>
          <p className="text-blue-100 text-center text-sm mt-2">
            {currentView === 'login' && 'Sign in to your account to continue'}
            {currentView === 'signup' && 'Join us today and get started'}
            {currentView === 'forgot' && 'Enter your email to reset your password'}
          </p>
        </div>

        {/* Forms */}
        <div className="p-6">
          {/* Login Form */}
          {currentView === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email or Phone Number
                </label>
                <input
                  type="text"
                  name="emailOrPhone"
                  value={loginData.emailOrPhone}
                  onChange={handleLoginChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.emailOrPhone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter email or phone number"
                />
                {errors.emailOrPhone && (
                  <p className="text-red-500 text-xs mt-1">{errors.emailOrPhone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleContinueWithEmail}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Continue using Email
                </button>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setCurrentView('forgot')}
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  Forgot your password?
                </button>
              </div>

              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-gray-600 text-sm">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setCurrentView('signup')}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </form>
          )}

          {/* Signup Form */}
          {currentView === 'signup' && (
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.fullName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your phone number"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Create a password (min. 8 characters)"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>

              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-gray-600 text-sm">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setCurrentView('login')}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </form>
          )}

          {/* Forgot Password Form */}
          {currentView === 'forgot' && (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => {
                    setResetEmail(e.target.value);
                    if (errors.resetEmail) setErrors(prev => ({ ...prev, resetEmail: '' }));
                  }}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.resetEmail ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email address"
                />
                {errors.resetEmail && (
                  <p className="text-red-500 text-xs mt-1">{errors.resetEmail}</p>
                )}
              </div>

              <p className="text-sm text-gray-600 text-center">
                We'll send you a link to reset your password
              </p>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50"
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setCurrentView('login')}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Back to Sign In
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Security Notice */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-xs text-gray-600">Secure & encrypted login system</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;