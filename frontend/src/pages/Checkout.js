import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { CreditCard, Shield, Lock, Truck, ArrowLeft, Sparkles, Package, CheckCircle, MapPin, User, Mail, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Checkout = () => {
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
  const navigate = useNavigate();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  const API_URL = process.env.REACT_APP_BACKEND_URL;
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const total = cart.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);
  const tax = total * 0.18;
  const finalTotal = total + tax;
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const validateForm = () => {
    const required = ['name', 'email', 'phone', 'address', 'city', 'pincode'];
    for (let field of required) {
      if (!formData[field].trim()) {
        toast.error(`Please fill in your ${field}`);
        return false;
      }
    }
    return true;
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
            const verifyRes = await axios.post(`${API_URL}/api/payment/verify-payment`, {
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
          color: '#8B5CF6'
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

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-24">
        <div className="text-center">
          <Package className="w-24 h-24 text-gray-600 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-gray-400 mb-2">Your cart is empty</h3>
          <p className="text-gray-500 mb-6">Add some products to proceed to checkout</p>
          <Button
            onClick={() => navigate('/products')}
            className="bg-gradient-to-r from-purple-600 to-pink-500 text-white"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Explore Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-green-600/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="container mx-auto pt-24 pb-16 px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-purple-400 mr-3" />
            <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Secure Checkout
            </h1>
          </div>
          <p className="text-gray-400 text-lg">
            Complete your purchase with confidence
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Checkout Steps & Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Steps */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-xl"
            >
              <div className="flex items-center justify-between mb-8">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      activeStep >= step 
                        ? 'bg-purple-500 border-purple-500 text-white' 
                        : 'border-gray-600 text-gray-400'
                    }`}>
                      {activeStep > step ? <CheckCircle className="w-5 h-5" /> : step}
                    </div>
                    {step < 3 && (
                      <div className={`w-20 h-1 mx-4 ${
                        activeStep > step ? 'bg-purple-500' : 'bg-gray-600'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between text-sm text-gray-400">
                <span>Shipping</span>
                <span>Payment</span>
                <span>Confirmation</span>
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
                  className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-xl"
                >
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <MapPin className="w-6 h-6 text-blue-400" />
                    Shipping Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-300 mb-2 block">
                        <User className="w-4 h-4 inline mr-1" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-300 mb-2 block">
                        <Mail className="w-4 h-4 inline mr-1" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500"
                        placeholder="your@email.com"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-300 mb-2 block">
                        <Phone className="w-4 h-4 inline mr-1" />
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500"
                        placeholder="+91 9876543210"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-300 mb-2 block">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500"
                        placeholder="560001"
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="text-sm font-medium text-gray-300 mb-2 block">
                        Street Address *
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full p-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500"
                        placeholder="Enter your complete address"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-300 mb-2 block">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500"
                        placeholder="Bangalore"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-300 mb-2 block">
                        Country
                      </label>
                      <input
                        type="text"
                        value="India"
                        disabled
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl text-gray-400 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between mt-6">
                    <Button
                      variant="outline"
                      onClick={() => navigate('/cart')}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Cart
                    </Button>
                    <Button
                      onClick={() => setActiveStep(2)}
                      className="bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:shadow-lg"
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
                  className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-xl"
                >
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <CreditCard className="w-6 h-6 text-green-400" />
                    Payment Method
                  </h2>

                  <div className="space-y-4">
                    <div className="p-4 border-2 border-purple-500/50 bg-purple-500/10 rounded-xl">
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-6 h-6 text-purple-400" />
                        <div>
                          <h3 className="font-semibold text-white">Credit/Debit Card</h3>
                          <p className="text-gray-400 text-sm">Pay securely with Razorpay</p>
                        </div>
                      </div>
                    </div>

                    {/* Security Features */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="flex items-center gap-3 text-sm text-gray-400">
                        <Shield className="w-4 h-4 text-green-400" />
                        <span>256-bit SSL Secure</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-400">
                        <Lock className="w-4 h-4 text-blue-400" />
                        <span>PCI DSS Compliant</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-400">
                        <Truck className="w-4 h-4 text-purple-400" />
                        <span>Fast Delivery</span>
                      </div>
                    </div>

                    <div className="flex justify-between mt-6">
                      <Button
                        variant="outline"
                        onClick={() => setActiveStep(1)}
                        className="border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Shipping
                      </Button>
                      <Button
                        onClick={handlePayment}
                        disabled={loading}
                        className="bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:shadow-lg hover:scale-105 transition-all px-8"
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
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-xl sticky top-24">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Package className="w-6 h-6 text-purple-400" />
                Order Summary
              </h2>

              {/* Order Items */}
              <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.product?._id} className="flex gap-3 py-3 border-b border-gray-700/30 last:border-b-0">
                    <img
                      src={item.product?.images?.[0]?.url || ''}
                      alt={item.product?.title}
                      className="w-12 h-12 object-cover rounded-lg border border-gray-600"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-white text-sm line-clamp-1">{item.product?.title}</h4>
                      <p className="text-gray-400 text-xs">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-400 text-sm">
                        ₹{((item.product?.price || 0) * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal ({itemCount} items)</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between text-gray-300">
                  <span>Tax (18% GST)</span>
                  <span>₹{tax.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between text-gray-300">
                  <span>Shipping</span>
                  <span className="text-green-400">FREE</span>
                </div>

                <div className="border-t border-gray-700/50 pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent" data-testid="checkout-total">
                      ₹{finalTotal.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
                <Shield className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <p className="text-green-400 text-sm font-medium">Secure Checkout</p>
                <p className="text-gray-400 text-xs">Your payment information is protected</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;