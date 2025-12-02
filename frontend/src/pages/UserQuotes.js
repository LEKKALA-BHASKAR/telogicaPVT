import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import {
  FileText, Clock, CheckCircle, XCircle, AlertCircle,
  Package, Calendar, Mail, Phone, MapPin, Building,
  ChevronDown, ChevronUp, DollarSign, Percent, ArrowRight,
  ShoppingCart, Loader2, User, RefreshCw, MessageCircle, Send, Search
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

const UserQuotes = () => {
  const { isDarkMode } = useTheme();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedQuote, setExpandedQuote] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [messageInput, setMessageInput] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);
  const [guestEmail, setGuestEmail] = useState('');
  const [guestEmailSubmitted, setGuestEmailSubmitted] = useState(false);
  const [searchingGuest, setSearchingGuest] = useState(false);

  const API_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isAuthenticated) {
      fetchQuotes();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const fetchQuotes = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/api/quotes/my-quotes`);
      setQuotes(res.data.data || []);
    } catch (error) {
      console.error('Error fetching quotes:', error);
      toast.error('Failed to load quotes');
    } finally {
      setLoading(false);
    }
  };

  const fetchGuestQuotes = async () => {
    if (!guestEmail || !guestEmail.trim()) {
      toast.error('Please enter your email');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guestEmail)) {
      toast.error('Please enter a valid email address');
      return;
    }

    try {
      setSearchingGuest(true);
      const res = await axios.get(`${API_URL}/api/quotes/by-email/${encodeURIComponent(guestEmail)}`);
      setQuotes(res.data.data || []);
      setGuestEmailSubmitted(true);
      if (res.data.data.length === 0) {
        toast.info('No quotes found for this email');
      } else {
        toast.success(`Found ${res.data.data.length} quote(s)`);
      }
    } catch (error) {
      console.error('Error fetching guest quotes:', error);
      toast.error('Failed to load quotes');
    } finally {
      setSearchingGuest(false);
    }
  };

  const handleSendMessage = async (quoteId) => {
    if (!messageInput.trim()) {
      toast.error('Please enter a message');
      return;
    }

    try {
      setSendingMessage(true);
      if (isAuthenticated) {
        await axios.post(`${API_URL}/api/quotes/${quoteId}/message`, {
          content: messageInput
        });
      } else {
        await axios.post(`${API_URL}/api/quotes/${quoteId}/guest-message`, {
          content: messageInput,
          email: guestEmail,
          fullName: quotes.find(q => q._id === quoteId)?.buyer?.fullName
        });
      }
      toast.success('Message sent successfully');
      setMessageInput('');
      // Refresh quotes to show new message
      if (isAuthenticated) {
        fetchQuotes();
      } else {
        fetchGuestQuotes();
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error(error.response?.data?.message || 'Failed to send message');
    } finally {
      setSendingMessage(false);
    }
  };

  const handleAcceptQuote = async (quoteId) => {
    try {
      if (isAuthenticated) {
        await axios.put(`${API_URL}/api/quotes/${quoteId}/status`, { status: 'accepted' });
      } else {
        await axios.put(`${API_URL}/api/quotes/${quoteId}/guest-status`, { 
          status: 'accepted',
          email: guestEmail
        });
      }
      toast.success('Quote accepted! Redirecting to checkout...');
      if (isAuthenticated) {
        fetchQuotes();
      } else {
        fetchGuestQuotes();
      }
      // Navigate to checkout with quote data
      navigate(`/checkout?quoteId=${quoteId}`);
    } catch (error) {
      console.error('Error accepting quote:', error);
      toast.error(error.response?.data?.message || 'Failed to accept quote');
    }
  };

  const handleRejectQuote = async (quoteId) => {
    try {
      if (isAuthenticated) {
        await axios.put(`${API_URL}/api/quotes/${quoteId}/status`, { status: 'rejected' });
      } else {
        await axios.put(`${API_URL}/api/quotes/${quoteId}/guest-status`, { 
          status: 'rejected',
          email: guestEmail
        });
      }
      toast.success('Quote rejected');
      if (isAuthenticated) {
        fetchQuotes();
      } else {
        fetchGuestQuotes();
      }
    } catch (error) {
      console.error('Error rejecting quote:', error);
      toast.error(error.response?.data?.message || 'Failed to reject quote');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'quoted': return <DollarSign className="w-4 h-4" />;
      case 'accepted': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      case 'expired': return <AlertCircle className="w-4 h-4" />;
      case 'ordered': return <ShoppingCart className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return isDarkMode 
        ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' 
        : 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'quoted': return isDarkMode 
        ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' 
        : 'bg-blue-100 text-blue-700 border-blue-200';
      case 'accepted': return isDarkMode 
        ? 'bg-green-500/20 text-green-400 border-green-500/30' 
        : 'bg-green-100 text-green-700 border-green-200';
      case 'rejected': return isDarkMode 
        ? 'bg-red-500/20 text-red-400 border-red-500/30' 
        : 'bg-red-100 text-red-700 border-red-200';
      case 'expired': return isDarkMode 
        ? 'bg-gray-500/20 text-gray-400 border-gray-500/30' 
        : 'bg-gray-100 text-gray-700 border-gray-200';
      case 'ordered': return isDarkMode 
        ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' 
        : 'bg-purple-100 text-purple-700 border-purple-200';
      default: return isDarkMode 
        ? 'bg-gray-500/20 text-gray-400 border-gray-500/30' 
        : 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const filteredQuotes = filterStatus === 'all' 
    ? quotes 
    : quotes.filter(q => q.status === filterStatus);

  const quoteStats = {
    total: quotes.length,
    pending: quotes.filter(q => q.status === 'pending').length,
    quoted: quotes.filter(q => q.status === 'quoted').length,
    accepted: quotes.filter(q => q.status === 'accepted').length,
  };

  // Guest user view - show email input form or quotes
  if (!isAuthenticated) {
    if (!guestEmailSubmitted) {
      return (
        <div className={`min-h-screen pt-24 ${isDarkMode ? 'bg-black' : 'bg-slate-50'}`}>
          {/* Background Elements */}
          <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            <div className={`absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 ${
              isDarkMode ? 'bg-purple-600' : 'bg-purple-400'
            }`} />
            <div className={`absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[100px] opacity-15 ${
              isDarkMode ? 'bg-blue-600' : 'bg-blue-400'
            }`} />
          </div>

          <div className="container mx-auto px-4 relative z-10 max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-8 rounded-3xl border backdrop-blur-xl ${
                isDarkMode 
                  ? 'bg-white/5 border-white/10' 
                  : 'bg-white border-gray-200 shadow-xl'
              }`}
            >
              <div className="text-center mb-8">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                  isDarkMode ? 'bg-purple-500/20' : 'bg-purple-100'
                }`}>
                  <FileText className={`w-8 h-8 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                </div>
                <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Track Your Quotes
                </h2>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Enter your email to view your quotation requests
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={`text-sm font-medium mb-2 block ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="Enter the email used for quotes"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && fetchGuestQuotes()}
                    className={`h-12 ${isDarkMode ? 'bg-gray-800 border-gray-700' : ''}`}
                  />
                </div>
                
                <Button
                  onClick={fetchGuestQuotes}
                  disabled={searchingGuest}
                  className={`w-full h-12 ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-500' 
                      : 'bg-gradient-to-r from-violet-600 to-purple-600'
                  } text-white`}
                >
                  {searchingGuest ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-2" />
                      Find My Quotes
                    </>
                  )}
                </Button>

                <div className="relative my-6">
                  <div className={`absolute inset-0 flex items-center ${isDarkMode ? 'text-gray-600' : 'text-gray-300'}`}>
                    <div className={`w-full border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`} />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className={`px-3 ${isDarkMode ? 'bg-gray-900 text-gray-400' : 'bg-white text-gray-500'}`}>
                      or
                    </span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  onClick={() => navigate('/login')}
                  className={`w-full h-12 ${isDarkMode ? 'border-gray-700 hover:bg-gray-800' : ''}`}
                >
                  <User className="w-4 h-4 mr-2" />
                  Login to Your Account
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      );
    }
  }

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center pt-24 ${isDarkMode ? 'bg-black' : 'bg-slate-50'}`}>
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className={`w-12 h-12 animate-spin ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Loading your quotes...</p>
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
            <FileText className={`w-8 h-8 mr-3 ${isDarkMode ? 'text-purple-400' : 'text-violet-600'}`} />
            <h1 className={`text-4xl lg:text-5xl font-bold ${
              isDarkMode 
                ? 'bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent' 
                : 'bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent'
            }`}>
              My Quotes
            </h1>
          </div>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
            Track and manage your quotation requests
          </p>
          {/* Guest Email Info */}
          {!isAuthenticated && guestEmailSubmitted && (
            <div className="mt-4 flex items-center justify-center gap-3">
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Viewing quotes for: <strong className={isDarkMode ? 'text-white' : 'text-gray-900'}>{guestEmail}</strong>
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setGuestEmailSubmitted(false);
                  setQuotes([]);
                }}
                className={isDarkMode ? 'border-gray-700 hover:bg-gray-800' : ''}
              >
                Change Email
              </Button>
            </div>
          )}
        </motion.div>

        {/* Stats Cards */}
        {quotes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            {[
              { label: 'Total Quotes', value: quoteStats.total, icon: FileText, color: 'purple' },
              { label: 'Pending', value: quoteStats.pending, icon: Clock, color: 'yellow' },
              { label: 'Quoted', value: quoteStats.quoted, icon: DollarSign, color: 'blue' },
              { label: 'Accepted', value: quoteStats.accepted, icon: CheckCircle, color: 'green' },
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
        {quotes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center justify-between gap-4 mb-8"
          >
            <div className="flex flex-wrap gap-2">
              {['all', 'pending', 'quoted', 'accepted', 'rejected'].map((status) => (
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
                  {status === 'all' ? 'All Quotes' : status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
            
            <Button
              variant="outline"
              onClick={fetchQuotes}
              className={isDarkMode ? 'border-white/20 hover:bg-white/5' : ''}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </motion.div>
        )}

        {/* Quotes List */}
        <AnimatePresence mode="wait">
          {filteredQuotes.length === 0 ? (
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
                <FileText className={`w-20 h-20 mx-auto mb-6 ${isDarkMode ? 'text-gray-700' : 'text-gray-300'}`} />
                <h3 className={`text-2xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {quotes.length === 0 ? 'No quotes yet' : 'No quotes found'}
                </h3>
                <p className={`mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {quotes.length === 0 
                    ? 'Request a quote for products you\'re interested in!'
                    : 'Try changing the filter to see more quotes.'}
                </p>
                <Button
                  onClick={() => navigate('/products')}
                  className={`${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-500' 
                      : 'bg-gradient-to-r from-violet-600 to-purple-600'
                  } text-white hover:shadow-lg transition-all`}
                >
                  <Package className="w-4 h-4 mr-2" />
                  Browse Products
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div key="quotes" className="space-y-6">
              {filteredQuotes.map((quote, index) => (
                <motion.div
                  key={quote._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`rounded-3xl border overflow-hidden backdrop-blur-xl transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-white/5 border-white/10 hover:border-purple-500/30' 
                      : 'bg-white border-gray-200 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {/* Quote Header */}
                  <div 
                    className={`p-6 cursor-pointer ${
                      isDarkMode ? 'hover:bg-white/5' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setExpandedQuote(expandedQuote === quote._id ? null : quote._id)}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl ${
                          isDarkMode ? 'bg-purple-500/20' : 'bg-violet-100'
                        }`}>
                          <FileText className={`w-6 h-6 ${isDarkMode ? 'text-purple-400' : 'text-violet-600'}`} />
                        </div>
                        <div>
                          <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            Quote #{quote._id.slice(-8).toUpperCase()}
                          </h3>
                          <div className={`flex flex-wrap items-center gap-3 mt-1 text-sm ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(quote.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </span>
                            <span>•</span>
                            <span>{quote.products?.length || 0} items</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-3">
                        {/* Quote Status */}
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusColor(quote.status)}`}>
                          {getStatusIcon(quote.status)}
                          {quote.status?.charAt(0).toUpperCase() + quote.status?.slice(1) || 'Pending'}
                        </span>
                        
                        {/* Price */}
                        <div className="text-right">
                          {quote.quotedTotal ? (
                            <div>
                              <p className={`text-sm line-through ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                ₹{quote.originalTotal?.toLocaleString()}
                              </p>
                              <p className={`text-lg font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                                ₹{quote.quotedTotal?.toLocaleString()}
                              </p>
                              {quote.discountPercentage > 0 && (
                                <span className={`text-xs font-medium ${
                                  isDarkMode ? 'text-green-400' : 'text-green-600'
                                }`}>
                                  {quote.discountPercentage.toFixed(1)}% off
                                </span>
                              )}
                            </div>
                          ) : (
                            <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              ₹{quote.originalTotal?.toLocaleString()}
                            </p>
                          )}
                        </div>
                        
                        {/* Expand/Collapse Icon */}
                        <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                          {expandedQuote === quote._id ? (
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
                    {expandedQuote === quote._id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className={`px-6 pb-6 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
                          {/* Products List */}
                          <div className={`rounded-2xl p-4 mt-4 mb-4 ${
                            isDarkMode ? 'bg-black/30' : 'bg-gray-50'
                          }`}>
                            <h4 className={`text-sm font-semibold mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              Products
                            </h4>
                            <div className="space-y-3">
                              {quote.products?.map((item, idx) => (
                                <div key={idx} className={`flex items-center gap-4 p-3 rounded-xl ${
                                  isDarkMode ? 'bg-white/5' : 'bg-white'
                                }`}>
                                  {item.image ? (
                                    <img
                                      src={item.image}
                                      alt={item.title}
                                      className="w-14 h-14 object-cover rounded-lg"
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

                          {/* Buyer & Address Info */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-black/30' : 'bg-gray-50'}`}>
                              <h4 className={`text-sm font-semibold mb-2 flex items-center gap-2 ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-700'
                              }`}>
                                <User className="w-4 h-4" />
                                Contact Details
                              </h4>
                              <div className={`space-y-1 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                <p>{quote.buyer?.fullName}</p>
                                <p className="flex items-center gap-1">
                                  <Mail className="w-3 h-3" />
                                  {quote.buyer?.email}
                                </p>
                                <p className="flex items-center gap-1">
                                  <Phone className="w-3 h-3" />
                                  {quote.buyer?.mobile}
                                </p>
                                {quote.buyer?.companyName && (
                                  <p className="flex items-center gap-1">
                                    <Building className="w-3 h-3" />
                                    {quote.buyer?.companyName}
                                  </p>
                                )}
                              </div>
                            </div>
                            
                            <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-black/30' : 'bg-gray-50'}`}>
                              <h4 className={`text-sm font-semibold mb-2 flex items-center gap-2 ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-700'
                              }`}>
                                <MapPin className="w-4 h-4" />
                                Delivery Address
                              </h4>
                              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {quote.address?.houseFlat}, {quote.address?.streetArea}
                                {quote.address?.landmark && `, ${quote.address?.landmark}`}
                                <br />
                                {quote.address?.city}, {quote.address?.state} - {quote.address?.pincode}
                              </p>
                            </div>
                          </div>

                          {/* Admin Notes */}
                          {quote.adminNotes && (
                            <div className={`p-4 rounded-2xl mb-4 ${
                              isDarkMode ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-200'
                            }`}>
                              <h4 className={`text-sm font-semibold mb-2 ${
                                isDarkMode ? 'text-blue-400' : 'text-blue-700'
                              }`}>
                                Admin Notes
                              </h4>
                              <p className={`text-sm ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                                {quote.adminNotes}
                              </p>
                            </div>
                          )}

                          {/* Valid Until */}
                          {quote.validUntil && quote.status === 'quoted' && (() => {
                            const validUntilDate = new Date(quote.validUntil);
                            const now = new Date();
                            const isExpired = validUntilDate < now;
                            
                            return (
                              <div className={`p-4 rounded-2xl mb-4 ${
                                isExpired
                                  ? isDarkMode ? 'bg-red-500/10 border border-red-500/20' : 'bg-red-50 border border-red-200'
                                  : isDarkMode ? 'bg-green-500/10 border border-green-500/20' : 'bg-green-50 border border-green-200'
                              }`}>
                                <p className={`text-sm font-medium ${
                                  isExpired
                                    ? isDarkMode ? 'text-red-400' : 'text-red-700'
                                    : isDarkMode ? 'text-green-400' : 'text-green-700'
                                }`}>
                                  {isExpired 
                                    ? 'Quote expired on ' 
                                    : 'Quote valid until '}
                                  {validUntilDate.toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  })}
                                </p>
                              </div>
                            );
                          })()}

                          {/* Messages Section */}
                          <div className={`p-4 rounded-2xl mb-4 ${
                            isDarkMode ? 'bg-purple-500/10 border border-purple-500/20' : 'bg-purple-50 border border-purple-200'
                          }`}>
                            <h4 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${
                              isDarkMode ? 'text-purple-400' : 'text-purple-700'
                            }`}>
                              <MessageCircle className="w-4 h-4" />
                              Negotiation Messages ({quote.messages?.length || 0})
                            </h4>
                            
                            {/* Messages List */}
                            {quote.messages && quote.messages.length > 0 && (
                              <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
                                {quote.messages.map((msg, idx) => (
                                  <div 
                                    key={idx} 
                                    className={`p-3 rounded-lg ${
                                      msg.sender === 'admin'
                                        ? isDarkMode ? 'bg-blue-500/20 ml-4' : 'bg-blue-100 ml-4'
                                        : isDarkMode ? 'bg-gray-700 mr-4' : 'bg-gray-200 mr-4'
                                    }`}
                                  >
                                    <div className="flex items-center justify-between mb-1">
                                      <span className={`text-xs font-medium ${
                                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                      }`}>
                                        {msg.senderName || (msg.sender === 'admin' ? 'Admin' : 'You')}
                                        {msg.sender === 'admin' && (
                                          <span className={`ml-2 px-1.5 py-0.5 rounded text-xs ${
                                            isDarkMode ? 'bg-blue-500/30 text-blue-300' : 'bg-blue-200 text-blue-700'
                                          }`}>
                                            Admin
                                          </span>
                                        )}
                                      </span>
                                      <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                        {new Date(msg.createdAt).toLocaleString()}
                                      </span>
                                    </div>
                                    <p className={`text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                                      {msg.content}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            )}
                            
                            {/* Send Message Input */}
                            {quote.status !== 'ordered' && quote.status !== 'rejected' && (
                              <div className="flex gap-2">
                                <Input
                                  placeholder="Type a message..."
                                  value={messageInput}
                                  onChange={(e) => setMessageInput(e.target.value)}
                                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(quote._id)}
                                  className={`flex-1 ${isDarkMode ? 'bg-gray-800 border-gray-700' : ''}`}
                                />
                                <Button
                                  onClick={() => handleSendMessage(quote._id)}
                                  disabled={sendingMessage || !messageInput.trim()}
                                  className="bg-purple-500 hover:bg-purple-600 text-white"
                                >
                                  {sendingMessage ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                  ) : (
                                    <Send className="w-4 h-4" />
                                  )}
                                </Button>
                              </div>
                            )}
                          </div>

                          {/* Action Buttons */}
                          {quote.status === 'quoted' && quote.validUntil && new Date(quote.validUntil) > new Date() && (
                            <div className="flex flex-wrap gap-3 pt-4 border-t border-dashed border-gray-700/30">
                              <Button
                                onClick={() => handleAcceptQuote(quote._id)}
                                className={`${
                                  isDarkMode 
                                    ? 'bg-green-500 hover:bg-green-600' 
                                    : 'bg-green-600 hover:bg-green-700'
                                } text-white`}
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Accept & Checkout
                              </Button>
                              <Button
                                variant="destructive"
                                onClick={() => handleRejectQuote(quote._id)}
                              >
                                <XCircle className="w-4 h-4 mr-2" />
                                Reject Quote
                              </Button>
                            </div>
                          )}
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

export default UserQuotes;
