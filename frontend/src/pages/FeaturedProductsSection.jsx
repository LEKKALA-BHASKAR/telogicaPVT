import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../components/ui/button";
import {
  ArrowRight,
  Eye,
  Package,
  Sparkles,
  TrendingUp,
  Radio,
  Shield,
  Factory,
  Cpu,
  Wifi,
  Activity
} from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const FeaturedProductsSection = () => {
  const [activeCategory, setActiveCategory] = useState("Telecommunication");
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const { isDarkMode } = useTheme();

  const API_URL = process.env.REACT_APP_BACKEND_URL;

  const categories = [
    {
      id: "Telecommunication",
      name: "Telecommunication",
      description: "Next-gen networking solutions for seamless global connectivity.",
      icon: Wifi,
      color: "blue",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: "Defence",
      name: "Defence & Security",
      description: "Mission-critical tactical equipment engineered for extreme conditions.",
      icon: Shield,
      color: "red",
      gradient: "from-red-500 to-orange-500"
    },
    {
      id: "Manufacturing",
      name: "Industrial Tech",
      description: "Precision automation and measurement tools for smart factories.",
      icon: Factory,
      color: "emerald",
      gradient: "from-emerald-500 to-green-500"
    },
  ];

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      const promises = categories.map((category) =>
        axios.get(`${API_URL}/api/products?category=${category.id}&limit=4`)
      );
      const results = await Promise.all(promises);
      const productsData = {};
      categories.forEach((category, index) => {
        productsData[category.id] = results[index].data.data || [];
      });
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching featured products:", error);
      // toast.error("Failed to load featured products");
    } finally {
      setLoading(false);
    }
  };

  const currentProducts = products[activeCategory] || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className={`py-32 relative overflow-hidden transition-colors duration-500 ${
      isDarkMode 
        ? 'bg-black text-white' 
        : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-0 left-1/4 w-[800px] h-[800px] rounded-full blur-[120px] opacity-20 transition-colors duration-700 ${
          activeCategory === 'Telecommunication' ? 'bg-blue-600' :
          activeCategory === 'Defence' ? 'bg-red-600' : 'bg-emerald-600'
        }`} />
        <div className={`absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[100px] opacity-15 transition-colors duration-700 ${
          activeCategory === 'Telecommunication' ? 'bg-cyan-600' :
          activeCategory === 'Defence' ? 'bg-orange-600' : 'bg-green-600'
        }`} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-2 rounded-full mb-6 border backdrop-blur-sm bg-white/5 border-white/10"
          >
            <Sparkles className={`w-4 h-4 mr-2 ${
              activeCategory === 'Telecommunication' ? 'text-blue-400' :
              activeCategory === 'Defence' ? 'text-red-400' : 'text-emerald-400'
            }`} />
            <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Innovation Showcase
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
          >
            Future Ready <br />
            <span className={`text-transparent bg-clip-text bg-gradient-to-r transition-all duration-500 ${
              categories.find(c => c.id === activeCategory)?.gradient
            }`}>
              Technologies
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`text-xl max-w-3xl mx-auto leading-relaxed ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Explore our cutting-edge solutions designed to redefine industry standards and empower your operations.
          </motion.p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`group relative px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 overflow-hidden ${
                activeCategory === category.id
                  ? `text-white shadow-2xl scale-105 ring-2 ring-offset-2 ${isDarkMode ? 'ring-offset-black' : 'ring-offset-white'} ring-${category.color}-500`
                  : isDarkMode
                    ? "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
                    : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-gray-200 shadow-sm"
              }`}
            >
              {activeCategory === category.id && (
                <div className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-100`} />
              )}
              <div className="relative flex items-center gap-3 z-10">
                <category.icon className={`w-5 h-5 ${
                  activeCategory === category.id ? 'text-white' : ''
                }`} />
                <span>{category.name}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="min-h-[600px]">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`h-[400px] rounded-3xl animate-pulse ${
                  isDarkMode ? 'bg-white/5' : 'bg-gray-100'
                }`} />
              ))}
            </div>
          ) : (
            <motion.div
              key={activeCategory}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              <AnimatePresence mode="wait">
                {currentProducts.length > 0 ? (
                  currentProducts.map((product) => (
                    <motion.div
                      key={product._id}
                      variants={itemVariants}
                      layout
                      className={`group relative rounded-3xl border overflow-hidden transition-all duration-500 ${
                        isDarkMode 
                          ? 'bg-white/5 border-white/10 hover:border-white/20' 
                          : 'bg-white border-gray-100 hover:shadow-2xl hover:shadow-blue-500/10'
                      }`}
                      onMouseEnter={() => setHoveredProduct(product._id)}
                      onMouseLeave={() => setHoveredProduct(null)}
                    >
                      {/* Image Area */}
                      <div className={`relative h-[280px] p-8 flex items-center justify-center overflow-hidden ${
                        isDarkMode ? 'bg-black/40' : 'bg-gray-50'
                      }`}>
                        <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${
                          categories.find(c => c.id === activeCategory)?.gradient
                        }`} />
                        
                        {product.images?.[0]?.url ? (
                          <img
                            src={product.images[0].url}
                            alt={product.title}
                            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-2xl"
                          />
                        ) : (
                          <Package className={`w-20 h-20 ${isDarkMode ? 'text-gray-700' : 'text-gray-300'}`} />
                        )}

                        {/* Quick Action Overlay */}
                        <div className={`absolute inset-0 flex items-center justify-center gap-4 bg-black/20 backdrop-blur-sm transition-all duration-300 ${
                          hoveredProduct === product._id ? 'opacity-100 visible' : 'opacity-0 invisible'
                        }`}>
                          <Button
                            asChild
                            className="rounded-full w-12 h-12 p-0 bg-white text-black hover:bg-gray-100 hover:scale-110 transition-all"
                          >
                            <Link to={`/products/${product._id}`}>
                              <Eye className="w-5 h-5" />
                            </Link>
                          </Button>
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="p-6">
                        <div className="mb-4">
                          <span className={`text-xs font-bold tracking-wider uppercase ${
                            activeCategory === 'Telecommunication' ? 'text-blue-500' :
                            activeCategory === 'Defence' ? 'text-red-500' : 'text-emerald-500'
                          }`}>
                            {product.category}
                          </span>
                          <h3 className={`text-lg font-bold mt-1 line-clamp-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${
                            categories.find(c => c.id === activeCategory)?.gradient
                          } ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {product.title}
                          </h3>
                        </div>

                        <div className="flex items-end justify-end">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
                            isDarkMode ? 'bg-white/10 group-hover:bg-white/20' : 'bg-gray-100 group-hover:bg-gray-200'
                          }`}>
                            <ArrowRight className={`w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300 ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`} />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-20">
                    <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
                      isDarkMode ? 'bg-white/5' : 'bg-gray-100'
                    }`}>
                      <Package className={`w-10 h-10 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                    </div>
                    <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      No products found
                    </h3>
                    <p className={`max-w-xs mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      We couldn't find any featured products in this category at the moment.
                    </p>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <Button
            asChild
            size="lg"
            className={`rounded-full px-8 py-6 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
              isDarkMode 
                ? 'bg-white text-black hover:bg-gray-200' 
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            <Link to="/products" className="flex items-center gap-2">
              View All Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
