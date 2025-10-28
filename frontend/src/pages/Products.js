import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import {
  Search,
  Filter,
  Grid3X3,
  List,
  SlidersHorizontal,
  X,
  Sparkles,
  Package,
  Star,
  TrendingUp,
  ShoppingCart,
} from 'lucide-react';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [addingToCart, setAddingToCart] = useState({});

  const API_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    fetchProducts();
  }, [search, category, sort, priceRange, featuredOnly]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (category && category !== 'all') params.append('category', category);
      if (sort) params.append('sort', sort);
      if (priceRange.min) params.append('minPrice', priceRange.min);
      if (priceRange.max) params.append('maxPrice', priceRange.max);

      const res = await axios.get(`${API_URL}/api/products?${params.toString()}`);
      let filteredProducts = res.data.data;
      if (featuredOnly) {
        filteredProducts = filteredProducts.filter((p) => p.featured);
      }
      setProducts(filteredProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, productName) => {
    setAddingToCart(prev => ({ ...prev, [productId]: true }));
    
    try {
      await axios.post(`${API_URL}/api/products/cart/add`, { 
        productId, 
        quantity: 1 
      });
      
      toast.success(`"${productName}" added to cart`);
      
      // Trigger cart update event for other components
      window.dispatchEvent(new Event('cartUpdated'));
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error(error.response?.data?.message || 'Failed to add product to cart');
    } finally {
      setAddingToCart(prev => ({ ...prev, [productId]: false }));
    }
  };

  const quickAddToCart = async (product, e) => {
    e.stopPropagation(); // Prevent card click event
    await addToCart(product._id, product.title);
  };

  const clearFilters = () => {
    setSearch('');
    setCategory('all');
    setSort('newest');
    setPriceRange({ min: '', max: '' });
    setFeaturedOnly(false);
    toast.success('Filters cleared');
  };

  const categoryStats = {
    all: products.length,
    Telecommunication: products.filter((p) => p.category === 'Telecommunication').length,
    Defence: products.filter((p) => p.category === 'Defence').length,
    Manufacturing: products.filter((p) => p.category === 'Manufacturing').length,
    featured: products.filter((p) => p.featured).length,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  // Enhanced ProductCard component with Add to Cart
  const EnhancedProductCard = ({ product, viewMode, onAddToCart }) => {
    const isAdding = addingToCart[product._id];
    
    return (
      <motion.div
        className={`group relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-xl hover:shadow-2xl hover:border-purple-500/30 transition-all duration-300 overflow-hidden ${
          viewMode === 'list' ? 'flex' : 'flex flex-col'
        }`}
        whileHover={{ y: -5 }}
      >
        {/* Product Image */}
        <div className={`relative ${
          viewMode === 'list' 
            ? 'w-48 h-48 flex-shrink-0' 
            : 'w-full h-64'
        } overflow-hidden`}>
          {product.images?.[0]?.url ? (
            <img
              src={product.images[0].url}
              alt={product.title}
              className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gray-700 flex items-center justify-center">
              <Package className="w-12 h-12 text-gray-500" />
            </div>
          )}
          
          {/* Overlay with Quick Actions */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-4 right-4 flex gap-2">
              <Button
                size="sm"
                onClick={(e) => onAddToCart(product, e)}
                disabled={isAdding}
                className="flex-1 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border-0 transition-all duration-300"
              >
                {isAdding ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full w-4 h-4 border-b-2 border-white"></div>
                    Adding...
                  </div>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Featured Badge */}
          {product.featured && (
            <div className="absolute top-3 left-3 bg-yellow-500 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <Star className="w-3 h-3 fill-current" />
              Featured
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute top-3 right-3">
            <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
              product.category === 'Telecommunication' 
                ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                : product.category === 'Defence'
                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
            }`}>
              {product.category}
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className={`flex-1 p-6 ${
          viewMode === 'list' ? 'flex flex-col justify-between' : ''
        }`}>
          <div>
            <h3 className="font-bold text-white text-lg mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors">
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
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-2xl font-bold text-green-400">
              ₹{product.price.toLocaleString()}
            </div>
            <div className={`text-xs px-2 py-1 rounded-full ${
              product.stock > 10 
                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                : product.stock > 0
                ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                : "bg-red-500/20 text-red-400 border border-red-500/30"
            }`}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </div>
          </div>

          {/* Add to Cart Button - Visible on mobile and when not hovering */}
          <Button
            onClick={(e) => onAddToCart(product, e)}
            disabled={isAdding || product.stock === 0}
            className={`w-full mt-4 ${
              product.stock === 0 
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:shadow-lg'
            } transition-all duration-300 lg:hidden group-hover:flex`}
          >
            {isAdding ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full w-4 h-4 border-b-2 border-white"></div>
                Adding...
              </div>
            ) : product.stock === 0 ? (
              'Out of Stock'
            ) : (
              <>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </>
            )}
          </Button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-gray-900 text-white font-sans overflow-hidden">
      {/* ✨ Floating Glow Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-500/20 blur-[120px]" />
        <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-blue-500/20 blur-[160px]" />
        <div className="absolute bottom-[-10%] left-[25%] w-[400px] h-[400px] bg-pink-500/20 blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-28 pb-16 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex justify-center items-center mb-4">
              <Sparkles className="text-purple-400 w-8 h-8 mr-2" />
              <h1 className="text-6xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Explore Our Products
              </h1>
            </div>

            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed mt-4">
              Find cutting-edge solutions crafted for <span className="text-purple-300 font-semibold">Telecommunication</span>,{' '}
              <span className="text-blue-300 font-semibold">Defence</span>, and{' '}
              <span className="text-pink-300 font-semibold">Manufacturing</span> industries.
            </p>

            {/* Category Stats */}
            <div className="flex flex-wrap justify-center gap-6 mt-10 text-gray-300">
              {Object.entries({
                Total: categoryStats.all,
                Telecom: categoryStats.Telecommunication,
                Defence: categoryStats.Defence,
                Manufacturing: categoryStats.Manufacturing,
                Featured: categoryStats.featured,
              }).map(([label, value], i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-gray-800/40 rounded-xl px-6 py-4 border border-gray-700/50 shadow-md hover:border-purple-500/40 transition-all"
                >
                  <div className="text-2xl font-bold text-white">{value}</div>
                  <div className="text-sm text-gray-400 mt-1">{label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Filters */}
        <section className="max-w-6xl mx-auto px-4 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 shadow-lg"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
              {/* Search */}
              <div className="lg:col-span-4">
                <label className="text-sm text-gray-400 mb-2 block">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search by title or description..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 bg-gray-800/50 border-gray-700 text-white focus:border-purple-500"
                  />
                </div>
              </div>

              {/* Category */}
              <div className="lg:col-span-3">
                <label className="text-sm text-gray-400 mb-2 block">Category</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="Telecommunication">Telecommunication</SelectItem>
                    <SelectItem value="Defence">Defence</SelectItem>
                    <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sort */}
              <div className="lg:col-span-3">
                <label className="text-sm text-gray-400 mb-2 block">Sort By</label>
                <Select value={sort} onValueChange={setSort}>
                  <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Sort" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price_asc">Price: Low → High</SelectItem>
                    <SelectItem value="price_desc">Price: High → Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* View Controls */}
              <div className="lg:col-span-2 flex justify-end gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setViewMode('grid')}
                  className={`${
                    viewMode === 'grid'
                      ? 'bg-purple-500/20 text-purple-400 border-purple-500/40'
                      : 'text-gray-400 border-gray-700'
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setViewMode('list')}
                  className={`${
                    viewMode === 'list'
                      ? 'bg-purple-500/20 text-purple-400 border-purple-500/40'
                      : 'text-gray-400 border-gray-700'
                  }`}
                >
                  <List className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className={`${
                    showFilters
                      ? 'bg-blue-500/20 text-blue-400 border-blue-500/40'
                      : 'text-gray-400 border-gray-700'
                  }`}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Advanced Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 pt-6 border-t border-gray-700/50"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">Price Range</label>
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          placeholder="Min"
                          value={priceRange.min}
                          onChange={(e) => setPriceRange((p) => ({ ...p, min: e.target.value }))}
                          className="bg-gray-800/50 border-gray-700 text-white"
                        />
                        <Input
                          type="number"
                          placeholder="Max"
                          value={priceRange.max}
                          onChange={(e) => setPriceRange((p) => ({ ...p, max: e.target.value }))}
                          className="bg-gray-800/50 border-gray-700 text-white"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={featuredOnly}
                        onChange={(e) => setFeaturedOnly(e.target.checked)}
                        className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500"
                      />
                      <label className="text-sm text-gray-300 flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-400" /> Featured only
                      </label>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        variant="outline"
                        onClick={clearFilters}
                        className="border-gray-700 text-gray-300 hover:bg-gray-800/70"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Clear
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* 🛒 Products Grid */}
        <section className="px-4 pb-20">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-64 space-y-4">
                <div className="animate-spin w-12 h-12 border-2 border-purple-500 border-t-transparent rounded-full"></div>
                <p className="text-gray-400 text-lg">Loading products...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <Package className="w-20 h-20 text-gray-600 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-400 mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your filters or check back later.
                </p>
                <Button onClick={clearFilters} className="bg-gradient-to-r from-purple-600 to-pink-500 text-white">
                  Reset Filters
                </Button>
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'
                    : 'space-y-6'
                }
              >
                <AnimatePresence>
                  {products.map((product) => (
                    <motion.div
                      key={product._id}
                      variants={itemVariants}
                      layout
                    >
                      <EnhancedProductCard
                        product={product}
                        viewMode={viewMode}
                        onAddToCart={quickAddToCart}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Products;