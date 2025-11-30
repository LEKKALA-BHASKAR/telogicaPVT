import React from 'react';
import { ArrowRight, Shield, Radio, Factory, Cpu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const AboutHero = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const handleKnowMore = () => {
    navigate('/about');
  };

  return (
    <section className={`relative min-h-screen overflow-hidden transition-colors duration-500 ${
      isDarkMode 
        ? 'bg-black text-white'
        : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 ${
          isDarkMode ? 'bg-blue-600' : 'bg-blue-400'
        }`} />
        <div className={`absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[100px] opacity-15 ${
          isDarkMode ? 'bg-purple-600' : 'bg-purple-400'
        }`} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side - Image */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
            <div className={`absolute -inset-4 rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                : 'bg-gradient-to-r from-blue-400 to-indigo-400'
            }`} />
            
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop"
                alt="Telogica Advanced Technology"
                className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className={`absolute inset-0 ${
                isDarkMode ? 'bg-gradient-to-t from-black/60 to-transparent' : 'bg-gradient-to-t from-black/30 to-transparent'
              }`} />
              
              {/* Floating Tech Icons */}
              <div className="absolute bottom-8 left-8 flex gap-4">
                {[Shield, Radio, Factory].map((Icon, index) => (
                  <div key={index} className={`w-12 h-12 backdrop-blur-md rounded-2xl flex items-center justify-center border shadow-lg ${
                    isDarkMode 
                      ? 'bg-white/10 border-white/20 text-white'
                      : 'bg-white/80 border-white/40 text-blue-600'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Badge */}
            <div className={`inline-flex items-center px-4 py-2 rounded-full backdrop-blur-sm border ${
              isDarkMode 
                ? 'bg-blue-500/10 border-blue-500/20 text-blue-300'
                : 'bg-blue-50 border-blue-200 text-blue-700'
            }`}>
              <Cpu className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Innovating Since 2008</span>
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-6xl font-bold leading-tight">
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">Telogica</span>
              </h2>
              <p className={`text-lg font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Formerly Aishwarya Technologies and Telecom Ltd (ATTL)
              </p>
            </div>

            {/* Description */}
            <div className="space-y-6">
              <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                We are the backbone of India's Defence and Telecom sectors. As a premier design and manufacturing powerhouse, we produce cutting-edge Test & Measuring Equipment that ensures the nation's infrastructure never fails.
              </p>
              <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                From Fiber Optics to Copper Cable Fault Locators, our technology sets the qualitative benchmark in the industry.
              </p>
            </div>

            {/* CTA & Stats */}
            <div className="flex flex-col sm:flex-row gap-8 pt-4 items-center">
              <button
                onClick={handleKnowMore}
                className={`group relative px-8 py-4 rounded-full font-bold text-lg inline-flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                  isDarkMode 
                    ? 'bg-white text-black hover:bg-gray-200'
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                Discover More
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
              
              <div className="flex gap-8 border-l pl-8 border-gray-200 dark:border-gray-800">
                <div>
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">15+</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Years</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">500+</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Projects</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;