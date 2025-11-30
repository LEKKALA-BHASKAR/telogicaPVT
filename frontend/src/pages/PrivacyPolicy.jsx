import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText, Server, Globe } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const PrivacyPolicy = () => {
  const { isDarkMode } = useTheme();

  const sections = [
    {
      icon: Eye,
      title: "Information We Collect",
      content: "We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This may include your name, email address, phone number, shipping address, and payment information."
    },
    {
      icon: Server,
      title: "How We Use Your Information",
      content: "We use the information we collect to provide, maintain, and improve our services, process your transactions, send you technical notices and support messages, and communicate with you about products, services, and events."
    },
    {
      icon: Lock,
      title: "Data Security",
      content: "We implement appropriate technical and organizational measures to protect the security of your personal information. However, please note that no method of transmission over the Internet or method of electronic storage is 100% secure."
    },
    {
      icon: Globe,
      title: "Cookies and Tracking",
      content: "We use cookies and similar tracking technologies to track the activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent."
    },
    {
      icon: FileText,
      title: "Your Rights",
      content: "You have the right to access, update, or delete your personal information. You may also object to the processing of your personal information, ask us to restrict processing, or request portability of your personal information."
    }
  ];

  return (
    <div className={`min-h-screen pt-24 pb-16 transition-colors duration-300 ${isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className={`inline-flex items-center justify-center p-3 rounded-2xl mb-6 ${isDarkMode ? 'bg-purple-500/10 text-purple-400' : 'bg-purple-100 text-purple-600'}`}>
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            Privacy Policy
          </h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            We are committed to protecting your privacy and ensuring the security of your personal information.
            Last updated: November 30, 2025
          </p>
        </motion.div>

        {/* Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-8 rounded-3xl border transition-all duration-300 hover:shadow-lg ${
                isDarkMode 
                  ? 'bg-gray-900/50 border-gray-800 hover:border-purple-500/30' 
                  : 'bg-white border-gray-200 hover:border-purple-200'
              }`}
            >
              <div className="flex items-start gap-6">
                <div className={`p-3 rounded-xl flex-shrink-0 ${
                  isDarkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'
                }`}>
                  <section.icon className="w-6 h-6" />
                </div>
                <div>
                  <h2 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {section.title}
                  </h2>
                  <p className={`leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {section.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className={`mt-12 p-8 rounded-3xl text-center ${
              isDarkMode 
                ? 'bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/20' 
                : 'bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-100'
            }`}
          >
            <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Have Questions?
            </h3>
            <p className={`mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              If you have any questions about our Privacy Policy, please contact us.
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Contact Support
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
