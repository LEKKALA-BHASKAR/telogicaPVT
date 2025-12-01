import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { CreditCard, Shield, Lock, Truck, ArrowLeft, Sparkles, Package, CheckCircle, MapPin, User, Mail, Phone, Building, Globe, Wallet, Smartphone, Clock, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Checkout = () => {
  const { isDarkMode } = useTheme();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    country: 'India'
  });
  const [activeStep, setActiveStep] = useState(1);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const API_URL = process.env.REACT_APP_BACKEND_URL;
  
  useEffect(() => {
    fetchCart();
    loadRazorpayScript();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/products/cart/items`);
      setCart(res.data.data);
    } catch (error) {
      toast.error('Failed to load cart');
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const total = cart.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);
  const tax = total * 0.18;
  const shipping = total > 10000 ? 0 : 500;
  const finalTotal = total + tax + shipping;
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const validateForm = () => {
    const newErrors = {};
    const required = ['name', 'email', 'phone', 'address', 'city', 'pincode'];
    
    for (let field of required) {
      if (!formData[field].trim()) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    }
    
    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Phone validation
    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    // Pincode validation
    if (formData.pincode && !/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinueToPayment = () => {
    if (validateForm()) {
      setActiveStep(2);
    } else {
      toast.error('Please fill in all required fields correctly');
    }
  };

  const handlePayment = async () => {
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      // Create Razorpay order
      const orderRes = await axios.post(`${API_URL}/api/payment/create-order`, {
        amount: Math.round(finalTotal * 100) // Convert to paise
      });

      const { id: order_id, amount, currency } = orderRes.data.data;

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID || 'rzp_test_xxxxxxxxxxxxxxxx',
        amount: amount,
        currency: currency,
        name: 'Telogica Ltd',
        description: 'Premium Telecom Equipment',
        order_id: order_id,
        handler: async function (response) {
          try {
            // Verify payment
            await axios.post(`${API_URL}/api/payment/verify-payment`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              cartItems: cart,
              totalAmount: finalTotal,
              shippingAddress: formData
            });

            toast.success('Payment successful! Order confirmed.');
            navigate('/my-orders');
          } catch (error) {
            toast.error('Payment verification failed');
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: isDarkMode ? '#8B5CF6' : '#7C3AED'
        },
        modal: {
          ondismiss: function() {
            toast.info('Payment cancelled');
            setLoading(false);
          }
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Failed to initiate payment');
      setLoading(false);
    }
  };

  const paymentMethods = [
    { id: 'card', label: 'Credit/Debit Card', icon: CreditCard, description: 'Visa, Mastercard, RuPay' },
    { id: 'upi', label: 'UPI', icon: Smartphone, description: 'GPay, PhonePe, Paytm' },
    { id: 'netbanking', label: 'Net Banking', icon: Building, description: 'All major banks' },
    { id: 'wallet', label: 'Wallets', icon: Wallet, description: 'Paytm, PhonePe, Amazon Pay' },
  ];

  if (cart.length === 0) {
    return (
      <div className={`min-h-screen flex items-center justify-center pt-24 ${isDarkMode ? 'bg-black' : 'bg-slate-50'}`}>
        <div className="text-center">
          <div className={`w-32 h-32 mx-auto mb-8 rounded-full flex items-center justify-center ${
            isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
          }`}>
            <Package className={`w-16 h-16 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
          </div>
          <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Your cart is empty
          </h3>
          <p className={`mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Add some products to proceed to checkout
          </p>
          <Button
            onClick={() => navigate('/products')}
            className={`${
              isDarkMode 
                ? 'bg-gradient-to-r from-purple-600 to-pink-500' 
                : 'bg-gradient-to-r from-violet-600 to-purple-600'
            } text-white px-8 py-6 text-lg`}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Explore Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen font-sans relative overflow-hidden transition-colors duration-500 ${
      isDarkMode ? 'bg-black text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 ${
          isDarkMode ? 'bg-purple-600' : 'bg-purple-400'
        }`} />
        <div className={`absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[100px] opacity-15 ${
          isDarkMode ? 'bg-blue-600' : 'bg-blue-400'
        }`} />
        <div className={`absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full blur-[80px] opacity-10 ${
          isDarkMode ? 'bg-green-600' : 'bg-green-400'
        }`} />
      </div>

      <div className="container mx-auto pt-28 pb-16 px-4 relative z-10 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Lock className={`w-8 h-8 mr-3 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
            <h1 className={`text-4xl lg:text-5xl font-bold ${
              isDarkMode 
                ? 'bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent' 
                : 'bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent'
            }`}>
              Secure Checkout
            </h1>
          </div>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
            Complete your purchase with confidence
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Steps & Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Steps */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`rounded-3xl p-6 border backdrop-blur-xl ${
                isDarkMode 
                  ? 'bg-white/5 border-white/10' 
                  : 'bg-white border-gray-200 shadow-lg'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                {[
                  { step: 1, label: 'Shipping', icon: MapPin },
                  { step: 2, label: 'Payment', icon: CreditCard },
                  { step: 3, label: 'Confirmation', icon: CheckCircle }
                ].map((item, index) => (
                  <React.Fragment key={item.step}>
                    <div className="flex flex-col items-center">
                      <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
                        activeStep >= item.step 
                          ? isDarkMode
                            ? 'bg-purple-500 border-purple-500 text-white shadow-lg shadow-purple-500/25' 
                            : 'bg-violet-600 border-violet-600 text-white shadow-lg shadow-violet-600/25'
                          : isDarkMode
                            ? 'border-gray-700 text-gray-500 bg-gray-800/50'
                            : 'border-gray-300 text-gray-400 bg-gray-50'
                      }`}>
                        {activeStep > item.step ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : (
                          <item.icon className="w-5 h-5" />
                        )}
                      </div>
                      <span className={`mt-2 text-xs font-medium ${
                        activeStep >= item.step 
                          ? isDarkMode ? 'text-white' : 'text-gray-900'
                          : isDarkMode ? 'text-gray-500' : 'text-gray-400'
                      }`}>
                        {item.label}
                      </span>
                    </div>
                    {index < 2 && (
                      <div className={`flex-1 h-1 mx-4 rounded-full transition-all ${
                        activeStep > item.step 
                          ? isDarkMode ? 'bg-purple-500' : 'bg-violet-600'
                          : isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
                      }`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </motion.div>

            {/* Shipping Form */}
            <AnimatePresence mode="wait">
              {activeStep === 1 && (
                <motion.div
                  key="shipping-form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={`rounded-3xl p-6 border backdrop-blur-xl ${
                    isDarkMode 
                      ? 'bg-white/5 border-white/10' 
                      : 'bg-white border-gray-200 shadow-lg'
                  }`}
                >
                  <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    <div className={`p-2 rounded-xl ${isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                      <MapPin className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    </div>
                    Shipping Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <label className={`text-sm font-medium flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <User className="w-4 h-4" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full p-4 rounded-xl border transition-all focus:ring-2 ${
                          isDarkMode 
                            ? `bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500/20 ${errors.name ? 'border-red-500' : ''}`
                            : `bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-violet-500 focus:ring-violet-500/20 ${errors.name ? 'border-red-500' : ''}`
                        }`}
                        placeholder="John Doe"
                        required
                      />
                      {errors.name && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className={`text-sm font-medium flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <Mail className="w-4 h-4" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full p-4 rounded-xl border transition-all focus:ring-2 ${
                          isDarkMode 
                            ? `bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500/20 ${errors.email ? 'border-red-500' : ''}`
                            : `bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-violet-500 focus:ring-violet-500/20 ${errors.email ? 'border-red-500' : ''}`
                        }`}
                        placeholder="john@example.com"
                        required
                      />
                      {errors.email && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label className={`text-sm font-medium flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <Phone className="w-4 h-4" />
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full p-4 rounded-xl border transition-all focus:ring-2 ${
                          isDarkMode 
                            ? `bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500/20 ${errors.phone ? 'border-red-500' : ''}`
                            : `bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-violet-500 focus:ring-violet-500/20 ${errors.phone ? 'border-red-500' : ''}`
                        }`}
                        placeholder="9876543210"
                        required
                      />
                      {errors.phone && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.phone}</p>}
                    </div>

                    {/* Pincode */}
                    <div className="space-y-2">
                      <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Pincode *
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className={`w-full p-4 rounded-xl border transition-all focus:ring-2 ${
                          isDarkMode 
                            ? `bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500/20 ${errors.pincode ? 'border-red-500' : ''}`
                            : `bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-violet-500 focus:ring-violet-500/20 ${errors.pincode ? 'border-red-500' : ''}`
                        }`}
                        placeholder="560001"
                        required
                      />
                      {errors.pincode && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.pincode}</p>}
                    </div>

                    {/* Address */}
                    <div className="md:col-span-2 space-y-2">
                      <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Street Address *
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows="3"
                        className={`w-full p-4 rounded-xl border transition-all focus:ring-2 resize-none ${
                          isDarkMode 
                            ? `bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500/20 ${errors.address ? 'border-red-500' : ''}`
                            : `bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-violet-500 focus:ring-violet-500/20 ${errors.address ? 'border-red-500' : ''}`
                        }`}
                        placeholder="Enter your complete address"
                        required
                      />
                      {errors.address && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.address}</p>}
                    </div>

                    {/* City */}
                    <div className="space-y-2">
                      <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`w-full p-4 rounded-xl border transition-all focus:ring-2 ${
                          isDarkMode 
                            ? `bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500/20 ${errors.city ? 'border-red-500' : ''}`
                            : `bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-violet-500 focus:ring-violet-500/20 ${errors.city ? 'border-red-500' : ''}`
                        }`}
                        placeholder="Bangalore"
                        required
                      />
                      {errors.city && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.city}</p>}
                    </div>

                    {/* Country */}
                    <div className="space-y-2">
                      <label className={`text-sm font-medium flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <Globe className="w-4 h-4" />
                        Country
                      </label>
                      <input
                        type="text"
                        value="India"
                        disabled
                        className={`w-full p-4 rounded-xl border ${
                          isDarkMode 
                            ? 'bg-gray-800/30 border-gray-700 text-gray-500 cursor-not-allowed'
                            : 'bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between mt-8">
                    <Button
                      variant="outline"
                      onClick={() => navigate('/cart')}
                      className={isDarkMode ? 'border-gray-700 hover:bg-gray-800' : ''}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Cart
                    </Button>
                    <Button
                      onClick={handleContinueToPayment}
                      className={`${
                        isDarkMode 
                          ? 'bg-gradient-to-r from-purple-600 to-pink-500 hover:shadow-lg hover:shadow-purple-500/25' 
                          : 'bg-gradient-to-r from-violet-600 to-purple-600 hover:shadow-lg hover:shadow-violet-600/25'
                      } text-white transition-all`}
                    >
                      Continue to Payment
                      <CreditCard className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Payment Step */}
              {activeStep === 2 && (
                <motion.div
                  key="payment-step"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={`rounded-3xl p-6 border backdrop-blur-xl ${
                    isDarkMode 
                      ? 'bg-white/5 border-white/10' 
                      : 'bg-white border-gray-200 shadow-lg'
                  }`}
                >
                  <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    <div className={`p-2 rounded-xl ${isDarkMode ? 'bg-green-500/20' : 'bg-green-100'}`}>
                      <CreditCard className={`w-5 h-5 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                    </div>
                    Payment Method
                  </h2>

                  {/* Payment Methods Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {paymentMethods.map((method) => {
                      const Icon = method.icon;
                      const isSelected = selectedPaymentMethod === method.id;
                      return (
                        <button
                          key={method.id}
                          onClick={() => setSelectedPaymentMethod(method.id)}
                          className={`p-4 rounded-2xl border-2 text-left transition-all ${
                            isSelected
                              ? isDarkMode
                                ? 'border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/10'
                                : 'border-violet-500 bg-violet-50 shadow-lg shadow-violet-500/10'
                              : isDarkMode
                                ? 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
                                : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-xl ${
                              isSelected
                                ? isDarkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-violet-100 text-violet-600'
                                : isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'
                            }`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                {method.label}
                              </h3>
                              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                {method.description}
                              </p>
                            </div>
                            {isSelected && (
                              <CheckCircle className={`w-5 h-5 ml-auto ${isDarkMode ? 'text-purple-400' : 'text-violet-600'}`} />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Shipping Address Summary */}
                  <div className={`p-4 rounded-2xl mb-6 ${
                    isDarkMode ? 'bg-black/30 border border-white/5' : 'bg-gray-50 border border-gray-100'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className={`font-semibold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        <MapPin className="w-4 h-4" />
                        Shipping Address
                      </h4>
                      <button
                        onClick={() => setActiveStep(1)}
                        className={`text-sm ${isDarkMode ? 'text-purple-400 hover:text-purple-300' : 'text-violet-600 hover:text-violet-700'}`}
                      >
                        Edit
                      </button>
                    </div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {formData.name}<br />
                      {formData.address}<br />
                      {formData.city}, {formData.pincode}<br />
                      {formData.email} • {formData.phone}
                    </p>
                  </div>

                  {/* Security Features */}
                  <div className={`grid grid-cols-3 gap-4 p-4 rounded-2xl mb-6 ${
                    isDarkMode ? 'bg-green-500/5 border border-green-500/10' : 'bg-green-50 border border-green-100'
                  }`}>
                    {[
                      { icon: Shield, label: '256-bit SSL' },
                      { icon: Lock, label: 'PCI Compliant' },
                      { icon: CheckCircle, label: 'Verified' }
                    ].map((item, index) => (
                      <div key={index} className="flex flex-col items-center text-center">
                        <item.icon className={`w-5 h-5 mb-1 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                        <span className={`text-xs font-medium ${isDarkMode ? 'text-green-400' : 'text-green-700'}`}>
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setActiveStep(1)}
                      className={isDarkMode ? 'border-gray-700 hover:bg-gray-800' : ''}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Shipping
                    </Button>
                    <Button
                      onClick={handlePayment}
                      disabled={loading}
                      className={`px-8 ${
                        isDarkMode 
                          ? 'bg-gradient-to-r from-green-600 to-emerald-500 hover:shadow-lg hover:shadow-green-500/25' 
                          : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:shadow-lg hover:shadow-green-600/25'
                      } text-white transition-all`}
                      data-testid="pay-now-btn"
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full w-4 h-4 border-b-2 border-white"></div>
                          Processing...
                        </div>
                      ) : (
                        <>
                          <Lock className="w-4 h-4 mr-2" />
                          Pay ₹{finalTotal.toLocaleString()}
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className={`rounded-3xl p-6 border backdrop-blur-xl sticky top-24 ${
              isDarkMode 
                ? 'bg-white/5 border-white/10' 
                : 'bg-white border-gray-200 shadow-xl'
            }`}>
              <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                <Package className={`w-6 h-6 ${isDarkMode ? 'text-purple-400' : 'text-violet-600'}`} />
                Order Summary
              </h2>

              {/* Order Items */}
              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div key={item.product?._id} className={`flex gap-3 p-3 rounded-xl ${
                    isDarkMode ? 'bg-black/30' : 'bg-gray-50'
                  }`}>
                    {item.product?.images?.[0]?.url ? (
                      <img
                        src={item.product.images[0].url}
                        alt={item.product?.title}
                        className="w-14 h-14 object-cover rounded-lg border border-gray-200/20"
                      />
                    ) : (
                      <div className={`w-14 h-14 rounded-lg flex items-center justify-center ${
                        isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
                      }`}>
                        <Package className={`w-6 h-6 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-medium text-sm line-clamp-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {item.product?.title}
                      </h4>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className={`font-semibold text-sm ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                        ₹{((item.product?.price || 0) * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className={`flex justify-between text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span>Subtotal ({itemCount} items)</span>
                  <span className="font-medium">₹{total.toLocaleString()}</span>
                </div>
                
                <div className={`flex justify-between text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span>Tax (18% GST)</span>
                  <span className="font-medium">₹{tax.toLocaleString()}</span>
                </div>
                
                <div className={`flex justify-between text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span>Shipping</span>
                  {shipping === 0 ? (
                    <span className={`font-medium ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>FREE</span>
                  ) : (
                    <span className="font-medium">₹{shipping.toLocaleString()}</span>
                  )}
                </div>

                <div className={`border-t pt-4 ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
                  <div className="flex justify-between text-lg font-bold">
                    <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>Total</span>
                    <span className={`${
                      isDarkMode 
                        ? 'bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent' 
                        : 'text-green-600'
                    }`} data-testid="checkout-total">
                      ₹{finalTotal.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Estimated Delivery */}
              <div className={`p-4 rounded-2xl mb-4 ${
                isDarkMode ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-100'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                    <Clock className={`w-4 h-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                      Estimated Delivery
                    </p>
                    <p className={`text-xs ${isDarkMode ? 'text-blue-300/70' : 'text-blue-600'}`}>
                      5-7 business days
                    </p>
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className={`p-4 rounded-2xl text-center ${
                isDarkMode ? 'bg-green-500/10 border border-green-500/20' : 'bg-green-50 border border-green-100'
              }`}>
                <Shield className={`w-8 h-8 mx-auto mb-2 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                <p className={`text-sm font-medium ${isDarkMode ? 'text-green-400' : 'text-green-700'}`}>
                  Secure Checkout
                </p>
                <p className={`text-xs ${isDarkMode ? 'text-green-300/60' : 'text-green-600'}`}>
                  Your payment information is protected
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;