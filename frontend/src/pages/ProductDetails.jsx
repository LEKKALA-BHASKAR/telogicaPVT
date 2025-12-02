import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import {
  ShoppingCart,
  FileText,
  Package,
  ChevronLeft,
  ChevronRight,
  Star,
  Shield,
  Truck,
  RotateCcw,
  Heart,
  Share2,
  Zap,
  Cpu,
  Battery,
  Calendar,
  CheckCircle,
  ArrowLeft,
  Eye,
  Sparkles
} from "lucide-react";
import io from "socket.io-client";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  const API_URL = process.env.REACT_APP_BACKEND_URL;
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  useEffect(() => {
    fetchProduct();

    const socket = io(API_URL);
    socket.on("stockUpdate", (data) => {
      if (data.productId === id) {
        setProduct((prev) => (prev ? { ...prev, stock: data.stock } : null));
        if (data.stock < quantity) {
          setQuantity(data.stock || 1);
          if (data.stock === 0) toast.warning("Product is out of stock");
        }
      }
    });

    return () => socket.disconnect();
  }, [id, quantity]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProduct(res.data.data);
      setLoading(false);
      // Fetch recommended products after getting product details
      fetchRecommendedProducts(res.data.data.category);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load product");
      setLoading(false);
    }
  };

  const fetchRecommendedProducts = async (category) => {
    try {
      const res = await axios.get(`${API_URL}/api/products?category=${category}&limit=4`);
      // Filter out the current product from recommendations
      const filtered = (res.data.data || []).filter(p => p._id !== id);
      setRecommendedProducts(filtered.slice(0, 4));
    } catch (error) {
      console.error("Error fetching recommended products:", error);
    }
  };

  const handleAddToCart = async () => {
   if (!isAuthenticated) {
  toast.error("Please login to add items to cart");
  navigate("/login");
  return;
}
    if (quantity <= 0 || quantity > product.stock) {
      toast.error("Invalid quantity");
      return;
    }

    try {
      await axios.post(
        `${API_URL}/api/products/cart/add`,
        { productId: id, quantity },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      toast.success("🎉 Added to cart successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add to cart");
    }
  };

  const handleImageChange = (direction) => {
    if (!product.images || product.images.length === 0) return;
    setImageLoading(true);
    if (direction === "next") {
      setSelectedImage((prev) => (prev + 1) % product.images.length);
    } else {
      setSelectedImage(
        (prev) => (prev - 1 + product.images.length) % product.images.length
      );
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: product.description,
          url: window.location.href,
        });
        toast.success("Product shared successfully!");
      } catch (error) {
        console.log('Sharing cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-black to-purple-900/20">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent"></div>
          <p className="text-gray-400 text-sm font-medium">Loading product details...</p>
        </div>
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-black to-purple-900/20">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">Product not found.</p>
          <Button 
            onClick={() => navigate(-1)}
            className="mt-4 bg-purple-600 hover:bg-purple-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-purple-900/20 text-white pt-20 pb-16 px-4 font-sans overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors group"
          whileHover={{ x: -5 }}
        >
          <ChevronLeft className="w-5 h-5 group-hover:text-purple-400" />
          <span className="group-hover:text-purple-400">Back</span>
        </motion.button>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start"
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
        >
          {/* Product Image Section */}
          <motion.div 
            className="space-y-4"
            variants={fadeInUp}
          >
            <div className="relative bg-gray-900/40 rounded-3xl overflow-hidden border border-gray-800/60 shadow-2xl backdrop-blur-sm">
              {product.images && product.images.length > 0 ? (
                <div className="relative">
                  <div className="relative h-[500px] md:h-[600px] bg-black/50 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={selectedImage}
                        src={product.images[selectedImage].url}
                        alt={product.title}
                        className="w-full h-full object-contain p-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: imageLoading ? 0 : 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onLoad={() => setImageLoading(false)}
                      />
                    </AnimatePresence>
                    
                    {imageLoading && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
                      </div>
                    )}
                  </div>

                  {product.images.length > 1 && (
                    <>
                      <button
                        onClick={() => handleImageChange("prev")}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 p-3 rounded-full backdrop-blur-sm transition-all hover:scale-110"
                      >
                        <ChevronLeft className="text-white w-6 h-6" />
                      </button>
                      <button
                        onClick={() => handleImageChange("next")}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 p-3 rounded-full backdrop-blur-sm transition-all hover:scale-110"
                      >
                        <ChevronRight className="text-white w-6 h-6" />
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  {product.images.length > 1 && (
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                      {selectedImage + 1} / {product.images.length}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <button
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      className={`p-2 rounded-full backdrop-blur-sm transition-all hover:scale-110 ${
                        isWishlisted 
                          ? "bg-red-500/20 text-red-400 border border-red-400/40" 
                          : "bg-black/60 text-gray-400 hover:text-red-400 border border-gray-600/40"
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
                    </button>
                    <button
                      onClick={handleShare}
                      className="p-2 rounded-full bg-black/60 backdrop-blur-sm text-gray-400 hover:text-purple-400 border border-gray-600/40 transition-all hover:scale-110"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="h-[500px] flex items-center justify-center bg-gray-900/50 rounded-3xl">
                  <Package className="w-24 h-24 text-gray-600" />
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images?.length > 1 && (
              <div className="flex justify-center gap-3 overflow-x-auto py-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setImageLoading(true);
                      setSelectedImage(idx);
                    }}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === idx
                        ? "border-purple-500 scale-105 shadow-lg shadow-purple-500/20"
                        : "border-gray-700 hover:border-purple-400/50 hover:scale-105"
                    }`}
                  >
                    <img
                      src={img.url}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Details Section */}
          <motion.div 
            className="space-y-8"
            variants={fadeInUp}
          >
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-sm font-semibold border border-purple-400/20">
                  {product.category}
                </span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 bg-clip-text text-transparent leading-tight">
                {product.title}
              </h1>

              <p className="text-gray-300 leading-relaxed text-lg">
                {product.description}
              </p>
            </div>

            {/* Price & Stock */}
            <div className="flex items-center justify-between p-6 bg-gray-900/40 rounded-2xl border border-gray-800/60 backdrop-blur-sm">
              <div>
                <span className="text-4xl font-bold text-green-400">
                  ₹{product.price?.toLocaleString()}
                </span>
                <div className="flex items-center gap-2 mt-2">
                  <div className={`w-3 h-3 rounded-full animate-pulse ${
                    product.stock > 0 ? "bg-green-500" : "bg-red-500"
                  }`} />
                  <span className={`text-sm font-semibold ${
                    product.stock > 0 ? "text-green-400" : "text-red-400"
                  }`}>
                    {product.stock > 0 ? `${product.stock} units available` : "Out of stock"}
                  </span>
                </div>
              </div>
            
            </div>

            {/* Quantity & Add to Cart */}
            {product.stock > 0 && (
              <motion.div 
                className="space-y-6 p-6 bg-gray-900/40 rounded-2xl border border-gray-800/60 backdrop-blur-sm"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-300">Quantity</label>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="w-12 h-12 bg-gray-800 border border-gray-700 rounded-xl text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      -
                    </Button>
                    <span className="text-2xl font-bold min-w-12 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      disabled={quantity >= product.stock}
                      className="w-12 h-12 bg-gray-800 border border-gray-700 rounded-xl text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      +
                    </Button>
                    <div className="flex-1 text-right text-sm text-gray-400">
                      Max: {product.stock} units
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    size="lg"
                    onClick={handleAddToCart}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
                  >
                    <ShoppingCart className="mr-3 w-5 h-5" />
                    Add to Cart
                  </Button>
                
                </div>
              </motion.div>
            )}

            {/* Specifications */}
            {product.specifications && Object.entries(product.specifications).length > 0 && (
              <motion.div 
                className="bg-gray-900/40 p-6 rounded-2xl border border-gray-800/60 backdrop-blur-sm"
                variants={fadeInUp}
              >
                <h3 className="text-xl font-semibold mb-4 text-white flex items-center gap-3">
                  <Cpu className="w-5 h-5 text-purple-400" />
                  Technical Specifications
                </h3>
                <div className="grid gap-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between items-center p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors group"
                    >
                      <span className="text-gray-400 capitalize font-medium group-hover:text-gray-300">
                        {key}
                      </span>
                      <span className="text-gray-200 font-semibold text-right">{value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* PDFs */}
            {product.pdfs && product.pdfs.length > 0 && (
              <motion.div 
                className="bg-gray-900/40 p-6 rounded-2xl border border-gray-800/60 backdrop-blur-sm"
                variants={fadeInUp}
              >
                <h3 className="text-xl font-semibold mb-4 text-white flex items-center gap-3">
                  <FileText className="w-5 h-5 text-purple-400" />
                  Documentation & Manuals
                </h3>
                <div className="grid gap-2">
                  {product.pdfs.map((pdf, idx) => (
                    <a
                      key={idx}
                      href={pdf.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-all group hover:scale-105"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-purple-400" />
                        <span className="text-gray-200 group-hover:text-white font-medium">
                          {pdf.name}
                        </span>
                      </div>
                      <div className="text-purple-400 text-sm font-semibold">
                        Download
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>

        {/* Recommended Products Section */}
        {recommendedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-16"
          >
            <div className="flex items-center gap-3 mb-8">
              <Sparkles className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold text-white">Recommended Products</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedProducts.map((recProduct) => (
                <Link
                  key={recProduct._id}
                  to={`/products/${recProduct._id}`}
                  className="group relative bg-gray-900/40 rounded-2xl border border-gray-800/60 overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:scale-105"
                >
                  {/* Image */}
                  <div className="relative h-48 bg-black/50 flex items-center justify-center p-4">
                    {recProduct.images?.[0]?.url ? (
                      <img
                        src={recProduct.images[0].url}
                        alt={recProduct.title}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <Package className="w-16 h-16 text-gray-600" />
                    )}
                    
                    {/* Quick View Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
                        <Eye className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-4">
                    <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
                      {recProduct.category}
                    </span>
                    <h3 className="text-white font-semibold mt-1 line-clamp-1 group-hover:text-purple-300 transition-colors">
                      {recProduct.title}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                      {recProduct.description}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <span className={`text-xs font-medium ${
                        recProduct.stock > 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {recProduct.stock > 0 ? 'In Stock' : 'Out of Stock'}
                      </span>
                      <span className="text-purple-400 text-sm font-semibold group-hover:underline">
                        View Details →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;