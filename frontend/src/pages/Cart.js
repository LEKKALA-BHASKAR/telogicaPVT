import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShoppingCart, Package, Truck, Shield, CreditCard, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingItem, setUpdatingItem] = useState(null);
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
    try {
      const res = await axios.delete(`${API_URL}/api/products/cart/remove/${productId}`);
      setCart(res.data.data);
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  const total = cart.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-24">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500"></div>
          <p className="text-gray-400 text-lg">Loading your cart...</p>
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
            <ShoppingBag className="w-8 h-8 text-purple-400 mr-3" />
            <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Shopping Cart
            </h1>
          </div>
          <p className="text-gray-400 text-lg">
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
              <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-2xl p-12 border border-gray-700/50 shadow-2xl max-w-md mx-auto">
                <ShoppingCart className="w-24 h-24 text-gray-600 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-gray-400 mb-4">Your cart is empty</h3>
                <p className="text-gray-500 mb-8">
                  Discover our amazing products and add them to your cart
                </p>
                <Button
                  onClick={() => navigate('/products')}
                  className="bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:shadow-lg hover:scale-105 transition-all"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Explore Products
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="cart-with-items"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
            >
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6" data-testid="cart-items">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    Your Items ({itemCount} {itemCount === 1 ? 'item' : 'items'})
                  </h2>
                  <button
                    onClick={() => navigate('/products')}
                    className="text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    Continue Shopping
                  </button>
                </div>

                {cart.map((item, index) => (
                  <motion.div
                    key={item.product?._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-xl hover:shadow-2xl hover:border-purple-500/30 transition-all duration-300"
                  >
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <div className="relative">
                        <img
                          src={item.product?.images?.[0]?.url || ''}
                          alt={item.product?.title}
                          className="w-20 h-20 lg:w-24 lg:h-24 object-cover rounded-xl border border-gray-600"
                        />
                        <div className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          {item.quantity}
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-lg font-bold text-white mb-1">{item.product?.title}</h3>
                            <p className="text-gray-400 text-sm line-clamp-2">
                              {item.product?.description}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-green-400">
                              ₹{(item.product?.price || 0).toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-400">
                              ₹{((item.product?.price || 0) * item.quantity).toLocaleString()} total
                            </p>
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-gray-400 text-sm">Quantity:</span>
                            <div className="flex items-center gap-2 bg-gray-800/50 rounded-xl border border-gray-600">
                              <button
                                onClick={() => updateQuantity(item.product?._id, Math.max(1, item.quantity - 1))}
                                disabled={updatingItem === item.product?._id || item.quantity <= 1}
                                className="p-2 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="font-bold text-white min-w-8 text-center">
                                {updatingItem === item.product?._id ? (
                                  <div className="animate-spin rounded-full w-4 h-4 border-b-2 border-purple-500 mx-auto"></div>
                                ) : (
                                  item.quantity
                                )}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.product?._id, item.quantity + 1)}
                                disabled={updatingItem === item.product?._id}
                                className="p-2 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <button
                            onClick={() => removeItem(item.product?._id)}
                            className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                            title="Remove from cart"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-xl sticky top-24"
                >
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Package className="w-6 h-6 text-purple-400" />
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-300">
                      <span>Items ({itemCount})</span>
                      <span>₹{total.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between text-gray-300">
                      <span>Shipping</span>
                      <span className="text-green-400">FREE</span>
                    </div>
                    
                    <div className="flex justify-between text-gray-300">
                      <span>Tax</span>
                      <span>₹{(total * 0.18).toLocaleString()}</span>
                    </div>

                    <div className="border-t border-gray-700/50 pt-4">
                      <div className="flex justify-between text-xl font-bold">
                        <span>Total</span>
                        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent" data-testid="cart-total">
                          ₹{(total * 1.18).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <Truck className="w-4 h-4 text-green-400" />
                      <span>Free shipping on orders over ₹10,000</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <Shield className="w-4 h-4 text-blue-400" />
                      <span>2-year warranty included</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <CreditCard className="w-4 h-4 text-purple-400" />
                      <span>Secure payment processing</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => navigate('/checkout')}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:shadow-lg hover:scale-105 transition-all py-3 text-lg font-semibold"
                    data-testid="proceed-checkout-btn"
                  >
                    Proceed to Checkout
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>

                  <p className="text-center text-gray-500 text-sm mt-4">
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