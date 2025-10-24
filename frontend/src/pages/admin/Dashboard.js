import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { TrendingUp, Users, Package, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

const Dashboard = () => {
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
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  const stats = [
    {
      icon: Users,
      label: 'Total Users',
      value: analytics?.totalUsers || 0,
      color: 'from-violet-500 to-purple-600'
    },
    {
      icon: Package,
      label: 'Total Products',
      value: analytics?.totalProducts || 0,
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: TrendingUp,
      label: 'Total Orders',
      value: analytics?.totalOrders || 0,
      color: 'from-pink-500 to-rose-600'
    },
    {
      icon: DollarSign,
      label: 'Total Revenue',
      value: `₹${(analytics?.totalRevenue || 0).toLocaleString()}`,
      color: 'from-green-500 to-emerald-600'
    }
  ];

  // Admin navigation links
  const adminLinks = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Manage Products', path: '/admin/products' },
    { name: 'Manage Users', path: '/admin/users' },
    { name: 'Manage Orders', path: '/admin/orders' },
    { name: 'Investor Documents', path: '/admin/investor-docs' }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-gradient-to-br from-violet-50 to-white">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-5xl font-bold gradient-text">Admin Dashboard</h1>
          <div className="flex flex-wrap gap-2">
            {adminLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'bg-violet-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg" data-testid={`stat-card-${index}`}>
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold mb-2" data-testid={`stat-value-${index}`}>{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Recent Orders */}
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold mb-6">Recent Orders</h2>
          {analytics?.recentOrders && analytics.recentOrders.length > 0 ? (
            <div className="space-y-4">
              {analytics.recentOrders.map((order) => (
                <div key={order._id} className="flex justify-between items-center py-4 border-b last:border-b-0">
                  <div>
                    <p className="font-semibold">#{order._id.slice(-8)}</p>
                    <p className="text-sm text-gray-600">{order.user?.name || 'User'}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">₹{order.totalAmount.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No recent orders</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
