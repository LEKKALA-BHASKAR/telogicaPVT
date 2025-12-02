import React from "react";
import Hero from "./Hero";
import ScrollSnapPage from "./ScrollSnapPage";
import Clients from "./Clients";
import AboutHero from "./AboutHero";
import FeaturedProductsSection from "./FeaturedProductsSection";
import FAQSection from "../components/FAQSection";
import { useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Mail, MapPin, Sparkles } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

// Professional CTA Section Component
const CTASection = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  return (
    <section className={`relative py-32 overflow-hidden ${
      isDarkMode ? 'bg-black' : 'bg-slate-50'
    }`}>
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full blur-[150px] opacity-30 ${
          isDarkMode ? 'bg-blue-600' : 'bg-blue-400'
        }`} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`relative rounded-[3rem] overflow-hidden ${
            isDarkMode 
              ? 'bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 border border-white/10' 
              : 'bg-white shadow-2xl shadow-gray-200/50'
          }`}
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-pink-500/20 to-orange-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative p-12 md:p-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center px-4 py-2 rounded-full border backdrop-blur-sm bg-blue-500/10 border-blue-500/20"
                >
                  <Sparkles className="w-4 h-4 mr-2 text-blue-400" />
                  <span className={`text-sm font-semibold ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                    Let's Build Together
                  </span>
                </motion.div>

                <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Ready to Transform Your{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                    Infrastructure?
                  </span>
                </h2>

                <p className={`text-xl leading-relaxed max-w-xl ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Partner with India's leading Test & Measurement equipment manufacturer. Get customized solutions for your defense and telecom needs.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => navigate('/contact')}
                    className={`group px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                      isDarkMode 
                        ? 'bg-white text-black hover:bg-gray-100' 
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                  >
                    <span className="flex items-center justify-center">
                      Get In Touch
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                  <button
                    onClick={() => navigate('/products')}
                    className={`px-10 py-5 rounded-2xl font-bold text-lg border-2 transition-all duration-300 hover:scale-105 ${
                      isDarkMode 
                        ? 'border-white/20 text-white hover:bg-white/10' 
                        : 'border-gray-200 text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    View Products
                  </button>
                </div>
              </div>

              {/* Right Content - Contact Cards */}
              <div className="space-y-6">
                {[
                  { icon: Phone, label: "Call Us", value: "+91 11 2953 3700", href: "tel:+911129533700" },
                  { icon: Mail, label: "Email Us", value: "info@telogica.in", href: "mailto:info@telogica.in" },
                  { icon: MapPin, label: "Visit Us", value: "New Delhi, India", href: "/contact" },
                ].map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`group flex items-center gap-6 p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                      isDarkMode 
                        ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20' 
                        : 'bg-gray-50 border-gray-100 hover:bg-white hover:shadow-lg hover:border-gray-200'
                    }`}
                  >
                    <div className={`p-4 rounded-xl transition-colors duration-300 ${
                      isDarkMode 
                        ? 'bg-blue-500/20 group-hover:bg-blue-500/30' 
                        : 'bg-blue-100 group-hover:bg-blue-200'
                    }`}>
                      <item.icon className={`w-6 h-6 ${
                        isDarkMode ? 'text-blue-400' : 'text-blue-600'
                      }`} />
                    </div>
                    <div>
                      <div className={`text-sm font-medium mb-1 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>{item.label}</div>
                      <div className={`text-lg font-bold ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>{item.value}</div>
                    </div>
                    <ArrowRight className={`w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Home = () => {
    const { isDarkMode } = useTheme();
    
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <div className={`transition-colors duration-300 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
      <Hero />
      <AboutHero />
      <ScrollSnapPage />
      <FeaturedProductsSection/>
      <Clients />
      <CTASection />
    </div>
  );
};

export default Home;
