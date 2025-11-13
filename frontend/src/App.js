import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Investors from './pages/Investors';
import Dashboard from './pages/admin/Dashboard';
import ManageProducts from './pages/admin/ManageProducts';
import ManageUsers from './pages/admin/ManageUsers';
import ManageOrders from './pages/admin/ManageOrders';
import ManageInvestorDocs from './pages/admin/ManageInvestorDocs';
import UserOrders from './pages/UserOrders';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import { Toaster } from './components/ui/sonner';
import { GlobalContactForm } from './components';
import { HelpCircle } from 'lucide-react';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

function App() {
  const [showContactForm, setShowContactForm] = useState(false);

  return (
    <AuthProvider>
      <div className="App">
        <Navbar />
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/investors" element={<Investors />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes */}
            <Route path="/cart" element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            } />
            <Route path="/checkout" element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            } />
            <Route path="/my-orders" element={
              <ProtectedRoute>
                <UserOrders />
              </ProtectedRoute>
            } />
            
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            } />
            <Route path="/admin/products" element={
              <AdminRoute>
                <ManageProducts />
              </AdminRoute>
            } />
            <Route path="/admin/users" element={
              <AdminRoute>
                <ManageUsers />
              </AdminRoute>
            } />
            <Route path="/admin/orders" element={
              <AdminRoute>
                <ManageOrders />
              </AdminRoute>
            } />
            <Route path="/admin/investor-docs" element={
              <AdminRoute>
                <ManageInvestorDocs />
              </AdminRoute>
            } />
          </Routes>
        </main>
        <Footer />
        <ScrollToTop />
        <Toaster position="top-right" richColors />
        
        {/* Floating Help Icon */}
        <button
          onClick={() => setShowContactForm(true)}
          className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-purple-600 to-violet-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 z-50 group"
          aria-label="Contact us"
        >
          <HelpCircle className="w-6 h-6 text-white group-hover:rotate-12 transition-transform duration-300" />
        </button>
        
        {/* Contact Form Modal */}
        {showContactForm && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-2xl border border-gray-700/50 shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-white">Contact Us</h3>
                  <button 
                    onClick={() => setShowContactForm(false)}
                    className="text-gray-400 hover:text-white"
                    aria-label="Close"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <GlobalContactForm />
              </div>
            </div>
          </div>
        )}
      </div>
    </AuthProvider>
  );
}

export default App;