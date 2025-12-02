import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { toast } from 'sonner';
import AdminLayout from '../../components/admin/AdminLayout';
import {
  FileText, Clock, CheckCircle, XCircle, AlertCircle,
  Package, Calendar, Mail, Phone, MapPin, Building,
  ChevronDown, ChevronUp, DollarSign, Send, Loader2,
  User, RefreshCw, Percent, Eye, Trash2, Search, MessageCircle
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

const ManageQuotes = () => {
  const { isDarkMode } = useTheme();
  
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedQuote, setExpandedQuote] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [respondingQuote, setRespondingQuote] = useState(null);
  const [responseData, setResponseData] = useState({
    quotedTotal: '',
    discountPercentage: '',
    adminNotes: '',
    validUntil: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);
  const [rejectingQuote, setRejectingQuote] = useState(null);
  const [rejectNotes, setRejectNotes] = useState('');

  const API_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    fetchQuotes();
  }, [filterStatus]);

  const fetchQuotes = async () => {
    try {
      setLoading(true);
      const params = filterStatus !== 'all' ? `?status=${filterStatus}` : '';
      const res = await axios.get(`${API_URL}/api/quotes/admin/all${params}`);
      setQuotes(res.data.data || []);
    } catch (error) {
      console.error('Error fetching quotes:', error);
      toast.error('Failed to load quotes');
    } finally {
      setLoading(false);
    }
  };

  const handleRespondToQuote = async (quoteId) => {
    if (!responseData.quotedTotal && !responseData.discountPercentage) {
      toast.error('Please enter a quoted price or discount percentage');
      return;
    }

    try {
      setSubmitting(true);
      await axios.put(`${API_URL}/api/quotes/admin/${quoteId}/respond`, {
        quotedTotal: responseData.quotedTotal ? parseFloat(responseData.quotedTotal) : null,
        discountPercentage: responseData.discountPercentage ? parseFloat(responseData.discountPercentage) : null,
        adminNotes: responseData.adminNotes,
        validUntil: responseData.validUntil || null
      });
      
      toast.success('Quote response sent successfully!');
      setRespondingQuote(null);
      setResponseData({
        quotedTotal: '',
        discountPercentage: '',
        adminNotes: '',
        validUntil: ''
      });
      fetchQuotes();
    } catch (error) {
      console.error('Error responding to quote:', error);
      toast.error('Failed to send quote response');
    } finally {
      setSubmitting(false);
    }
  };

  const handleRejectQuote = async (quoteId) => {
    try {
      setSubmitting(true);
      await axios.put(`${API_URL}/api/quotes/admin/${quoteId}/reject`, {
        adminNotes: rejectNotes
      });
      toast.success('Quote rejected successfully');
      setRejectingQuote(null);
      setRejectNotes('');
      fetchQuotes();
    } catch (error) {
      console.error('Error rejecting quote:', error);
      toast.error('Failed to reject quote');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSendMessage = async (quoteId) => {
    if (!messageInput.trim()) {
      toast.error('Please enter a message');
      return;
    }

    try {
      setSendingMessage(true);
      await axios.post(`${API_URL}/api/quotes/admin/${quoteId}/message`, {
        content: messageInput
      });
      toast.success('Message sent successfully');
      setMessageInput('');
      fetchQuotes();
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    } finally {
      setSendingMessage(false);
    }
  };

  const handleDeleteQuote = async (quoteId) => {
    if (!window.confirm('Are you sure you want to delete this quote?')) return;
    
    try {
      await axios.delete(`${API_URL}/api/quotes/${quoteId}`);
      toast.success('Quote deleted successfully');
      fetchQuotes();
    } catch (error) {
      console.error('Error deleting quote:', error);
      toast.error('Failed to delete quote');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'quoted': return <DollarSign className="w-4 h-4" />;
      case 'accepted': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      case 'expired': return <AlertCircle className="w-4 h-4" />;
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
      default: return isDarkMode 
        ? 'bg-gray-500/20 text-gray-400 border-gray-500/30' 
        : 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const filteredQuotes = quotes.filter(q => {
    if (!searchQuery) return true;
    const search = searchQuery.toLowerCase();
    return (
      q._id.toLowerCase().includes(search) ||
      q.buyer?.fullName?.toLowerCase().includes(search) ||
      q.buyer?.email?.toLowerCase().includes(search) ||
      q.buyer?.mobile?.includes(search)
    );
  });

  const quoteStats = {
    total: quotes.length,
    pending: quotes.filter(q => q.status === 'pending').length,
    quoted: quotes.filter(q => q.status === 'quoted').length,
    accepted: quotes.filter(q => q.status === 'accepted').length,
  };

  if (loading) {
    return (
      <AdminLayout title="Manage Quotes">
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 className={`w-12 h-12 animate-spin ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title="Manage Quotes"
      subtitle="Review and respond to customer quotation requests"
      actions={
        <Button
          variant="outline"
          onClick={fetchQuotes}
          className={isDarkMode ? 'border-white/20 hover:bg-white/5' : ''}
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      }
    >
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
              transition={{ delay: index * 0.05 }}
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
        </div>

        {/* Filters and Search */}
        <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-white/5' : 'bg-white shadow-lg'}`}>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                isDarkMode ? 'text-gray-500' : 'text-gray-400'
              }`} />
              <Input
                placeholder="Search by ID, name, email, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-10 ${isDarkMode ? 'bg-gray-800 border-gray-700' : ''}`}
              />
            </div>
            
            {/* Status Filter */}
            <div className="flex flex-wrap gap-2">
              {['all', 'pending', 'quoted', 'accepted', 'rejected'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    filterStatus === status
                      ? isDarkMode 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-blue-600 text-white'
                      : isDarkMode 
                        ? 'bg-white/5 text-gray-400 hover:bg-white/10' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Quotes List */}
        <AnimatePresence mode="wait">
          {filteredQuotes.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`text-center py-16 rounded-2xl ${
                isDarkMode ? 'bg-white/5' : 'bg-white shadow-lg'
              }`}
            >
              <FileText className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-300'}`} />
              <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                No quotes found
              </h3>
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                {searchQuery ? 'Try a different search term' : 'Quotes will appear here when customers request them'}
              </p>
            </motion.div>
          ) : (
            <motion.div key="quotes" className="space-y-4">
              {filteredQuotes.map((quote, index) => (
                <motion.div
                  key={quote._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className={`rounded-2xl border overflow-hidden ${
                    isDarkMode 
                      ? 'bg-white/5 border-white/10' 
                      : 'bg-white border-gray-200 shadow-lg'
                  }`}
                >
                  {/* Quote Header */}
                  <div 
                    className={`p-4 cursor-pointer ${
                      isDarkMode ? 'hover:bg-white/5' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setExpandedQuote(expandedQuote === quote._id ? null : quote._id)}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-lg ${
                          isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100'
                        }`}>
                          <FileText className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                        </div>
                        <div>
                          <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            #{quote._id.slice(-8).toUpperCase()}
                          </h3>
                          <div className={`flex flex-wrap items-center gap-2 text-sm ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            <span>{quote.buyer?.fullName}</span>
                            <span>•</span>
                            <span>{quote.buyer?.email}</span>
                            <span>•</span>
                            <span>{new Date(quote.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-3">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(quote.status)}`}>
                          {getStatusIcon(quote.status)}
                          {quote.status?.charAt(0).toUpperCase() + quote.status?.slice(1)}
                        </span>
                        
                        <div className="text-right">
                          {quote.quotedTotal ? (
                            <div>
                              <span className={`text-sm line-through ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                ₹{quote.originalTotal?.toLocaleString()}
                              </span>
                              <span className={`ml-2 font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                                ₹{quote.quotedTotal?.toLocaleString()}
                              </span>
                            </div>
                          ) : (
                            <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              ₹{quote.originalTotal?.toLocaleString()}
                            </span>
                          )}
                        </div>
                        
                        <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                          {expandedQuote === quote._id ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
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
                        <div className={`p-4 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {/* Left Column - Products */}
                            <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-black/30' : 'bg-gray-50'}`}>
                              <h4 className={`font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                Products ({quote.products?.length || 0})
                              </h4>
                              <div className="space-y-2 max-h-60 overflow-y-auto">
                                {quote.products?.map((item, idx) => (
                                  <div key={idx} className={`flex items-center gap-3 p-2 rounded-lg ${
                                    isDarkMode ? 'bg-white/5' : 'bg-white'
                                  }`}>
                                    {item.image ? (
                                      <img src={item.image} alt={item.title} className="w-10 h-10 object-cover rounded" />
                                    ) : (
                                      <div className={`w-10 h-10 rounded flex items-center justify-center ${
                                        isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                                      }`}>
                                        <Package className="w-4 h-4 text-gray-400" />
                                      </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                      <p className={`text-sm font-medium truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                        {item.title}
                                      </p>
                                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                        Qty: {item.quantity} × ₹{item.price?.toLocaleString()}
                                      </p>
                                    </div>
                                    <span className={`font-medium ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                                      ₹{(item.price * item.quantity).toLocaleString()}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Right Column - Contact & Address */}
                            <div className="space-y-4">
                              <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-black/30' : 'bg-gray-50'}`}>
                                <h4 className={`font-semibold mb-2 flex items-center gap-2 ${
                                  isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}>
                                  <User className="w-4 h-4" />
                                  Contact
                                </h4>
                                <div className={`space-y-1 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                  <p>{quote.buyer?.fullName}</p>
                                  <p className="flex items-center gap-1">
                                    <Mail className="w-3 h-3" /> {quote.buyer?.email}
                                  </p>
                                  <p className="flex items-center gap-1">
                                    <Phone className="w-3 h-3" /> {quote.buyer?.mobile}
                                  </p>
                                  {quote.buyer?.companyName && (
                                    <p className="flex items-center gap-1">
                                      <Building className="w-3 h-3" /> {quote.buyer?.companyName}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-black/30' : 'bg-gray-50'}`}>
                                <h4 className={`font-semibold mb-2 flex items-center gap-2 ${
                                  isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}>
                                  <MapPin className="w-4 h-4" />
                                  Address
                                </h4>
                                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                  {quote.address?.houseFlat}, {quote.address?.streetArea}
                                  {quote.address?.landmark && `, ${quote.address?.landmark}`}
                                  <br />
                                  {quote.address?.city}, {quote.address?.state} - {quote.address?.pincode}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Response Form for Pending Quotes */}
                          {quote.status === 'pending' && (
                            <div className={`mt-4 p-4 rounded-xl ${
                              isDarkMode ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-200'
                            }`}>
                              {respondingQuote === quote._id ? (
                                <div className="space-y-4">
                                  <h4 className={`font-semibold ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                                    Send Quote Response
                                  </h4>
                                  
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                      <label className={`text-sm font-medium mb-1 block ${
                                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                      }`}>
                                        Quoted Price (₹)
                                      </label>
                                      <Input
                                        type="number"
                                        placeholder={`Original: ₹${quote.originalTotal?.toLocaleString()}`}
                                        value={responseData.quotedTotal}
                                        onChange={(e) => setResponseData(prev => ({ 
                                          ...prev, 
                                          quotedTotal: e.target.value,
                                          discountPercentage: e.target.value 
                                            ? ((quote.originalTotal - parseFloat(e.target.value)) / quote.originalTotal * 100).toFixed(1)
                                            : ''
                                        }))}
                                        className={isDarkMode ? 'bg-gray-800 border-gray-700' : ''}
                                      />
                                    </div>
                                    
                                    <div>
                                      <label className={`text-sm font-medium mb-1 block ${
                                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                      }`}>
                                        Or Discount (%)
                                      </label>
                                      <Input
                                        type="number"
                                        placeholder="e.g., 10"
                                        value={responseData.discountPercentage}
                                        onChange={(e) => setResponseData(prev => ({ 
                                          ...prev, 
                                          discountPercentage: e.target.value,
                                          quotedTotal: e.target.value 
                                            ? (quote.originalTotal * (1 - parseFloat(e.target.value) / 100)).toFixed(2)
                                            : ''
                                        }))}
                                        className={isDarkMode ? 'bg-gray-800 border-gray-700' : ''}
                                      />
                                    </div>
                                    
                                    <div>
                                      <label className={`text-sm font-medium mb-1 block ${
                                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                      }`}>
                                        Valid Until
                                      </label>
                                      <Input
                                        type="date"
                                        value={responseData.validUntil}
                                        onChange={(e) => setResponseData(prev => ({ ...prev, validUntil: e.target.value }))}
                                        className={isDarkMode ? 'bg-gray-800 border-gray-700' : ''}
                                      />
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <label className={`text-sm font-medium mb-1 block ${
                                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                    }`}>
                                      Notes for Customer
                                    </label>
                                    <textarea
                                      placeholder="Add any notes about the quote..."
                                      value={responseData.adminNotes}
                                      onChange={(e) => setResponseData(prev => ({ ...prev, adminNotes: e.target.value }))}
                                      rows={2}
                                      className={`w-full p-3 rounded-lg border ${
                                        isDarkMode 
                                          ? 'bg-gray-800 border-gray-700 text-white' 
                                          : 'bg-white border-gray-200'
                                      }`}
                                    />
                                  </div>
                                  
                                  <div className="flex gap-3">
                                    <Button
                                      onClick={() => handleRespondToQuote(quote._id)}
                                      disabled={submitting}
                                      className="bg-blue-500 hover:bg-blue-600 text-white"
                                    >
                                      {submitting ? (
                                        <>
                                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                          Sending...
                                        </>
                                      ) : (
                                        <>
                                          <Send className="w-4 h-4 mr-2" />
                                          Send Quote
                                        </>
                                      )}
                                    </Button>
                                    <Button
                                      variant="outline"
                                      onClick={() => {
                                        setRespondingQuote(null);
                                        setResponseData({
                                          quotedTotal: '',
                                          discountPercentage: '',
                                          adminNotes: '',
                                          validUntil: ''
                                        });
                                      }}
                                      className={isDarkMode ? 'border-gray-700' : ''}
                                    >
                                      Cancel
                                    </Button>
                                  </div>
                                </div>
                              ) : (
                                  <div className="flex items-center justify-between">
                                  <p className={`text-sm ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                                    This quote is pending your response
                                  </p>
                                  <div className="flex gap-2">
                                    <Button
                                      onClick={() => setRespondingQuote(quote._id)}
                                      className="bg-blue-500 hover:bg-blue-600 text-white"
                                    >
                                      <DollarSign className="w-4 h-4 mr-2" />
                                      Respond with Price
                                    </Button>
                                    <Button
                                      variant="destructive"
                                      onClick={() => setRejectingQuote(quote._id)}
                                    >
                                      <XCircle className="w-4 h-4 mr-2" />
                                      Reject
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Reject Quote Form */}
                          {rejectingQuote === quote._id && (
                            <div className={`mt-4 p-4 rounded-xl ${
                              isDarkMode ? 'bg-red-500/10 border border-red-500/20' : 'bg-red-50 border border-red-200'
                            }`}>
                              <h4 className={`font-semibold mb-3 ${isDarkMode ? 'text-red-400' : 'text-red-700'}`}>
                                Reject Quote
                              </h4>
                              <div className="space-y-3">
                                <div>
                                  <label className={`text-sm font-medium mb-1 block ${
                                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                  }`}>
                                    Rejection Reason (Optional)
                                  </label>
                                  <textarea
                                    placeholder="Add a reason for rejection..."
                                    value={rejectNotes}
                                    onChange={(e) => setRejectNotes(e.target.value)}
                                    rows={2}
                                    className={`w-full p-3 rounded-lg border ${
                                      isDarkMode 
                                        ? 'bg-gray-800 border-gray-700 text-white' 
                                        : 'bg-white border-gray-200'
                                    }`}
                                  />
                                </div>
                                <div className="flex gap-3">
                                  <Button
                                    variant="destructive"
                                    onClick={() => handleRejectQuote(quote._id)}
                                    disabled={submitting}
                                  >
                                    {submitting ? (
                                      <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Rejecting...
                                      </>
                                    ) : (
                                      <>
                                        <XCircle className="w-4 h-4 mr-2" />
                                        Confirm Reject
                                      </>
                                    )}
                                  </Button>
                                  <Button
                                    variant="outline"
                                    onClick={() => {
                                      setRejectingQuote(null);
                                      setRejectNotes('');
                                    }}
                                    className={isDarkMode ? 'border-gray-700' : ''}
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Admin Notes for Quoted */}
                          {quote.adminNotes && quote.status !== 'pending' && (
                            <div className={`mt-4 p-4 rounded-xl ${
                              isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100'
                            }`}>
                              <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                Admin Notes
                              </h4>
                              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {quote.adminNotes}
                              </p>
                            </div>
                          )}

                          {/* Messages Section */}
                          <div className={`mt-4 p-4 rounded-xl ${
                            isDarkMode ? 'bg-purple-500/10 border border-purple-500/20' : 'bg-purple-50 border border-purple-200'
                          }`}>
                            <h4 className={`font-semibold mb-3 flex items-center gap-2 ${
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
                                        {msg.senderName || (msg.sender === 'admin' ? 'Admin' : 'User')}
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
                            <div className="flex gap-2">
                              <Input
                                placeholder="Type a message to the customer..."
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
                          </div>

                          {/* Actions */}
                          <div className="mt-4 flex justify-end gap-3">
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteQuote(quote._id)}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </Button>
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
    </AdminLayout>
  );
};

export default ManageQuotes;
