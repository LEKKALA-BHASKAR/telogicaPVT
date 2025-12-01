import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShoppingCart, Package, Truck, Shield, CreditCard, Sparkles, Heart, X, AlertCircle, CheckCircle, Gift, Percent } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Cart = () => {
  const { isDarkMode } = useTheme();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingItem, setUpdatingItem] = useState(null);
  const [removingItem, setRemovingItem] = useState(null);
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_BACKEND_URL;
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/products/cart/items`);
      setCart(res.data.data);
    } catch (error) {
      toast.error('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;
    
    setUpdatingItem(productId);
    try {
      const res = await axios.put(`${API_URL}/api/products/cart/update`, { productId, quantity });
      setCart(res.data.data);
      toast.success('Cart updated');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update cart');
    } finally {
      setUpdatingItem(null);
    }
  };

  const removeItem = async (productId) => {
    setRemovingItem(productId);
    try {
      const res = await axios.delete(`${API_URL}/api/products/cart/remove/${productId}`);
      setCart(res.data.data);
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error('Failed to remove item');
    } finally {
      setRemovingItem(null);
    }
  };

  const total = cart.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const tax = total * 0.18;
  const shipping = total > 10000 ? 0 : 500;
  const finalTotal = total + tax + shipping;

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center pt-24 ${isDarkMode ? 'bg-black' : 'bg-slate-50'}`}>
        <div className="flex flex-col items-center space-y-4">
          <div className={`animate-spin rounded-full h-16 w-16 border-b-2 ${isDarkMode ? 'border-purple-500' : 'border-violet-600'}`}></div>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Loading your cart...</p>
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
            <ShoppingBag className={`w-8 h-8 mr-3 ${isDarkMode ? 'text-purple-400' : 'text-violet-600'}`} />
            <h1 className={`text-4xl lg:text-5xl font-bold ${
              isDarkMode 
                ? 'bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent' 
                : 'bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent'
            }`}>
              Shopping Cart
            </h1>
          </div>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
            Review and manage your selected items
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {cart.length === 0 ? (
            <motion.div
              key="empty-cart"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-20"
            >
              <div className={`p-12 rounded-3xl border backdrop-blur-xl max-w-lg mx-auto ${
                isDarkMode 
                  ? 'bg-white/5 border-white/10' 
                  : 'bg-white border-gray-200 shadow-xl'
              }`}>
                <div className={`w-32 h-32 mx-auto mb-8 rounded-full flex items-center justify-center ${
                  isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                }`}>
                  <ShoppingCart className={`w-16 h-16 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                </div>
                <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Your cart is empty
                </h3>
                <p className={`mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Discover our amazing products and add them to your cart
                </p>
                <Button
                  onClick={() => navigate('/products')}
                  className={`${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-500' 
                      : 'bg-gradient-to-r from-violet-600 to-purple-600'
                  } text-white hover:shadow-lg hover:scale-105 transition-all px-8 py-6 text-lg`}
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Explore Products
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="cart-with-items"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid lg:grid-cols-3 gap-8"
            >
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6" data-testid="cart-items">
                <div className="flex items-center justify-between mb-6">
                  <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Your Items ({itemCount} {itemCount === 1 ? 'item' : 'items'})
                  </h2>
                  <button
                    onClick={() => navigate('/products')}
                    className={`flex items-center gap-2 transition-colors ${
                      isDarkMode ? 'text-purple-400 hover:text-purple-300' : 'text-violet-600 hover:text-violet-700'
                    }`}
                  >
                    <Sparkles className="w-4 h-4" />
                    Continue Shopping
                  </button>
                </div>

                <AnimatePresence>
                  {cart.map((item, index) => (
                    <motion.div
                      key={item.product?._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20, height: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`group rounded-3xl p-6 border backdrop-blur-xl transition-all duration-300 ${
                        isDarkMode 
                          ? 'bg-white/5 border-white/10 hover:border-purple-500/30' 
                          : 'bg-white border-gray-200 shadow-lg hover:shadow-xl'
                      } ${removingItem === item.product?._id ? 'opacity-50 scale-95' : ''}`}
                    >
                      <div className="flex gap-6">
                        {/* Product Image */}
                        <div className="relative shrink-0">
                          <div className={`w-24 h-24 lg:w-32 lg:h-32 rounded-2xl overflow-hidden ${
                            isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                          }`}>
                            {item.product?.images?.[0]?.url ? (
                              <img
                                src={item.product.images[0].url}
                                alt={item.product?.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Package className={`w-10 h-10 ${isDarkMode ? 'text-gray-700' : 'text-gray-400'}`} />
                              </div>
                            )}
                          </div>
                          {/* Quantity Badge */}
                          <div className={`absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-lg ${
                            isDarkMode 
                              ? 'bg-purple-500 text-white' 
                              : 'bg-violet-600 text-white'
                          }`}>
                            {item.quantity}
                          </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-3">
                            <div className="pr-4">
                              <h3 className={`text-lg font-bold mb-1 line-clamp-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                {item.product?.title}
                              </h3>
                              <p className={`text-sm line-clamp-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                {item.product?.description}
                              </p>
                              {item.product?.category && (
                                <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                                  isDarkMode 
                                    ? 'bg-purple-500/20 text-purple-400' 
                                    : 'bg-violet-100 text-violet-700'
                                }`}>
                                  {item.product.category}
                                </span>
                              )}
                            </div>
                            <div className="text-right shrink-0">
                              <p className={`text-2xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                                ₹{(item.product?.price || 0).toLocaleString()}
                              </p>
                              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                ₹{((item.product?.price || 0) * item.quantity).toLocaleString()} total
                              </p>
                            </div>
                          </div>

                          {/* Quantity Controls & Remove */}
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-3">
                              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Quantity:</span>
                              <div className={`flex items-center gap-1 rounded-xl border ${
                                isDarkMode 
                                  ? 'bg-gray-800/50 border-gray-700' 
                                  : 'bg-gray-50 border-gray-200'
                              }`}>
                                <button
                                  onClick={() => updateQuantity(item.product?._id, Math.max(1, item.quantity - 1))}
                                  disabled={updatingItem === item.product?._id || item.quantity <= 1}
                                  className={`p-2.5 rounded-l-xl transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
                                    isDarkMode 
                                      ? 'text-gray-400 hover:text-white hover:bg-white/10' 
                                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                                  }`}
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className={`font-bold min-w-10 text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                  {updatingItem === item.product?._id ? (
                                    <div className={`animate-spin rounded-full w-4 h-4 border-b-2 mx-auto ${
                                      isDarkMode ? 'border-purple-500' : 'border-violet-600'
                                    }`}></div>
                                  ) : (
                                    item.quantity
                                  )}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.product?._id, item.quantity + 1)}
                                  disabled={updatingItem === item.product?._id}
                                  className={`p-2.5 rounded-r-xl transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
                                    isDarkMode 
                                      ? 'text-gray-400 hover:text-white hover:bg-white/10' 
                                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                                  }`}
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            <button
                              onClick={() => removeItem(item.product?._id)}
                              disabled={removingItem === item.product?._id}
                              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                                isDarkMode 
                                  ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20' 
                                  : 'bg-red-50 text-red-500 hover:bg-red-100'
                              }`}
                              title="Remove from cart"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span className="text-sm font-medium">Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className={`rounded-3xl p-6 border backdrop-blur-xl sticky top-24 ${
                    isDarkMode 
                      ? 'bg-white/5 border-white/10' 
                      : 'bg-white border-gray-200 shadow-xl'
                  }`}
                >
                  <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    <Package className={`w-6 h-6 ${isDarkMode ? 'text-purple-400' : 'text-violet-600'}`} />
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div className={`flex justify-between ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <span>Subtotal ({itemCount} items)</span>
                      <span className="font-medium">₹{total.toLocaleString()}</span>
                    </div>
                    
                    <div className={`flex justify-between ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <span>Shipping</span>
                      {shipping === 0 ? (
                        <span className={`font-medium ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>FREE</span>
                      ) : (
                        <span className="font-medium">₹{shipping.toLocaleString()}</span>
                      )}
                    </div>
                    
                    <div className={`flex justify-between ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <span>Tax (18% GST)</span>
                      <span className="font-medium">₹{tax.toLocaleString()}</span>
                    </div>

                    {shipping > 0 && (
                      <div className={`p-3 rounded-xl text-sm ${
                        isDarkMode 
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' 
                          : 'bg-blue-50 text-blue-600 border border-blue-100'
                      }`}>
                        <Gift className="w-4 h-4 inline mr-2" />
                        Add ₹{(10000 - total).toLocaleString()} more for free shipping!
                      </div>
                    )}

                    <div className={`border-t pt-4 ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
                      <div className="flex justify-between text-xl font-bold">
                        <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>Total</span>
                        <span className={`${
                          isDarkMode 
                            ? 'bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent' 
                            : 'bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent'
                        }`} data-testid="cart-total">
                          ₹{finalTotal.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className={`space-y-3 mb-6 p-4 rounded-2xl ${
                    isDarkMode ? 'bg-black/30' : 'bg-gray-50'
                  }`}>
                    <div className={`flex items-center gap-3 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <div className={`p-1.5 rounded-lg ${isDarkMode ? 'bg-green-500/20' : 'bg-green-100'}`}>
                        <Truck className={`w-4 h-4 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                      </div>
                      <span>Free shipping on orders over ₹10,000</span>
                    </div>
                    <div className={`flex items-center gap-3 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <div className={`p-1.5 rounded-lg ${isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                        <Shield className={`w-4 h-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                      </div>
                      <span>2-year warranty included</span>
                    </div>
                    <div className={`flex items-center gap-3 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <div className={`p-1.5 rounded-lg ${isDarkMode ? 'bg-purple-500/20' : 'bg-purple-100'}`}>
                        <CreditCard className={`w-4 h-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                      </div>
                      <span>Secure payment processing</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => navigate('/checkout')}
                    className={`w-full py-6 text-lg font-semibold transition-all hover:scale-105 ${
                      isDarkMode 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-500 hover:shadow-lg hover:shadow-purple-500/25' 
                        : 'bg-gradient-to-r from-violet-600 to-purple-600 hover:shadow-lg hover:shadow-violet-600/25'
                    } text-white`}
                    data-testid="proceed-checkout-btn"
                  >
                    Proceed to Checkout
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>

                  <p className={`text-center text-sm mt-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    <CheckCircle className="w-4 h-4 inline mr-1" />
                    You won't be charged until the next step
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Cart;