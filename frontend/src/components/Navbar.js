import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';
import { 
  Menu, 
  X, 
  ShoppingCart, 
  User, 
  LogOut, 
  LayoutDashboard,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  Sun,
  Moon
} from 'lucide-react';
import { Button } from './ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [cartCount, setCartCount] = useState(0);
  const API_URL = process.env.REACT_APP_BACKEND_URL;
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

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
  useEffect(() => {
    fetchCartCount();
  }, []);

  const fetchCartCount = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/products/cart/items`);
      const cartItems = res.data.data || [];
      const totalCount = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
      setCartCount(totalCount);
    } catch (error) {
      console.error('Failed to fetch cart count:', error);
      setCartCount(0);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Products', path: '/products' },
    { name: 'Investors', path: '/investors' },
    { name: 'Contact', path: '/contact' }
  ];

  // Dynamic styling based on theme
  const navbarBg = isScrolled 
    ? isDarkMode 
      ? 'bg-black/90 backdrop-blur-md border-b border-white/10' 
      : 'bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm'
    : 'bg-transparent';
  
  const textColor = isDarkMode ? 'text-white' : 'text-gray-900';
  const secondaryTextColor = isDarkMode ? 'text-white/80' : 'text-gray-600';
  const hoverTextColor = isDarkMode ? 'hover:text-blue-300' : 'hover:text-indigo-600';
  const activeTextColor = isDarkMode ? 'text-blue-300' : 'text-indigo-600';
  const buttonPrimaryBg = isDarkMode 
    ? 'bg-blue-500/80 hover:bg-blue-600 text-white backdrop-blur-sm' 
    : 'bg-indigo-600 hover:bg-indigo-700 text-white';
  const buttonSecondaryBg = isDarkMode 
    ? 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/20' 
    : 'bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-300';
  const dropdownBg = isDarkMode 
    ? 'bg-black/90 backdrop-blur-xl border border-white/20' 
    : 'bg-white backdrop-blur-xl border border-gray-200 shadow-lg';
  const mobileMenuBg = isDarkMode 
    ? 'bg-black/95 backdrop-blur-xl border-t border-white/20' 
    : 'bg-white/95 backdrop-blur-xl border-t border-gray-200';

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${navbarBg}`}>
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3"
          >
            <div className="flex items-center space-x-3">
              <div className="relative w-16 h-16">
                <img 
                  src="/logohead.png"
                  alt="Telogica Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className={`text-xl font-bold ${textColor}`}>
                  Telogica Ltd
                </span>
                <span className={`text-xs ${secondaryTextColor}`}>
                  (Formerly Aishwarya Technologies and Telecom Ltd)
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-medium transition-colors duration-300 ${
                  isActive(link.path)
                    ? `${activeTextColor} font-semibold`
                    : `${secondaryTextColor} ${hoverTextColor}`
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Theme Toggle Button */}
            <Button
              variant="ghost"
              onClick={toggleTheme}
              className={`p-2 rounded-xl transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' 
                  : 'bg-gray-100 hover:bg-gray-200 text-indigo-600'
              }`}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>

            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Button
                    variant="ghost"
                    onClick={() => navigate('/admin/dashboard')}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 shadow-md transition-all duration-300 mr-2 ${
                      isDarkMode 
                        ? 'bg-gray-900 text-white shadow-gray-800/50 hover:bg-gray-800 hover:shadow-lg hover:shadow-blue-500/20' 
                        : 'bg-indigo-50 text-indigo-900 shadow-indigo-100 hover:bg-indigo-100 hover:shadow-lg'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <LayoutDashboard className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-indigo-600'}`} />
                      <span className="font-medium">Dashboard</span>
                    </div>
                  </Button>
                )}
                <Button
                  variant="ghost"
                  onClick={() => {
                    navigate('/cart');
                    setIsOpen(false);
                  }}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 shadow-md transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-gray-900 text-white shadow-gray-800/50 hover:bg-gray-800 hover:shadow-lg hover:shadow-blue-500/20' 
                      : 'bg-indigo-50 text-indigo-900 shadow-indigo-100 hover:bg-indigo-100 hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <ShoppingCart className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-indigo-600'}`} />
                    <span className="font-medium">Cart</span>
                  </div>

                  {cartCount > 0 && (
                    <span className={`w-6 h-6 text-white text-xs rounded-full flex items-center justify-center font-bold ml-2 ${
                      isDarkMode ? 'bg-blue-500' : 'bg-indigo-600'
                    }`}>
                      {cartCount > 99 ? '99+' : cartCount}
                    </span>
                  )}
                </Button>

                <div className="relative" ref={dropdownRef}>
                  <Button
                    variant="ghost"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 shadow-md transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-gray-900 text-white shadow-gray-800/50 hover:bg-gray-800 hover:shadow-lg hover:shadow-blue-500/20' 
                        : 'bg-indigo-50 text-indigo-900 shadow-indigo-100 hover:bg-indigo-100 hover:shadow-lg'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <User className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-indigo-600'}`} />
                      <span className="font-medium">Account</span>
                    </div>

                    <ChevronDown
                      className={`w-5 h-5 ml-2 transition-transform ${
                        isDropdownOpen 
                          ? isDarkMode ? 'rotate-180 text-blue-400' : 'rotate-180 text-indigo-600'
                          : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}
                    />
                  </Button>

                  {isDropdownOpen && (
                    <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-xl ${dropdownBg}`}>
                      <div className={`p-3 border-b ${isDarkMode ? 'border-white/20' : 'border-gray-200'}`}>
                        <p className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {user?.name || 'User'}
                        </p>
                        <p className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-gray-500'}`}>
                          {user?.email || 'user@example.com'}
                        </p>
                      </div>
                      <div className="p-2 space-y-1">
                        <Button
                          variant="ghost"
                          onClick={() => {
                            navigate('/profile');
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full justify-start transition-all duration-300 ${
                            isDarkMode 
                              ? 'text-white/80 hover:text-white hover:bg-white/10' 
                              : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                          }`}
                        >
                          <User className="w-4 h-4 mr-2" />
                          Profile
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={handleLogout}
                          className={`w-full justify-start transition-all duration-300 ${
                            isDarkMode 
                              ? 'text-white/80 hover:text-red-300 hover:bg-white/10' 
                              : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
                          }`}
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Logout
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
                  className={`${buttonSecondaryBg} transition-all duration-300`}
                >
                  Login
                </Button>
                <Button
                  onClick={() => navigate('/register')}
                  className={`${buttonPrimaryBg} transition-all duration-300`}
                >
                  Register
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 transition-colors duration-300 ${secondaryTextColor} ${hoverTextColor}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-300 overflow-hidden backdrop-blur-xl ${
        isOpen ? `max-h-screen ${mobileMenuBg}` : 'max-h-0'
      }`}>
        <div className={`px-6 py-4 space-y-4 border-t ${isDarkMode ? 'border-white/20' : 'border-gray-200'}`}>
          {/* Theme Toggle in Mobile */}
          <div className="flex items-center justify-between py-2">
            <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {isDarkMode ? 'Dark Mode' : 'Light Mode'}
            </span>
            <Button
              variant="ghost"
              onClick={toggleTheme}
              className={`p-2 rounded-xl transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' 
                  : 'bg-gray-100 hover:bg-gray-200 text-indigo-600'
              }`}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </div>

          {/* Navigation Links */}
          <div className="space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block py-3 px-4 rounded-lg font-medium transition-colors duration-300 ${
                  isActive(link.path)
                    ? isDarkMode 
                      ? `${activeTextColor} bg-white/10`
                      : `${activeTextColor} bg-indigo-50`
                    : isDarkMode
                      ? `${secondaryTextColor} ${hoverTextColor} hover:bg-white/10`
                      : `${secondaryTextColor} ${hoverTextColor} hover:bg-gray-100`
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          {/* Auth Section */}
          <div className={`border-t pt-4 ${isDarkMode ? 'border-white/20' : 'border-gray-200'}`}>
            {isAuthenticated ? (
              <div className="space-y-3">
                {isAdmin && (
                  <Button
                    variant="ghost"
                    onClick={() => {
                      navigate('/admin/dashboard');
                      setIsOpen(false);
                    }}
                    className={`w-full justify-start transition-all duration-300 mb-2 ${
                      isDarkMode 
                        ? `${secondaryTextColor} ${hoverTextColor} hover:bg-white/10`
                        : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-100'
                    }`}
                  >
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                )}
                <Button
                  variant="ghost"
                  onClick={() => {
                    navigate('/cart');
                    setIsOpen(false);
                  }}
                  className={`w-full justify-start transition-all duration-300 relative group mb-2 ${
                    isDarkMode 
                      ? `${secondaryTextColor} ${hoverTextColor} hover:bg-white/10`
                      : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-100'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Cart
                  {cartCount > 0 && (
                    <span className={`absolute right-4 w-5 h-5 text-white text-xs rounded-full flex items-center justify-center font-bold transform group-hover:scale-110 transition-transform duration-200 ${
                      isDarkMode ? 'bg-blue-500' : 'bg-indigo-600'
                    }`}>
                      {cartCount > 99 ? '99+' : cartCount}
                    </span>
                  )}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    navigate('/profile');
                    setIsOpen(false);
                  }}
                  className={`w-full justify-start transition-all duration-300 ${
                    isDarkMode 
                      ? `${secondaryTextColor} ${hoverTextColor} hover:bg-white/10`
                      : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-100'
                  }`}
                >
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className={`w-full justify-start transition-all duration-300 ${
                    isDarkMode 
                      ? 'text-white/80 hover:text-red-300 hover:bg-white/10'
                      : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
                  }`}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <Button
                  variant="ghost"
                  onClick={() => {
                    navigate('/login');
                    setIsOpen(false);
                  }}
                  className={`w-full ${buttonSecondaryBg} transition-all duration-300`}
                >
                  Login
                </Button>
                <Button
                  onClick={() => {
                    navigate('/register');
                    setIsOpen(false);
                  }}
                  className={`w-full ${buttonPrimaryBg} transition-all duration-300`}
                >
                  Register
                </Button>
              </div>
            )}
          </div>
          
          {/* Contact Info */}
          <div className={`border-t pt-4 space-y-3 text-sm ${isDarkMode ? 'border-white/20' : 'border-gray-200'}`}>
            <div className={`flex items-center space-x-3 ${secondaryTextColor}`}>
              <Phone className="w-4 h-4" />
              <span>+91 9396610682</span>
            </div>
            <div className={`flex items-center space-x-3 ${secondaryTextColor}`}>
              <Mail className="w-4 h-4" />
              <span>sales@telogica.com</span>
            </div>
            <div className={`flex items-center space-x-3 ${secondaryTextColor}`}>
              <MapPin className="w-4 h-4" />
              <span>Hyderabad, India</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;