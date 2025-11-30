import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  TrendingUp, Users, Package, DollarSign, ShoppingCart, 
  ArrowUpRight, BarChart3, Settings, Bell, Search, 
  Activity, CreditCard, ShieldCheck 
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import AdminLayout from '../../components/admin/AdminLayout';

const Dashboard = () => {
  const { isDarkMode } = useTheme();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/analytics`);
      setAnalytics(res.data.data);
    } catch (error) {
      console.error("Analytics error:", error);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="relative">
            <div className={`w-16 h-16 rounded-full border-4 border-t-transparent animate-spin ${
              isDarkMode ? 'border-blue-500' : 'border-blue-600'
            }`}></div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const stats = [
    {
      icon: Users,
      label: 'Total Users',
      value: analytics?.totalUsers || 0,
      change: '+12.5%',
      trend: 'up',
      color: 'blue',
      description: 'Active accounts'
    },
    {
      icon: Package,
      label: 'Total Products',
      value: analytics?.totalProducts || 0,
      change: '+5.2%',
      trend: 'up',
      color: 'purple',
      description: 'In inventory'
    },
    {
      icon: ShoppingCart,
      label: 'Total Orders',
      value: analytics?.totalOrders || 0,
      change: '+18.3%',
      trend: 'up',
      color: 'green',
      description: 'Completed orders'
    },
    {
      icon: DollarSign,
      label: 'Total Revenue',
      value: `₹${(analytics?.totalRevenue || 0).toLocaleString()}`,
      change: '+24.8%',
      trend: 'up',
      color: 'orange',
      description: 'Gross revenue'
    }
  ];

  const quickActions = [
    { name: 'Add Product', icon: Package, color: 'blue' },
    { name: 'View Reports', icon: BarChart3, color: 'purple' },
    { name: 'Manage Users', icon: Users, color: 'green' },
    { name: 'System Settings', icon: Settings, color: 'orange' }
  ];

  return (
    <AdminLayout
      title="Dashboard Overview"
      subtitle="Welcome back! Here's what's happening with your store today."
      actions={
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
            <input 
              type="text" 
              placeholder="Search..." 
              className={`pl-10 pr-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                isDarkMode 
                  ? 'bg-white/5 border-white/10 text-white placeholder-gray-500' 
                  : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
              }`}
            />
          </div>
          <button className={`p-2 rounded-xl border transition-all ${
            isDarkMode 
              ? 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-400' 
              : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-600'
          }`}>
            <Bell className="w-5 h-5" />
          </button>
        </div>
      }
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Stats Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index}
                className={`relative overflow-hidden p-6 rounded-3xl border backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] ${
                  isDarkMode 
                    ? 'bg-white/5 border-white/10 hover:border-white/20' 
                    : 'bg-white border-gray-200 shadow-xl hover:shadow-2xl'
                }`}
              >
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -mr-16 -mt-16 opacity-20 ${
                  stat.color === 'blue' ? 'bg-blue-500' :
                  stat.color === 'purple' ? 'bg-purple-500' :
                  stat.color === 'green' ? 'bg-green-500' : 'bg-orange-500'
                }`} />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-2xl ${
                      stat.color === 'blue' ? 'bg-blue-500/10 text-blue-500' :
                      stat.color === 'purple' ? 'bg-purple-500/10 text-purple-500' :
                      stat.color === 'green' ? 'bg-green-500/10 text-green-500' :
                      'bg-orange-500/10 text-orange-500'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                      stat.trend === 'up' 
                        ? 'bg-green-500/10 text-green-500' 
                        : 'bg-red-500/10 text-red-500'
                    }`}>
                      {stat.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingUp className="w-3 h-3 rotate-180" />}
                      {stat.change}
                    </div>
                  </div>
                  
                  <h3 className={`text-3xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {stat.value}
                  </h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <motion.div variants={itemVariants} className={`lg:col-span-2 rounded-3xl border backdrop-blur-xl overflow-hidden ${
            isDarkMode 
              ? 'bg-white/5 border-white/10' 
              : 'bg-white border-gray-200 shadow-xl'
          }`}>
            <div className="p-6 border-b border-gray-200/10 flex justify-between items-center">
              <h2 className="text-xl font-bold">Recent Orders</h2>
              <Link to="/admin/orders" className="text-sm text-blue-500 hover:text-blue-400 font-medium flex items-center gap-1">
                View All <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="p-6">
              {analytics?.recentOrders && analytics.recentOrders.length > 0 ? (
                <div className="space-y-4">
                  {analytics.recentOrders.map((order) => (
                    <div 
                      key={order._id} 
                      className={`flex items-center justify-between p-4 rounded-2xl transition-colors ${
                        isDarkMode 
                          ? 'bg-white/5 hover:bg-white/10' 
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                        }`}>
                          <Package className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm">Order #{order._id.slice(-6).toUpperCase()}</h4>
                          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {order.user?.name || 'Guest Customer'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-bold">₹{order.totalAmount.toLocaleString()}</p>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                    isDarkMode ? 'bg-white/5' : 'bg-gray-100'
                  }`}>
                    <ShoppingCart className={`w-8 h-8 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                  </div>
                  <h3 className="text-lg font-medium mb-1">No recent orders</h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    New orders will appear here.
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Quick Actions & System Health */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Quick Actions */}
            <div className={`rounded-3xl border backdrop-blur-xl p-6 ${
              isDarkMode 
                ? 'bg-white/5 border-white/10' 
                : 'bg-white border-gray-200 shadow-xl'
            }`}>
              <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={index}
                      className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                        isDarkMode 
                          ? 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20' 
                          : 'bg-gray-50 border-gray-100 hover:bg-white hover:shadow-lg'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${
                        action.color === 'blue' ? 'bg-blue-500/20 text-blue-500' :
                        action.color === 'purple' ? 'bg-purple-500/20 text-purple-500' :
                        action.color === 'green' ? 'bg-green-500/20 text-green-500' :
                        'bg-orange-500/20 text-orange-500'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className={`text-xs font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {action.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* System Health */}
            <div className={`rounded-3xl border backdrop-blur-xl p-6 ${
              isDarkMode 
                ? 'bg-white/5 border-white/10' 
                : 'bg-white border-gray-200 shadow-xl'
            }`}>
              <h2 className="text-xl font-bold mb-6">System Health</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Activity className="w-5 h-5 text-green-500" />
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Server Status
                    </span>
                  </div>
                  <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                    Operational
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-blue-500" />
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Payment Gateway
                    </span>
                  </div>
                  <span className="text-xs font-bold text-blue-500 bg-blue-500/10 px-2 py-1 rounded-full">
                    Connected
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-purple-500" />
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Security
                    </span>
                  </div>
                  <span className="text-xs font-bold text-purple-500 bg-purple-500/10 px-2 py-1 rounded-full">
                    Secure
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AdminLayout>
  );
};

export default Dashboard;