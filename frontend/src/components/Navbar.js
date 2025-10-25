import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Menu, 
  X, 
  ShoppingCart, 
  User, 
  LogOut, 
  LayoutDashboard,
  ChevronDown,
  Sparkles,
  Zap,
  Shield,
  Globe,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { Button } from './ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeHover, setActiveHover] = useState(null);
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: Globe },
    { name: 'About', path: '/about', icon: User },
    { name: 'Services', path: '/services', icon: Zap },
    { name: 'Products', path: '/products', icon: Shield },
    { name: 'Investors', path: '/investors', icon: Sparkles },
    { name: 'Contact', path: '/contact', icon: Phone }
  ];

  return (
    <>
      {/* Enhanced Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float-reverse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-pulse-slow"></div>
      </div>

      <nav className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-black/95 backdrop-blur-xl border-b border-white/10 shadow-2xl' 
          : 'bg-black/90 backdrop-blur-lg'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo with enhanced animation */}
            <Link 
              to="/" 
              className="flex items-center space-x-3 group relative"
              onMouseEnter={() => setActiveHover('logo')}
              onMouseLeave={() => setActiveHover(null)}
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-white to-gray-300 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-white/30 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 overflow-hidden">
                  <span className="text-black font-bold text-xl relative z-10">T</span>
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white to-gray-300 blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500 animate-pulse"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white group-hover:text-gray-200 transition-colors duration-300">
                  Telogica
                </span>
                <div className="h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500 delay-100 origin-left"></div>
              </div>
            </Link>

            {/* Desktop Menu with enhanced animations */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link, index) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-6 py-3 rounded-xl font-medium transition-all duration-500 group/nav-link ${
                    isActive(link.path)
                      ? 'text-white'
                      : 'text-gray-300 hover:text-white'
                  }`}
                  data-testid={`nav-${link.name.toLowerCase()}-link`}
                  onMouseEnter={() => setActiveHover(link.name)}
                  onMouseLeave={() => setActiveHover(null)}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <link.icon className="w-4 h-4 transition-transform duration-300 group-hover/nav-link:scale-110" />
                    <span className="relative">
                      {link.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover/nav-link:w-full transition-all duration-300"></span>
                    </span>
                  </span>
                  
                  {/* Active state background */}
                  {isActive(link.path) && (
                    <div className="absolute inset-0 bg-white/10 rounded-xl -z-10 border border-white/20 shadow-lg"></div>
                  )}
                  
                  {/* Hover effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-xl -z-10 border border-white/10 opacity-0 group-hover/nav-link:opacity-100 transition-all duration-300 transform scale-95 group-hover/nav-link:scale-100 ${
                    activeHover === link.name ? 'animate-pulse-once' : ''
                  }`}></div>
                  
                  {/* Floating dots animation */}
                  <div className="absolute -top-1 -right-1 opacity-0 group-hover/nav-link:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-1">
                      {[1, 2, 3].map((dot) => (
                        <div
                          key={dot}
                          className="w-1 h-1 bg-white rounded-full animate-bounce"
                          style={{ animationDelay: `${dot * 0.1}s` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Desktop Auth Buttons with enhanced animations */}
            <div className="hidden lg:flex items-center space-x-3">
              {isAuthenticated ? (
                <>
                  {isAdmin && (
                    <Button
                      variant="ghost"
                      onClick={() => navigate('/admin/dashboard')}
                      className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-500 group relative overflow-hidden"
                      data-testid="nav-admin-dashboard-btn"
                    >
                      <LayoutDashboard className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                      <span>Dashboard</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    onClick={() => navigate('/cart')}
                    className="relative text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-500 group overflow-hidden"
                    data-testid="nav-cart-btn"
                  >
                    <ShoppingCart className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-black text-xs rounded-full flex items-center justify-center font-bold animate-ping-once">
                      3
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  </Button>
                  <div className="relative" ref={dropdownRef}>
                    <Button
                      variant="ghost"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-500 group relative overflow-hidden"
                      data-testid="nav-user-menu-btn"
                    >
                      <User className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                      <span>Account</span>
                      <ChevronDown className={`w-4 h-4 transition-all duration-500 ${isDropdownOpen ? 'rotate-180 scale-110' : ''}`} />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    </Button>
                    
                    {/* Enhanced Dropdown Menu */}
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-64 bg-black/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden animate-dropdown">
                        <div className="p-4 border-b border-white/10 bg-gradient-to-r from-white/5 to-transparent">
                          <p className="text-white font-semibold">{user?.name || 'User'}</p>
                          <p className="text-gray-400 text-sm mt-1">{user?.email || 'user@example.com'}</p>
                        </div>
                        <div className="p-2 space-y-1">
                          {[
                            { path: '/my-orders', label: 'My Orders', icon: User },
                            { path: '/profile', label: 'Profile Settings', icon: User },
                          ].map((item, index) => (
                            <Button
                              key={item.path}
                              variant="ghost"
                              onClick={() => {
                                navigate(item.path);
                                setIsDropdownOpen(false);
                              }}
                              className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 group/item overflow-hidden"
                              style={{ transitionDelay: `${index * 100}ms` }}
                            >
                              <item.icon className="w-4 h-4 mr-3 transition-transform duration-300 group-hover/item:scale-110" />
                              {item.label}
                              <div className="ml-auto w-2 h-2 bg-white rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                            </Button>
                          ))}
                          <div className="border-t border-white/10 my-1"></div>
                          <Button
                            variant="ghost"
                            onClick={handleLogout}
                            className="w-full justify-start text-gray-300 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-300 group/item overflow-hidden"
                          >
                            <LogOut className="w-4 h-4 mr-3 transition-transform duration-300 group-hover/item:scale-110" />
                            Logout
                            <div className="ml-auto w-2 h-2 bg-red-400 rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => navigate('/login')}
                    className="text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-500 group relative overflow-hidden"
                    data-testid="nav-login-btn"
                  >
                    Login
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  </Button>
                  <Button
                    onClick={() => navigate('/register')}
                    className="bg-gradient-to-r from-white to-gray-300 text-black font-semibold hover:from-gray-200 hover:to-white rounded-xl shadow-lg hover:shadow-white/25 transition-all duration-500 group relative overflow-hidden transform hover:scale-105"
                    data-testid="nav-register-btn"
                  >
                    <span className="relative z-10">Register</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  </Button>
                </>
              )}
            </div>

            {/* Enhanced Mobile Menu Button */}
            <button
              className="lg:hidden p-3 text-gray-300 hover:text-white transition-all duration-500 group relative rounded-xl hover:bg-white/10"
              onClick={() => setIsOpen(!isOpen)}
              data-testid="mobile-menu-toggle"
            >
              {isOpen ? (
                <X className="w-6 h-6 transform rotate-0 scale-100 transition-transform duration-500" />
              ) : (
                <Menu className="w-6 h-6 transform rotate-0 scale-100 transition-transform duration-500" />
              )}
              <div className="absolute inset-0 border border-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        <div className={`lg:hidden transition-all duration-500 overflow-hidden backdrop-blur-xl ${
          isOpen ? 'max-h-screen bg-black/95' : 'max-h-0'
        }`}>
          <div className="px-4 py-6 space-y-4 border-t border-white/10" data-testid="mobile-menu">
            <div className="grid grid-cols-2 gap-3">
              {navLinks.map((link, index) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center space-x-3 px-4 py-4 rounded-xl font-medium transition-all duration-500 transform hover:scale-105 ${
                    isActive(link.path)
                      ? 'bg-white/10 text-white border border-white/20'
                      : 'text-gray-300 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                  onClick={() => setIsOpen(false)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <link.icon className="w-5 h-5" />
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>
            
            <div className="border-t border-white/10 pt-4">
              {isAuthenticated ? (
                <div className="space-y-3">
                  {isAdmin && (
                    <Link
                      to="/admin/dashboard"
                      className="flex items-center space-x-3 px-4 py-4 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300 transform hover:scale-105 border border-transparent hover:border-white/10"
                      onClick={() => setIsOpen(false)}
                    >
                      <LayoutDashboard className="w-5 h-5" />
                      <span>Admin Dashboard</span>
                    </Link>
                  )}
                  <Link
                    to="/cart"
                    className="flex items-center space-x-3 px-4 py-4 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300 transform hover:scale-105 border border-transparent hover:border-white/10"
                    onClick={() => setIsOpen(false)}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Cart</span>
                    <span className="ml-auto bg-white text-black text-xs px-2 py-1 rounded-full font-bold animate-pulse">
                      3
                    </span>
                  </Link>
                  <Link
                    to="/my-orders"
                    className="flex items-center space-x-3 px-4 py-4 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300 transform hover:scale-105 border border-transparent hover:border-white/10"
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="w-5 h-5" />
                    <span>My Orders</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-4 rounded-xl text-gray-300 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 transform hover:scale-105 border border-transparent hover:border-red-400/20 text-left"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link
                    to="/login"
                    className="block w-full px-4 py-4 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300 transform hover:scale-105 border border-transparent hover:border-white/10 text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block w-full px-4 py-4 rounded-xl bg-gradient-to-r from-white to-gray-300 text-black font-semibold hover:from-gray-200 hover:to-white transition-all duration-300 transform hover:scale-105 text-center shadow-lg hover:shadow-white/25"
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
            
            {/* Enhanced Contact Info */}
            <div className="border-t border-white/10 pt-4 grid grid-cols-1 gap-3 text-sm text-gray-400">
              {[
                { icon: Phone, text: '+91-9876543210' },
                { icon: Mail, text: 'info@telogica.com' },
                { icon: MapPin, text: 'Hyderabad, India' }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-3 transition-all duration-300 hover:text-white transform hover:translate-x-2"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Add custom animations to global CSS */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(20px) rotate(-180deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.05; transform: scale(1); }
          50% { opacity: 0.08; transform: scale(1.05); }
        }
        @keyframes ping-once {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes pulse-once {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes dropdown {
          0% { opacity: 0; transform: translateY(-10px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        .animate-float-reverse {
          animation: float-reverse 25s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        .animate-ping-once {
          animation: ping-once 0.5s ease-in-out;
        }
        .animate-pulse-once {
          animation: pulse-once 0.5s ease-in-out;
        }
        .animate-dropdown {
          animation: dropdown 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Navbar;