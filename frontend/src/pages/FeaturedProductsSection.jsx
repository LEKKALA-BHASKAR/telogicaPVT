import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/button';
import { ArrowRight, Star, ShoppingCart, Eye, Package, Sparkles, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

const FeaturedProductsSection = () => {
  const [activeCategory, setActiveCategory] = useState('Telecommunication');
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const API_URL = process.env.REACT_APP_BACKEND_URL;

  const categories = [
    {
      id: 'Telecommunication',
      name: 'Telecommunication',
      description: 'Advanced networking and communication equipment',
      icon: '📡',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'Defence',
      name: 'Defence & Security',
      description: 'Mission-critical defense and security systems',
      icon: '🛡️',
      color: 'from-red-500 to-orange-500'
    },
    {
      id: 'Manufacturing',
      name: 'Industrial Manufacturing',
      description: 'Precision instruments for industrial applications',
      icon: '🏭',
      color: 'from-blue-500 to-cyan-500'
    }
  ];

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      const promises = categories.map(category =>
        axios.get(`${API_URL}/api/products?category=${category.id}&limit=8`)
      );

      const results = await Promise.all(promises);
      
      const productsData = {};
      categories.forEach((category, index) => {
        productsData[category.id] = results[index].data.data || [];
      });

      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching featured products:', error);
      toast.error('Failed to load featured products');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId) => {
    try {
      await axios.post(`${API_URL}/api/products/cart/add`, { productId, quantity: 1 });
      toast.success('Product added to cart');
    } catch (error) {
      toast.error('Failed to add product to cart');
    }
  };

  const currentProducts = products[activeCategory] || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 bg-black text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-pink-600/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-purple-400" />
            <h2 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Featured Products
            </h2>
          </div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Discover our premium range of cutting-edge test and measuring equipment across all major industries
          </p>
        </motion.div>

        {/* Category Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`group relative px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                activeCategory === category.id
                  ? `bg-gradient-to-r ${category.color} text-white shadow-2xl scale-105`
                  : 'bg-gray-900/50 text-gray-400 hover:text-white hover:bg-gray-800/50 border border-gray-700/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{category.icon}</span>
                <span>{category.name}</span>
              </div>
              
              {/* Active indicator */}
              {activeCategory === category.id && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 rounded-2xl border-2 border-white/20"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Category Description */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            {categories.find(cat => cat.id === activeCategory)?.description}
          </p>
        </motion.div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
              <p className="text-gray-400">Loading featured products...</p>
            </div>
          </div>
        ) : (
          <>
            <motion.div
              key={activeCategory}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            >
              <AnimatePresence mode="wait">
                {currentProducts.map((product, index) => (
                  <motion.div
                    key={product._id}
                    variants={itemVariants}
                    layout
                    className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-xl hover:shadow-2xl hover:border-purple-500/30 transition-all duration-300 overflow-hidden"
                    onMouseEnter={() => setHoveredProduct(product._id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    {/* Product Image */}
                    <div className="relative h-48 overflow-hidden">
                      {product.images?.[0]?.url ? (
                        <img
                          src={product.images[0].url}
                          alt={product.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                          <Package className="w-12 h-12 text-gray-500" />
                        </div>
                      )}
                      
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />
                      
                      {/* Featured Badge */}
                      {product.featured && (
                        <div className="absolute top-3 left-3 bg-yellow-500 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                          <Star className="w-3 h-3 fill-current" />
                          Featured
                        </div>
                      )}
                      
                      {/* Category Badge */}
                      <div className="absolute top-3 right-3">
                        <div className={`px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${
                          categories.find(cat => cat.id === product.category)?.color
                        } text-white`}>
                          {product.category}
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className={`absolute bottom-3 left-3 right-3 flex gap-2 transition-all duration-300 ${
                        hoveredProduct === product._id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}>
                        <Button
                          size="sm"
                          onClick={() => addToCart(product._id)}
                          className="flex-1 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border-0"
                        >
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          Add to Cart
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          asChild
                          className="border-white/20 text-white hover:bg-white/10"
                        >
                          <Link to={`/products/${product._id}`}>
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Link>
                        </Button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="font-bold text-white text-lg mb-2 line-clamp-1 group-hover:text-purple-300 transition-colors">
                        {product.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      
                      {/* Specifications Preview */}
                      {product.specifications && Array.from(product.specifications).length > 0 && (
                        <div className="mb-3">
                          <div className="text-xs text-gray-500 mb-1">Key Specs:</div>
                          <div className="flex flex-wrap gap-1">
                            {Array.from(product.specifications).slice(0, 2).map(([key, value]) => (
                              <span key={key} className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded">
                                {key}: {value}
                              </span>
                            ))}
                            {Array.from(product.specifications).length > 2 && (
                              <span className="text-xs text-gray-500">+{Array.from(product.specifications).length - 2} more</span>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-green-400">
                          ₹{product.price.toLocaleString()}
                        </div>
                        <div className={`text-xs px-2 py-1 rounded-full ${
                          product.stock > 10 
                            ? "bg-green-500/20 text-green-400"
                            : product.stock > 0
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                        }`}>
                          {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* View All Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:shadow-2xl hover:scale-105 transition-all px-8 py-6 text-lg font-semibold"
              >
                <Link to="/products" className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  View All {categories.find(cat => cat.id === activeCategory)?.name} Products
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default FeaturedProductsSection;