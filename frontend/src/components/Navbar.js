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
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-700 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-700 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gradient-to-r from-gray-900/90 via-violet-900/90 to-gray-900/90 backdrop-blur-lg border-b border-violet-800/30 shadow-lg' 
          : 'bg-gradient-to-r from-gray-900/80 via-violet-900/80 to-gray-900/80 backdrop-blur-md'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-violet-500/50 transition-all duration-300 group-hover:scale-105">
                  <span className="text-white font-bold text-xl">T</span>
                </div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-600 to-orange-500 blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-violet-200">Telogica</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    isActive(link.path)
                      ? 'text-white'
                      : 'text-gray-300 hover:text-white'
                  }`}
                  data-testid={`nav-${link.name.toLowerCase()}-link`}
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <link.icon className="w-4 h-4" />
                    <span>{link.name}</span>
                  </span>
                  {isActive(link.path) && (
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-purple-600/20 rounded-lg -z-10"></div>
                  )}
                </Link>
              ))}
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden lg:flex items-center space-x-2">
              {isAuthenticated ? (
                <>
                  {isAdmin && (
                    <Button
                      variant="ghost"
                      onClick={() => navigate('/admin/dashboard')}
                      className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                      data-testid="nav-admin-dashboard-btn"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      <span>Dashboard</span>
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    onClick={() => navigate('/cart')}
                    className="relative text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                    data-testid="nav-cart-btn"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
                  </Button>
                  <div className="relative" ref={dropdownRef}>
                    <Button
                      variant="ghost"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                      data-testid="nav-user-menu-btn"
                    >
                      <User className="w-4 h-4" />
                      <span>Account</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </Button>
                    
                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-gray-800/95 backdrop-blur-md rounded-lg shadow-xl border border-violet-800/30 overflow-hidden">
                        <div className="p-4 border-b border-violet-800/30">
                          <p className="text-white font-medium">{user?.name || 'User'}</p>
                          <p className="text-gray-400 text-sm">{user?.email || 'user@example.com'}</p>
                        </div>
                        <div className="p-2">
                          <Button
                            variant="ghost"
                            onClick={() => {
                              navigate('/my-orders');
                              setIsDropdownOpen(false);
                            }}
                            className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10 rounded-lg"
                            data-testid="nav-orders-btn"
                          >
                            <User className="w-4 h-4 mr-2" />
                            My Orders
                          </Button>
                          <Button
                            variant="ghost"
                            onClick={() => {
                              navigate('/profile');
                              setIsDropdownOpen(false);
                            }}
                            className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10 rounded-lg"
                          >
                            <User className="w-4 h-4 mr-2" />
                            Profile Settings
                          </Button>
                          <Button
                            variant="ghost"
                            onClick={handleLogout}
                            className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10 rounded-lg"
                            data-testid="nav-logout-btn"
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
                    className="text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                    data-testid="nav-login-btn"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => navigate('/register')}
                    className="bg-gradient-to-r from-violet-600 to-orange-500 text-white hover:opacity-90 rounded-lg shadow-lg hover:shadow-violet-500/25 transition-all duration-300"
                    data-testid="nav-register-btn"
                  >
                    Register
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              data-testid="mobile-menu-toggle"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}>
          <div className="px-4 py-6 space-y-4 border-t border-violet-800/30" data-testid="mobile-menu">
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                    isActive(link.path)
                      ? 'bg-gradient-to-r from-violet-600/20 to-purple-600/20 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <link.icon className="w-4 h-4" />
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>
            
            <div className="border-t border-violet-800/30 pt-4">
              {isAuthenticated ? (
                <div className="space-y-2">
                  {isAdmin && (
                    <Link
                      to="/admin/dashboard"
                      className="flex items-center space-x-2 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                      onClick={() => setIsOpen(false)}
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      <span>Admin Dashboard</span>
                    </Link>
                  )}
                  <Link
                    to="/cart"
                    className="flex items-center space-x-2 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Cart</span>
                    <span className="ml-auto bg-orange-500 text-white text-xs px-2 py-1 rounded-full">3</span>
                  </Link>
                  <Link
                    to="/my-orders"
                    className="flex items-center space-x-2 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    <span>My Orders</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-2 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    className="block w-full px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block w-full px-4 py-3 rounded-lg bg-gradient-to-r from-violet-600 to-orange-500 text-white hover:opacity-90 transition-all duration-300 text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
            
            {/* Contact Info */}
            <div className="border-t border-violet-800/30 pt-4 grid grid-cols-1 gap-2 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+91-9876543210</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>info@telogica.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Hyderabad, India</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;