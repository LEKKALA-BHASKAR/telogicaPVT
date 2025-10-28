import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { ShoppingCart, FileText, Package, ChevronLeft, ChevronRight } from 'lucide-react';
import io from 'socket.io-client';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const API_URL = process.env.REACT_APP_BACKEND_URL;

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  useEffect(() => {
    fetchProduct();

    // Socket.IO for real-time stock updates
    const socket = io(API_URL);
    socket.on('stockUpdate', (data) => {
      if (data.productId === id) {
        setProduct((prev) => (prev ? { ...prev, stock: data.stock } : null));
        if (data.stock < quantity) {
          setQuantity(data.stock || 1);
          if (data.stock === 0) {
            toast.warning('Product is out of stock');
          }
        }
      }
    });

    return () => socket.disconnect();
  }, [id, quantity]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/products/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setProduct(res.data.data);
      setLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load product');
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      navigate('/login');
      return;
    }

    if (quantity <= 0 || quantity > product.stock) {
      toast.error('Invalid quantity');
      return;
    }

    try {
      await axios.post(
        `${API_URL}/api/products/cart/add`,
        { productId: id, quantity },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      toast.success('Added to cart!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add to cart');
    }
  };

  const handleImageChange = (direction) => {
    if (!product.images || product.images.length === 0) return;
    if (direction === 'next') {
      setSelectedImage((prev) => (prev + 1) % product.images.length);
    } else {
      setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-20">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
          <p className="text-gray-400 text-sm">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-20">
        <p className="text-gray-400 text-sm">Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans relative overflow-hidden pt-20 pb-12 px-4">
      {/* Subtle Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-80" />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4" initial="hidden" animate="visible" variants={fadeInUp}>
          {/* Images */}
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
            <div className="relative mb-4">
              {product.images && product.images.length > 0 ? (
                <div className="aspect-square overflow-hidden rounded-lg">
                  <img
                    src={product.images[selectedImage].url}
                    alt={product.title}
                    className="w-full h-full object-cover"
                    data-testid="product-image"
                  />
                  {product.images.length > 1 && (
                    <>
                      <button
                        onClick={() => handleImageChange('prev')}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-900/50 p-2 rounded-full hover:bg-gray-800"
                      >
                        <ChevronLeft className="w-5 h-5 text-gray-300" />
                      </button>
                      <button
                        onClick={() => handleImageChange('next')}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-900/50 p-2 rounded-full hover:bg-gray-800"
                      >
                        <ChevronRight className="w-5 h-5 text-gray-300" />
                      </button>
                    </>
                  )}
                </div>
              ) : (
                <div className="aspect-square bg-gray-900/50 rounded-lg flex items-center justify-center">
                  <Package className="w-16 h-16 text-gray-500" />
                </div>
              )}
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2 mt-3">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 ${
                        selectedImage === idx ? 'border-purple-400' : 'border-gray-700/50'
                      } hover:border-purple-400/30`}
                    >
                      <img src={img.url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div>
              <span className="text-xs font-semibold text-purple-400" data-testid="product-category">
                {product.category}
              </span>
              <h1 className="text-3xl font-semibold text-white mt-1 mb-3" data-testid="product-detail-title">
                {product.title}
              </h1>
              <p className="text-gray-400 text-sm leading-relaxed" data-testid="product-description">
                {product.description}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-2xl font-semibold text-green-400" data-testid="product-detail-price">
                ₹{product.price?.toLocaleString()}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  product.stock > 0
                    ? 'bg-green-500/20 text-green-400 border-green-500/30'
                    : 'bg-red-500/20 text-red-400 border-red-500/30'
                }`}
                data-testid="product-stock-status"
              >
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>

            {product.stock > 0 && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Quantity</label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-full bg-gray-900/50 border-gray-700 text-gray-300 hover:bg-gray-800"
                      data-testid="decrease-quantity-btn"
                    >
                      -
                    </Button>
                    <span className="text-base font-semibold w-12 text-center" data-testid="quantity-display">
                      {quantity}
                    </span>
                    <Button
                      variant="outline"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="w-10 h-10 rounded-full bg-gray-900/50 border-gray-700 text-gray-300 hover:bg-gray-800"
                      data-testid="increase-quantity-btn"
                    >
                      +
                    </Button>
                  </div>
                </div>

                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm text-white rounded-full hover:shadow-lg hover:scale-105 transition-all"
                  data-testid="add-to-cart-btn"
                >
                  <ShoppingCart className="mr-2 w-4 h-4" />
                  Add to Cart
                </Button>
              </div>
            )}

            {/* Specifications */}
            {product.specifications && Array.from(product.specifications).length > 0 && (
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
                <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  Specifications
                </h3>
                <div className="space-y-2">
                  {Array.from(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-xs">
                      <span className="text-gray-400">{key}:</span>
                      <span className="text-white">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PDFs */}
            {product.pdfs && product.pdfs.length > 0 && (
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
                <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Product Manuals
                </h3>
                <div className="space-y-2">
                  {product.pdfs.map((pdf, idx) => (
                    <a
                      key={idx}
                      href={pdf.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs text-purple-400 hover:underline"
                      data-testid={`pdf-link-${idx}`}
                    >
                      <FileText className="w-3 h-3" />
                      {pdf.name}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetails;