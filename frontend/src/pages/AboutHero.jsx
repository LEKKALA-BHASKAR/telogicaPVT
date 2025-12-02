import React from 'react';
import { ArrowRight, Shield, Radio, Factory, Cpu, Award, TrendingUp, CheckCircle, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const AboutHero = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const handleKnowMore = () => {
    navigate('/about');
  };

  const features = [
    { icon: Shield, label: "Defense Grade", desc: "Military-spec quality" },
    { icon: Zap, label: "High Performance", desc: "99.9% uptime guaranteed" },
    { icon: Award, label: "ISO Certified", desc: "International standards" },
  ];

  return (
    <section className={`relative py-32 lg:py-40 overflow-hidden transition-colors duration-500 ${
      isDarkMode 
        ? 'bg-black text-white'
        : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-[-20%] left-[-10%] w-[800px] h-[800px] rounded-full blur-[150px] opacity-20 ${
          isDarkMode ? 'bg-blue-600' : 'bg-blue-400'
        }`} />
        <div className={`absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] opacity-15 ${
          isDarkMode ? 'bg-purple-600' : 'bg-purple-400'
        }`} />
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ 
            backgroundImage: `linear-gradient(${isDarkMode ? '#fff' : '#000'} 1px, transparent 1px), linear-gradient(90deg, ${isDarkMode ? '#fff' : '#000'} 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} 
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Side - Image with Floating Cards */}
          <motion.div 
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main Image Container */}
            <div className="relative group">
              {/* Gradient Border Effect */}
              <div className={`absolute -inset-1 rounded-[2.5rem] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-700`} />
              
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop"
                  alt="Telogica Advanced Technology"
                  className="w-full h-[600px] object-cover transform group-hover:scale-105 transition-transform duration-1000"
                />
                {/* Overlay Gradient */}
                <div className={`absolute inset-0 ${
                  isDarkMode 
                    ? 'bg-gradient-to-t from-black/80 via-black/20 to-transparent' 
                    : 'bg-gradient-to-t from-black/50 via-transparent to-transparent'
                }`} />
                
                {/* Bottom Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex flex-wrap gap-3">
                    {[Shield, Radio, Factory].map((Icon, index) => (
                      <div key={index} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                        <Icon className="w-4 h-4 text-white" />
                        <span className="text-white text-sm font-medium">
                          {index === 0 ? 'Defence' : index === 1 ? 'Telecom' : 'Industrial'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Stats Card - Top Right */}
            <motion.div 
              initial={{ opacity: 0, x: 50, y: -30 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className={`absolute -top-8 -right-8 p-6 rounded-2xl backdrop-blur-xl border shadow-2xl ${
                isDarkMode 
                  ? 'bg-gray-900/90 border-white/10' 
                  : 'bg-white/95 border-gray-100 shadow-gray-200/50'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${
                  isDarkMode ? 'bg-green-500/20' : 'bg-green-100'
                }`}>
                  <TrendingUp className={`w-6 h-6 ${
                    isDarkMode ? 'text-green-400' : 'text-green-600'
                  }`} />
                </div>
                <div>
                  <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>250%</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>YoY Growth</div>
                </div>
              </div>
            </motion.div>

            {/* Floating Quality Card - Bottom Left */}
            <motion.div 
              initial={{ opacity: 0, x: -50, y: 30 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className={`absolute -bottom-8 -left-8 p-6 rounded-2xl backdrop-blur-xl border shadow-2xl ${
                isDarkMode 
                  ? 'bg-gray-900/90 border-white/10' 
                  : 'bg-white/95 border-gray-100 shadow-gray-200/50'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${
                  isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100'
                }`}>
                  <CheckCircle className={`w-6 h-6 ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                </div>
                <div>
                  <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>99.9%</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Quality Rate</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div 
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-10"
          >
            {/* Badge */}
            <div className={`inline-flex items-center px-5 py-2.5 rounded-full backdrop-blur-sm border ${
              isDarkMode 
                ? 'bg-blue-500/10 border-blue-500/20 text-blue-300'
                : 'bg-blue-50 border-blue-200 text-blue-700'
            }`}>
              <Cpu className="w-4 h-4 mr-2" />
              <span className="text-sm font-semibold">Innovating Since 2008</span>
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h2 className="text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
                About{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                  Telogica
                </span>
              </h2>
              <p className={`text-lg font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Formerly Aishwarya Technologies and Telecom Ltd (ATTL)
              </p>
            </div>

            {/* Description */}
            <div className="space-y-6">
              <p className={`text-xl leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                We are the backbone of India's Defence and Telecom sectors. As a premier design and manufacturing powerhouse, we produce cutting-edge Test & Measuring Equipment that ensures the nation's infrastructure never fails.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className={`p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                    isDarkMode 
                      ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                      : 'bg-white border-gray-100 hover:shadow-lg'
                  }`}
                >
                  <feature.icon className={`w-8 h-8 mb-3 ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                  <div className={`font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {feature.label}
                  </div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {feature.desc}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Row */}
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center pt-4">
              <button
                onClick={handleKnowMore}
                className={`group relative px-10 py-5 rounded-2xl font-bold text-lg inline-flex items-center justify-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
                  isDarkMode 
                    ? 'bg-white text-black hover:bg-gray-100'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                Discover More
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
              
              <div className={`flex gap-10 sm:border-l sm:pl-10 ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                <div>
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">15+</div>
                  <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Years Experience</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">500+</div>
                  <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Projects Done</div>
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