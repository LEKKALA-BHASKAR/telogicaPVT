import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useQuotation } from '../context/QuotationContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle2, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const { isDarkMode } = useTheme();
  const { pendingQuoteData, submitPendingQuote } = useQuotation();
  const API_URL = process.env.REACT_APP_BACKEND_URL;
  
  useEffect(()=>{
    window.scrollTo(0,0);
  },[])
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Pre-fill email from pending quote if available
  useEffect(() => {
    if (pendingQuoteData?.buyer?.email) {
      setFormData(prev => ({
        ...prev,
        email: pendingQuoteData.buyer.email
      }));
    }
  }, [pendingQuoteData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await login(formData);
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
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
      {/* Left Side - Image & Content */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 to-blue-900/90 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
          alt="Technology Background" 
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
              Pioneering the Future of Telecom
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-blue-100"
            >
              Join thousands of industry leaders who trust Telogica for their advanced testing and measurement needs.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex gap-4 pt-4"
            >
              {['Industry Standard', '24/7 Support', 'Advanced Analytics'].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm bg-white/10 backdrop-blur px-3 py-1.5 rounded-full">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span>{item}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="text-sm text-blue-200">
            © 2024 Telogica Ltd. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className={`w-full lg:w-1/2 flex items-center justify-center p-8 transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-950' : 'bg-white'
      }`}>
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h2 className={`text-3xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Welcome back
            </h2>
            <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Please enter your details to sign in
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
                    Sign in to submit your quote request with {pendingQuoteData.products?.length || 0} product(s).
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
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
                        ? 'bg-gray-900 border-gray-800 text-white focus:border-purple-500 focus:ring-purple-500/20' 
                        : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-500 focus:ring-blue-500/20'
                    }`}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Password
                  </label>
                  <a href="#" className={`text-sm font-medium hover:underline ${
                    isDarkMode ? 'text-purple-400' : 'text-blue-600'
                  }`}>
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className={`h-5 w-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  </div>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={`pl-10 pr-10 h-12 rounded-xl transition-all ${
                      isDarkMode 
                        ? 'bg-gray-900 border-gray-800 text-white focus:border-purple-500 focus:ring-purple-500/20' 
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
                  <span>Signing in...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span>Sign in</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </Button>

            <p className={`text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Don't have an account?{' '}
              <Link 
                to="/register" 
                className={`font-semibold hover:underline ${
                  isDarkMode ? 'text-purple-400' : 'text-blue-600'
                }`}
              >
                Sign up for free
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;