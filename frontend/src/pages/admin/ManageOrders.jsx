import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { toast } from 'sonner';
import { Search, Filter, Download, Eye, MoreVertical, Truck, CheckCircle, Clock, XCircle, Package, User, CreditCard, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BackNavigation from '../../components/admin/BackNavigation';

const ManageOrders = () => {
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
      <div className="min-h-screen bg-black flex items-center justify-center pt-24">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500"></div>
          <p className="text-gray-400 text-lg">Loading orders...</p>
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
        {/* Back Navigation */}
        <BackNavigation />

        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
              Manage Orders
            </h1>
            <p className="text-gray-400 text-lg">Track and manage customer orders efficiently</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-xl text-gray-300 hover:bg-gray-700/50 hover:text-white transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Orders</p>
                <p className="text-2xl font-bold text-white">{orders.length}</p>
              </div>
              <div className="p-3 bg-purple-500/20 rounded-xl">
                <Package className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Processing</p>
                <p className="text-2xl font-bold text-yellow-400">
                  {orders.filter(o => o.orderStatus === 'processing').length}
                </p>
              </div>
              <div className="p-3 bg-yellow-500/20 rounded-xl">
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Shipped</p>
                <p className="text-2xl font-bold text-blue-400">
                  {orders.filter(o => o.orderStatus === 'shipped').length}
                </p>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <Truck className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Delivered</p>
                <p className="text-2xl font-bold text-green-400">
                  {orders.filter(o => o.orderStatus === 'delivered').length}
                </p>
              </div>
              <div className="p-3 bg-green-500/20 rounded-xl">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search orders by ID or customer name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500 backdrop-blur-xl"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full lg:w-48 bg-gray-800/50 border-gray-700 text-white backdrop-blur-xl">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-white">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Orders Table */}
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700/50">
                  <th className="px-6 py-4 text-left text-gray-400 font-semibold text-sm">ORDER</th>
                  <th className="px-6 py-4 text-left text-gray-400 font-semibold text-sm">CUSTOMER</th>
                  <th className="px-6 py-4 text-left text-gray-400 font-semibold text-sm">AMOUNT</th>
                  <th className="px-6 py-4 text-left text-gray-400 font-semibold text-sm">PAYMENT</th>
                  <th className="px-6 py-4 text-left text-gray-400 font-semibold text-sm">STATUS</th>
                  <th className="px-6 py-4 text-left text-gray-400 font-semibold text-sm">DATE</th>
                  <th className="px-6 py-4 text-left text-gray-400 font-semibold text-sm">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr 
                    key={order._id} 
                    className="border-b border-gray-700/30 hover:bg-gray-800/30 transition-colors group"
                    data-testid={`order-row-${order._id}`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-500/20 rounded-lg">
                          <Package className="w-4 h-4 text-purple-400" />
                        </div>
                        <div>
                          <div className="font-semibold text-white">#{order._id.slice(-8)}</div>
                          <div className="text-xs text-gray-400">Order ID</div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/20 rounded-lg">
                          <User className="w-4 h-4 text-blue-400" />
                        </div>
                        <div>
                          <div className="font-medium text-white">{order.user?.name || 'Customer'}</div>
                          <div className="text-xs text-gray-400">Customer</div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="font-bold text-white">₹{order.totalAmount.toLocaleString()}</div>
                      <div className="text-xs text-gray-400">Total</div>
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
                        <SelectTrigger className={`w-36 backdrop-blur-xl border ${getStatusColor(order.orderStatus)}`}>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(order.orderStatus)}
                            <SelectValue />
                          </div>
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700 text-white">
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
                      <div className="flex items-center gap-2 text-gray-300">
                        <Calendar className="w-4 h-4" />
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button 
                          className="p-2 bg-gray-700/50 rounded-lg text-gray-400 hover:bg-blue-500/20 hover:text-blue-400 transition-colors opacity-0 group-hover:opacity-100"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          className="p-2 bg-gray-700/50 rounded-lg text-gray-400 hover:bg-gray-600/50 hover:text-white transition-colors"
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
                <Package className="w-24 h-24 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No orders found</h3>
                <p className="text-gray-500">
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
        <div className="flex justify-between items-center mt-6 text-sm text-gray-400">
          <div>
            Showing {filteredOrders.length} of {orders.length} orders
          </div>
          <div className="flex items-center gap-4">
            <button className="hover:text-white transition-colors">Previous</button>
            <button className="hover:text-white transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageOrders;