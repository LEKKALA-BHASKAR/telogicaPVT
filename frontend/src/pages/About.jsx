import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Shield, 
  Globe, 
  Zap, 
  Target, 
  Award, 
  Users, 
  Cpu, 
  Radio, 
  ArrowRight, 
  CheckCircle2,
  TrendingUp,
  Rocket,
  Microscope
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const About = () => {
  const { isDarkMode } = useTheme();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div ref={containerRef} className={`min-h-screen overflow-x-hidden transition-colors duration-500 ${
      isDarkMode ? 'bg-black text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* Parallax Background Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 ${
          isDarkMode ? 'bg-blue-600' : 'bg-blue-400'
        }`} />
        <div className={`absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full blur-[100px] opacity-15 ${
          isDarkMode ? 'bg-purple-600' : 'bg-purple-400'
        }`} />
        <div className={`absolute top-[40%] left-[20%] w-[300px] h-[300px] rounded-full blur-[80px] opacity-10 ${
          isDarkMode ? 'bg-cyan-600' : 'bg-cyan-400'
        }`} />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 pb-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </span>
              <span className={`text-sm font-medium ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                Est. 2008 • ISO Certified
              </span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              Pioneering <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                Future Tech
              </span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className={`text-xl leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Telogica Limited is at the forefront of defense and telecommunications innovation. We engineer the impossible to secure the future, delivering precision-driven solutions for critical infrastructure.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <button className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1 ${
                isDarkMode 
                  ? 'bg-white text-black hover:bg-gray-200' 
                  : 'bg-black text-white hover:bg-gray-800'
              }`}>
                Our Journey <ArrowRight className="w-5 h-5" />
              </button>
              <button className={`px-8 py-4 rounded-2xl font-semibold backdrop-blur-md border transition-all duration-300 hover:-translate-y-1 ${
                isDarkMode 
                  ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white' 
                  : 'bg-white/50 border-black/10 hover:bg-white/80 text-black'
              }`}>
                View Certifications
              </button>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2, type: "spring" }}
            className="relative hidden lg:block"
          >
            <div className={`absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-[2.5rem] rotate-6 opacity-20 blur-2xl`} />
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" 
              alt="Advanced Technology Lab" 
              className="relative rounded-[2.5rem] shadow-2xl border border-white/10 w-full object-cover h-[600px] z-10"
            />
            
            {/* Floating Stats Cards */}
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className={`absolute -bottom-10 -left-10 p-6 rounded-2xl backdrop-blur-xl border shadow-2xl z-20 ${
                isDarkMode ? 'bg-gray-900/90 border-white/10' : 'bg-white/90 border-black/5'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-green-500/20 text-green-500">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Annual Growth</p>
                  <p className="text-2xl font-bold">250% YoY</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              className={`absolute top-10 -right-10 p-6 rounded-2xl backdrop-blur-xl border shadow-2xl z-20 ${
                isDarkMode ? 'bg-gray-900/90 border-white/10' : 'bg-white/90 border-black/5'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-blue-500/20 text-blue-500">
                  <Shield className="w-8 h-8" />
                </div>
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Defense Grade</p>
                  <p className="text-2xl font-bold">Certified</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`grid grid-cols-2 md:grid-cols-4 gap-8 p-12 rounded-[2.5rem] border backdrop-blur-md ${
              isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-2xl'
            }`}
          >
            {[
              { label: "Years Experience", value: "15+", icon: Award },
              { label: "Projects Delivered", value: "500+", icon: CheckCircle2 },
              { label: "Expert Engineers", value: "50+", icon: Users },
              { label: "Global Partners", value: "20+", icon: Globe },
            ].map((stat, index) => (
              <div key={index} className="text-center space-y-3 group">
                <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                  isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                }`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <h3 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-blue-400 to-purple-600">
                  {stat.value}
                </h3>
                <p className={`font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-blue-500 font-semibold tracking-wider uppercase text-sm"
            >
              Our DNA
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mt-3 mb-6"
            >
              Core Philosophy
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`text-xl max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
            >
              Driven by innovation, grounded in reliability. We don't just build equipment; we build trust for the nation's most critical sectors.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Our Mission",
                desc: "To empower defense and telecom sectors with precision-engineered testing solutions that guarantee operational readiness and strategic superiority.",
                icon: Target,
                color: "from-blue-500 to-cyan-500"
              },
              {
                title: "Our Vision",
                desc: "To be the global benchmark for reliability in critical infrastructure testing and measurement technology, setting new standards in quality.",
                icon: Microscope,
                color: "from-purple-500 to-pink-500"
              },
              {
                title: "Innovation",
                desc: "Relentless pursuit of technological advancement to stay ahead of evolving industry challenges through continuous Research & Development.",
                icon: Rocket,
                color: "from-orange-500 to-red-500"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className={`p-8 rounded-[2rem] border transition-all duration-300 group relative overflow-hidden ${
                  isDarkMode 
                    ? 'bg-gray-900/50 border-white/10 hover:bg-gray-800/50' 
                    : 'bg-white border-gray-100 hover:shadow-2xl'
                }`}
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} opacity-10 rounded-bl-[100px] transition-opacity group-hover:opacity-20`} />
                
                <div className={`w-16 h-16 rounded-2xl mb-8 flex items-center justify-center bg-gradient-to-br ${item.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className={`leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Showcase / Parallax Strip */}
      <section className="py-24">
        <div className="h-[600px] relative overflow-hidden group">
          <div className="absolute inset-0 bg-black/50 z-10 transition-opacity duration-500 group-hover:bg-black/40" />
          <motion.img 
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop" 
            alt="Lab" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-6">
            <div className="max-w-4xl">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-bold text-white mb-8"
              >
                Precision in Every Pulse
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto"
              >
                Our state-of-the-art manufacturing facilities ensure that every piece of equipment meets the highest military and industrial standards.
              </motion.p>
              <motion.button 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                className="px-10 py-4 bg-white text-black rounded-full font-bold hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)] transition-all"
              >
                Explore Our Facilities
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline / History */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4">Our Evolution</h2>
            <p className={`text-xl ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>A legacy of continuous innovation and growth</p>
          </div>
          
          <div className="relative">
            {/* Vertical Line */}
            <div className={`absolute left-0 md:left-1/2 top-0 bottom-0 w-px md:-ml-[0.5px] ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`} />

            <div className="space-y-12">
              {[
                { year: "2008", title: "Inception", desc: "Founded as Aishwarya Technologies, focusing on basic telecom testing equipment and establishing initial market presence." },
                { year: "2012", title: "Defense Entry", desc: "Secured first major contract with Indian Defense sector, marking a pivotal shift towards high-grade military specifications." },
                { year: "2018", title: "R&D Expansion", desc: "Launched dedicated R&D center for RF & Microwave technologies, enabling in-house product development and innovation." },
                { year: "2023", title: "Rebranding", desc: "Evolved into Telogica Limited, marking a new era of global operations and expanded product portfolio." }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className={`relative flex items-center justify-between md:justify-normal ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} group`}
                >
                  {/* Dot */}
                  <div className={`absolute left-0 md:left-1/2 w-4 h-4 -ml-2 rounded-full border-2 z-10 transition-all duration-300 group-hover:scale-150 ${
                    isDarkMode ? 'bg-black border-blue-500' : 'bg-white border-blue-500'
                  }`} />
                  
                  {/* Content */}
                  <div className={`w-[calc(100%-3rem)] md:w-[calc(50%-3rem)] ml-12 md:ml-0 p-8 rounded-3xl border backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 shadow-lg group-hover:shadow-2xl ${
                    isDarkMode 
                      ? 'bg-gray-900/50 border-white/10 hover:border-blue-500/30' 
                      : 'bg-white border-gray-100 hover:border-blue-500/30'
                  }`}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                      <h3 className="text-2xl font-bold">{item.title}</h3>
                      <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 opacity-80">{item.year}</span>
                    </div>
                    <p className={`leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className={`max-w-5xl mx-auto rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden ${
          isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50'
        }`}>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to Transform Your Infrastructure?</h2>
            <p className={`text-xl mb-10 max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Join the league of industry leaders who trust Telogica for their critical testing needs.
            </p>
            <button className="px-12 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
              Contact Our Experts
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;