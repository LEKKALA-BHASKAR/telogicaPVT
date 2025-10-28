import React from "react";
import { Link } from "react-router-dom";
import { Package, DollarSign, Star } from "lucide-react";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
  const getCategoryColor = (category) => {
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
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -5 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-gradient-to-b from-gray-900/80 to-gray-800/60 rounded-2xl border border-gray-700/50 hover:border-purple-400/50 overflow-hidden shadow-lg hover:shadow-purple-500/10"
    >
      <Link to={`/products/${product._id}`} className="block">
        {/* 🖼️ Image Section */}
        <div className="relative w-full bg-black flex items-center justify-center overflow-hidden">
          {product.images?.[0]?.url ? (
            <img
              src={product.images[0].url}
              alt={product.title}
              className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105 bg-gray-900"
              style={{ maxHeight: "280px" }} // ensures full image visible without crop
              data-testid="product-card-image"
            />
          ) : (
            <div className="w-full h-64 flex items-center justify-center bg-gray-900/60">
              <Package className="w-12 h-12 text-gray-600" />
            </div>
          )}

          {/* Featured Badge */}
          {product.featured && (
            <div className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-md">
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
              className="font-semibold text-lg text-white line-clamp-1"
              data-testid="product-card-title"
            >
              {product.title}
            </h3>
            <div className="flex items-center gap-1 text-green-400 bg-green-500/10 px-2 py-1 rounded-md border border-green-500/30">
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
            className="text-gray-400 text-sm mb-4 line-clamp-2"
            data-testid="product-card-description"
          >
            {product.description || "No description available."}
          </p>

          {/* Stock Badge */}
          <div
            className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold border ${
              product.stock > 10
                ? "bg-green-500/20 text-green-400 border-green-500/30"
                : product.stock > 0
                ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                : "bg-red-500/20 text-red-400 border-red-500/30"
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center p-6">
          <span className="text-sm font-semibold text-white bg-purple-600/80 px-4 py-2 rounded-lg shadow-lg">
            View Details →
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
