import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { useTheme } from '../context/ThemeContext';
import {
  Search,
  Grid3X3,
  List,
  SlidersHorizontal,
  X,
  Sparkles,
  Package,
  Star,
  TrendingUp,
  Eye,
  CheckCircle2,
  Zap
} from 'lucide-react';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';

const Products = () => {
  const { isDarkMode } = useTheme();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    fetchProducts();
  }, [search, category, sort, priceRange, featuredOnly]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const viewProduct = (productId, e) => {
    e.stopPropagation();
    navigate(`/products/${productId}`);
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

  // Enhanced ProductCard component
  const EnhancedProductCard = ({ product, viewMode, onViewProduct }) => {
    return (
      <motion.div
        whileHover={{ y: -8 }}
        className={`group relative overflow-hidden rounded-3xl border transition-all duration-500 ${
          isDarkMode 
            ? 'bg-gray-900/40 border-white/10 hover:border-blue-500/50 hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.3)]' 
            : 'bg-white border-gray-100 hover:border-blue-500/30 hover:shadow-2xl'
        } ${viewMode === 'list' ? 'flex flex-col md:flex-row' : 'flex flex-col'}`}
        onClick={(e) => onViewProduct(product._id, e)}
      >
        {/* Image Section */}
        <div className={`relative overflow-hidden ${
          viewMode === 'list' ? 'w-full md:w-72 h-64 md:h-auto' : 'w-full h-72'
        } ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
          
          {product.images?.[0]?.url ? (
            <img
              src={product.images[0].url}
              alt={product.title}
              className="w-full h-full object-contain p-8 transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Package className={`w-16 h-16 ${isDarkMode ? 'text-gray-700' : 'text-gray-300'}`} />
            </div>
          )}

          {/* Overlay Gradient */}
          <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
            isDarkMode 
              ? 'bg-gradient-to-t from-gray-900 via-transparent to-transparent' 
              : 'bg-gradient-to-t from-white via-transparent to-transparent'
          }`} />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.featured && (
              <div className="bg-yellow-500/90 backdrop-blur-sm text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                <Star className="w-3 h-3 fill-current" />
                FEATURED
              </div>
            )}
            {product.stock <= 0 && (
              <div className="bg-red-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                OUT OF STOCK
              </div>
            )}
          </div>

          <div className="absolute top-4 right-4">
            <div className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md border shadow-lg ${
              product.category === 'Telecommunication' 
                ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                : product.category === 'Defence'
                ? 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                : 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
            }`}>
              {product.category}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className={`flex-1 p-6 flex flex-col justify-between ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          <div>
            <h3 className={`text-xl font-bold mb-2 line-clamp-1 group-hover:text-blue-500 transition-colors ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {product.title}
            </h3>
            <p className={`text-sm mb-4 line-clamp-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {product.description}
            </p>
            
            {/* Specs */}
            {product.specifications && Array.from(product.specifications).length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {Array.from(product.specifications).slice(0, 2).map(([key, value]) => (
                  <span key={key} className={`text-xs px-2 py-1 rounded-md border ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700 text-gray-400' 
                      : 'bg-gray-100 border-gray-200 text-gray-600'
                  }`}>
                    <span className="font-semibold">{key}:</span> {value}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-dashed border-gray-700/30">
            <div className="flex items-center justify-end mb-4">
              <div className={`flex items-center gap-1 text-xs font-medium ${
                product.stock > 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                <CheckCircle2 className="w-3 h-3" />
                {product.stock > 0 ? 'In Stock' : 'Unavailable'}
              </div>
            </div>

            <Button
              onClick={(e) => onViewProduct(product._id, e)}
              className={`w-full rounded-xl font-semibold transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-white text-black hover:bg-gray-200' 
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              View Details <Eye className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className={`min-h-screen font-sans overflow-x-hidden transition-colors duration-500 ${
      isDarkMode ? 'bg-black text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 ${
          isDarkMode ? 'bg-blue-600' : 'bg-blue-400'
        }`} />
        <div className={`absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[100px] opacity-15 ${
          isDarkMode ? 'bg-purple-600' : 'bg-purple-400'
        }`} />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 rounded-full mb-8 border backdrop-blur-sm bg-white/5 border-white/10"
            >
              <Zap className="w-4 h-4 mr-2 text-yellow-400" />
              <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Premium Industrial Equipment
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Explore Our <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                Innovation Catalog
              </span>
            </h1>

            <p className={`text-xl max-w-2xl mx-auto leading-relaxed mt-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Discover precision-engineered solutions for Telecommunication, Defense, and Manufacturing sectors.
            </p>

            {/* Category Stats */}
            <div className="flex flex-wrap justify-center gap-4 mt-12">
              {Object.entries({
                Total: categoryStats.all,
                Telecom: categoryStats.Telecommunication,
                Defence: categoryStats.Defence,
                Manufacturing: categoryStats.Manufacturing,
              }).map(([label, value], i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + (i * 0.1) }}
                  className={`px-6 py-3 rounded-2xl border backdrop-blur-sm ${
                    isDarkMode 
                      ? 'bg-white/5 border-white/10' 
                      : 'bg-white/60 border-gray-200 shadow-sm'
                  }`}
                >
                  <span className={`text-2xl font-bold mr-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{value}</span>
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Filters Section */}
        <section className="max-w-7xl mx-auto px-6 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`rounded-3xl p-6 border backdrop-blur-xl shadow-xl ${
              isDarkMode 
                ? 'bg-gray-900/60 border-white/10' 
                : 'bg-white/80 border-gray-200'
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
              {/* Search */}
              <div className="lg:col-span-4">
                <label className={`text-sm font-medium mb-2 block ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Search Products</label>
                <div className="relative group">
                  <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                    isDarkMode ? 'text-gray-500 group-focus-within:text-blue-400' : 'text-gray-400 group-focus-within:text-blue-600'
                  }`} />
                  <Input
                    placeholder="Search by name, specs, or description..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={`pl-12 h-12 rounded-xl border-2 transition-all ${
                      isDarkMode 
                        ? 'bg-black/50 border-gray-800 focus:border-blue-500 text-white placeholder:text-gray-600' 
                        : 'bg-gray-50 border-gray-200 focus:border-blue-500 text-gray-900'
                    }`}
                  />
                </div>
              </div>

              {/* Category */}
              <div className="lg:col-span-3">
                <label className={`text-sm font-medium mb-2 block ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Category</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className={`h-12 rounded-xl border-2 ${
                    isDarkMode 
                      ? 'bg-black/50 border-gray-800 text-white' 
                      : 'bg-gray-50 border-gray-200 text-gray-900'
                  }`}>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent className={isDarkMode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white'}>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Telecommunication">Telecommunication</SelectItem>
                    <SelectItem value="Defence">Defence</SelectItem>
                    <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sort */}
              <div className="lg:col-span-3">
                <label className={`text-sm font-medium mb-2 block ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Sort By</label>
                <Select value={sort} onValueChange={setSort}>
                  <SelectTrigger className={`h-12 rounded-xl border-2 ${
                    isDarkMode 
                      ? 'bg-black/50 border-gray-800 text-white' 
                      : 'bg-gray-50 border-gray-200 text-gray-900'
                  }`}>
                    <TrendingUp className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Sort" />
                  </SelectTrigger>
                  <SelectContent className={isDarkMode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white'}>
                    <SelectItem value="newest">Newest Arrivals</SelectItem>
                    <SelectItem value="price_asc">Price: Low to High</SelectItem>
                    <SelectItem value="price_desc">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* View Controls */}
              <div className="lg:col-span-2 flex justify-end gap-2">
                <div className={`p-1 rounded-xl border flex ${
                  isDarkMode ? 'bg-black/50 border-gray-800' : 'bg-gray-50 border-gray-200'
                }`}>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setViewMode('grid')}
                    className={`rounded-lg w-10 h-10 ${
                      viewMode === 'grid'
                        ? isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black shadow-sm'
                        : 'text-gray-500'
                    }`}
                  >
                    <Grid3X3 className="w-5 h-5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setViewMode('list')}
                    className={`rounded-lg w-10 h-10 ${
                      viewMode === 'list'
                        ? isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black shadow-sm'
                        : 'text-gray-500'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </Button>
                </div>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className={`h-12 w-12 rounded-xl border-2 ${
                    showFilters
                      ? 'border-blue-500 text-blue-500 bg-blue-500/10'
                      : isDarkMode ? 'border-gray-800 bg-black/50 text-gray-400' : 'border-gray-200 bg-gray-50 text-gray-600'
                  }`}
                >
                  <SlidersHorizontal className="w-5 h-5" />
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
                  className="mt-6 pt-6 border-t border-dashed border-gray-700/30"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className={`text-sm font-medium mb-2 block ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Price Range</label>
                      <div className="flex gap-3">
                        <Input
                          type="number"
                          placeholder="Min"
                          value={priceRange.min}
                          onChange={(e) => setPriceRange((p) => ({ ...p, min: e.target.value }))}
                          className={`rounded-xl ${isDarkMode ? 'bg-black/50 border-gray-800' : 'bg-gray-50 border-gray-200'}`}
                        />
                        <Input
                          type="number"
                          placeholder="Max"
                          value={priceRange.max}
                          onChange={(e) => setPriceRange((p) => ({ ...p, max: e.target.value }))}
                          className={`rounded-xl ${isDarkMode ? 'bg-black/50 border-gray-800' : 'bg-gray-50 border-gray-200'}`}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-8">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${
                          featuredOnly 
                            ? 'bg-blue-500 border-blue-500' 
                            : isDarkMode ? 'border-gray-700 bg-black/50' : 'border-gray-300 bg-white'
                        }`}>
                          {featuredOnly && <CheckCircle2 className="w-4 h-4 text-white" />}
                        </div>
                        <input
                          type="checkbox"
                          checked={featuredOnly}
                          onChange={(e) => setFeaturedOnly(e.target.checked)}
                          className="hidden"
                        />
                        <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Show Featured Only
                        </span>
                      </label>
                    </div>

                    <div className="flex justify-end items-end">
                      <Button
                        variant="ghost"
                        onClick={clearFilters}
                        className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Clear All Filters
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* Products Grid */}
        <section className="px-6 pb-32">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}>
                <LoadingSkeleton type="product" count={6} />
              </div>
            ) : products.length === 0 ? (
              <div className={`text-center py-32 rounded-3xl border border-dashed ${
                isDarkMode ? 'border-gray-800 bg-white/5' : 'border-gray-200 bg-gray-50'
              }`}>
                <Package className={`w-24 h-24 mx-auto mb-6 ${isDarkMode ? 'text-gray-700' : 'text-gray-300'}`} />
                <h3 className={`text-3xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>No products found</h3>
                <p className={`text-lg mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  We couldn't find any products matching your criteria.
                </p>
                <Button onClick={clearFilters} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-xl text-lg">
                  Clear Filters
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
                        onViewProduct={viewProduct}
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