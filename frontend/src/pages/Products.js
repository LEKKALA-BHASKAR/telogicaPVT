import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { Search, Filter, Grid3X3, List, SlidersHorizontal, X, Sparkles, Package, Star, TrendingUp } from 'lucide-react';
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
      
      // Filter featured products if enabled
      if (featuredOnly) {
        filteredProducts = filteredProducts.filter(product => product.featured);
      }
      
      setProducts(filteredProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setSearch('');
    setCategory('all');
    setSort('newest');
    setPriceRange({ min: '', max: '' });
    setFeaturedOnly(false);
  };

  const getCategoryStats = () => {
    const stats = {
      all: products.length,
      Telecommunication: products.filter(p => p.category === 'Telecommunication').length,
      Defence: products.filter(p => p.category === 'Defence').length,
      Manufacturing: products.filter(p => p.category === 'Manufacturing').length,
      featured: products.filter(p => p.featured).length
    };
    return stats;
  };

  const categoryStats = getCategoryStats();

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
    <div className="min-h-screen bg-black text-white font-sans relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-green-600/10 rounded-full blur-3xl animate-pulse delay-500" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 relative overflow-hidden">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-purple-400 mr-3" />
                <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                  Our Products
                </h1>
              </div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              >
                Discover our comprehensive range of cutting-edge 
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold"> test and measuring equipment</span>
              </motion.p>

              {/* Category Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-wrap justify-center gap-6 mt-8"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{categoryStats.all}</div>
                  <div className="text-gray-400 text-sm">Total Products</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">{categoryStats.Telecommunication}</div>
                  <div className="text-gray-400 text-sm">Telecom</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">{categoryStats.Defence}</div>
                  <div className="text-gray-400 text-sm">Defence</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{categoryStats.Manufacturing}</div>
                  <div className="text-gray-400 text-sm">Manufacturing</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{categoryStats.featured}</div>
                  <div className="text-gray-400 text-sm">Featured</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Search and Filters Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-2xl max-w-6xl mx-auto"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
                {/* Search */}
                <div className="lg:col-span-4">
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Search Products</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      placeholder="Search by product name or description..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-10 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500"
                      data-testid="product-search-input"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div className="lg:col-span-3">
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Category</label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                      <SelectItem value="all">All Categories ({categoryStats.all})</SelectItem>
                      <SelectItem value="Telecommunication">Telecommunication ({categoryStats.Telecommunication})</SelectItem>
                      <SelectItem value="Defence">Defence ({categoryStats.Defence})</SelectItem>
                      <SelectItem value="Manufacturing">Manufacturing ({categoryStats.Manufacturing})</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort */}
                <div className="lg:col-span-3">
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Sort By</label>
                  <Select value={sort} onValueChange={setSort}>
                    <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white" data-testid="sort-filter">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="price_asc">Price: Low to High</SelectItem>
                      <SelectItem value="price_desc">Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* View Controls */}
                <div className="lg:col-span-2 flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setViewMode('grid')}
                    className={`border-gray-600 ${
                      viewMode === 'grid' 
                        ? 'bg-purple-500/20 text-purple-400 border-purple-500/50' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setViewMode('list')}
                    className={`border-gray-600 ${
                      viewMode === 'list' 
                        ? 'bg-purple-500/20 text-purple-400 border-purple-500/50' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setShowFilters(!showFilters)}
                    className={`border-gray-600 ${
                      showFilters 
                        ? 'bg-blue-500/20 text-blue-400 border-blue-500/50' 
                        : 'text-gray-400 hover:text-white'
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
                        <label className="text-sm font-medium text-gray-300 mb-2 block">Price Range</label>
                        <div className="flex gap-2">
                          <Input
                            type="number"
                            placeholder="Min"
                            value={priceRange.min}
                            onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                            className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                          />
                          <Input
                            type="number"
                            placeholder="Max"
                            value={priceRange.max}
                            onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                            className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id="featuredOnly"
                          checked={featuredOnly}
                          onChange={(e) => setFeaturedOnly(e.target.checked)}
                          className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500"
                        />
                        <label htmlFor="featuredOnly" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-400" />
                          Featured Products Only
                        </label>
                      </div>

                      <div className="flex justify-end">
                        <Button
                          variant="outline"
                          onClick={clearFilters}
                          className="border-gray-600 text-gray-300 hover:bg-gray-700/50"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Clear Filters
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="px-4 pb-20">
          <div className="container mx-auto max-w-7xl">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="flex flex-col items-center space-y-4">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500"></div>
                  <p className="text-gray-400 text-lg">Loading amazing products...</p>
                </div>
              </div>
            ) : products.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <Package className="w-24 h-24 text-gray-600 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-400 mb-2">No products found</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  {search || category !== 'all' || priceRange.min || priceRange.max || featuredOnly
                    ? "Try adjusting your search criteria or filters to find what you're looking for."
                    : "We're constantly adding new products. Check back soon!"
                  }
                </p>
                {(search || category !== 'all' || priceRange.min || priceRange.max || featuredOnly) && (
                  <Button
                    onClick={clearFilters}
                    className="bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:shadow-lg"
                  >
                    Clear All Filters
                  </Button>
                )}
              </motion.div>
            ) : (
              <>
                {/* Results Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-between items-center mb-8"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Showing {products.length} product{products.length !== 1 ? 's' : ''}
                    </h2>
                    <p className="text-gray-400">
                      {search && `Search: "${search}" • `}
                      {category !== 'all' && `Category: ${category} • `}
                      {featuredOnly && 'Featured Only • '}
                      Sorted by {sort.replace('_', ' ')}
                    </p>
                  </div>
                  
                  <div className="text-sm text-gray-400">
                    View: <span className="text-white font-medium capitalize">{viewMode}</span>
                  </div>
                </motion.div>

                {/* Products Grid/List */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className={viewMode === 'grid' 
                    ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "space-y-6"
                  }
                  data-testid="products-grid"
                >
                  <AnimatePresence>
                    {products.map((product, index) => (
                      <motion.div
                        key={product._id}
                        variants={itemVariants}
                        layout
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <ProductCard 
                          product={product} 
                          viewMode={viewMode}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Products;