import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow cursor-pointer"
      onClick={() => navigate(`/products/${product._id}`)}
      data-testid={`product-card-${product._id}`}
    >
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-violet-50 to-orange-50">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0].url}
            alt={product.title}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-400 text-lg">No Image</span>
          </div>
        )}
        {product.stock < 10 && product.stock > 0 && (
          <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Low Stock
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Out of Stock
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="text-xs text-violet-600 font-semibold mb-2">
          {product.category}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2" data-testid={`product-title-${product._id}`}>
          {product.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-gray-900" data-testid={`product-price-${product._id}`}>
              ₹{product.price?.toLocaleString()}
            </span>
            <p className="text-xs text-gray-500 mt-1">Stock: {product.stock}</p>
          </div>
          <Button
            className="bg-violet-600 hover:bg-violet-700 text-white rounded-full px-4"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/products/${product._id}`);
            }}
            data-testid={`view-product-btn-${product._id}`}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            View
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
