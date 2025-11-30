import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const { isDarkMode } = useTheme();

  const faqs = [
    {
      question: "What types of test and measurement equipment do you manufacture?",
      answer: "We manufacture a comprehensive range of test and measurement equipment for telecommunications and defense sectors, including Fiber Optic Test Equipment (OTDR), Cable Fault Locators, Spectrum Analyzers, Vector Network Analyzers, and specialized defense-grade testing equipment."
    },
    {
      question: "Do you provide custom solutions for specific requirements?",
      answer: "Yes, we specialize in custom equipment design and manufacturing. Our team works closely with clients to understand their specific requirements and develop tailored solutions from concept to production, backed by rigorous quality assurance."
    },
    {
      question: "What is your experience in the defense sector?",
      answer: "We have over 15 years of experience supplying advanced testing equipment to Indian defense organizations. Our military-grade solutions include ruggedized testing equipment, radar testing systems, and EMI/EMC testing solutions that meet stringent defense requirements."
    },
    {
      question: "What support services do you offer?",
      answer: "We provide comprehensive support including 24/7 technical assistance, on-site training, equipment calibration, maintenance services, and software updates. Our nationwide service network ensures prompt response to customer needs."
    },
    {
      question: "Are your products ISO certified?",
      answer: "Yes, our manufacturing processes and products meet international quality standards. We are ISO certified and maintain rigorous quality control throughout our production cycle to ensure reliability and performance."
    },
    {
      question: "How can I request a product demo or quotation?",
      answer: "You can request a product demonstration or quotation by contacting us through our website, email at sales@telogica.com, or calling +91 9396610682. Our sales team will respond promptly to discuss your requirements."
    },
    {
      question: "What is your delivery timeline for standard products?",
      answer: "Delivery timelines vary based on product type and quantity. Standard products are typically delivered within 2-4 weeks, while custom solutions may take 6-12 weeks depending on complexity. We provide accurate timelines during the quotation process."
    },
    {
      question: "Do you offer training for your equipment?",
      answer: "Yes, we provide comprehensive training programs for all our products. This includes on-site training, online tutorials, detailed user manuals, and ongoing technical support to ensure optimal equipment utilization."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={`py-20 relative overflow-hidden transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white'
        : 'bg-gradient-to-b from-gray-50 via-white to-gray-100 text-gray-900'
    }`}>
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-0 left-0 w-96 h-96 blur-[120px] ${
          isDarkMode ? 'bg-blue-500/10' : 'bg-blue-500/5'
        }`} />
        <div className={`absolute bottom-0 right-0 w-96 h-96 blur-[120px] ${
          isDarkMode ? 'bg-purple-500/10' : 'bg-purple-500/5'
        }`} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${
            isDarkMode 
              ? 'bg-gradient-to-br from-blue-600 to-purple-600'
              : 'bg-gradient-to-br from-blue-500 to-purple-500'
          }`}>
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Frequently Asked <span className={`bg-clip-text text-transparent bg-gradient-to-r ${
              isDarkMode 
                ? 'from-blue-400 to-purple-400'
                : 'from-blue-600 to-purple-600'
            }`}>Questions</span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Find answers to common questions about our products and services
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-4 mb-12">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`backdrop-blur-sm rounded-xl border overflow-hidden hover:border-purple-500/30 transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-gray-900/50 border-gray-700/50 hover:border-purple-400/50'
                  : 'bg-white/50 border-gray-200 hover:border-purple-300'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left group"
              >
                <span className={`text-lg font-semibold group-hover:text-purple-400 transition-colors duration-300 pr-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-6 h-6 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  } ${
                    isDarkMode ? 'text-purple-400' : 'text-purple-600'
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className={`px-6 pb-5 pt-2 leading-relaxed border-t ${
                      isDarkMode 
                        ? 'text-gray-300 border-gray-700/30'
                        : 'text-gray-700 border-gray-200'
                    }`}>
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`backdrop-blur-sm rounded-2xl p-8 text-center ${
            isDarkMode 
              ? 'bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/20'
              : 'bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200'
          }`}
        >
          <MessageCircle className={`w-12 h-12 mx-auto mb-4 ${
            isDarkMode ? 'text-blue-400' : 'text-blue-600'
          }`} />
          <h3 className={`text-2xl font-bold mb-2 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Still have questions?
          </h3>
          <p className={`mb-6 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Our team is here to help. Get in touch with us for personalized assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className={`inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-blue-500/50'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-blue-500/25'
              }`}
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact Us
            </Link>
            <a
              href="tel:+919396610682"
              className={`inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold border transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-900 border-gray-300'
              }`}
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
