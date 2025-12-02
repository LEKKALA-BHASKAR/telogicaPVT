import React, { useState, useEffect, useRef } from "react";
import { Handshake, CheckCircle, Calendar, Star, Quote, ArrowRight, MessageSquare, ChevronLeft, ChevronRight, Play, Pause, Users, Award, TrendingUp, Globe, Shield, Network, Target, Zap, Sparkles, ArrowUpRight, Layers, Cpu, Radio, Wifi, BarChart3, Clock, MapPin, Phone, Mail, Building2, Rocket } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTheme } from '../context/ThemeContext';
import { Link } from "react-router-dom";

// Import your logos (keeping the same imports)
import jioLogo from "../assets/jio.png";
import airtelLogo from "../assets/airtel.png";
import viLogo from "../assets/vi.png";
import tataLogo from "../assets/tata.png";
import railtelLogo from "../assets/railtel.png";
import BSNLLogo from "../assets/bsnl.png";
import ZTE from "../assets/yzPsezte.jpg";
import indicom from "../assets/YdaXetata-indicom.jpg";
import Bsnl from "../assets/xHSTsbsnl.jpg";
import BharathElectronicsLTD from "../assets/vj1CFbel.jpg";
import TYCO from "../assets/tyco-electronics.jpg";
import Airtel from "../assets/tW9Igairtel.jpg";
import BBC from "../assets/social-logo.png";
import GAILltd from "../assets/qsoNRgail-india.jpg";
import IDEA from "../assets/J82S6idea.jpg";
import MTC from "../assets/ITHPxmtc.jpg";
import Alcatel from "../assets/FPDAMalcatel.jpg";
import vodafone from "../assets/Ehr5zvodafone.jpg";
import Nokia from "../assets/CLAhWnokia-siemens.jpg";
import Aircel from "../assets/3J7Qqaircel.jpg";

const LOGO_MAP = {
  jio: jioLogo,
  airtel: airtelLogo,
  vi: viLogo,
  tata: tataLogo,
  railtel: railtelLogo,
  bsnl: BSNLLogo,
  zte: ZTE,
  indicom: indicom,
  bsnl: Bsnl,
  bharath: BharathElectronicsLTD,
  tyco: TYCO,
  airtel: Airtel,
  bbc: BBC,
  gail: GAILltd,
  idea: IDEA,
  mtc: MTC,
  alcatel: Alcatel,
  vodafone: vodafone,
  nokia: Nokia,
  aircel: Aircel,
};

const getLogoSrc = (key) => LOGO_MAP[key.toLowerCase()] || null;

// ========== ENHANCED DATA CONFIGURATION ==========
const DEFAULT_CLIENTS = [
  { name: "Reliance Jio", logoKey: "jio", partnershipYears: "8+ Years", category: "Telecom Giant" },
  { name: "Airtel", logoKey: "airtel", partnershipYears: "12+ Years", category: "Telecom Leader" },
  { name: "BSNL", logoKey: "bsnl", partnershipYears: "15+ Years", category: "Government Enterprise" },
  { name: "Vodafone Idea", logoKey: "vi", partnershipYears: "10+ Years", category: "Telecom Provider" },
  { name: "Tata Communications", logoKey: "tata", partnershipYears: "7+ Years", category: "Enterprise Solutions" },
  { name: "RailTel", logoKey: "railtel", partnershipYears: "6+ Years", category: "Infrastructure" },
  { name: "ZTE Corporation", logoKey: "zte", partnershipYears: "9+ Years", category: "Technology Partner" },
  { name: "Tata Indicom", logoKey: "indicom", partnershipYears: "11+ Years", category: "Telecom Services" },
  { name: "Bharat Electronics Ltd", logoKey: "bharath", partnershipYears: "14+ Years", category: "Defense & Aerospace" },
  { name: "Tyco Electronics", logoKey: "tyco", partnershipYears: "10+ Years", category: "Electronics" },
  { name: "BBC Networks", logoKey: "bbc", partnershipYears: "5+ Years", category: "Media Networks" },
  { name: "GAIL (India) Ltd", logoKey: "gail", partnershipYears: "13+ Years", category: "Energy Sector" },
  { name: "Idea Cellular", logoKey: "idea", partnershipYears: "9+ Years", category: "Telecom Services" },
  { name: "MTC Networks", logoKey: "mtc", partnershipYears: "8+ Years", category: "Network Solutions" },
  { name: "Alcatel-Lucent", logoKey: "alcatel", partnershipYears: "10+ Years", category: "Network Infrastructure" },
  { name: "Vodafone", logoKey: "vodafone", partnershipYears: "12+ Years", category: "Global Telecom" },
  { name: "Nokia Networks", logoKey: "nokia", partnershipYears: "16+ Years", category: "Technology Leader" },
  { name: "Aircel", logoKey: "aircel", partnershipYears: "9+ Years", category: "Telecom Services" },
];

