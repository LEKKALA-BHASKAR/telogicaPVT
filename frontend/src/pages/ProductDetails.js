import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { ShoppingCart, FileText, Package } from 'lucide-react';
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

  useEffect(() => {
    fetchProduct();
    
    // Socket.IO for real-time stock updates
    const socket = io(API_URL);
    socket.on('stockUpdate', (data) => {
      if (data.productId === id) {
        setProduct(prev => prev ? { ...prev, stock: data.stock } : null);
      }
    });
    
    return () => socket.disconnect();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/products/${id}`);
      setProduct(res.data.data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to load product');
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      navigate('/login');
      return;
    }

    try {
      await axios.post(`${API_URL}/api/products/cart/add`, {
        productId: id,
        quantity
      });
      toast.success('Added to cart!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add to cart');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <p className="text-gray-500">Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-gradient-to-br from-violet-50 to-white">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <div className="aspect-square mb-4 overflow-hidden rounded-2xl bg-gradient-to-br from-violet-50 to-orange-50">
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[selectedImage].url}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="w-24 h-24 text-gray-300" />
                  </div>
                )}
              </div>
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`aspect-square rounded-xl overflow-hidden border-2 ${
                        selectedImage === idx ? 'border-violet-600' : 'border-transparent'
                      }`}
                    >
                      <img src={img.url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <span className="text-sm text-violet-600 font-semibold">{product.category}</span>
              <h1 className="text-4xl font-bold mt-2 mb-4" data-testid="product-detail-title">{product.title}</h1>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold text-gray-900" data-testid="product-detail-price">
                ₹{product.price?.toLocaleString()}
              </span>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`} data-testid="product-stock-status">
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>

            {product.stock > 0 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Quantity</label>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 rounded-full"
                      data-testid="decrease-quantity-btn"
                    >
                      -
                    </Button>
                    <span className="text-2xl font-bold w-12 text-center" data-testid="quantity-display">{quantity}</span>
                    <Button
                      variant="outline"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="w-12 h-12 rounded-full"
                      data-testid="increase-quantity-btn"
                    >
                      +
                    </Button>
                  </div>
                </div>

                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-to-r from-violet-600 to-orange-500 text-white rounded-full"
                  data-testid="add-to-cart-btn"
                >
                  <ShoppingCart className="mr-2 w-5 h-5" />
                  Add to Cart
                </Button>
              </div>
            )}

            {/* PDFs */}
            {product.pdfs && product.pdfs.length > 0 && (
              <div className="bg-white p-6 rounded-2xl">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Product Manuals
                </h3>
                <div className="space-y-2">
                  {product.pdfs.map((pdf, idx) => (
                    <a
                      key={idx}
                      href={pdf.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-violet-600 hover:underline"
                      data-testid={`pdf-link-${idx}`}
                    >
                      <FileText className="w-4 h-4" />
                      {pdf.name}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
