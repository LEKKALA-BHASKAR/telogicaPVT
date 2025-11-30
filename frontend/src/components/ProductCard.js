import React from "react";
import { Link } from "react-router-dom";
import { Package, DollarSign, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const ProductCard = ({ product }) => {
  const { isDarkMode } = useTheme();

  const getCategoryColor = (category) => {
    if (isDarkMode) {
      switch (category) {
        case "Telecommunication":
          return "bg-purple-500/20 text-purple-400 border-purple-500/30";
        case "Defence":
          return "bg-red-500/20 text-red-400 border-red-500/30";
        case "Manufacturing":
          return "bg-blue-500/20 text-blue-400 border-blue-500/30";
        default:
          return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      }
    } else {
      switch (category) {
        case "Telecommunication":
          return "bg-purple-100 text-purple-700 border-purple-200";
        case "Defence":
          return "bg-red-100 text-red-700 border-red-200";
        case "Manufacturing":
          return "bg-blue-100 text-blue-700 border-blue-200";
        default:
          return "bg-gray-100 text-gray-700 border-gray-200";
      }
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -5 }}
      transition={{ duration: 0.3 }}
      className={`group relative rounded-2xl border overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
        isDarkMode
          ? 'bg-gradient-to-b from-gray-900/80 to-gray-800/60 border-gray-700/50 hover:border-purple-400/50 hover:shadow-purple-500/10'
          : 'bg-white border-gray-200 hover:border-purple-300 hover:shadow-purple-100'
      }`}
    >
      <Link to={`/products/${product._id}`} className="block">
        {/* 🖼️ Image Section */}
        <div className={`relative w-full flex items-center justify-center overflow-hidden ${
          isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
        }`}>
          {product.images?.[0]?.url ? (
            <img
              src={product.images[0].url}
              alt={product.title}
              className={`w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105 ${
                isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
              }`}
              style={{ maxHeight: "280px" }} // ensures full image visible without crop
              data-testid="product-card-image"
            />
          ) : (
            <div className={`w-full h-64 flex items-center justify-center ${
              isDarkMode ? 'bg-gray-900/60' : 'bg-gray-100'
            }`}>
              <Package className={`w-12 h-12 ${
                isDarkMode ? 'text-gray-600' : 'text-gray-400'
              }`} />
            </div>
          )}

          {/* Featured Badge */}
          {product.featured && (
            <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-md ${
              isDarkMode 
                ? 'bg-yellow-400 text-yellow-900'
                : 'bg-yellow-500 text-yellow-900'
            }`}>
              <Star className="w-3 h-3 fill-current" /> Featured
            </div>
          )}

          {/* Category Badge */}
          <div
            className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(
              product.category
            )}`}
          >
            {product.category}
          </div>
        </div>

        {/* 🧾 Details Section */}
        <div className="p-5">
          <div className="flex justify-between items-start mb-3">
            <h3
              className={`font-semibold text-lg line-clamp-1 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
              data-testid="product-card-title"
            >
              {product.title}
            </h3>
            <div className={`flex items-center gap-1 px-2 py-1 rounded-md border ${
              isDarkMode 
                ? 'text-green-400 bg-green-500/10 border-green-500/30'
                : 'text-green-700 bg-green-100 border-green-200'
            }`}>
              <DollarSign className="w-4 h-4" />
              <span
                className="font-semibold text-sm"
                data-testid="product-card-price"
              >
                {product.price?.toLocaleString()}
              </span>
            </div>
          </div>

          <p
            className={`text-sm mb-4 line-clamp-2 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
            data-testid="product-card-description"
          >
            {product.description || "No description available."}
          </p>

          {/* Stock Badge */}
          <div
            className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold border ${
              product.stock > 10
                ? isDarkMode 
                  ? "bg-green-500/20 text-green-400 border-green-500/30"
                  : "bg-green-100 text-green-700 border-green-200"
                : product.stock > 0
                ? isDarkMode
                  ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                  : "bg-yellow-100 text-yellow-700 border-yellow-200"
                : isDarkMode
                  ? "bg-red-500/20 text-red-400 border-red-500/30"
                  : "bg-red-100 text-red-700 border-red-200"
            }`}
            data-testid="product-card-stock"
          >
            <Package className="w-3 h-3" />
            {product.stock > 0
              ? `${product.stock} in stock`
              : "Out of stock"}
          </div>
        </div>

        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center p-6 ${
          isDarkMode 
            ? 'from-black/80 via-black/30 to-transparent'
            : 'from-gray-900/80 via-gray-900/30 to-transparent'
        }`}>
          <span className={`text-sm font-semibold px-4 py-2 rounded-lg shadow-lg ${
            isDarkMode 
              ? 'text-white bg-purple-600/80'
              : 'text-white bg-purple-600'
          }`}>
            View Details →
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
