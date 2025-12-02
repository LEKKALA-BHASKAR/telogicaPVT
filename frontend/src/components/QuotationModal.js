import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useQuotation } from '../context/QuotationContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import {
  X, Search, Package, Plus, Minus, Trash2, Eye,
  ShoppingBag, ArrowRight, ArrowLeft, CheckCircle,
  User, Mail, Phone, Building, MapPin, Home, FileText,
  Send, Loader2, Star
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const QuotationModal = () => {
  const { isDarkMode } = useTheme();
  const { 
    quotationItems, 
    isQuotationModalOpen, 
    closeQuotationModal,
    addToQuotation,
    updateQuotationQuantity,
    removeFromQuotation,
    clearQuotation,
    getQuotationTotal
  } = useQuotation();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: Products, 2: Buyer Details, 3: Review
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [buyerDetails, setBuyerDetails] = useState({
    fullName: '',
    email: '',
    mobile: '',
    companyName: ''
  });

  const [addressDetails, setAddressDetails] = useState({
    houseFlat: '',
    streetArea: '',
    landmark: '',
    city: '',
    state: '',
    pincode: ''
  });

  const [errors, setErrors] = useState({});

  const API_URL = process.env.REACT_APP_BACKEND_URL;

  // Pre-fill buyer details if user is logged in
  useEffect(() => {
    if (isAuthenticated && user) {
      setBuyerDetails(prev => ({
        ...prev,
        fullName: user.name || '',
        email: user.email || ''
      }));
    }
  }, [isAuthenticated, user]);

  // Reset step when modal opens
  useEffect(() => {
    if (isQuotationModalOpen) {
      setStep(quotationItems.length > 0 ? 1 : 1);
      fetchProducts();
    }
  }, [isQuotationModalOpen]);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      
      const res = await axios.get(`${API_URL}/api/products?${params.toString()}`);
      setProducts(res.data.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  }, [API_URL, searchQuery]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (isQuotationModalOpen) {
        fetchProducts();
      }
    }, 300);
    return () => clearTimeout(debounce);
  }, [searchQuery, fetchProducts, isQuotationModalOpen]);

  const handleAddProduct = (product) => {
    addToQuotation(product, 1);
    toast.success(`${product.title} added to quotation`);
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
  };

  const validateBuyerDetails = () => {
    const newErrors = {};
    
    if (!buyerDetails.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!buyerDetails.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(buyerDetails.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!buyerDetails.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(buyerDetails.mobile.replace(/\D/g, ''))) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }
    
    if (!addressDetails.houseFlat.trim()) {
      newErrors.houseFlat = 'House/Flat number is required';
    }
    
    if (!addressDetails.streetArea.trim()) {
      newErrors.streetArea = 'Street/Area is required';
    }
    
    if (!addressDetails.city.trim()) {
      newErrors.city = 'City is required';
    }
    
    if (!addressDetails.state.trim()) {
      newErrors.state = 'State is required';
    }
    
    if (!addressDetails.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(addressDetails.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitQuote = async () => {
    if (!validateBuyerDetails()) {
      toast.error('Please fill in all required fields correctly');
      setStep(2);
      return;
    }

    try {
      setSubmitting(true);

      const quoteData = {
        buyer: buyerDetails,
        address: addressDetails,
        products: quotationItems.map(item => ({
          productId: item.product._id,
          quantity: item.quantity
        })),
        userId: isAuthenticated ? user._id : null
      };

      await axios.post(`${API_URL}/api/quotes`, quoteData);

      toast.success('Quote request submitted successfully! You will receive a confirmation email shortly.');
      clearQuotation();
      closeQuotationModal();
      
      // Reset form
      setStep(1);
      setBuyerDetails({
        fullName: isAuthenticated ? user?.name || '' : '',
        email: isAuthenticated ? user?.email || '' : '',
        mobile: '',
        companyName: ''
      });
      setAddressDetails({
        houseFlat: '',
        streetArea: '',
        landmark: '',
        city: '',
        state: '',
        pincode: ''
      });

    } catch (error) {
      console.error('Error submitting quote:', error);
      toast.error(error.response?.data?.message || 'Failed to submit quote request');
    } finally {
      setSubmitting(false);
    }
  };

  const handleNextStep = () => {
    if (step === 1 && quotationItems.length === 0) {
      toast.error('Please add at least one product to your quotation');
      return;
    }
    if (step === 2 && !validateBuyerDetails()) {
      return;
    }
    setStep(prev => Math.min(prev + 1, 3));
  };

  const handlePrevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  if (!isQuotationModalOpen) return null;

  const isInQuotation = (productId) => {
    return quotationItems.some(item => item.product._id === productId);
  };

  const getItemQuantity = (productId) => {
    const item = quotationItems.find(item => item.product._id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <div className={`fixed inset-0 z-[60] flex items-center justify-center p-4 ${
      isDarkMode ? 'bg-black/80' : 'bg-black/50'
    }`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={`relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl border shadow-2xl ${
          isDarkMode 
            ? 'bg-gray-900 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}
      >
        {/* Header */}
        <div className={`sticky top-0 z-10 flex items-center justify-between p-6 border-b ${
          isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${isDarkMode ? 'bg-purple-500/20' : 'bg-purple-100'}`}>
              <FileText className={`w-6 h-6 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
            </div>
            <div>
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Get Quotation
              </h2>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {step === 1 && 'Select products for your quote'}
                {step === 2 && 'Enter your details'}
                {step === 3 && 'Review your quotation request'}
              </p>
            </div>
          </div>
          
          <button
            onClick={closeQuotationModal}
            className={`p-2 rounded-xl transition-colors ${
              isDarkMode ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
            }`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className={`px-6 py-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between max-w-lg mx-auto">
            {[
              { num: 1, label: 'Products', icon: Package },
              { num: 2, label: 'Details', icon: User },
              { num: 3, label: 'Review', icon: CheckCircle }
            ].map((s, index) => (
              <React.Fragment key={s.num}>
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    step >= s.num
                      ? isDarkMode
                        ? 'bg-purple-500 text-white'
                        : 'bg-purple-600 text-white'
                      : isDarkMode
                        ? 'bg-gray-800 text-gray-500'
                        : 'bg-gray-200 text-gray-400'
                  }`}>
                    {step > s.num ? <CheckCircle className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}
                  </div>
                  <span className={`mt-1 text-xs font-medium ${
                    step >= s.num
                      ? isDarkMode ? 'text-white' : 'text-gray-900'
                      : isDarkMode ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    {s.label}
                  </span>
                </div>
                {index < 2 && (
                  <div className={`flex-1 h-1 mx-3 rounded-full ${
                    step > s.num
                      ? isDarkMode ? 'bg-purple-500' : 'bg-purple-600'
                      : isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-280px)] p-6">
          <AnimatePresence mode="wait">
            {/* Step 1: Product Selection */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                {/* Search Bar */}
                <div className="relative">
                  <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                    isDarkMode ? 'text-gray-500' : 'text-gray-400'
                  }`} />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`pl-12 h-12 rounded-xl ${
                      isDarkMode 
                        ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-500' 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  />
                </div>

                {/* Selected Products Summary */}
                {quotationItems.length > 0 && (
                  <div className={`p-4 rounded-2xl ${
                    isDarkMode ? 'bg-purple-500/10 border border-purple-500/20' : 'bg-purple-50 border border-purple-100'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className={`font-semibold flex items-center gap-2 ${
                        isDarkMode ? 'text-purple-400' : 'text-purple-700'
                      }`}>
                        <ShoppingBag className="w-4 h-4" />
                        Selected Products ({quotationItems.length})
                      </h3>
                      <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        ₹{getQuotationTotal().toLocaleString()}
                      </span>
                    </div>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {quotationItems.map((item) => (
                        <div key={item.product._id} className={`flex items-center justify-between p-2 rounded-lg ${
                          isDarkMode ? 'bg-gray-800/50' : 'bg-white'
                        }`}>
                          <div className="flex items-center gap-3">
                            {item.product.images?.[0]?.url ? (
                              <img
                                src={item.product.images[0].url}
                                alt={item.product.title}
                                className="w-10 h-10 object-cover rounded-lg"
                              />
                            ) : (
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                              }`}>
                                <Package className="w-5 h-5 text-gray-400" />
                              </div>
                            )}
                            <div>
                              <p className={`text-sm font-medium truncate max-w-[150px] ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                              }`}>
                                {item.product.title}
                              </p>
                              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                ₹{item.product.price.toLocaleString()} × {item.quantity}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuotationQuantity(item.product._id, item.quantity - 1)}
                              className={`p-1 rounded-lg ${
                                isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                              }`}
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className={`w-8 text-center font-medium ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuotationQuantity(item.product._id, item.quantity + 1)}
                              className={`p-1 rounded-lg ${
                                isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                              }`}
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => removeFromQuotation(item.product._id)}
                              className="p-1 rounded-lg text-red-500 hover:bg-red-500/10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Products Grid */}
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className={`w-8 h-8 animate-spin ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                  </div>
                ) : products.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className={`w-12 h-12 mx-auto mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-300'}`} />
                    <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>No products found</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map((product) => (
                      <div
                        key={product._id}
                        className={`relative p-4 rounded-2xl border transition-all ${
                          isInQuotation(product._id)
                            ? isDarkMode
                              ? 'border-purple-500 bg-purple-500/10'
                              : 'border-purple-500 bg-purple-50'
                            : isDarkMode
                              ? 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                              : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        {product.featured && (
                          <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-0.5 rounded-full text-xs font-bold flex items-center gap-1">
                            <Star className="w-3 h-3 fill-current" />
                            Featured
                          </div>
                        )}
                        
                        <div className="flex gap-3">
                          {product.images?.[0]?.url ? (
                            <img
                              src={product.images[0].url}
                              alt={product.title}
                              className="w-20 h-20 object-cover rounded-xl"
                            />
                          ) : (
                            <div className={`w-20 h-20 rounded-xl flex items-center justify-center ${
                              isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                            }`}>
                              <Package className="w-8 h-8 text-gray-400" />
                            </div>
                          )}
                          
                          <div className="flex-1 min-w-0">
                            <h4 className={`font-semibold text-sm line-clamp-2 ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                              {product.title}
                            </h4>
                            <p className={`text-xs mt-1 ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                              {product.category}
                            </p>
                            <p className={`font-bold mt-1 ${
                              isDarkMode ? 'text-green-400' : 'text-green-600'
                            }`}>
                              ₹{product.price.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 mt-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewProduct(product)}
                            className={`flex-1 ${isDarkMode ? 'border-gray-700 hover:bg-gray-700' : ''}`}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          
                          {isInQuotation(product._id) ? (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => updateQuotationQuantity(product._id, getItemQuantity(product._id) - 1)}
                                className={`p-2 rounded-lg ${
                                  isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                                }`}
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className={`w-8 text-center font-bold ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                              }`}>
                                {getItemQuantity(product._id)}
                              </span>
                              <button
                                onClick={() => updateQuotationQuantity(product._id, getItemQuantity(product._id) + 1)}
                                className={`p-2 rounded-lg ${
                                  isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                                }`}
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <Button
                              size="sm"
                              onClick={() => handleAddProduct(product)}
                              className={`${
                                isDarkMode 
                                  ? 'bg-purple-500 hover:bg-purple-600' 
                                  : 'bg-purple-600 hover:bg-purple-700'
                              } text-white`}
                            >
                              <Plus className="w-4 h-4 mr-1" />
                              Add
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Step 2: Buyer Details */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                {/* Personal Details */}
                <div className={`p-6 rounded-2xl ${
                  isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'
                }`}>
                  <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    <User className={`w-5 h-5 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                    Personal Details
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`text-sm font-medium mb-1 block ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Full Name *
                      </label>
                      <Input
                        value={buyerDetails.fullName}
                        onChange={(e) => setBuyerDetails(prev => ({ ...prev, fullName: e.target.value }))}
                        placeholder="John Doe"
                        className={`h-12 ${
                          errors.fullName ? 'border-red-500' : ''
                        } ${isDarkMode ? 'bg-gray-900 border-gray-700' : ''}`}
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className={`text-sm font-medium mb-1 block ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Email *
                      </label>
                      <Input
                        type="email"
                        value={buyerDetails.email}
                        onChange={(e) => setBuyerDetails(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="john@example.com"
                        className={`h-12 ${
                          errors.email ? 'border-red-500' : ''
                        } ${isDarkMode ? 'bg-gray-900 border-gray-700' : ''}`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className={`text-sm font-medium mb-1 block ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Mobile Number *
                      </label>
                      <Input
                        type="tel"
                        value={buyerDetails.mobile}
                        onChange={(e) => setBuyerDetails(prev => ({ ...prev, mobile: e.target.value }))}
                        placeholder="9876543210"
                        className={`h-12 ${
                          errors.mobile ? 'border-red-500' : ''
                        } ${isDarkMode ? 'bg-gray-900 border-gray-700' : ''}`}
                      />
                      {errors.mobile && (
                        <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className={`text-sm font-medium mb-1 block ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Company Name (Optional)
                      </label>
                      <Input
                        value={buyerDetails.companyName}
                        onChange={(e) => setBuyerDetails(prev => ({ ...prev, companyName: e.target.value }))}
                        placeholder="Your Company"
                        className={`h-12 ${isDarkMode ? 'bg-gray-900 border-gray-700' : ''}`}
                      />
                    </div>
                  </div>
                </div>

                {/* Address Details */}
                <div className={`p-6 rounded-2xl ${
                  isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'
                }`}>
                  <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    <MapPin className={`w-5 h-5 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                    Delivery Address
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`text-sm font-medium mb-1 block ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        House/Flat No. *
                      </label>
                      <Input
                        value={addressDetails.houseFlat}
                        onChange={(e) => setAddressDetails(prev => ({ ...prev, houseFlat: e.target.value }))}
                        placeholder="123, Block A"
                        className={`h-12 ${
                          errors.houseFlat ? 'border-red-500' : ''
                        } ${isDarkMode ? 'bg-gray-900 border-gray-700' : ''}`}
                      />
                      {errors.houseFlat && (
                        <p className="text-red-500 text-xs mt-1">{errors.houseFlat}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className={`text-sm font-medium mb-1 block ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Street/Area *
                      </label>
                      <Input
                        value={addressDetails.streetArea}
                        onChange={(e) => setAddressDetails(prev => ({ ...prev, streetArea: e.target.value }))}
                        placeholder="MG Road"
                        className={`h-12 ${
                          errors.streetArea ? 'border-red-500' : ''
                        } ${isDarkMode ? 'bg-gray-900 border-gray-700' : ''}`}
                      />
                      {errors.streetArea && (
                        <p className="text-red-500 text-xs mt-1">{errors.streetArea}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className={`text-sm font-medium mb-1 block ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Landmark (Optional)
                      </label>
                      <Input
                        value={addressDetails.landmark}
                        onChange={(e) => setAddressDetails(prev => ({ ...prev, landmark: e.target.value }))}
                        placeholder="Near Metro Station"
                        className={`h-12 ${isDarkMode ? 'bg-gray-900 border-gray-700' : ''}`}
                      />
                    </div>
                    
                    <div>
                      <label className={`text-sm font-medium mb-1 block ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        City *
                      </label>
                      <Input
                        value={addressDetails.city}
                        onChange={(e) => setAddressDetails(prev => ({ ...prev, city: e.target.value }))}
                        placeholder="Hyderabad"
                        className={`h-12 ${
                          errors.city ? 'border-red-500' : ''
                        } ${isDarkMode ? 'bg-gray-900 border-gray-700' : ''}`}
                      />
                      {errors.city && (
                        <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className={`text-sm font-medium mb-1 block ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        State *
                      </label>
                      <Input
                        value={addressDetails.state}
                        onChange={(e) => setAddressDetails(prev => ({ ...prev, state: e.target.value }))}
                        placeholder="Telangana"
                        className={`h-12 ${
                          errors.state ? 'border-red-500' : ''
                        } ${isDarkMode ? 'bg-gray-900 border-gray-700' : ''}`}
                      />
                      {errors.state && (
                        <p className="text-red-500 text-xs mt-1">{errors.state}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className={`text-sm font-medium mb-1 block ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Pincode *
                      </label>
                      <Input
                        value={addressDetails.pincode}
                        onChange={(e) => setAddressDetails(prev => ({ ...prev, pincode: e.target.value }))}
                        placeholder="500001"
                        className={`h-12 ${
                          errors.pincode ? 'border-red-500' : ''
                        } ${isDarkMode ? 'bg-gray-900 border-gray-700' : ''}`}
                      />
                      {errors.pincode && (
                        <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                {/* Products Summary */}
                <div className={`p-6 rounded-2xl ${
                  isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'
                }`}>
                  <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    <Package className={`w-5 h-5 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                    Products ({quotationItems.length})
                  </h3>
                  
                  <div className="space-y-3">
                    {quotationItems.map((item) => (
                      <div key={item.product._id} className={`flex items-center gap-4 p-3 rounded-xl ${
                        isDarkMode ? 'bg-gray-900' : 'bg-white'
                      }`}>
                        {item.product.images?.[0]?.url ? (
                          <img
                            src={item.product.images[0].url}
                            alt={item.product.title}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        ) : (
                          <div className={`w-16 h-16 rounded-lg flex items-center justify-center ${
                            isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
                          }`}>
                            <Package className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                        <div className="flex-1">
                          <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {item.product.title}
                          </h4>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            Qty: {item.quantity} × ₹{item.product.price.toLocaleString()}
                          </p>
                        </div>
                        <div className={`text-right font-bold ${
                          isDarkMode ? 'text-green-400' : 'text-green-600'
                        }`}>
                          ₹{(item.product.price * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className={`mt-4 pt-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div className="flex justify-between text-lg font-bold">
                      <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>Total</span>
                      <span className={isDarkMode ? 'text-green-400' : 'text-green-600'}>
                        ₹{getQuotationTotal().toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Buyer Details Summary */}
                <div className={`p-6 rounded-2xl ${
                  isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'
                }`}>
                  <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    <User className={`w-5 h-5 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                    Contact Details
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Full Name</p>
                      <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {buyerDetails.fullName}
                      </p>
                    </div>
                    <div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Email</p>
                      <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {buyerDetails.email}
                      </p>
                    </div>
                    <div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Mobile</p>
                      <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {buyerDetails.mobile}
                      </p>
                    </div>
                    {buyerDetails.companyName && (
                      <div>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Company</p>
                        <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {buyerDetails.companyName}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Address Summary */}
                <div className={`p-6 rounded-2xl ${
                  isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'
                }`}>
                  <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    <MapPin className={`w-5 h-5 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                    Delivery Address
                  </h3>
                  
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {addressDetails.houseFlat}, {addressDetails.streetArea}
                    {addressDetails.landmark && `, ${addressDetails.landmark}`}
                    <br />
                    {addressDetails.city}, {addressDetails.state} - {addressDetails.pincode}
                  </p>
                </div>

                {/* Disclaimer */}
                <div className={`p-4 rounded-xl ${
                  isDarkMode ? 'bg-yellow-500/10 border border-yellow-500/20' : 'bg-yellow-50 border border-yellow-200'
                }`}>
                  <p className={`text-sm ${isDarkMode ? 'text-yellow-400' : 'text-yellow-700'}`}>
                    <strong>Note:</strong> This is a quotation request. Our team will review your request and send you a customized quote with the best possible pricing. You will receive a confirmation email shortly.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className={`sticky bottom-0 flex items-center justify-between p-6 border-t ${
          isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'
        }`}>
          <Button
            variant="outline"
            onClick={step === 1 ? closeQuotationModal : handlePrevStep}
            className={isDarkMode ? 'border-gray-700 hover:bg-gray-800' : ''}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {step === 1 ? 'Close' : 'Back'}
          </Button>
          
          {step < 3 ? (
            <Button
              onClick={handleNextStep}
              disabled={step === 1 && quotationItems.length === 0}
              className={`${
                isDarkMode 
                  ? 'bg-purple-500 hover:bg-purple-600' 
                  : 'bg-purple-600 hover:bg-purple-700'
              } text-white disabled:opacity-50`}
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmitQuote}
              disabled={submitting}
              className={`${
                isDarkMode 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : 'bg-green-600 hover:bg-green-700'
              } text-white`}
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Quote Request
                </>
              )}
            </Button>
          )}
        </div>

        {/* Product Detail Modal */}
        <AnimatePresence>
          {selectedProduct && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`fixed inset-0 z-[70] flex items-center justify-center p-4 ${
                isDarkMode ? 'bg-black/80' : 'bg-black/50'
              }`}
              onClick={() => setSelectedProduct(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className={`w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-3xl border p-6 ${
                  isDarkMode 
                    ? 'bg-gray-900 border-gray-700' 
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {selectedProduct.title}
                  </h3>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className={`p-2 rounded-lg ${
                      isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                    }`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                {selectedProduct.images?.[0]?.url && (
                  <img
                    src={selectedProduct.images[0].url}
                    alt={selectedProduct.title}
                    className="w-full h-64 object-contain rounded-2xl mb-4"
                  />
                )}
                
                <div className="space-y-4">
                  <div>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Category
                    </span>
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {selectedProduct.category}
                    </p>
                  </div>
                  
                  <div>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Price
                    </span>
                    <p className={`text-2xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                      ₹{selectedProduct.price.toLocaleString()}
                    </p>
                  </div>
                  
                  <div>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Description
                    </span>
                    <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                      {selectedProduct.description}
                    </p>
                  </div>
                  
                  {selectedProduct.specifications && (
                    <div>
                      <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Specifications
                      </span>
                      <div className="mt-2 space-y-1">
                        {Array.from(selectedProduct.specifications || new Map()).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{key}</span>
                            <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedProduct(null);
                      closeQuotationModal();
                      navigate(`/products/${selectedProduct._id}`);
                    }}
                    className={`flex-1 ${isDarkMode ? 'border-gray-700' : ''}`}
                  >
                    View Full Details
                  </Button>
                  
                  {isInQuotation(selectedProduct._id) ? (
                    <Button
                      onClick={() => {
                        removeFromQuotation(selectedProduct._id);
                        setSelectedProduct(null);
                      }}
                      variant="destructive"
                      className="flex-1"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove from Quote
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        handleAddProduct(selectedProduct);
                        setSelectedProduct(null);
                      }}
                      className={`flex-1 ${
                        isDarkMode 
                          ? 'bg-purple-500 hover:bg-purple-600' 
                          : 'bg-purple-600 hover:bg-purple-700'
                      } text-white`}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add to Quote
                    </Button>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default QuotationModal;
