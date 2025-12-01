import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { toast } from 'sonner';
import { Search, Filter, Download, Eye, MoreVertical, Truck, CheckCircle, Clock, XCircle, Package, User, CreditCard, Calendar, MapPin, Phone, Mail, FileDown, X, ChevronRight, Box, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { useTheme } from '../../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../components/ui/button';

const ManageOrders = () => {
  const { isDarkMode } = useTheme();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/orders`);
      setOrders(res.data.data);
    } catch (error) {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.put(`${API_URL}/api/admin/orders/${orderId}`, { orderStatus: status });
      toast.success('Order status updated successfully');
      fetchOrders();
      if (selectedOrder?._id === orderId) {
        setSelectedOrder({ ...selectedOrder, orderStatus: status });
      }
    } catch (error) {
      toast.error('Failed to update order status');
    }
  };

  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'processing': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'shipped': return <Truck className="w-4 h-4 text-blue-500" />;
      case 'delivered': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'cancelled': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <Package className="w-4 h-4 text-gray-500" />;
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

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order._id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.orderStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = orders
    .filter(o => o.paymentStatus === 'completed')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title="Manage Orders"
      subtitle="Track and manage customer orders efficiently"
      actions={
        <button className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-colors ${
          isDarkMode 
            ? 'bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700/50 hover:text-white' 
            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        }`}>
          <Download className="w-4 h-4" />
          Export
        </button>
      }
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className={`rounded-2xl p-6 border backdrop-blur-xl ${
            isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-lg'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Orders</p>
                <p className="text-2xl font-bold mt-1">{orders.length}</p>
              </div>
              <div className="p-3 bg-purple-500/20 rounded-xl">
                <Package className="w-6 h-6 text-purple-500" />
              </div>
            </div>
          </div>
          
          <div className={`rounded-2xl p-6 border backdrop-blur-xl ${
            isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-lg'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Processing</p>
                <p className="text-2xl font-bold text-yellow-500 mt-1">
                  {orders.filter(o => o.orderStatus === 'processing').length}
                </p>
              </div>
              <div className="p-3 bg-yellow-500/20 rounded-xl">
                <Clock className="w-6 h-6 text-yellow-500" />
              </div>
            </div>
          </div>
          
          <div className={`rounded-2xl p-6 border backdrop-blur-xl ${
            isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-lg'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Shipped</p>
                <p className="text-2xl font-bold text-blue-500 mt-1">
                  {orders.filter(o => o.orderStatus === 'shipped').length}
                </p>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <Truck className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </div>
          
          <div className={`rounded-2xl p-6 border backdrop-blur-xl ${
            isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-lg'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Delivered</p>
                <p className="text-2xl font-bold text-green-500 mt-1">
                  {orders.filter(o => o.orderStatus === 'delivered').length}
                </p>
              </div>
              <div className="p-3 bg-green-500/20 rounded-xl">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <input
              type="text"
              placeholder="Search orders by ID or customer name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                isDarkMode 
                  ? 'bg-black/20 border-white/10 text-white placeholder-gray-500' 
                  : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
              }`}
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className={`w-full lg:w-48 rounded-xl border ${
              isDarkMode 
                ? 'bg-black/20 border-white/10 text-white' 
                : 'bg-white border-gray-200 text-gray-900'
            }`}>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <SelectValue placeholder="Filter by status" />
              </div>
            </SelectTrigger>
            <SelectContent className={isDarkMode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-200'}>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Orders Table */}
        <div className={`rounded-2xl border overflow-hidden ${
          isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-lg'
        }`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
                  <th className={`px-6 py-4 text-left font-semibold text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>ORDER</th>
                  <th className={`px-6 py-4 text-left font-semibold text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>CUSTOMER</th>
                  <th className={`px-6 py-4 text-left font-semibold text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>AMOUNT</th>
                  <th className={`px-6 py-4 text-left font-semibold text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>PAYMENT</th>
                  <th className={`px-6 py-4 text-left font-semibold text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>STATUS</th>
                  <th className={`px-6 py-4 text-left font-semibold text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>DATE</th>
                  <th className={`px-6 py-4 text-left font-semibold text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr 
                    key={order._id} 
                    className={`border-b transition-colors group ${
                      isDarkMode 
                        ? 'border-white/5 hover:bg-white/5' 
                        : 'border-gray-100 hover:bg-gray-50'
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-500/20 rounded-lg">
                          <Package className="w-4 h-4 text-purple-500" />
                        </div>
                        <div>
                          <div className="font-semibold">#{order._id.slice(-8)}</div>
                          <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Order ID</div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/20 rounded-lg">
                          <User className="w-4 h-4 text-blue-500" />
                        </div>
                        <div>
                          <div className="font-medium">{order.user?.name || 'Customer'}</div>
                          <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Customer</div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="font-bold">₹{order.totalAmount.toLocaleString()}</div>
                      <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total</div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${getPaymentColor(order.paymentStatus)}`}>
                        <CreditCard className="w-3 h-3" />
                        {order.paymentStatus}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <Select
                        value={order.orderStatus}
                        onValueChange={(value) => updateOrderStatus(order._id, value)}
                      >
                        <SelectTrigger className={`w-36 border ${getStatusColor(order.orderStatus)}`}>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(order.orderStatus)}
                            <SelectValue />
                          </div>
                        </SelectTrigger>
                        <SelectContent className={isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200'}>
                          <SelectItem value="processing" className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-yellow-500" />
                            Processing
                          </SelectItem>
                          <SelectItem value="shipped" className="flex items-center gap-2">
                            <Truck className="w-4 h-4 text-blue-500" />
                            Shipped
                          </SelectItem>
                          <SelectItem value="delivered" className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            Delivered
                          </SelectItem>
                          <SelectItem value="cancelled" className="flex items-center gap-2">
                            <XCircle className="w-4 h-4 text-red-500" />
                            Cancelled
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <Calendar className="w-4 h-4" />
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => viewOrderDetails(order)}
                          className={`p-2 rounded-lg transition-all ${
                            isDarkMode 
                              ? 'bg-gray-700/50 text-gray-400 hover:bg-blue-500/20 hover:text-blue-400' 
                              : 'bg-gray-100 text-gray-500 hover:bg-blue-50 hover:text-blue-600'
                          }`}
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {order.invoiceUrl && (
                          <button 
                            onClick={() => window.open(order.invoiceUrl, '_blank')}
                            className={`p-2 rounded-lg transition-all ${
                              isDarkMode 
                                ? 'bg-gray-700/50 text-gray-400 hover:bg-purple-500/20 hover:text-purple-400' 
                                : 'bg-gray-100 text-gray-500 hover:bg-purple-50 hover:text-purple-600'
                            }`}
                            title="Download Invoice"
                          >
                            <FileDown className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredOrders.length === 0 && (
              <div className="text-center py-16">
                <Package className={`w-24 h-24 mx-auto mb-4 ${isDarkMode ? 'text-gray-700' : 'text-gray-300'}`} />
                <h3 className="text-xl font-semibold mb-2">No orders found</h3>
                <p className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>
                  {searchTerm || statusFilter !== 'all' 
                    ? 'Try adjusting your search or filter criteria' 
                    : 'No orders have been placed yet'
                  }
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Summary Footer */}
        <div className={`flex justify-between items-center mt-6 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <div>
            Showing {filteredOrders.length} of {orders.length} orders
          </div>
          <div className={`font-medium ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
            Total Revenue: ₹{totalRevenue.toLocaleString()}
          </div>
        </div>

        {/* Order Details Modal */}
        <AnimatePresence>
          {showOrderModal && selectedOrder && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setShowOrderModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className={`rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto ${
                  isDarkMode ? 'bg-gray-900 border border-white/10' : 'bg-white border border-gray-200'
                }`}
              >
                {/* Modal Header */}
                <div className={`p-6 border-b sticky top-0 z-10 flex justify-between items-center ${
                  isDarkMode ? 'bg-gray-900 border-white/10' : 'bg-white border-gray-100'
                }`}>
                  <div>
                    <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Order Details
                    </h2>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      #{selectedOrder._id.slice(-8).toUpperCase()}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowOrderModal(false)}
                    className={`p-2 rounded-xl transition-colors ${
                      isDarkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'
                    }`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  {/* Status and Date */}
                  <div className="flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(selectedOrder.orderStatus)}`}>
                        {getStatusIcon(selectedOrder.orderStatus)}
                        {selectedOrder.orderStatus?.charAt(0).toUpperCase() + selectedOrder.orderStatus?.slice(1)}
                      </span>
                      <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border ${getPaymentColor(selectedOrder.paymentStatus)}`}>
                        <CreditCard className="w-4 h-4" />
                        {selectedOrder.paymentStatus?.charAt(0).toUpperCase() + selectedOrder.paymentStatus?.slice(1)}
                      </span>
                    </div>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      <Calendar className="w-4 h-4 inline mr-1" />
                      {new Date(selectedOrder.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>

                  {/* Customer & Shipping Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                      <h4 className={`font-semibold mb-3 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        <User className="w-4 h-4" />
                        Customer Information
                      </h4>
                      <div className={`space-y-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        <p className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          {selectedOrder.user?.name || selectedOrder.shippingAddress?.name || 'N/A'}
                        </p>
                        <p className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          {selectedOrder.user?.email || selectedOrder.shippingAddress?.email || 'N/A'}
                        </p>
                        {selectedOrder.shippingAddress?.phone && (
                          <p className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            {selectedOrder.shippingAddress.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    {selectedOrder.shippingAddress && (
                      <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                        <h4 className={`font-semibold mb-3 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          <MapPin className="w-4 h-4" />
                          Shipping Address
                        </h4>
                        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          <p>{selectedOrder.shippingAddress.address}</p>
                          <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.pincode}</p>
                          <p>{selectedOrder.shippingAddress.country || 'India'}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Order Items */}
                  <div className={`rounded-2xl border overflow-hidden ${
                    isDarkMode ? 'border-white/10' : 'border-gray-200'
                  }`}>
                    <div className={`p-4 ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                      <h4 className={`font-semibold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        <Box className="w-4 h-4" />
                        Order Items ({selectedOrder.products?.length || 0})
                      </h4>
                    </div>
                    <div className="divide-y divide-gray-200/10">
                      {selectedOrder.products?.map((item, idx) => (
                        <div key={idx} className={`flex items-center gap-4 p-4 ${
                          isDarkMode ? 'hover:bg-white/5' : 'hover:bg-gray-50'
                        }`}>
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-16 h-16 object-cover rounded-xl border border-gray-200/20"
                            />
                          ) : (
                            <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                              isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
                            }`}>
                              <Package className={`w-8 h-8 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                            </div>
                          )}
                          <div className="flex-1">
                            <h5 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              {item.title}
                            </h5>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              ₹{item.price?.toLocaleString()} × {item.quantity}
                            </p>
                          </div>
                          <div className={`text-right font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Total */}
                  <div className={`p-4 rounded-2xl ${
                    isDarkMode ? 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20' : 'bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-100'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Total Amount
                      </span>
                      <span className={`text-2xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                        ₹{selectedOrder.totalAmount?.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 justify-end">
                    {selectedOrder.invoiceUrl && (
                      <Button
                        onClick={() => window.open(selectedOrder.invoiceUrl, '_blank')}
                        className={`${isDarkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-violet-600 hover:bg-violet-700'} text-white`}
                      >
                        <FileDown className="w-4 h-4 mr-2" />
                        Download Invoice
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      onClick={() => setShowOrderModal(false)}
                      className={isDarkMode ? 'border-gray-700 hover:bg-gray-800' : ''}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AdminLayout>
  );
};

export default ManageOrders;