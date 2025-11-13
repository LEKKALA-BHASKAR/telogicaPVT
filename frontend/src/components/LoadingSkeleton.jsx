import React from 'react';
import { motion } from 'framer-motion';

const LoadingSkeleton = ({ type = 'card', count = 1 }) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return (
          <div className="bg-gray-900/50 rounded-2xl border border-gray-700/50 p-6 animate-pulse">
            <div className="w-full h-48 bg-gray-800 rounded-lg mb-4"></div>
            <div className="h-6 bg-gray-800 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-800 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-800 rounded w-5/6"></div>
          </div>
        );
      
      case 'product':
        return (
          <div className="bg-gray-900/50 rounded-2xl border border-gray-700/50 overflow-hidden animate-pulse">
            <div className="w-full h-64 bg-gray-800"></div>
            <div className="p-6">
              <div className="h-6 bg-gray-800 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-800 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-800 rounded w-2/3 mb-4"></div>
              <div className="flex justify-between items-center">
                <div className="h-8 bg-gray-800 rounded w-24"></div>
                <div className="h-8 bg-gray-800 rounded w-20"></div>
              </div>
            </div>
          </div>
        );

      case 'text':
        return (
          <div className="space-y-3 animate-pulse">
            <div className="h-4 bg-gray-800 rounded w-full"></div>
            <div className="h-4 bg-gray-800 rounded w-5/6"></div>
            <div className="h-4 bg-gray-800 rounded w-4/6"></div>
          </div>
        );

      case 'hero':
        return (
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-950 to-black animate-pulse">
            <div className="text-center max-w-4xl mx-auto px-4">
              <div className="h-12 bg-gray-800 rounded-lg w-3/4 mx-auto mb-6"></div>
              <div className="h-6 bg-gray-800 rounded w-full mb-4"></div>
              <div className="h-6 bg-gray-800 rounded w-5/6 mx-auto mb-8"></div>
              <div className="flex gap-4 justify-center">
                <div className="h-12 bg-gray-800 rounded-lg w-32"></div>
                <div className="h-12 bg-gray-800 rounded-lg w-32"></div>
              </div>
            </div>
          </div>
        );

      case 'list':
        return (
          <div className="bg-gray-900/50 rounded-xl border border-gray-700/50 p-4 animate-pulse flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-800 rounded-lg flex-shrink-0"></div>
            <div className="flex-1 space-y-2">
              <div className="h-5 bg-gray-800 rounded w-2/3"></div>
              <div className="h-4 bg-gray-800 rounded w-full"></div>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-gray-900/50 rounded-2xl border border-gray-700/50 p-6 animate-pulse">
            <div className="h-4 bg-gray-800 rounded w-full mb-3"></div>
            <div className="h-4 bg-gray-800 rounded w-5/6"></div>
          </div>
        );
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          {renderSkeleton()}
        </motion.div>
      ))}
    </>
  );
};

export default LoadingSkeleton;
