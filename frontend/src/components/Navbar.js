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
  MapPin,
  Sun,
  Moon
} from 'lucide-react';
import { Button } from './ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeHover, setActiveHover] = useState(null);
  const dropdownRef = useRef(null);

  const { user, logout, isAuthenticated, isAdmin } = useAuth();
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

  const navLinks = [
    { name: 'Home', path: '/', icon: Globe },
    { name: 'About', path: '/about', icon: User },
    { name: 'Services', path: '/services', icon: Zap },
    { name: 'Products', path: '/products', icon: Shield },
    { name: 'Investors', path: '/investors', icon: Sparkles },
    { name: 'Contact', path: '/contact', icon: Phone }
  ];

  // Premium color scheme
  const navbarBg = isScrolled 
    ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200/80 shadow-2xl' 
    : 'bg-white/90 backdrop-blur-lg';
  
  const textColor = 'text-gray-900';
  const secondaryTextColor = 'text-gray-600';
  const hoverTextColor = 'hover:text-purple-600';
  const hoverBg = 'hover:bg-purple-50';
  const activeBg = 'bg-purple-100';
  const dropdownBg = 'bg-white/95 backdrop-blur-xl border border-gray-200/80';
  const borderClass = 'border-gray-200/80';
  const mobileMenuBg = 'bg-white/95';
  const buttonPrimaryBg = 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700';
  const buttonSecondaryBg = 'bg-gray-100 text-gray-900 hover:bg-gray-200';
  const logoutHover = 'hover:text-red-600 hover:bg-red-50';
  const adminHover = 'hover:bg-purple-50';
  const cartBg = 'bg-gradient-to-r from-purple-600 to-pink-600 text-white';

  return (
    <>
      {/* Enhanced Animated Background Elements */}
      <nav className={`fixed w-full top-0 z-50 transition-all duration-500 ${navbarBg}`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo with enhanced animation */}
            <Link 
              to="/" 
              className="flex items-center space-x-3 group relative"
              onMouseEnter={() => setActiveHover('logo')}
              onMouseLeave={() => setActiveHover(null)}
            >
<div className="flex items-center space-x-3">
  {/* Logo */}
  <div className="relative w-22 h-20">
    <img 
      src="/logohead.png"
      alt="Telogica Logo" 
      className="w-full h-full object-contain relative z-10 rounded-2xl"
    />
  </div>

  {/* Text */}
  <div className="flex flex-col leading-tight">
    <span className="text-2xl font-bold text-foreground">
      Telogica Ltd
    </span>
    <span className="text-sm text-muted-foreground">
      (Formarly Aishwarya Technologies and Telecom Ltd)
    </span>
  </div>
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
                      ? 'text-purple-600'
                      : `${secondaryTextColor} ${hoverTextColor}`
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
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover/nav-link:w-full transition-all duration-300"></span>
                    </span>
                  </span>
                  
                  {/* Active state background */}
                  {isActive(link.path) && (
                    <div className="absolute inset-0 bg-purple-50 rounded-xl -z-10 border border-purple-200 shadow-lg"></div>
                  )}
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-50/50 to-pink-50/50 rounded-xl -z-10 border border-purple-100 opacity-0 group-hover/nav-link:opacity-100 transition-all duration-300 transform scale-95 group-hover/nav-link:scale-100"></div>
                  
                  {/* Floating dots animation */}
                  <div className="absolute -top-1 -right-1 opacity-0 group-hover/nav-link:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-1">
                      {[1, 2, 3].map((dot) => (
                        <div
                          key={dot}
                          className="w-1 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full animate-bounce"
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
                      className={`flex items-center gap-2 ${secondaryTextColor} ${hoverTextColor} ${adminHover} rounded-xl transition-all duration-500 group relative overflow-hidden border border-transparent hover:border-purple-200`}
                      data-testid="nav-admin-dashboard-btn"
                    >
                      <LayoutDashboard className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                      <span>Dashboard</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-50 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    onClick={() => navigate('/cart')}
                    className={`relative ${secondaryTextColor} ${hoverTextColor} ${hoverBg} rounded-xl transition-all duration-500 group overflow-hidden border border-transparent hover:border-purple-200`}
                    data-testid="nav-cart-btn"
                  >
                    <ShoppingCart className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                    <span className={`absolute -top-1 -right-1 w-5 h-5 ${cartBg} text-xs rounded-full flex items-center justify-center font-bold animate-ping-once shadow-lg`}>
                      3
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-50 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  </Button>
                  <div className="relative" ref={dropdownRef}>
                    <Button
                      variant="ghost"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className={`flex items-center gap-2 ${secondaryTextColor} ${hoverTextColor} ${hoverBg} rounded-xl transition-all duration-500 group relative overflow-hidden border border-transparent hover:border-purple-200`}
                      data-testid="nav-user-menu-btn"
                    >
                      <User className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                      <span>Account</span>
                      <ChevronDown className={`w-4 h-4 transition-all duration-500 ${isDropdownOpen ? 'rotate-180 scale-110' : ''}`} />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-50 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    </Button>
                    
                    {/* Enhanced Dropdown Menu */}
                    {isDropdownOpen && (
                      <div className={`absolute right-0 mt-2 w-64 ${dropdownBg} rounded-2xl shadow-2xl border border-gray-200/80 overflow-hidden animate-dropdown`}>
                        <div className="p-4 border-b border-gray-200/80 bg-gradient-to-r from-purple-50/50 to-transparent">
                          <p className={`${textColor} font-semibold`}>{user?.name || 'User'}</p>
                          <p className="text-gray-500 text-sm mt-1">{user?.email || 'user@example.com'}</p>
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
                              className={`w-full justify-start ${secondaryTextColor} ${hoverTextColor} ${hoverBg} rounded-lg transition-all duration-300 group/item overflow-hidden border border-transparent hover:border-purple-200`}
                              style={{ transitionDelay: `${index * 100}ms` }}
                            >
                              <item.icon className="w-4 h-4 mr-3 transition-transform duration-300 group-hover/item:scale-110" />
                              {item.label}
                              <div className="ml-auto w-2 h-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                            </Button>
                          ))}
                          <div className="border-t border-gray-200/80 my-1"></div>
                          <Button
                            variant="ghost"
                            onClick={handleLogout}
                            className={`w-full justify-start ${secondaryTextColor} ${logoutHover} rounded-lg transition-all duration-300 group/item overflow-hidden border border-transparent hover:border-red-200`}
                          >
                            <LogOut className="w-4 h-4 mr-3 transition-transform duration-300 group-hover/item:scale-110" />
                            Logout
                            <div className="ml-auto w-2 h-2 bg-red-500 rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 animate-pulse"></div>
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
                    className={`${secondaryTextColor} ${hoverTextColor} ${hoverBg} rounded-xl transition-all duration-500 group relative overflow-hidden border border-transparent hover:border-purple-200`}
                    data-testid="nav-login-btn"
                  >
                    Login
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-50 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  </Button>
                  <Button
                    onClick={() => navigate('/register')}
                    className={`${buttonPrimaryBg} font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 group relative overflow-hidden transform hover:scale-105`}
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
              className={`lg:hidden p-3 ${secondaryTextColor} ${hoverTextColor} transition-all duration-500 group relative rounded-xl ${hoverBg} border border-transparent hover:border-purple-200`}
              onClick={() => setIsOpen(!isOpen)}
              data-testid="mobile-menu-toggle"
            >
              {isOpen ? (
                <X className="w-6 h-6 transform rotate-0 scale-100 transition-transform duration-500" />
              ) : (
                <Menu className="w-6 h-6 transform rotate-0 scale-100 transition-transform duration-500" />
              )}
              <div className="absolute inset-0 border border-purple-200 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        <div className={`lg:hidden transition-all duration-500 overflow-hidden backdrop-blur-xl ${
          isOpen ? `max-h-screen ${mobileMenuBg}` : 'max-h-0'
        }`}>
          <div className="px-4 py-6 space-y-4 border-t border-gray-200/80" data-testid="mobile-menu">
            <div className="grid grid-cols-2 gap-3">
              {navLinks.map((link, index) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center space-x-3 px-4 py-4 rounded-xl font-medium transition-all duration-500 transform hover:scale-105 border ${
                    isActive(link.path)
                      ? `${activeBg} text-purple-600 border-purple-200`
                      : `${secondaryTextColor} ${hoverTextColor} ${hoverBg} border-transparent hover:border-purple-200`
                  }`}
                  onClick={() => setIsOpen(false)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <link.icon className="w-5 h-5" />
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>
            
            <div className="border-t border-gray-200/80 pt-4">
              {isAuthenticated ? (
                <div className="space-y-3">
                  {isAdmin && (
                    <Link
                      to="/admin/dashboard"
                      className={`flex items-center space-x-3 px-4 py-4 rounded-xl ${secondaryTextColor} ${hoverTextColor} ${hoverBg} transition-all duration-300 transform hover:scale-105 border border-transparent hover:border-purple-200`}
                      onClick={() => setIsOpen(false)}
                    >
                      <LayoutDashboard className="w-5 h-5" />
                      <span>Admin Dashboard</span>
                    </Link>
                  )}
                  <Link
                    to="/cart"
                    className={`flex items-center space-x-3 px-4 py-4 rounded-xl ${secondaryTextColor} ${hoverTextColor} ${hoverBg} transition-all duration-300 transform hover:scale-105 border border-transparent hover:border-purple-200`}
                    onClick={() => setIsOpen(false)}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Cart</span>
                    <span className={`ml-auto ${cartBg} text-xs px-2 py-1 rounded-full font-bold animate-pulse shadow-lg`}>
                      3
                    </span>
                  </Link>
                  <Link
                    to="/my-orders"
                    className={`flex items-center space-x-3 px-4 py-4 rounded-xl ${secondaryTextColor} ${hoverTextColor} ${hoverBg} transition-all duration-300 transform hover:scale-105 border border-transparent hover:border-purple-200`}
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="w-5 h-5" />
                    <span>My Orders</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className={`w-full flex items-center space-x-3 px-4 py-4 rounded-xl ${secondaryTextColor} ${logoutHover} transition-all duration-300 transform hover:scale-105 border border-transparent hover:border-red-200 text-left`}
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link
                    to="/login"
                    className={`block w-full px-4 py-4 rounded-xl ${secondaryTextColor} ${hoverTextColor} ${hoverBg} transition-all duration-300 transform hover:scale-105 border border-transparent hover:border-purple-200 text-center`}
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className={`block w-full px-4 py-4 rounded-xl ${buttonPrimaryBg} font-semibold transition-all duration-300 transform hover:scale-105 text-center shadow-lg hover:shadow-xl`}
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
            
            {/* Enhanced Contact Info */}
            <div className="border-t border-gray-200/80 pt-4 grid grid-cols-1 gap-3 text-sm text-gray-600">
              {[
                { icon: Phone, text: '+91-9876543210' },
                { icon: Mail, text: 'info@telogica.com' },
                { icon: MapPin, text: 'Hyderabad, India' }
              ].map((item, index) => (
                <div 
                  key={index}
                  className={`flex items-center space-x-3 transition-all duration-300 ${hoverTextColor} transform hover:translate-x-2`}
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
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(1.05); }
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