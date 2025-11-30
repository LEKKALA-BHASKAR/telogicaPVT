import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const LoadingSkeleton = ({ type = 'card', count = 1 }) => {
  const { isDarkMode } = useTheme();

  const renderSkeleton = () => {
    const bgColor = isDarkMode ? 'bg-gray-800' : 'bg-gray-200';
    const containerBg = isDarkMode ? 'bg-gray-900/50' : 'bg-gray-100/50';
    const borderColor = isDarkMode ? 'border-gray-700/50' : 'border-gray-300/50';
    const heroBg = isDarkMode ? 'bg-gradient-to-b from-gray-950 to-black' : 'bg-gradient-to-b from-gray-50 to-white';

    switch (type) {
      case 'card':
        return (
          <div className={`${containerBg} rounded-2xl border ${borderColor} p-6 animate-pulse`}>
            <div className={`w-full h-48 ${bgColor} rounded-lg mb-4`}></div>
            <div className={`h-6 ${bgColor} rounded w-3/4 mb-3`}></div>
            <div className={`h-4 ${bgColor} rounded w-full mb-2`}></div>
            <div className={`h-4 ${bgColor} rounded w-5/6`}></div>
          </div>
        );
      
      case 'product':
        return (
          <div className={`${containerBg} rounded-2xl border ${borderColor} overflow-hidden animate-pulse`}>
            <div className={`w-full h-64 ${bgColor}`}></div>
            <div className="p-6">
              <div className={`h-6 ${bgColor} rounded w-3/4 mb-3`}></div>
              <div className={`h-4 ${bgColor} rounded w-full mb-2`}></div>
              <div className={`h-4 ${bgColor} rounded w-2/3 mb-4`}></div>
              <div className="flex justify-between items-center">
                <div className={`h-8 ${bgColor} rounded w-24`}></div>
                <div className={`h-8 ${bgColor} rounded w-20`}></div>
              </div>
            </div>
          </div>
        );

      case 'text':
        return (
          <div className="space-y-3 animate-pulse">
            <div className={`h-4 ${bgColor} rounded w-full`}></div>
            <div className={`h-4 ${bgColor} rounded w-5/6`}></div>
            <div className={`h-4 ${bgColor} rounded w-4/6`}></div>
          </div>
        );

      case 'hero':
        return (
          <div className={`min-h-screen flex items-center justify-center ${heroBg} animate-pulse`}>
            <div className="text-center max-w-4xl mx-auto px-4">
              <div className={`h-12 ${bgColor} rounded-lg w-3/4 mx-auto mb-6`}></div>
              <div className={`h-6 ${bgColor} rounded w-full mb-4`}></div>
              <div className={`h-6 ${bgColor} rounded w-5/6 mx-auto mb-8`}></div>
              <div className="flex gap-4 justify-center">
                <div className={`h-12 ${bgColor} rounded-lg w-32`}></div>
                <div className={`h-12 ${bgColor} rounded-lg w-32`}></div>
              </div>
            </div>
          </div>
        );

      case 'list':
        return (
          <div className={`${containerBg} rounded-xl border ${borderColor} p-4 animate-pulse flex items-center gap-4`}>
            <div className={`w-16 h-16 ${bgColor} rounded-lg flex-shrink-0`}></div>
            <div className="flex-1 space-y-2">
              <div className={`h-5 ${bgColor} rounded w-2/3`}></div>
              <div className={`h-4 ${bgColor} rounded w-full`}></div>
            </div>
          </div>
        );

      default:
        return (
          <div className={`${containerBg} rounded-2xl border ${borderColor} p-6 animate-pulse`}>
            <div className={`h-4 ${bgColor} rounded w-full mb-3`}></div>
            <div className={`h-4 ${bgColor} rounded w-5/6`}></div>
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
