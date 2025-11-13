import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white flex items-center justify-center px-4">
      {/* Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/10 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/10 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 mb-8"
        >
          <AlertTriangle className="w-12 h-12 text-white" />
        </motion.div>

        {/* 404 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-8xl md:text-9xl font-bold mb-6"
        >
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            404
          </span>
        </motion.h1>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 group"
          >
            <Home className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold border border-white/20 transition-all duration-300 group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </button>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 pt-8 border-t border-gray-800"
        >
          <p className="text-gray-500 text-sm mb-4">Quick Links:</p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: 'Products', path: '/products' },
              { name: 'Services', path: '/services' },
              { name: 'About', path: '/about' },
              { name: 'Contact', path: '/contact' }
            ].map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-400 hover:text-purple-400 transition-colors duration-300 text-sm"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