const TESTIMONIALS = [
  {
    name: "Rajesh Kumar",
    position: "Chief Technology Officer",
    company: "Reliance Jio",
    companyLogoKey: "jio",
    content: "Telogica's precision instruments and test automation shortened our 5G validator cycles by half, accelerating our network deployment significantly.",
    rating: 5,
    project: "5G Network Deployment",
  },
  {
    name: "Priya Sharma",
    position: "Network Operations Director",
    company: "Airtel",
    companyLogoKey: "airtel",
    content: "The monitoring integrations provided by Telogica gave us unprecedented operational clarity, reducing customer-impacting incidents by 40%.",
    rating: 5,
    project: "Network Monitoring System",
  },
  {
    name: "Amit Patel",
    position: "Technical Head",
    company: "Vodafone Idea",
    companyLogoKey: "vi",
    content: "Outstanding domain knowledge and responsive support. Telogica's diagnostics are integral to our lifecycle management and network optimization.",
    rating: 5,
    project: "Network Optimization",
  },
  {
    name: "Sandeep Singh",
    position: "Infrastructure Lead",
    company: "BSNL",
    companyLogoKey: "bsnl",
    content: "Telogica's robust equipment helped us deploy reliable services in challenging terrains where other solutions failed to perform consistently.",
    rating: 4,
    project: "Rural Connectivity Project",
  },
];

const ENTERPRISE_STATS = [
  { number: "50+", label: "Enterprise Partners", icon: Building2, description: "Trusted by industry leaders" },
  { number: "200+", label: "Successful Projects", icon: Rocket, description: "Delivered on time and budget" },
  { number: "15+", label: "Years Excellence", icon: Award, description: "Proven track record" },
  { number: "99.2%", label: "Client Retention", icon: Shield, description: "Long-term partnerships" },
];

const SERVICES = [
  {
    icon: Network,
    title: "Network Infrastructure",
    description: "End-to-end solutions for robust telecommunications networks",
    features: ["5G Deployment", "Fiber Optics", "Wireless Systems"],
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Target,
    title: "Testing & Validation",
    description: "Comprehensive testing solutions for network reliability",
    features: ["Performance Testing", "Quality Assurance", "Compliance Validation"],
    color: "from-amber-500 to-orange-500"
  },
  {
    icon: TrendingUp,
    title: "Performance Optimization",
    description: "Maximize network efficiency and user experience",
    features: ["Network Analytics", "Capacity Planning", "Performance Monitoring"],
    color: "from-green-500 to-teal-500"
  }
];

// ========== ENHANCED ANIMATION VARIANTS ==========
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const slideInFromLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const slideInFromRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

// ========== ENHANCED COMPONENTS ==========
const ClientLogo = ({ client, index }) => {
  const logoSrc = getLogoSrc(client.logoKey);

  return (
    <div className="flex items-center justify-center mx-4 my-2">
      <div className="relative">
        <div className="w-24 h-12 flex items-center justify-center">
          {logoSrc ? (
            <img 
              src={logoSrc} 
              alt={`${client.name} logo`} 
              className="max-h-full max-w-full object-contain" 
              loading="lazy" 
            />
          ) : (
            <div className="text-gray-600 text-xs">Logo</div>
          )}
        </div>
      </div>
    </div>
  );
};

