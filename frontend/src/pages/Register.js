import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { User, Mail, Lock, Eye, EyeOff, Sparkles, Shield, Database, Cpu } from 'lucide-react';

const Register = () => {
  const { isDarkMode } = useTheme();
  
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await register(formData);
    setLoading(false);
    if (result.success) navigate('/');
  };

  return (
    <div className={`min-h-screen font-sans relative overflow-hidden transition-colors duration-300 ${
      isDarkMode ? 'bg-black text-white' : 'bg-gradient-to-br from-slate-50 to-blue-50 text-gray-900'
    }`}>
      <br/>
      <br/>
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <div className={`absolute top-1/4 -left-10 w-72 h-72 rounded-full blur-3xl animate-pulse ${
          isDarkMode ? 'bg-blue-600/20' : 'bg-blue-400/20'
        }`} />
        <div className={`absolute bottom-1/4 -right-10 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000 ${
          isDarkMode ? 'bg-green-600/15' : 'bg-emerald-400/15'
        }`} />
        <div className={`absolute top-1/2 left-1/2 w-64 h-64 rounded-full blur-3xl animate-pulse delay-500 ${
          isDarkMode ? 'bg-cyan-600/10' : 'bg-cyan-400/10'
        }`} />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(59,130,246,0.1)'} 1px, transparent 1px),
                              linear-gradient(90deg, ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(59,130,246,0.1)'} 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Floating Icons */}
      <div className="absolute top-20 left-10 opacity-20 animate-float">
        <Shield className={`w-8 h-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`} />
      </div>
      <div className="absolute top-40 right-16 opacity-20 animate-float delay-1000">
        <Database className={`w-10 h-10 ${isDarkMode ? 'text-green-400' : 'text-emerald-500'}`} />
      </div>
      <div className="absolute bottom-32 left-20 opacity-20 animate-float delay-500">
        <Cpu className={`w-12 h-12 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-500'}`} />
      </div>

      <div className="container mx-auto min-h-screen flex items-center justify-center px-4 py-8 relative z-10">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <Sparkles className={`w-8 h-8 mr-3 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <div className={`absolute -inset-1 rounded-full blur opacity-75 animate-pulse ${
                  isDarkMode ? 'bg-blue-400' : 'bg-blue-400'
                }`}></div>
              </div>
              <h1 className={`text-3xl font-bold bg-clip-text text-transparent ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-blue-400 via-green-400 to-cyan-400' 
                  : 'bg-gradient-to-r from-blue-600 via-emerald-600 to-cyan-600'
              }`}>
                Telogica
              </h1>
            </div>
            <p className={isDarkMode ? 'text-gray-400 text-sm' : 'text-gray-600 text-sm'}>
              Join the future of telecommunications
            </p>
          </div>

          {/* Register Card */}
          <div className={`backdrop-blur-xl rounded-3xl p-8 border shadow-2xl transition-colors duration-300 ${
            isDarkMode 
              ? 'bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-gray-700/50' 
              : 'bg-white/80 border-gray-200'
          }`}>
            <div className="text-center mb-8">
              <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Create Account</h2>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Start your journey with Telogica</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6" data-testid="register-form">
              {/* Name Input */}
              <div className="space-y-2">
                <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  </div>
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`pl-10 transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500'
                    }`}
                    required
                    data-testid="register-name-input"
                  />
                </div>
              </div>

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
                        ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500'
                    }`}
                    required
                    data-testid="register-email-input"
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
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={`pl-10 pr-10 transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500'
                    }`}
                    required
                    data-testid="register-password-input"
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
                <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Use 8+ characters with a mix of letters, numbers & symbols
                </p>
              </div>

              {/* Terms Agreement */}
              <div className="flex items-start space-x-3 text-sm">
                <input 
                  type="checkbox" 
                  className={`mt-1 rounded focus:ring-blue-500 ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-blue-500' 
                      : 'bg-white border-gray-300 text-blue-600'
                  }`}
                  required 
                />
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                  I agree to the{' '}
                  <a href="#" className={`font-medium transition-colors ${
                    isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'
                  }`}>
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className={`font-medium transition-colors ${
                    isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'
                  }`}>
                    Privacy Policy
                  </a>
                </span>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className={`w-full font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg border-0 ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-blue-500/25' 
                    : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-blue-500/25'
                }`}
                disabled={loading}
                data-testid="register-submit-btn"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  <span>Create Account</span>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className={`w-full border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className={`px-2 ${isDarkMode ? 'bg-gray-900 text-gray-400' : 'bg-white text-gray-500'}`}>Already with us?</span>
              </div>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  className={`font-semibold transition-colors duration-300 hover:underline ${
                    isDarkMode ? 'text-cyan-400 hover:text-cyan-300' : 'text-blue-600 hover:text-blue-500'
                  }`}
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          {/* Features List */}
          <div className="grid grid-cols-3 gap-4 mt-8 text-center">
            <div className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
              <Shield className={`w-6 h-6 mx-auto mb-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`} />
              <p className="text-xs font-medium">Secure</p>
            </div>
            <div className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
              <Database className={`w-6 h-6 mx-auto mb-2 ${isDarkMode ? 'text-green-400' : 'text-emerald-500'}`} />
              <p className="text-xs font-medium">Reliable</p>
            </div>
            <div className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
              <Cpu className={`w-6 h-6 mx-auto mb-2 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-500'}`} />
              <p className="text-xs font-medium">Fast</p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              © 2024 Telogica. Powering the future of connectivity.
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

export default Register;