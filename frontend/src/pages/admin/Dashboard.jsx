import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { TrendingUp, Users, Package, DollarSign, ShoppingCart, Eye, ArrowUpRight, BarChart3, Settings, Bell, Search, Calendar, Download, MoreHorizontal } from 'lucide-react';
import { toast } from 'sonner';
import { useTheme } from '../../context/ThemeContext';

const Dashboard = () => {
  const { isDarkMode } = useTheme();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const API_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/analytics`);
      setAnalytics(res.data.data);
    } catch (error) {
      toast.error('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center pt-24 transition-colors duration-300 ${
        isDarkMode ? 'bg-black' : 'bg-slate-50'
      }`}>
        <div className="flex flex-col items-center space-y-4">
          <div className={`animate-spin rounded-full h-16 w-16 border-b-2 ${
            isDarkMode ? 'border-purple-500' : 'border-indigo-500'
          }`}></div>
          <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      icon: Users,
      label: 'Total Users',
      value: analytics?.totalUsers || 0,
      change: '+12%',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
      textColor: 'text-purple-400'
    },
    {
      icon: Package,
      label: 'Total Products',
      value: analytics?.totalProducts || 0,
      change: '+5%',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      textColor: 'text-blue-400'
    },
    {
      icon: ShoppingCart,
      label: 'Total Orders',
      value: analytics?.totalOrders || 0,
      change: '+18%',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
      textColor: 'text-green-400'
    },
    {
      icon: DollarSign,
      label: 'Total Revenue',
      value: `₹${(analytics?.totalRevenue || 0).toLocaleString()}`,
      change: '+24%',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-500/10',
      textColor: 'text-orange-400'
    }
  ];

  // Admin navigation links
  const adminLinks = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: BarChart3 },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
    { name: 'Documents', path: '/admin/investor-docs', icon: Settings }
  ];

  // Quick actions
  const quickActions = [
    { name: 'Add Product', icon: Package, color: 'bg-purple-500/20 text-purple-400' },
    { name: 'View Reports', icon: BarChart3, color: 'bg-blue-500/20 text-blue-400' },
    { name: 'Manage Users', icon: Users, color: 'bg-green-500/20 text-green-400' },
    { name: 'Settings', icon: Settings, color: 'bg-orange-500/20 text-orange-400' }
  ];

  return (
    <div className={`min-h-screen font-sans relative overflow-hidden transition-colors duration-300 ${
      isDarkMode ? 'bg-black text-white' : 'bg-slate-50 text-gray-900'
    }`}>
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-0 left-0 w-72 h-72 rounded-full blur-3xl animate-pulse ${
          isDarkMode ? 'bg-purple-600/10' : 'bg-indigo-400/10'
        }`} />
        <div className={`absolute top-1/2 right-0 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000 ${
          isDarkMode ? 'bg-blue-600/10' : 'bg-blue-400/10'
        }`} />
        <div className={`absolute bottom-0 left-1/2 w-64 h-64 rounded-full blur-3xl animate-pulse delay-500 ${
          isDarkMode ? 'bg-green-600/10' : 'bg-emerald-400/10'
        }`} />
      </div>

      <div className="container mx-auto pt-24 pb-16 px-4 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
          <div>
            <h1 className={`text-4xl lg:text-5xl font-bold bg-clip-text text-transparent mb-2 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-white to-gray-300' 
                : 'bg-gradient-to-r from-gray-900 to-gray-600'
            }`}>
              Admin Dashboard
            </h1>
            <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Welcome back! Here's what's happening today.</p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <input
                type="text"
                placeholder="Search..."
                className={`pl-10 pr-4 py-2 border rounded-xl focus:outline-none transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500' 
                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-indigo-500'
                }`}
              />
            </div>
            
            {/* Notifications */}
            <button className={`p-2 border rounded-xl transition-colors ${
              isDarkMode 
                ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-700/50' 
                : 'bg-white border-gray-200 hover:bg-gray-100'
            }`}>
              <Bell className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            </button>
            
            {/* Calendar */}
            <button className={`p-2 border rounded-xl transition-colors ${
              isDarkMode 
                ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-700/50' 
                : 'bg-white border-gray-200 hover:bg-gray-100'
            }`}>
              <Calendar className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {adminLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link 
                key={link.path} 
                to={link.path}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  location.pathname === link.path
                    ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                    : 'bg-gray-800/50 text-gray-300 border border-gray-700 hover:bg-gray-700/50 hover:border-purple-500/30'
                }`}
              >
                <Icon className="w-4 h-4" />
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index} 
                className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-xl hover:shadow-2xl hover:border-purple-500/30 transition-all duration-300"
                data-testid={`stat-card-${index}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.textColor}`} />
                  </div>
                  <div className="flex items-center gap-1 text-sm bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                    <TrendingUp className="w-3 h-3" />
                    <span>{stat.change}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-2xl lg:text-3xl font-bold text-white" data-testid={`stat-value-${index}`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-700/50">
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full bg-gradient-to-r ${stat.color}`}
                      style={{ width: `${Math.min(100, (index + 1) * 25)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Recent Orders</h2>
              <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
            
            {analytics?.recentOrders && analytics.recentOrders.length > 0 ? (
              <div className="space-y-4">
                {analytics.recentOrders.map((order) => (
                  <div 
                    key={order._id} 
                    className="flex justify-between items-center p-4 bg-gray-800/30 rounded-xl border border-gray-700/30 hover:border-purple-500/30 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-purple-500/20 rounded-lg">
                        <ShoppingCart className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">Order #{order._id.slice(-8)}</p>
                        <p className="text-sm text-gray-400">{order.user?.name || 'Customer'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-bold text-white">₹{order.totalAmount.toLocaleString()}</p>
                        <p className="text-sm text-gray-400">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <button className="opacity-0 group-hover:opacity-100 p-2 bg-gray-700/50 rounded-lg hover:bg-gray-600/50 transition-all">
                        <Eye className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No recent orders</p>
                <p className="text-gray-400 text-sm">Orders will appear here once placed</p>
              </div>
            )}
            
            <div className="mt-6 pt-6 border-t border-gray-700/50">
              <Link 
                to="/admin/orders" 
                className="flex items-center justify-center gap-2 w-full py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-gray-300 hover:bg-gray-700/50 hover:text-white transition-all"
              >
                View All Orders
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Quick Actions & Stats */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-xl">
              <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={index}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border border-gray-700/30 hover:border-purple-500/30 transition-all duration-300 ${action.color} hover:scale-105`}
                    >
                      <Icon className="w-6 h-6 mb-2" />
                      <span className="text-sm font-medium text-center">{action.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-xl">
              <h2 className="text-xl font-bold text-white mb-6">Performance</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Conversion Rate</span>
                  <span className="text-green-400 font-semibold">+12.5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Avg. Order Value</span>
                  <span className="text-green-400 font-semibold">₹2,847</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Customer Satisfaction</span>
                  <span className="text-green-400 font-semibold">94%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;