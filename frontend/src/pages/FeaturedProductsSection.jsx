import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../components/ui/button";
import {
  ArrowRight,
  Star,
  ShoppingCart,
  Eye,
  Package,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const FeaturedProductsSection = () => {
  const [activeCategory, setActiveCategory] = useState("Telecommunication");
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const API_URL = process.env.REACT_APP_BACKEND_URL;

  const categories = [
    {
      id: "Telecommunication",
      name: "Telecommunication",
      description:
        "Explore advanced networking and communication devices designed for high-performance connectivity.",
      icon: "📡",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "Defence",
      name: "Defence & Security",
      description:
        "Reliable, mission-critical defense equipment engineered for precision and safety.",
      icon: "🛡️",
      color: "from-red-500 to-orange-500",
    },
    {
      id: "Manufacturing",
      name: "Industrial Manufacturing",
      description:
        "High-quality instruments and components crafted for industrial applications.",
      icon: "🏭",
      color: "from-blue-500 to-cyan-500",
    },
  ];

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      const promises = categories.map((category) =>
        axios.get(`${API_URL}/api/products?category=${category.id}&limit=8`)
      );
      const results = await Promise.all(promises);
      const productsData = {};
      categories.forEach((category, index) => {
        productsData[category.id] = results[index].data.data || [];
      });
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching featured products:", error);
      toast.error("Failed to load featured products");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId) => {
    try {
      await axios.post(`${API_URL}/api/products/cart/add`, {
        productId,
        quantity: 1,
      });
      toast.success("Product added to cart");
    } catch {
      toast.error("Failed to add product to cart");
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
    <section className="py-24 bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white relative overflow-hidden">
      {/* glowing gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-20 w-[30rem] h-[30rem] bg-purple-600/20 blur-[180px]" />
        <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-blue-500/10 blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-purple-400" />
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Featured Products
            </h2>
          </div>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Discover our latest innovations in test and measuring technology,
            crafted for performance and precision.
          </p>
        </motion.div>

        {/* category tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`relative px-8 py-3 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                activeCategory === category.id
                  ? `bg-gradient-to-r ${category.color} text-white shadow-xl scale-105`
                  : "bg-gray-900/60 text-gray-400 hover:text-white hover:bg-gray-800/60 border border-gray-700/50"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">{category.icon}</span>
                <span>{category.name}</span>
              </div>
            </button>
          ))}
        </div>

        {/* category description */}
        <motion.p
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center text-gray-300 mb-16 text-lg max-w-2xl mx-auto"
        >
          {categories.find((cat) => cat.id === activeCategory)?.description}
        </motion.p>

        {/* product grid */}
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
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16"
            >
              <AnimatePresence mode="wait">
                {currentProducts.map((product) => (
                  <motion.div
                    key={product._id}
                    variants={itemVariants}
                    layout
                    className="group bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-gray-700/40 shadow-lg hover:shadow-purple-500/20 transition-all duration-500 overflow-hidden hover:-translate-y-2"
                    onMouseEnter={() => setHoveredProduct(product._id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    {/* image (fully visible, contain) */}
                    <div className="relative w-full h-60 bg-gray-800 flex justify-center items-center overflow-hidden">
                      {product.images?.[0]?.url ? (
                        <img
                          src={product.images[0].url}
                          alt={product.title}
                          className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <Package className="w-14 h-14 text-gray-500" />
                      )}

                      {/* category badge */}
                      <div className="absolute top-3 right-3 text-xs font-semibold px-2 py-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md">
                        {product.category}
                      </div>
                    </div>

                    {/* info */}
                    <div className="p-5 flex flex-col justify-between min-h-[180px]">
                      <h3 className="font-bold text-xl mb-2 line-clamp-1 text-white group-hover:text-purple-300">
                        {product.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                        {product.description}
                      </p>

                      <div className="flex items-center justify-between mt-auto">
                        <div className="text-2xl font-semibold text-green-400">
                          ₹{product.price.toLocaleString()}
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            product.stock > 10
                              ? "bg-green-500/20 text-green-400"
                              : product.stock > 0
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {product.stock > 0
                            ? `${product.stock} in stock`
                            : "Out of stock"}
                        </span>
                      </div>

                      {/* actions */}
                      <div
                        className={`flex gap-2 mt-4 transition-all duration-300 ${
                          hoveredProduct === product._id
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      >
                        <Button
                          size="sm"
                          onClick={() => addToCart(product._id)}
                          className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:shadow-lg"
                        >
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          Add
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          asChild
                          className="border-gray-600 text-gray-200 hover:bg-gray-800"
                        >
                          <Link to={`/products/${product._id}`}>
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* view all */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-6 font-semibold hover:shadow-2xl hover:scale-105 transition-all"
              >
                <Link to="/products" className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  View All{" "}
                  {categories.find((cat) => cat.id === activeCategory)?.name}{" "}
                  Products
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
