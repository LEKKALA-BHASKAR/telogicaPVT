import React from 'react';
import { motion } from 'framer-motion';
import { Scale, FileCheck, AlertCircle, ShieldCheck, Gavel, BookOpen } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const TermsOfService = () => {
  const { isDarkMode } = useTheme();

  const sections = [
    {
      icon: BookOpen,
      title: "Acceptance of Terms",
      content: "By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services."
    },
    {
      icon: ShieldCheck,
      title: "Use License",
      content: "Permission is granted to temporarily download one copy of the materials (information or software) on Telogica's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title."
    },
    {
      icon: AlertCircle,
      title: "Disclaimer",
      content: "The materials on Telogica's website are provided on an 'as is' basis. Telogica makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights."
    },
    {
      icon: Scale,
      title: "Limitations",
      content: "In no event shall Telogica or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Telogica's website."
    },
    {
      icon: FileCheck,
      title: "Accuracy of Materials",
      content: "The materials appearing on Telogica's website could include technical, typographical, or photographic errors. Telogica does not warrant that any of the materials on its website are accurate, complete or current."
    },
    {
      icon: Gavel,
      title: "Governing Law",
      content: "These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location."
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
          <div className={`inline-flex items-center justify-center p-3 rounded-2xl mb-6 ${isDarkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
            <Scale className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Terms of Service
          </h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Please read these terms carefully before using our services.
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
                  ? 'bg-gray-900/50 border-gray-800 hover:border-blue-500/30' 
                  : 'bg-white border-gray-200 hover:border-blue-200'
              }`}
            >
              <div className="flex items-start gap-6">
                <div className={`p-3 rounded-xl flex-shrink-0 ${
                  isDarkMode ? 'bg-purple-500/10 text-purple-400' : 'bg-purple-50 text-purple-600'
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

          {/* Agreement Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className={`mt-12 p-8 rounded-3xl text-center ${
              isDarkMode 
                ? 'bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20' 
                : 'bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100'
            }`}
          >
            <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Agreement
            </h3>
            <p className={`mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              By using our services, you acknowledge that you have read and understood these Terms of Service and agree to be bound by them.
            </p>
            <div className="flex justify-center gap-4">
              <a 
                href="/" 
                className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Accept & Continue
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
