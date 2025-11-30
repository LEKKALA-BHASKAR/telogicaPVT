import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { 
  Trash2, Search, Filter, User, Mail, Shield, Calendar, 
  MoreVertical, Eye, Edit, UserPlus, Download, CheckCircle, XCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from '../../components/admin/AdminLayout';
import { useTheme } from '../../context/ThemeContext';

const ManageUsers = () => {
  const { isDarkMode } = useTheme();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const API_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/users`);
      setUsers(res.data.data);
    } catch (error) {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;
    
    try {
      await axios.delete(`${API_URL}/api/admin/users/${id}`);
      toast.success('User deleted successfully');
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete user');
    }
  };

  const getRoleColor = (role) => {
    return role === 'admin' 
      ? 'bg-purple-500/10 text-purple-500 border-purple-500/20'
      : 'bg-blue-500/10 text-blue-500 border-blue-500/20';
  };

  const getRoleIcon = (role) => {
    return role === 'admin' 
      ? <Shield className="w-3 h-3" />
      : <User className="w-3 h-3" />;
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const stats = [
    {
      label: 'Total Users',
      value: users.length,
      icon: User,
      color: 'blue'
    },
    {
      label: 'Admins',
      value: users.filter(u => u.role === 'admin').length,
      icon: Shield,
      color: 'purple'
    },
    {
      label: 'Regular Users',
      value: users.filter(u => u.role === 'user').length,
      icon: User,
      color: 'green'
    },
    {
      label: 'New This Month',
      value: users.filter(u => {
        const userDate = new Date(u.createdAt);
        const monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        return userDate > monthAgo;
      }).length,
      icon: UserPlus,
      color: 'orange'
    }
  ];

  return (
    <AdminLayout 
      title="Manage Users" 
      subtitle="View and manage user accounts and permissions"
      actions={
        <div className="flex gap-2">
          <button className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' 
              : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}>
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl text-sm font-medium hover:bg-purple-700 transition-colors shadow-lg shadow-purple-500/20">
            <UserPlus className="w-4 h-4" />
            Add User
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 rounded-2xl border backdrop-blur-xl ${
                isDarkMode 
                  ? 'bg-gray-900/60 border-gray-800' 
                  : 'bg-white border-gray-200 shadow-sm'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {stat.label}
                  </p>
                  <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {stat.value}
                  </h3>
                </div>
                <div className={`p-3 rounded-xl ${
                  stat.color === 'blue' ? 'bg-blue-500/10 text-blue-500' :
                  stat.color === 'purple' ? 'bg-purple-500/10 text-purple-500' :
                  stat.color === 'green' ? 'bg-green-500/10 text-green-500' :
                  'bg-orange-500/10 text-orange-500'
                }`}>
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className={`rounded-2xl border backdrop-blur-xl overflow-hidden ${
          isDarkMode 
            ? 'bg-gray-900/60 border-gray-800' 
            : 'bg-white border-gray-200 shadow-sm'
        }`}>
          {/* Toolbar */}
          <div className={`p-4 border-b flex flex-col sm:flex-row gap-4 justify-between items-center ${
            isDarkMode ? 'border-gray-800' : 'border-gray-200'
          }`}>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                  isDarkMode ? 'text-gray-500' : 'text-gray-400'
                }`} />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-9 pr-4 py-2 rounded-xl text-sm w-full sm:w-64 outline-none border ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700 text-white focus:border-purple-500' 
                      : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-purple-500'
                  }`}
                />
              </div>
              
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className={`px-3 py-2 rounded-xl text-sm outline-none border ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 text-white focus:border-purple-500' 
                    : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-purple-500'
                }`}
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>


          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className={`text-left border-b ${
                  isDarkMode ? 'border-gray-800 text-gray-400' : 'border-gray-200 text-gray-500'
                }`}>
                  <th className="px-6 py-4 font-medium">User</th>
                  <th className="px-6 py-4 font-medium">Contact</th>
                  <th className="px-6 py-4 font-medium">Role</th>
                  <th className="px-6 py-4 font-medium">Joined</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDarkMode ? 'divide-gray-800' : 'divide-gray-100'}`}>
                <AnimatePresence>
                  {filteredUsers.map((user) => (
                    <motion.tr
                      key={user._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={`group transition-colors ${
                        isDarkMode ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-500'
                          }`}>
                            <User className="w-5 h-5" />
                          </div>
                          <div>
                            <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              {user.name}
                            </div>
                            <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                              ID: {user._id.slice(-6)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Mail className={`w-4 h-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                          <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                            {user.email}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${getRoleColor(user.role)}`}>
                          {getRoleIcon(user.role)}
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          <Calendar className="w-4 h-4" />
                          {new Date(user.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Active
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className={`p-2 rounded-lg transition-colors ${
                            isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
                          }`}>
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className={`p-2 rounded-lg transition-colors ${
                            isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
                          }`}>
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteUser(user._id)}
                            disabled={user.role === 'admin'}
                            className={`p-2 rounded-lg transition-colors ${
                              user.role === 'admin'
                                ? 'opacity-50 cursor-not-allowed text-gray-500'
                                : isDarkMode 
                                  ? 'hover:bg-red-900/30 text-red-400' 
                                  : 'hover:bg-red-100 text-red-500'
                            }`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
            
            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <User className={`w-12 h-12 mx-auto mb-3 ${isDarkMode ? 'text-gray-600' : 'text-gray-300'}`} />
                <h3 className={`text-lg font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  No users found
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManageUsers;