const ServiceCard = ({ service, index }) => {
  const { isDarkMode } = useTheme();
  const Icon = service.icon;
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      className="relative group h-full"
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Gradient Border Effect */}
      <div className={`absolute -inset-0.5 rounded-3xl bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-100 blur transition-opacity duration-500`} />
      
      <div className={`relative rounded-3xl p-8 h-full transition-all duration-500 overflow-hidden ${
        isDarkMode 
          ? 'bg-gray-900/90 backdrop-blur-xl border border-gray-800'
          : 'bg-white/90 backdrop-blur-xl border border-gray-100 shadow-lg'
      }`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, ${isDarkMode ? '#fff' : '#000'} 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }} />
        </div>
        
        <div className="relative z-10">
          {/* Icon */}
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg ${service.color}`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          
          {/* Title */}
          <h3 className={`text-2xl font-bold mb-3 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>{service.title}</h3>
          
          {/* Description */}
          <p className={`mb-6 leading-relaxed ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>{service.description}</p>
          
          {/* Features */}
          <ul className="space-y-3">
            {service.features.map((feature, idx) => (
              <li key={idx} className="flex items-center">
                <CheckCircle className={`w-5 h-5 mr-3 flex-shrink-0 ${
                  isDarkMode ? 'text-emerald-400' : 'text-emerald-500'
                }`} />
                <span className={`text-sm font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

const EnterpriseStatCard = ({ stat, index }) => {
  const { isDarkMode } = useTheme();
  const Icon = stat.icon;
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [count, setCount] = useState(0);

  const gradients = [
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-pink-500",
    "from-orange-500 to-red-500",
    "from-emerald-500 to-teal-500",
  ];

  useEffect(() => {
    if (inView) {
      const target = parseInt(stat.number.replace(/\D/g, ""));
      let start = 0;
      const duration = 2000;
      const startTime = Date.now();

      const animateCount = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(progress * target);
        setCount(current);
        if (progress < 1) requestAnimationFrame(animateCount);
      };
      requestAnimationFrame(animateCount);
    }
  }, [inView, stat.number]);

  return (
    <motion.div
      ref={ref}
      className="relative group"
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Gradient Border Effect */}
      <div className={`absolute -inset-0.5 rounded-3xl bg-gradient-to-r ${gradients[index]} opacity-0 group-hover:opacity-100 blur transition-opacity duration-500`} />
      
      <div className={`relative rounded-3xl p-8 text-center transition-all duration-500 h-full ${
        isDarkMode 
          ? 'bg-gray-900/90 backdrop-blur-xl border border-gray-800'
          : 'bg-white/90 backdrop-blur-xl border border-gray-100 shadow-lg'
      }`}>
        {/* Icon Container */}
        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 transition-all duration-500 group-hover:scale-110 bg-gradient-to-br ${gradients[index]} shadow-lg`}>
          <Icon className="w-10 h-10 text-white" />
        </div>
        
        {/* Number */}
        <div className={`text-5xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r ${gradients[index]}`}>
          {inView ? (stat.number.includes("%") ? `${count}%` : `${count}+`) : `0${stat.number.slice(-1)}`}
        </div>
        
        {/* Label */}
        <div className={`text-xl font-bold mb-2 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>{stat.label}</div>
        
        {/* Description */}
        <div className={`text-sm ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>{stat.description}</div>
      </div>
    </motion.div>
  );
};

const TestimonialSlide = ({ testimonial, isActive, direction }) => {
  const { isDarkMode } = useTheme();
  const CompanyLogoSrc = getLogoSrc(testimonial.companyLogoKey);

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col h-full">
        {/* Rating Stars */}
        <div className="flex gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-6 h-6 ${i < testimonial.rating ? "text-yellow-400 fill-current" : "text-gray-600"}`} />
          ))}
        </div>
        
        {/* Content */}
        <p className={`text-xl md:text-2xl leading-relaxed mb-8 font-medium ${
          isDarkMode ? 'text-gray-200' : 'text-gray-700'
        }`}>
          "{testimonial.content}"
        </p>
        
        {/* Author Info */}
        <div className="flex items-center gap-5 mt-auto">
          <div className={`w-16 h-16 rounded-2xl p-3 flex items-center justify-center border ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-700'
              : 'bg-gray-50 border-gray-200'
          }`}>
            {CompanyLogoSrc ? (
              <img src={CompanyLogoSrc} alt={`${testimonial.company} logo`} className="w-10 h-10 object-contain" />
            ) : (
              <Building2 className={`w-8 h-8 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
            )}
          </div>
          <div className="flex-1">
            <div className={`font-bold text-lg ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>{testimonial.name}</div>
            <div className={`text-sm ${
              isDarkMode ? 'text-blue-400' : 'text-blue-600'
            }`}>{testimonial.position}</div>
            <div className={`text-sm font-medium ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>{testimonial.company}</div>
          </div>
          <div className={`hidden sm:block px-4 py-2 rounded-full text-sm font-semibold ${
            isDarkMode 
              ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
              : 'bg-blue-50 text-blue-600 border border-blue-100'
          }`}>
            {testimonial.project}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ========== MAIN COMPONENT ==========
export default function EnterpriseClients({ clients: clientsProp = null, logosEndpoint = null, stats = ENTERPRISE_STATS }) {
  const { isDarkMode } = useTheme();
  const [clients, setClients] = useState(clientsProp || DEFAULT_CLIENTS);
  const [loadingClients, setLoadingClients] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [testimonialDirection, setTestimonialDirection] = useState(0);
  const [isTestimonialPaused, setIsTestimonialPaused] = useState(false);
  const firstRowRef = useRef(null);
  const secondRowRef = useRef(null);

  // Logo scroll effect for first row
  useEffect(() => {
    const scrollContainer = firstRowRef.current;
    if (!scrollContainer) return;

    let animationFrame;
    let scrollPosition = 0;

    const scroll = () => {
      scrollPosition += 0.5;
      if (scrollPosition >= scrollContainer.scrollWidth / 2) scrollPosition = 0;
      scrollContainer.scrollLeft = scrollPosition;
      animationFrame = requestAnimationFrame(scroll);
    };

    animationFrame = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // Logo scroll effect for second row (reverse direction)
  useEffect(() => {
    const scrollContainer = secondRowRef.current;
    if (!scrollContainer) return;

    let animationFrame;
    let scrollPosition = 0;

    const scroll = () => {
      scrollPosition -= 0.5;
      if (scrollPosition <= 0) scrollPosition = scrollContainer.scrollWidth / 2;
      scrollContainer.scrollLeft = scrollPosition;
      animationFrame = requestAnimationFrame(scroll);
    };

    animationFrame = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // Testimonial auto-play
  useEffect(() => {
    if (!isTestimonialPaused) {
      const timer = setInterval(() => {
        setTestimonialDirection(1);
        setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isTestimonialPaused]);

  const handleTestimonialChange = (index) => {
    setTestimonialDirection(index > activeTestimonial ? 1 : -1);
    setActiveTestimonial(index);
    setIsTestimonialPaused(true);
    
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsTestimonialPaused(false), 10000);
  };

  const displayClients = loadingClients ? DEFAULT_CLIENTS : clients;
  
  // Split clients into two rows
  const firstRowClients = displayClients.slice(0, Math.ceil(displayClients.length / 2));
  const secondRowClients = displayClients.slice(Math.ceil(displayClients.length / 2));
  
  // Duplicate clients for seamless scrolling
  const duplicatedFirstRow = [...firstRowClients, ...firstRowClients];
  const duplicatedSecondRow = [...secondRowClients, ...secondRowClients];

  return (
    <section className={`py-32 relative overflow-hidden transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-black text-white'
        : 'bg-white text-gray-900'
    }`}>
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[200px] ${
          isDarkMode ? 'bg-blue-600/20' : 'bg-blue-500/10'
        }`} />
        <div className={`absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full blur-[180px] ${
          isDarkMode ? 'bg-purple-600/15' : 'bg-purple-500/10'
        }`} />
        <div className={`absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full blur-[150px] ${
          isDarkMode ? 'bg-emerald-600/10' : 'bg-emerald-500/5'
        }`} />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `linear-gradient(${isDarkMode ? '#fff' : '#000'} 1px, transparent 1px), linear-gradient(90deg, ${isDarkMode ? '#fff' : '#000'} 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Trusted Partners Section - Logo Only in Two Rows with Marquee */}
      <section className="py-12 px-4 z-10 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className={`inline-flex items-center px-5 py-2.5 rounded-full mb-6 border backdrop-blur-sm ${
              isDarkMode 
                ? 'bg-white/5 border-white/10' 
                : 'bg-gray-50 border-gray-200'
            }`}>
              <Users className={`w-4 h-4 mr-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <span className={`text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Trusted Partners
              </span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>Trusted by </span>
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${
                isDarkMode 
                  ? 'from-blue-400 via-purple-400 to-pink-400' 
                  : 'from-blue-600 via-purple-600 to-pink-600'
              }`}>Visionary</span>
              <span className={isDarkMode ? 'text-white' : 'text-gray-900'}> Enterprises</span>
            </h2>
            
            <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Collaborating with industry pioneers to drive innovation and excellence in telecommunications
            </p>
          </motion.div>

          {/* First Row of Logos - Moving Right */}
          <div className="relative overflow-hidden mb-4">
            <div
              ref={firstRowRef}
              className="flex gap-4 py-2 overflow-x-hidden"
            >
              {duplicatedFirstRow.map((client, idx) => (
                <ClientLogo key={idx} client={client} index={idx} />
              ))}
            </div>
          </div>

          {/* Second Row of Logos - Moving Left */}
          <div className="relative overflow-hidden">
            <div
              ref={secondRowRef}
              className="flex gap-4 py-2 overflow-x-hidden"
            >
              {duplicatedSecondRow.map((client, idx) => (
                <ClientLogo key={idx} client={client} index={idx} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Stats */}
      <section className="py-20 px-4 z-10 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <EnterpriseStatCard key={index} stat={stat} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 z-10 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className={`inline-flex items-center px-5 py-2.5 rounded-full mb-6 border backdrop-blur-sm ${
              isDarkMode 
                ? 'bg-white/5 border-white/10' 
                : 'bg-gray-50 border-gray-200'
            }`}>
              <Zap className={`w-4 h-4 mr-2 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
              <span className={`text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                What We Offer
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>Enterprise </span>
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${
                isDarkMode 
                  ? 'from-emerald-400 via-teal-400 to-cyan-400' 
                  : 'from-emerald-500 via-teal-500 to-cyan-500'
              }`}>Solutions</span>
            </h2>
            
            <p className={`text-xl max-w-2xl mx-auto ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Comprehensive telecommunications solutions tailored for enterprise needs
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true }}
          >
            {SERVICES.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Compact Testimonials Section */}
      <section className="py-20 px-4 z-10 relative">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className={`inline-flex items-center px-5 py-2.5 rounded-full mb-6 border backdrop-blur-sm ${
              isDarkMode 
                ? 'bg-white/5 border-white/10' 
                : 'bg-gray-50 border-gray-200'
            }`}>
              <Star className={`w-4 h-4 mr-2 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-500'}`} />
              <span className={`text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Success Stories
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>Client </span>
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${
                isDarkMode 
                  ? 'from-yellow-400 via-orange-400 to-red-400' 
                  : 'from-yellow-500 via-orange-500 to-red-500'
              }`}>Success</span>
              <span className={isDarkMode ? 'text-white' : 'text-gray-900'}> Stories</span>
            </h2>
            
            <p className={`text-xl max-w-2xl mx-auto ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Hear from industry leaders about their experience partnering with us
            </p>
          </motion.div>

          <div className={`relative rounded-3xl p-10 border ${
            isDarkMode 
              ? 'bg-gray-900/80 backdrop-blur-xl border-gray-800'
              : 'bg-white/80 backdrop-blur-xl border-gray-100 shadow-xl'
          }`}>
            {/* Quote Icon */}
            <div className={`absolute top-8 right-8 ${isDarkMode ? 'text-gray-800' : 'text-gray-100'}`}>
              <Quote className="w-20 h-20" />
            </div>
            
            {/* Testimonial Slide */}
            <div className="min-h-[280px] mb-8">
              <AnimatePresence mode="wait" initial={false}>
                <TestimonialSlide
                  key={activeTestimonial}
                  testimonial={TESTIMONIALS[activeTestimonial]}
                  isActive={true}
                  direction={testimonialDirection}
                />
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                {TESTIMONIALS.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleTestimonialChange(index)}
                    className={`h-3 rounded-full transition-all duration-300 ${
                      activeTestimonial === index 
                        ? `${isDarkMode ? "bg-gradient-to-r from-blue-400 to-purple-400" : "bg-gradient-to-r from-blue-600 to-purple-600"} w-10` 
                        : `${isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-300 hover:bg-gray-400"} w-3`
                    }`}
                  />
                ))}
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => handleTestimonialChange((activeTestimonial - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                  className={`p-4 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 ${
                    isDarkMode 
                      ? 'bg-gray-800 border border-gray-700 hover:bg-gray-700 hover:border-gray-600'
                      : 'bg-gray-100 border border-gray-200 hover:bg-gray-200 shadow-sm'
                  }`}
                >
                  <ChevronLeft className={`w-5 h-5 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`} />
                </button>
                
                <button 
                  onClick={() => setIsTestimonialPaused(!isTestimonialPaused)}
                  className={`p-4 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 ${
                    isDarkMode 
                      ? 'bg-gray-800 border border-gray-700 hover:bg-gray-700 hover:border-gray-600'
                      : 'bg-gray-100 border border-gray-200 hover:bg-gray-200 shadow-sm'
                  }`}
                >
                  {isTestimonialPaused ? (
                    <Play className={`w-5 h-5 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`} />
                  ) : (
                    <Pause className={`w-5 h-5 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`} />
                  )}
                </button>
                
                <button 
                  onClick={() => handleTestimonialChange((activeTestimonial + 1) % TESTIMONIALS.length)}
                  className={`p-4 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 ${
                    isDarkMode 
                      ? 'bg-gray-800 border border-gray-700 hover:bg-gray-700 hover:border-gray-600'
                      : 'bg-gray-100 border border-gray-200 hover:bg-gray-200 shadow-sm'
                  }`}
                >
                  <ChevronRight className={`w-5 h-5 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`} />
                </button>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              to="/contact"
              className={`inline-flex items-center px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-2xl ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
              }`}
            >
              Become a Partner
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </section>
  );
}