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
import './App.css';

function App() {
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
        <Toaster position="top-right" richColors />
      </div>
    </AuthProvider>
  );
}

export default App;