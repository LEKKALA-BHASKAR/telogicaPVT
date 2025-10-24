import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, ShoppingCart, User, LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from './ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-orange-500 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <span className="text-2xl font-bold gradient-text">Telogica</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-violet-600 font-medium transition-colors" data-testid="nav-home-link">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-violet-600 font-medium transition-colors" data-testid="nav-about-link">
              About
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-violet-600 font-medium transition-colors" data-testid="nav-services-link">
              Services
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-violet-600 font-medium transition-colors" data-testid="nav-products-link">
              Products
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-violet-600 font-medium transition-colors" data-testid="nav-contact-link">
              Contact
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Button
                    variant="ghost"
                    onClick={() => navigate('/admin/dashboard')}
                    className="flex items-center gap-2"
                    data-testid="nav-admin-dashboard-btn"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Button>
                )}
                <Button
                  variant="ghost"
                  onClick={() => navigate('/cart')}
                  className="relative"
                  data-testid="nav-cart-btn"
                >
                  <ShoppingCart className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => navigate('/my-orders')}
                  className="flex items-center gap-2"
                  data-testid="nav-orders-btn"
                >
                  <User className="w-4 h-4" />
                  Orders
                </Button>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="flex items-center gap-2 border-violet-600 text-violet-600 hover:bg-violet-50"
                  data-testid="nav-logout-btn"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => navigate('/login')}
                  className="text-violet-600"
                  data-testid="nav-login-btn"
                >
                  Login
                </Button>
                <Button
                  onClick={() => navigate('/register')}
                  className="bg-gradient-to-r from-violet-600 to-orange-500 text-white hover:opacity-90"
                  data-testid="nav-register-btn"
                >
                  Register
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            data-testid="mobile-menu-toggle"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200" data-testid="mobile-menu">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-violet-600 font-medium" onClick={() => setIsOpen(false)}>
                Home
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-violet-600 font-medium" onClick={() => setIsOpen(false)}>
                About
              </Link>
              <Link to="/services" className="text-gray-700 hover:text-violet-600 font-medium" onClick={() => setIsOpen(false)}>
                Services
              </Link>
              <Link to="/products" className="text-gray-700 hover:text-violet-600 font-medium" onClick={() => setIsOpen(false)}>
                Products
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-violet-600 font-medium" onClick={() => setIsOpen(false)}>
                Contact
              </Link>
              {isAuthenticated ? (
                <>
                  {isAdmin && (
                    <Link to="/admin/dashboard" className="text-gray-700 hover:text-violet-600 font-medium" onClick={() => setIsOpen(false)}>
                      Admin Dashboard
                    </Link>
                  )}
                  <Link to="/cart" className="text-gray-700 hover:text-violet-600 font-medium" onClick={() => setIsOpen(false)}>
                    Cart
                  </Link>
                  <Link to="/my-orders" className="text-gray-700 hover:text-violet-600 font-medium" onClick={() => setIsOpen(false)}>
                    My Orders
                  </Link>
                  <button onClick={handleLogout} className="text-left text-gray-700 hover:text-violet-600 font-medium">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-700 hover:text-violet-600 font-medium" onClick={() => setIsOpen(false)}>
                    Login
                  </Link>
                  <Link to="/register" className="text-gray-700 hover:text-violet-600 font-medium" onClick={() => setIsOpen(false)}>
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
