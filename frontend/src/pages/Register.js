import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useQuotation } from '../context/QuotationContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle2, ShieldCheck, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const Register = () => {
  const { isDarkMode } = useTheme();
  const { pendingQuoteData, submitPendingQuote } = useQuotation();
  const API_URL = process.env.REACT_APP_BACKEND_URL;
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '' 
  });
  const [showPassword, setShowPassword] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Pre-fill email from pending quote if available
  useEffect(() => {
    if (pendingQuoteData?.buyer?.email) {
      setFormData(prev => ({
        ...prev,
        email: pendingQuoteData.buyer.email,
        name: pendingQuoteData.buyer.fullName || prev.name
      }));
    }
  }, [pendingQuoteData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await register(formData);
    setLoading(false);
    
    if (result.success) {
      // Check if there's a pending quote to submit
      if (pendingQuoteData) {
        try {
          const profileRes = await axios.get(`${API_URL}/api/auth/profile`);
          const userId = profileRes.data.data._id;
          await submitPendingQuote(userId);
        } catch (error) {
          console.error('Error getting user profile:', error);
        }
      }
      navigate('/');
    }
  };

  return (
    <div className={`min-h-screen flex ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
      {/* Left Side - Image & Content */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 to-cyan-900/90 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
          alt="Network Background" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <div className="relative z-20 flex flex-col justify-between h-full p-12 text-white">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-white" />
            </div>
            <span className="text-xl font-bold tracking-wide">TELOGICA</span>
          </div>

          <div className="space-y-6 max-w-lg">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl font-bold leading-tight"
            >
              Join the Global Network
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-cyan-100"
            >
              Create an account to access exclusive telecom solutions, real-time analytics, and enterprise-grade support.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col gap-4 pt-4"
            >
              <div className="flex items-center gap-3 text-sm bg-white/10 backdrop-blur p-4 rounded-xl border border-white/10">
                <ShieldCheck className="w-6 h-6 text-cyan-400" />
                <div>
                  <div className="font-semibold">Enterprise Security</div>
                  <div className="text-cyan-200 text-xs">Bank-grade encryption for your data</div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="text-sm text-cyan-200">
            © 2024 Telogica Ltd. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className={`w-full lg:w-1/2 flex items-center justify-center p-8 transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-950' : 'bg-white'
      }`}>
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h2 className={`text-3xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Create an account
            </h2>
            <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Enter your details to get started
            </p>
          </div>

          {/* Pending Quote Banner */}
          {pendingQuoteData && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl border ${
                isDarkMode 
                  ? 'bg-purple-500/10 border-purple-500/20' 
                  : 'bg-purple-50 border-purple-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-purple-500/20' : 'bg-purple-100'}`}>
                  <FileText className={`w-5 h-5 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                </div>
                <div>
                  <h3 className={`font-semibold ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>
                    Quote Request Pending
                  </h3>
                  <p className={`text-sm mt-1 ${isDarkMode ? 'text-purple-400/80' : 'text-purple-600'}`}>
                    Complete your registration to submit your quote request with {pendingQuoteData.products?.length || 0} product(s).
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className={`text-sm font-medium leading-none ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className={`h-5 w-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  </div>
                  <Input
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`pl-10 h-12 rounded-xl transition-all ${
                      isDarkMode 
                        ? 'bg-gray-900 border-gray-800 text-white focus:border-cyan-500 focus:ring-cyan-500/20' 
                        : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-500 focus:ring-blue-500/20'
                    }`}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className={`text-sm font-medium leading-none ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className={`h-5 w-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  </div>
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`pl-10 h-12 rounded-xl transition-all ${
                      isDarkMode 
                        ? 'bg-gray-900 border-gray-800 text-white focus:border-cyan-500 focus:ring-cyan-500/20' 
                        : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-500 focus:ring-blue-500/20'
                    }`}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className={`text-sm font-medium leading-none ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className={`h-5 w-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  </div>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={`pl-10 pr-10 h-12 rounded-xl transition-all ${
                      isDarkMode 
                        ? 'bg-gray-900 border-gray-800 text-white focus:border-cyan-500 focus:ring-cyan-500/20' 
                        : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-500 focus:ring-blue-500/20'
                    }`}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className={`h-5 w-5 ${isDarkMode ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'}`} />
                    ) : (
                      <Eye className={`h-5 w-5 ${isDarkMode ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'}`} />
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  Must be at least 8 characters long
                </p>
              </div>

              <div className="flex items-start space-x-3">
                <input 
                  type="checkbox" 
                  className={`mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${
                    isDarkMode ? 'bg-gray-800 border-gray-700' : ''
                  }`}
                  required 
                />
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  I agree to the{' '}
                  <a href="#" className={`font-medium hover:underline ${
                    isDarkMode ? 'text-cyan-400' : 'text-blue-600'
                  }`}>
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className={`font-medium hover:underline ${
                    isDarkMode ? 'text-cyan-400' : 'text-blue-600'
                  }`}>
                    Privacy Policy
                  </a>
                </span>
              </div>
            </div>

            <Button
              type="submit"
              className={`w-full h-12 rounded-xl font-semibold text-base transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
                isDarkMode 
                  ? 'bg-white text-black hover:bg-gray-200' 
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              }`}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  <span>Creating account...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span>Create account</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </Button>

            <p className={`text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Already have an account?{' '}
              <Link 
                to="/login" 
                className={`font-semibold hover:underline ${
                  isDarkMode ? 'text-cyan-400' : 'text-blue-600'
                }`}
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;