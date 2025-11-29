import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Mail, Lock, Eye, EyeOff, Sparkles, Smartphone, Wifi, Server } from 'lucide-react';

const Login = () => {
  const { isDarkMode } = useTheme();
  
  useEffect(()=>{
    window.scrollTo(0,0);
  },[])
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await login(formData);
      setLoading(false);

      if (result.success) {
        console.log('✅ Login successful:', result);
        navigate('/');
      } else {
        console.error('❌ Login failed:', result.message);
      }
    } catch (error) {
      setLoading(false);
      console.error('🔥 Error during login:', error);
    }
  };

  return (
    <div className={`min-h-screen font-sans relative overflow-hidden transition-colors duration-300 ${
      isDarkMode ? 'bg-black text-white' : 'bg-gradient-to-br from-slate-50 to-indigo-50 text-gray-900'
    }`}>
      <br/>
      <br/>
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <div className={`absolute top-1/4 -left-10 w-72 h-72 rounded-full blur-3xl animate-pulse ${
          isDarkMode ? 'bg-purple-600/20' : 'bg-indigo-400/20'
        }`} />
        <div className={`absolute bottom-1/4 -right-10 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000 ${
          isDarkMode ? 'bg-blue-600/15' : 'bg-purple-400/15'
        }`} />
        <div className={`absolute top-1/2 left-1/2 w-64 h-64 rounded-full blur-3xl animate-pulse delay-500 ${
          isDarkMode ? 'bg-pink-600/10' : 'bg-pink-400/10'
        }`} />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(99,102,241,0.1)'} 1px, transparent 1px),
                              linear-gradient(90deg, ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(99,102,241,0.1)'} 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Floating Icons */}
      <div className="absolute top-20 left-10 opacity-20 animate-float">
        <Smartphone className={`w-8 h-8 ${isDarkMode ? 'text-purple-400' : 'text-indigo-500'}`} />
      </div>
      <div className="absolute top-40 right-16 opacity-20 animate-float delay-1000">
        <Wifi className={`w-10 h-10 ${isDarkMode ? 'text-blue-400' : 'text-indigo-500'}`} />
      </div>
      <div className="absolute bottom-32 left-20 opacity-20 animate-float delay-500">
        <Server className={`w-12 h-12 ${isDarkMode ? 'text-pink-400' : 'text-purple-500'}`} />
      </div>

      <div className="container mx-auto min-h-screen flex items-center justify-center px-4 py-8 relative z-10">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <Sparkles className={`w-8 h-8 mr-3 ${isDarkMode ? 'text-purple-400' : 'text-indigo-600'}`} />
                <div className={`absolute -inset-1 rounded-full blur opacity-75 animate-pulse ${
                  isDarkMode ? 'bg-purple-400' : 'bg-indigo-400'
                }`}></div>
              </div>
              <h1 className={`text-3xl font-bold bg-clip-text text-transparent ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400' 
                  : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600'
              }`}>
                Telogica
              </h1>
            </div>
            <p className={isDarkMode ? 'text-gray-400 text-sm' : 'text-gray-600 text-sm'}>
              Welcome back to your telecom dashboard
            </p>
          </div>

          {/* Login Card */}
          <div className={`backdrop-blur-xl rounded-3xl p-8 border shadow-2xl transition-colors duration-300 ${
            isDarkMode 
              ? 'bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-gray-700/50' 
              : 'bg-white/80 border-gray-200'
          }`}>
            <div className="text-center mb-8">
              <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Welcome Back</h2>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Sign in to continue to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6" data-testid="login-form">
              {/* Email Input */}
              <div className="space-y-2">
                <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  </div>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`pl-10 transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500'
                    }`}
                    required
                    data-testid="login-email-input"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  </div>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={`pl-10 pr-10 transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500'
                    }`}
                    required
                    data-testid="login-password-input"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className={`h-5 w-5 transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`} />
                    ) : (
                      <Eye className={`h-5 w-5 transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`} />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className={`rounded focus:ring-purple-500 ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-purple-500' 
                      : 'bg-white border-gray-300 text-indigo-600'
                  }`} />
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Remember me</span>
                </label>
                <a href="#" className={`font-medium transition-colors ${
                  isDarkMode ? 'text-purple-400 hover:text-purple-300' : 'text-indigo-600 hover:text-indigo-500'
                }`}>
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className={`w-full font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg border-0 ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white shadow-purple-500/25' 
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-indigo-500/25'
                }`}
                disabled={loading}
                data-testid="login-submit-btn"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <span>Sign In</span>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className={`w-full border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className={`px-2 ${isDarkMode ? 'bg-gray-900 text-gray-400' : 'bg-white text-gray-500'}`}>New to Telogica?</span>
              </div>
            </div>

            {/* Register Link */}
            <div className="text-center">
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Don't have an account?{' '}
                <Link 
                  to="/register" 
                  className={`font-semibold transition-colors duration-300 hover:underline ${
                    isDarkMode ? 'text-purple-400 hover:text-purple-300' : 'text-indigo-600 hover:text-indigo-500'
                  }`}
                >
                  Create account
                </Link>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-xs text-gray-500">
              © 2024 Telogica. Connecting the future of telecommunications.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Login;