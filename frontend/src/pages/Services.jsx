import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  Phone, 
  Shield, 
  Cpu, 
  ArrowRight, 
  Target, 
  Zap, 
  Settings, 
  Globe,
  CheckCircle2,
  BarChart3,
  Users,
  Layers,
  Activity,
  Wifi,
  Server,
  Anchor
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Services = () => {
  const { isDarkMode } = useTheme();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      id: 'telecom',
      title: 'Telecommunications',
      subtitle: 'Next-Gen Connectivity',
      description: 'Architecting the future of global communication with precision testing for 5G, fiber optics, and satellite networks.',
      icon: Wifi,
      image: 'https://images.unsplash.com/photo-1562408590-e32931084e23?q=80&w=2070&auto=format&fit=crop',
      features: ['5G Network Validation', 'Fiber Optic Analysis (OTDR)', 'Spectrum Management', 'Signal Intelligence'],
      color: 'blue',
      gradient: 'from-blue-600 to-cyan-400'
    },
    {
      id: 'defense',
      title: 'Defense Systems',
      subtitle: 'Mission Critical',
      description: 'Ruggedized tactical solutions designed for the most demanding operational environments on Earth.',
      icon: Shield,
      image: 'https://images.unsplash.com/photo-1614728853911-0941581eb58a?q=80&w=2071&auto=format&fit=crop',
      features: ['Electronic Warfare Testing', 'Radar Systems Calibration', 'Secure Comms', 'Field-Deployable Units'],
      color: 'purple',
      gradient: 'from-purple-600 to-pink-500'
    },
    {
      id: 'manufacturing',
      title: 'Smart Manufacturing',
      subtitle: 'Industry 4.0',
      description: 'End-to-end electronic manufacturing services (EMS) leveraging automation and AI for zero-defect production.',
      icon: Cpu,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop',
      features: ['PCB Assembly & Testing', 'IoT Integration', 'Automated Quality Control', 'Rapid Prototyping'],
      color: 'emerald',
      gradient: 'from-emerald-500 to-teal-400'
    }
  ];

  const processSteps = [
    {
      number: '01',
      title: 'Discovery',
      desc: 'Deep dive analysis of operational requirements and technical constraints.',
      icon: Activity
    },
    {
      number: '02',
      title: 'Engineering',
      desc: 'Custom solution architecture designed by industry veterans.',
      icon: Layers
    },
    {
      number: '03',
      title: 'Production',
      desc: 'Precision manufacturing with rigorous military-grade testing.',
      icon: Settings
    },
    {
      number: '04',
      title: 'Deployment',
      desc: 'Global logistics, installation, and 24/7 technical support.',
      icon: Globe
    }
  ];

  return (
    <div ref={containerRef} className={`min-h-screen font-sans overflow-x-hidden transition-colors duration-500 ${
      isDarkMode ? 'bg-black text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Animated Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] rounded-full blur-[150px] opacity-20 animate-pulse ${
          isDarkMode ? 'bg-blue-900' : 'bg-blue-200'
        }`} />
        <div className={`absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full blur-[150px] opacity-20 animate-pulse delay-1000 ${
          isDarkMode ? 'bg-purple-900' : 'bg-purple-200'
        }`} />
        <div className={`absolute top-[40%] left-[30%] w-[600px] h-[600px] rounded-full blur-[120px] opacity-10 ${
          isDarkMode ? 'bg-cyan-900' : 'bg-cyan-200'
        }`} />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className={`absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0b4?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 ${
            isDarkMode ? 'mix-blend-overlay' : 'mix-blend-multiply'
          }`} />
          <div className={`absolute inset-0 bg-gradient-to-b ${
            isDarkMode ? 'from-black via-black/90 to-black' : 'from-white via-white/90 to-slate-50'
          }`} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center px-6 py-2 rounded-full mb-8 border backdrop-blur-md bg-white/5 border-white/10 shadow-2xl"
          >
            <span className="relative flex h-3 w-3 mr-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            <span className={`text-sm font-bold tracking-wider uppercase ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
              Engineering The Future
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-tight"
          >
            Advanced <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              Technology Solutions
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed mb-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
          >
            We provide mission-critical infrastructure and testing equipment for the world's most demanding industries.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link to="/contact">
              <button className="px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg shadow-lg shadow-blue-600/30 transition-all hover:scale-105 hover:shadow-blue-600/50 flex items-center justify-center gap-2">
                Start Your Project <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <button 
              onClick={() => document.getElementById('services-grid').scrollIntoView({ behavior: 'smooth' })}
              className={`px-10 py-5 rounded-2xl font-bold text-lg border-2 transition-all hover:scale-105 ${
                isDarkMode 
                  ? 'border-white/20 hover:bg-white/10 text-white' 
                  : 'border-gray-300 hover:bg-gray-100 text-gray-900'
              }`}
            >
              Explore Capabilities
            </button>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services-grid" className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto space-y-40">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-20 items-center`}
            >
              {/* Image Side */}
              <div className="w-full lg:w-1/2 relative group perspective-1000">
                <div className={`absolute -inset-10 rounded-[3rem] blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700 bg-gradient-to-r ${service.gradient}`} />
                
                <motion.div 
                  whileHover={{ rotateY: index % 2 === 0 ? 5 : -5, rotateX: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 aspect-[4/3] bg-gray-900"
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${
                    isDarkMode ? 'from-black/90 via-black/20' : 'from-black/60 via-transparent'
                  } to-transparent`} />
                  
                  {/* Floating Icon Card */}
                  <div className={`absolute bottom-8 ${index % 2 === 0 ? 'left-8' : 'right-8'} p-6 rounded-2xl backdrop-blur-xl border shadow-2xl ${
                    isDarkMode ? 'bg-white/10 border-white/20' : 'bg-white/90 border-white/40'
                  }`}>
                    <service.icon className={`w-10 h-10 ${
                      service.color === 'blue' ? 'text-blue-400' :
                      service.color === 'purple' ? 'text-purple-400' :
                      'text-emerald-400'
                    }`} />
                  </div>
                </motion.div>
              </div>

              {/* Content Side */}
              <div className="w-full lg:w-1/2 space-y-10">
                <div>
                  <div className={`inline-block px-4 py-1 rounded-full text-sm font-bold tracking-wider uppercase mb-4 border ${
                    service.color === 'blue' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                    service.color === 'purple' ? 'bg-purple-500/10 text-purple-500 border-purple-500/20' :
                    'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                  }`}>
                    {service.subtitle}
                  </div>
                  <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">{service.title}</h2>
                  <p className={`text-xl leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {service.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {service.features.map((feature, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + (idx * 0.1) }}
                      className="flex items-start gap-4"
                    >
                      <div className={`mt-1 p-1 rounded-full ${
                        service.color === 'blue' ? 'bg-blue-500/20 text-blue-500' :
                        service.color === 'purple' ? 'bg-purple-500/20 text-purple-500' :
                        'bg-emerald-500/20 text-emerald-500'
                      }`}>
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className={`font-medium text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <Link to={`/products?category=${service.id}`}>
                  <button className={`group flex items-center gap-3 text-lg font-bold transition-all ${
                    service.color === 'blue' ? 'text-blue-500 hover:text-blue-400' :
                    service.color === 'purple' ? 'text-purple-500 hover:text-purple-400' :
                    'text-emerald-500 hover:text-emerald-400'
                  }`}>
                    <span className="border-b-2 border-current pb-1">Explore Solutions</span>
                    <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className={`py-32 px-6 relative overflow-hidden ${isDarkMode ? 'bg-gray-900/30' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Operational Workflow</h2>
            <p className={`text-xl max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Our proven methodology ensures precision, compliance, and rapid deployment for every project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className={`hidden lg:block absolute top-12 left-0 right-0 h-0.5 ${
              isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
            }`} />

            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative group"
              >
                <div className={`w-24 h-24 mx-auto rounded-3xl flex items-center justify-center mb-8 relative z-10 transition-all duration-500 group-hover:scale-110 ${
                  isDarkMode 
                    ? 'bg-gray-900 border-2 border-gray-700 group-hover:border-blue-500 shadow-[0_0_30px_-10px_rgba(59,130,246,0.3)]' 
                    : 'bg-white border-2 border-gray-200 group-hover:border-blue-500 shadow-xl'
                }`}>
                  <step.icon className={`w-10 h-10 transition-colors duration-500 ${
                    isDarkMode ? 'text-gray-400 group-hover:text-blue-400' : 'text-gray-500 group-hover:text-blue-600'
                  }`} />
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm border-4 border-gray-900">
                    {step.number}
                  </div>
                </div>
                
                <div className="text-center px-4">
                  <h3 className={`text-2xl font-bold mb-4 group-hover:text-blue-500 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {step.title}
                  </h3>
                  <p className={`leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className={`relative rounded-[3rem] overflow-hidden p-12 md:p-32 text-center group ${
            isDarkMode ? 'bg-gray-900' : 'bg-blue-900'
          }`}>
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-90 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay" />
            
            {/* Floating Shapes */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 blur-[100px] rounded-full animate-pulse" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-yellow-400 opacity-10 blur-[100px] rounded-full animate-pulse delay-700" />

            <div className="relative z-10">
              <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight">
                Ready to Scale?
              </h2>
              <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
                Join industry leaders who trust Telogica for their most critical infrastructure needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link to="/contact">
                  <button className="px-12 py-5 bg-white text-blue-900 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all duration-300">
                    Get a Quote
                  </button>
                </Link>
                <Link to="/products">
                  <button className="px-12 py-5 bg-transparent border-2 border-white/30 text-white rounded-2xl font-bold text-lg hover:bg-white/10 hover:border-white transition-all duration-300">
                    View Catalog
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Services;