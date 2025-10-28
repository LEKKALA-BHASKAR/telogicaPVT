import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import {
  ShoppingCart,
  FileText,
  Package,
  ChevronLeft,
  ChevronRight,
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

  const API_URL = process.env.REACT_APP_BACKEND_URL;

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
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
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load product");
      setLoading(false);
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
      toast.success("Added to cart!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add to cart");
    }
  };

  const handleImageChange = (direction) => {
    if (!product.images || product.images.length === 0) return;
    if (direction === "next") {
      setSelectedImage((prev) => (prev + 1) % product.images.length);
    } else {
      setSelectedImage(
        (prev) => (prev - 1 + product.images.length) % product.images.length
      );
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
          <p className="text-gray-400 text-sm">Loading product...</p>
        </div>
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-gray-400">
        Product not found.
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white pt-24 pb-16 px-4 font-sans overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          {/* Product Image Section */}
          <div className="relative bg-gray-900/40 rounded-3xl overflow-hidden border border-gray-800 shadow-2xl">
            {product.images && product.images.length > 0 ? (
              <div className="relative">
                <img
                  src={product.images[selectedImage].url}
                  alt={product.title}
                  className="w-full h-[480px] md:h-[520px] object-contain bg-black p-4 rounded-3xl"
                />
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={() => handleImageChange("prev")}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-gray-900/60 hover:bg-gray-800/80 p-2 rounded-full"
                    >
                      <ChevronLeft className="text-white w-6 h-6" />
                    </button>
                    <button
                      onClick={() => handleImageChange("next")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-gray-900/60 hover:bg-gray-800/80 p-2 rounded-full"
                    >
                      <ChevronRight className="text-white w-6 h-6" />
                    </button>
                  </>
                )}
              </div>
            ) : (
              <div className="h-[480px] flex items-center justify-center bg-gray-900/50 rounded-3xl">
                <Package className="w-20 h-20 text-gray-500" />
              </div>
            )}

            {product.images?.length > 1 && (
              <div className="flex justify-center mt-4 gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      selectedImage === idx
                        ? "border-purple-500 scale-105"
                        : "border-gray-700 hover:border-purple-400/50"
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
          </div>

          {/* Product Details Section */}
          <div className="space-y-6">
            <div>
              <span className="text-sm font-semibold text-purple-400 uppercase tracking-wider">
                {product.category}
              </span>
              <h1 className="text-4xl font-bold mt-2 mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {product.title}
              </h1>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                {product.description}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-3xl font-semibold text-green-400">
                ₹{product.price?.toLocaleString()}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                  product.stock > 0
                    ? "bg-green-500/10 text-green-400 border-green-400/40"
                    : "bg-red-500/10 text-red-400 border-red-400/40"
                }`}
              >
                {product.stock > 0
                  ? `${product.stock} in stock`
                  : "Out of stock"}
              </span>
            </div>

            {/* Quantity & Add to Cart */}
            {product.stock > 0 && (
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">
                    Quantity
                  </label>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 bg-gray-900 border border-gray-700 rounded-full text-white hover:bg-gray-800"
                    >
                      -
                    </Button>
                    <span className="text-lg font-semibold">{quantity}</span>
                    <Button
                      variant="outline"
                      onClick={() =>
                        setQuantity(Math.min(product.stock, quantity + 1))
                      }
                      className="w-10 h-10 bg-gray-900 border border-gray-700 rounded-full text-white hover:bg-gray-800"
                    >
                      +
                    </Button>
                  </div>
                </div>

                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-sm text-white hover:scale-105 transition-all shadow-lg"
                >
                  <ShoppingCart className="mr-2 w-4 h-4" />
                  Add to Cart
                </Button>
              </div>
            )}

            {/* Specifications */}
            {product.specifications &&
              Object.entries(product.specifications).length > 0 && (
                <div className="bg-gray-900/40 p-5 rounded-2xl border border-gray-800">
                  <h3 className="text-lg font-semibold mb-3 text-white">
                    Specifications
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {Object.entries(product.specifications).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between bg-gray-800/50 px-3 py-2 rounded-lg"
                        >
                          <span className="text-gray-400 capitalize">
                            {key}
                          </span>
                          <span className="text-gray-200">{value}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

            {/* PDFs */}
            {product.pdfs && product.pdfs.length > 0 && (
              <div className="bg-gray-900/40 p-5 rounded-2xl border border-gray-800">
                <h3 className="text-lg font-semibold mb-3 text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-400" />
                  Product Manuals
                </h3>
                <ul className="space-y-2">
                  {product.pdfs.map((pdf, idx) => (
                    <li key={idx}>
                      <a
                        href={pdf.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-purple-400 hover:underline text-sm"
                      >
                        <FileText className="w-4 h-4" />
                        {pdf.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetails;
