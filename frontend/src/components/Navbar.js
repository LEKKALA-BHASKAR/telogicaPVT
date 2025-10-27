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
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { Button } from './ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Products', path: '/products' },
    { name: 'Investors', path: '/investors' },
    { name: 'Contact', path: '/contact' }
  ];

  // Transparent color scheme
  const navbarBg = isScrolled 
    ? 'bg-black/15 backdrop-blur-xl border-b border-white/20 shadow-lg' 
    : 'bg-transparent';
  
  const textColor = isScrolled ? 'text-gray-900' : 'text-white';
  const secondaryTextColor = isScrolled ? 'text-gray-600' : 'text-white/80';
  const hoverTextColor = isScrolled ? 'hover:text-blue-600' : 'hover:text-white';
  const activeTextColor = isScrolled ? 'text-blue-600' : 'text-white';
  const buttonPrimaryBg = isScrolled 
    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
    : 'bg-black/20 hover:bg-white/30 text-white backdrop-blur-sm';
  const buttonSecondaryBg = isScrolled 
    ? 'bg-black-100 text-gray-900 hover:bg-gray-200' 
    : 'bg-white/100 hover:bg-white/20 text-white backdrop-blur-sm';
  const dropdownBg = isScrolled 
    ? 'bg-black/95 backdrop-blur-xl border border-gray-200' 
    : 'bg-white/80 backdrop-blur-xl border border-white/20';
  const mobileMenuBg = isScrolled 
    ? 'bg-black/95 backdrop-blur-xl border-t border-gray-200' 
    : 'bg-white/80 backdrop-blur-xl border-t border-white/20';

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
            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Button
                    variant="ghost"
                    onClick={() => navigate('/admin/dashboard')}
                    className={`${buttonSecondaryBg} border border-white/20 transition-all duration-300`}
                  >
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                )}
                <Button
                  variant="ghost"
                  onClick={() => navigate('/cart')}
                  className={`${buttonSecondaryBg} border border-white/20 transition-all duration-300 relative`}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Cart
                  <span className={`absolute -top-2 -right-2 w-5 h-5 ${
                    isScrolled ? 'bg-blue-600' : 'bg-white/80'
                  } text-xs rounded-full flex items-center justify-center font-bold backdrop-blur-sm`}>
                    3
                  </span>
                </Button>
                <div className="relative" ref={dropdownRef}>
                  <Button
                    variant="ghost"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`${buttonSecondaryBg} border border-white/20 transition-all duration-300`}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Account
                    <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </Button>
                  
                  {isDropdownOpen && (
                    <div className={`absolute right-0 mt-2 w-48 ${dropdownBg} rounded-lg shadow-xl backdrop-blur-xl`}>
                      <div className="p-3 border-b border-white/20">
                        <p className={`${isScrolled ? 'text-gray-900' : 'text-white'} font-medium text-sm`}>
                          {user?.name || 'User'}
                        </p>
                        <p className={`${isScrolled ? 'text-gray-600' : 'text-white/60'} text-xs`}>
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
                          className={`w-full justify-start ${
                            isScrolled 
                              ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' 
                              : 'text-white/80 hover:text-white hover:bg-white/10'
                          } transition-all duration-300`}
                        >
                          <User className="w-4 h-4 mr-2" />
                          Profile
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={handleLogout}
                          className={`w-full justify-start ${
                            isScrolled 
                              ? 'text-gray-600 hover:text-red-600 hover:bg-red-50' 
                              : 'text-white/80 hover:text-red-300 hover:bg-white/10'
                          } transition-all duration-300`}
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
                  className={`${buttonSecondaryBg} border border-white/20 transition-all duration-300`}
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
        <div className="px-6 py-4 space-y-4 border-t border-white/20">
          {/* Navigation Links */}
          <div className="space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block py-3 px-4 rounded-lg font-medium transition-colors duration-300 ${
                  isActive(link.path)
                    ? `${activeTextColor} ${
                        isScrolled ? 'bg-gray-100' : 'bg-white/10'
                      }`
                    : `${secondaryTextColor} ${hoverTextColor} ${
                        isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/10'
                      }`
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          {/* Auth Section */}
          <div className="border-t border-white/20 pt-4">
            {isAuthenticated ? (
              <div className="space-y-3">
                {isAdmin && (
                  <Button
                    variant="ghost"
                    onClick={() => {
                      navigate('/admin/dashboard');
                      setIsOpen(false);
                    }}
                    className={`w-full justify-start ${secondaryTextColor} ${hoverTextColor} ${
                      isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/10'
                    } transition-all duration-300`}
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
                  className={`w-full justify-start ${secondaryTextColor} ${hoverTextColor} ${
                    isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/10'
                  } transition-all duration-300 relative`}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Cart
                  <span className={`absolute right-4 w-5 h-5 ${
                    isScrolled ? 'bg-blue-600' : 'bg-white/80'
                  } text-xs rounded-full flex items-center justify-center font-bold backdrop-blur-sm`}>
                    3
                  </span>
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    navigate('/profile');
                    setIsOpen(false);
                  }}
                  className={`w-full justify-start ${secondaryTextColor} ${hoverTextColor} ${
                    isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/10'
                  } transition-all duration-300`}
                >
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className={`w-full justify-start ${
                    isScrolled 
                      ? 'text-gray-600 hover:text-red-600 hover:bg-red-50' 
                      : 'text-white/80 hover:text-red-300 hover:bg-white/10'
                  } transition-all duration-300`}
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
                  className={`w-full ${buttonSecondaryBg} border border-white/20 transition-all duration-300`}
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
          <div className="border-t border-white/20 pt-4 space-y-3 text-sm">
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