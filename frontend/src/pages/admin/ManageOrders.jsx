import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { toast } from 'sonner';
import { Search, Filter, Download, Eye, MoreVertical, Truck, CheckCircle, Clock, XCircle, Package, User, CreditCard, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';

const ManageOrders = () => {
  const { isDarkMode } = useTheme();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
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
    } catch (error) {
      toast.error('Failed to update order status');
    }
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
      case 'processing': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'shipped': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'delivered': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getPaymentColor = (status) => {
    return status === 'completed' 
      ? 'bg-green-500/20 text-green-400 border-green-500/30'
      : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order._id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.orderStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
                          className={`p-2 rounded-lg transition-colors opacity-0 group-hover:opacity-100 ${
                            isDarkMode 
                              ? 'bg-gray-700/50 text-gray-400 hover:bg-blue-500/20 hover:text-blue-400' 
                              : 'bg-gray-100 text-gray-500 hover:bg-blue-50 hover:text-blue-600'
                          }`}
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          className={`p-2 rounded-lg transition-colors ${
                            isDarkMode 
                              ? 'bg-gray-700/50 text-gray-400 hover:bg-gray-600/50 hover:text-white' 
                              : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-900'
                          }`}
                          title="More Options"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
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
          <div className="flex items-center gap-4">
            <button className="hover:text-purple-500 transition-colors">Previous</button>
            <button className="hover:text-purple-500 transition-colors">Next</button>
          </div>
        </div>
      </motion.div>
    </AdminLayout>
  );
};

export default ManageOrders;