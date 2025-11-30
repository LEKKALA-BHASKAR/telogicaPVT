import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, Package, Users, ShoppingCart, Settings, 
  Menu, X, LogOut, Sun, Moon, ChevronRight
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const AdminLayout = ({ children, title, subtitle, actions }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const adminLinks = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: BarChart3 },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
    { name: 'Documents', path: '/admin/investor-docs', icon: Settings }
  ];

  const sidebarVariants = {
    hidden: { x: -300, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 20 }
    },
    exit: { 
      x: -300, 
      opacity: 0,
      transition: { ease: "easeInOut", duration: 0.3 }
    }
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 ${
      isDarkMode ? 'bg-black text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 ${
          isDarkMode ? 'bg-blue-600' : 'bg-blue-400'
        }`} />
        <div className={`absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[100px] opacity-15 ${
          isDarkMode ? 'bg-purple-600' : 'bg-purple-400'
        }`} />
      </div>

      {/* Mobile Header */}
      <div className={`lg:hidden fixed top-0 left-0 right-0 z-50 px-4 py-3 border-b backdrop-blur-xl flex justify-between items-center ${
        isDarkMode ? 'bg-black/80 border-white/10' : 'bg-white/80 border-gray-200'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
            T
          </div>
          <span className="font-bold tracking-tight">Telogica Admin</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`p-2 rounded-lg ${isDarkMode ? 'bg-white/10' : 'bg-gray-100'}`}
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <div className="relative z-10 flex pt-16 lg:pt-0">
        {/* Sidebar Navigation (Desktop) */}
        <aside className={`hidden lg:flex flex-col w-64 fixed h-full border-r backdrop-blur-xl z-20 ${
          isDarkMode ? 'bg-black/50 border-white/10' : 'bg-white/80 border-gray-200'
        }`}>
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/20">
                T
              </div>
              <span className="text-xl font-bold tracking-tight">Telogica</span>
            </div>

            <nav className="space-y-2">
              {adminLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                        : isDarkMode 
                          ? 'text-gray-400 hover:bg-white/5 hover:text-white' 
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'group-hover:scale-110 transition-transform'}`} />
                      {link.name}
                    </div>
                    {isActive && <ChevronRight className="w-4 h-4 opacity-50" />}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="mt-auto p-6 border-t border-gray-200/10 space-y-4">
            <div className={`p-4 rounded-xl flex items-center justify-between ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold shadow-lg">
                  A
                </div>
                <div>
                  <p className="text-sm font-bold">Admin</p>
                  <p className="text-xs opacity-60">admin@telogica.com</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={toggleTheme}
                className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl transition-all ${
                  isDarkMode 
                    ? 'bg-white/5 hover:bg-white/10 text-yellow-400' 
                    : 'bg-gray-100 hover:bg-gray-200 text-slate-700'
                }`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                <span className="text-xs font-bold">{isDarkMode ? 'Light' : 'Dark'}</span>
              </button>
              <button className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl transition-all ${
                isDarkMode 
                  ? 'bg-red-500/10 hover:bg-red-500/20 text-red-400' 
                  : 'bg-red-50 hover:bg-red-100 text-red-600'
              }`}>
                <LogOut className="w-5 h-5" />
                <span className="text-xs font-bold">Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              />
              <motion.aside 
                variants={sidebarVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={`fixed top-0 left-0 bottom-0 w-3/4 max-w-xs z-50 lg:hidden border-r ${
                  isDarkMode ? 'bg-black border-white/10' : 'bg-white border-gray-200'
                }`}
              >
                <div className="p-6 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                        T
                      </div>
                      <span className="text-xl font-bold tracking-tight">Telogica</span>
                    </div>
                    <button 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`p-2 rounded-lg ${isDarkMode ? 'bg-white/10' : 'bg-gray-100'}`}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <nav className="space-y-2 flex-1">
                    {adminLinks.map((link) => {
                      const Icon = link.icon;
                      const isActive = location.pathname === link.path;
                      return (
                        <Link
                          key={link.path}
                          to={link.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                            isActive
                              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                              : isDarkMode 
                                ? 'text-gray-400 hover:bg-white/5 hover:text-white' 
                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          {link.name}
                        </Link>
                      );
                    })}
                  </nav>

                  <div className="pt-6 border-t border-gray-200/10 space-y-4">
                    <button 
                      onClick={toggleTheme}
                      className={`w-full flex items-center justify-center gap-2 p-3 rounded-xl transition-all ${
                        isDarkMode 
                          ? 'bg-white/5 hover:bg-white/10 text-yellow-400' 
                          : 'bg-gray-100 hover:bg-gray-200 text-slate-700'
                      }`}
                    >
                      {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                      <span className="font-bold">{isDarkMode ? 'Switch to Light' : 'Switch to Dark'}</span>
                    </button>
                  </div>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <main className="flex-1 lg:ml-64 p-4 lg:p-8 min-h-screen overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            {(title || actions) && (
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                  {title && <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h1>}
                  {subtitle && <p className={`mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{subtitle}</p>}
                </div>
                {actions && (
                  <div className="flex items-center gap-3">
                    {actions}
                  </div>
                )}
              </div>
            )}
            
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
