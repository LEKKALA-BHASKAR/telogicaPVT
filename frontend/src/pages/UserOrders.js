import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  FileDown, Package, Clock, CheckCircle, Truck, XCircle, 
  ShoppingBag, Calendar, CreditCard, MapPin, ChevronDown, ChevronUp,
  Sparkles, Eye, ArrowRight, Box
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const UserOrders = () => {
  const { isDarkMode } = useTheme();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const API_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchOrders();
  }, []);
  
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/orders/my-orders`);
      setOrders(res.data.data);
    } catch (error) {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'processing': return <Clock className="w-4 h-4" />;
      case 'shipped': return <Truck className="w-4 h-4" />;
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'processing': return isDarkMode 
        ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' 
        : 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'shipped': return isDarkMode 
        ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' 
        : 'bg-blue-100 text-blue-700 border-blue-200';
      case 'delivered': return isDarkMode 
        ? 'bg-green-500/20 text-green-400 border-green-500/30' 
        : 'bg-green-100 text-green-700 border-green-200';
      case 'cancelled': return isDarkMode 
        ? 'bg-red-500/20 text-red-400 border-red-500/30' 
        : 'bg-red-100 text-red-700 border-red-200';
      default: return isDarkMode 
        ? 'bg-gray-500/20 text-gray-400 border-gray-500/30' 
        : 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPaymentColor = (status) => {
    return status === 'completed' 
      ? isDarkMode 
        ? 'bg-green-500/20 text-green-400 border-green-500/30' 
        : 'bg-green-100 text-green-700 border-green-200'
      : isDarkMode 
        ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' 
        : 'bg-yellow-100 text-yellow-700 border-yellow-200';
  };

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(order => order.orderStatus === filterStatus);

  const orderStats = {
    total: orders.length,
    processing: orders.filter(o => o.orderStatus === 'processing').length,
    shipped: orders.filter(o => o.orderStatus === 'shipped').length,
    delivered: orders.filter(o => o.orderStatus === 'delivered').length,
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center pt-24 ${isDarkMode ? 'bg-black' : 'bg-slate-50'}`}>
        <div className="flex flex-col items-center space-y-4">
          <div className={`animate-spin rounded-full h-16 w-16 border-b-2 ${isDarkMode ? 'border-purple-500' : 'border-violet-600'}`}></div>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Loading your orders...</p>
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
      </div>

      <div className="container mx-auto pt-28 pb-16 px-4 relative z-10 max-w-6xl">
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
              My Orders
            </h1>
          </div>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
            Track and manage your order history
          </p>
        </motion.div>

        {/* Stats Cards */}
        {orders.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            {[
              { label: 'Total Orders', value: orderStats.total, icon: Package, color: 'purple' },
              { label: 'Processing', value: orderStats.processing, icon: Clock, color: 'yellow' },
              { label: 'Shipped', value: orderStats.shipped, icon: Truck, color: 'blue' },
              { label: 'Delivered', value: orderStats.delivered, icon: CheckCircle, color: 'green' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className={`p-4 rounded-2xl border backdrop-blur-xl ${
                  isDarkMode 
                    ? 'bg-white/5 border-white/10' 
                    : 'bg-white border-gray-200 shadow-lg'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {stat.label}
                    </p>
                    <p className={`text-2xl font-bold mt-1 ${
                      stat.color === 'purple' ? isDarkMode ? 'text-purple-400' : 'text-purple-600' :
                      stat.color === 'yellow' ? isDarkMode ? 'text-yellow-400' : 'text-yellow-600' :
                      stat.color === 'blue' ? isDarkMode ? 'text-blue-400' : 'text-blue-600' :
                      isDarkMode ? 'text-green-400' : 'text-green-600'
                    }`}>
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl ${
                    stat.color === 'purple' ? 'bg-purple-500/10 text-purple-500' :
                    stat.color === 'yellow' ? 'bg-yellow-500/10 text-yellow-500' :
                    stat.color === 'blue' ? 'bg-blue-500/10 text-blue-500' :
                    'bg-green-500/10 text-green-500'
                  }`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Filter Tabs */}
        {orders.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {['all', 'processing', 'shipped', 'delivered'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  filterStatus === status
                    ? isDarkMode 
                      ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25' 
                      : 'bg-violet-600 text-white shadow-lg shadow-violet-600/25'
                    : isDarkMode 
                      ? 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10' 
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {status === 'all' ? 'All Orders' : status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </motion.div>
        )}

        {/* Orders List */}
        <AnimatePresence mode="wait">
          {filteredOrders.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-20"
            >
              <div className={`p-8 rounded-3xl border backdrop-blur-xl max-w-md mx-auto ${
                isDarkMode 
                  ? 'bg-white/5 border-white/10' 
                  : 'bg-white border-gray-200 shadow-xl'
              }`}>
                <Package className={`w-20 h-20 mx-auto mb-6 ${isDarkMode ? 'text-gray-700' : 'text-gray-300'}`} />
                <h3 className={`text-2xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {orders.length === 0 ? 'No orders yet' : 'No orders found'}
                </h3>
                <p className={`mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {orders.length === 0 
                    ? 'Start shopping to see your orders here!'
                    : 'Try changing the filter to see more orders.'}
                </p>
                <Button
                  onClick={() => window.location.href = '/products'}
                  className={`${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-500' 
                      : 'bg-gradient-to-r from-violet-600 to-purple-600'
                  } text-white hover:shadow-lg transition-all`}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Explore Products
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="orders"
              className="space-y-6"
              data-testid="orders-list"
            >
              {filteredOrders.map((order, index) => (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`rounded-3xl border overflow-hidden backdrop-blur-xl transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-white/5 border-white/10 hover:border-purple-500/30' 
                      : 'bg-white border-gray-200 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {/* Order Header */}
                  <div 
                    className={`p-6 cursor-pointer ${
                      isDarkMode ? 'hover:bg-white/5' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl ${
                          isDarkMode ? 'bg-purple-500/20' : 'bg-violet-100'
                        }`}>
                          <Box className={`w-6 h-6 ${isDarkMode ? 'text-purple-400' : 'text-violet-600'}`} />
                        </div>
                        <div>
                          <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            Order #{order._id.slice(-8).toUpperCase()}
                          </h3>
                          <div className={`flex flex-wrap items-center gap-3 mt-1 text-sm ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(order.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </span>
                            <span>•</span>
                            <span>{order.products?.length || 0} items</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-3">
                        {/* Order Status */}
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusColor(order.orderStatus)}`}>
                          {getStatusIcon(order.orderStatus)}
                          {order.orderStatus?.charAt(0).toUpperCase() + order.orderStatus?.slice(1) || 'Processing'}
                        </span>
                        
                        {/* Payment Status */}
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${getPaymentColor(order.paymentStatus)}`}>
                          <CreditCard className="w-3 h-3" />
                          {order.paymentStatus?.charAt(0).toUpperCase() + order.paymentStatus?.slice(1) || 'Pending'}
                        </span>
                        
                        {/* Expand/Collapse Icon */}
                        <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                          {expandedOrder === order._id ? (
                            <ChevronUp className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                          ) : (
                            <ChevronDown className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {expandedOrder === order._id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className={`px-6 pb-6 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
                          {/* Progress Tracker */}
                          <div className="py-6">
                            <div className="flex items-center justify-between relative">
                              {['processing', 'shipped', 'delivered'].map((step, i) => {
                                const steps = ['processing', 'shipped', 'delivered'];
                                const currentIndex = steps.indexOf(order.orderStatus);
                                const isCompleted = i <= currentIndex;
                                const isCurrent = i === currentIndex;
                                
                                return (
                                  <React.Fragment key={step}>
                                    <div className="flex flex-col items-center z-10">
                                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                                        isCompleted
                                          ? isDarkMode 
                                            ? 'bg-green-500 border-green-500 text-white' 
                                            : 'bg-green-500 border-green-500 text-white'
                                          : isDarkMode 
                                            ? 'bg-gray-800 border-gray-700 text-gray-500' 
                                            : 'bg-gray-100 border-gray-300 text-gray-400'
                                      } ${isCurrent ? 'ring-4 ring-green-500/20' : ''}`}>
                                        {step === 'processing' && <Clock className="w-4 h-4" />}
                                        {step === 'shipped' && <Truck className="w-4 h-4" />}
                                        {step === 'delivered' && <CheckCircle className="w-4 h-4" />}
                                      </div>
                                      <span className={`mt-2 text-xs font-medium ${
                                        isCompleted 
                                          ? isDarkMode ? 'text-green-400' : 'text-green-600'
                                          : isDarkMode ? 'text-gray-500' : 'text-gray-400'
                                      }`}>
                                        {step.charAt(0).toUpperCase() + step.slice(1)}
                                      </span>
                                    </div>
                                    {i < 2 && (
                                      <div className={`flex-1 h-1 mx-4 rounded-full ${
                                        i < currentIndex
                                          ? 'bg-green-500'
                                          : isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
                                      }`} />
                                    )}
                                  </React.Fragment>
                                );
                              })}
                            </div>
                          </div>

                          {/* Products List */}
                          <div className={`rounded-2xl p-4 mb-4 ${
                            isDarkMode ? 'bg-black/30' : 'bg-gray-50'
                          }`}>
                            <h4 className={`text-sm font-semibold mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              Order Items
                            </h4>
                            <div className="space-y-3">
                              {order.products?.map((item, idx) => (
                                <div key={idx} className={`flex items-center gap-4 p-3 rounded-xl ${
                                  isDarkMode ? 'bg-white/5' : 'bg-white'
                                }`}>
                                  {item.image ? (
                                    <img
                                      src={item.image}
                                      alt={item.title}
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
                                    <h5 className={`font-medium truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                      {item.title}
                                    </h5>
                                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                      Qty: {item.quantity} × ₹{item.price?.toLocaleString()}
                                    </p>
                                  </div>
                                  <div className={`text-right font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                                    ₹{(item.price * item.quantity).toLocaleString()}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Order Summary */}
                          <div className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-4 border-t ${
                            isDarkMode ? 'border-white/10' : 'border-gray-200'
                          }`}>
                            <div>
                              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Amount</span>
                              <p className={`text-3xl font-bold ${
                                isDarkMode 
                                  ? 'bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent' 
                                  : 'text-green-600'
                              }`}>
                                ₹{order.totalAmount?.toLocaleString()}
                              </p>
                            </div>
                            
                            <div className="flex flex-wrap gap-3">
                              {order.invoiceUrl && (
                                <Button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    window.open(order.invoiceUrl, '_blank');
                                  }}
                                  className={`${
                                    isDarkMode 
                                      ? 'bg-gradient-to-r from-purple-600 to-pink-500 hover:shadow-lg hover:shadow-purple-500/25' 
                                      : 'bg-gradient-to-r from-violet-600 to-purple-600 hover:shadow-lg hover:shadow-violet-600/25'
                                  } text-white transition-all`}
                                  data-testid={`download-invoice-btn-${order._id}`}
                                >
                                  <FileDown className="mr-2 w-4 h-4" />
                                  Download Invoice
                                </Button>
                              )}
                              <Button
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toast.success('Viewing order details');
                                }}
                                className={isDarkMode ? 'border-white/20 hover:bg-white/5' : ''}
                              >
                                <Eye className="mr-2 w-4 h-4" />
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UserOrders;
