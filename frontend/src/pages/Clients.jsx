import React, { useState, useEffect, useRef } from "react";
import {
  Handshake,
  CheckCircle,
  Calendar,
  Star,
  Quote,
  ArrowRight,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Sparkles,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

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

// ========== DATA CONFIGURATION ==========
const DEFAULT_CLIENTS = [
  {
    name: "Reliance Jio",
    logoKey: "jio",
    partnershipYears: "8+ Years",
    gradient: "from-red-500 to-pink-500",
  },
  {
    name: "Airtel",
    logoKey: "airtel",
    partnershipYears: "12+ Years",
    gradient: "from-orange-500 to-red-500",
  },
  {
    name: "BSNL",
    logoKey: "bsnl",
    partnershipYears: "15+ Years",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    name: "Vodafone Idea",
    logoKey: "vi",
    partnershipYears: "10+ Years",
    gradient: "from-purple-500 to-indigo-500",
  },
  {
    name: "Tata Communications",
    logoKey: "tata",
    partnershipYears: "7+ Years",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    name: "RailTel",
    logoKey: "railtel",
    partnershipYears: "6+ Years",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    name: "ZTE Corporation",
    logoKey: "zte",
    partnershipYears: "9+ Years",
    gradient: "from-sky-500 to-blue-500",
  },
  {
    name: "Tata Indicom",
    logoKey: "indicom",
    partnershipYears: "11+ Years",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    name: "Bharat Electronics Ltd",
    logoKey: "bharath",
    partnershipYears: "14+ Years",
    gradient: "from-blue-500 to-sky-500",
  },
  {
    name: "Tyco Electronics",
    logoKey: "tyco",
    partnershipYears: "10+ Years",
    gradient: "from-amber-500 to-yellow-500",
  },
  {
    name: "BBC Networks",
    logoKey: "bbc",
    partnershipYears: "5+ Years",
    gradient: "from-neutral-600 to-gray-800",
  },
  {
    name: "GAIL (India) Ltd",
    logoKey: "gail",
    partnershipYears: "13+ Years",
    gradient: "from-lime-500 to-green-600",
  },
  {
    name: "Idea Cellular",
    logoKey: "idea",
    partnershipYears: "9+ Years",
    gradient: "from-yellow-400 to-orange-400",
  },
  {
    name: "MTC Networks",
    logoKey: "mtc",
    partnershipYears: "8+ Years",
    gradient: "from-teal-500 to-cyan-500",
  },
  {
    name: "Alcatel-Lucent",
    logoKey: "alcatel",
    partnershipYears: "10+ Years",
    gradient: "from-fuchsia-500 to-pink-500",
  },
  {
    name: "Vodafone",
    logoKey: "vodafone",
    partnershipYears: "12+ Years",
    gradient: "from-red-500 to-rose-500",
  },
  {
    name: "Nokia Networks",
    logoKey: "nokia",
    partnershipYears: "16+ Years",
    gradient: "from-blue-600 to-indigo-600",
  },
  {
    name: "Aircel",
    logoKey: "aircel",
    partnershipYears: "9+ Years",
    gradient: "from-cyan-500 to-blue-500",
  },
];


const TESTIMONIALS = [
  {
    name: "Rajesh Kumar",
    position: "CTO",
    company: "Reliance Jio",
    companyLogoKey: "jio",
    avatarBg: "from-red-500 via-purple-500 to-blue-500",
    content: "Telogica's precision instruments and test automation shortened our 5G validator cycles by half. Their engineers proactively worked with our teams during rollout and tuning, significantly boosting our operational efficiency.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    position: "Network Director",
    company: "Airtel",
    companyLogoKey: "airtel",
    avatarBg: "from-orange-500 via-red-500 to-pink-500",
    content: "Working with Telogica has dramatically improved our fault-detection SLAs. Their monitoring integrations gave us operational clarity and reduced customer-impacting incidents.",
    rating: 5,
  },
  {
    name: "Amit Patel",
    position: "Technical Head",
    company: "Vodafone Idea",
    companyLogoKey: "vi",
    avatarBg: "from-purple-500 via-pink-500 to-red-500",
    content: "Outstanding domain knowledge and responsive support. Telogica's on-site calibration and remote diagnostics have become integral to our lifecycle management.",
    rating: 5,
  },
  {
    name: "Sandeep Singh",
    position: "Infrastructure Lead",
    company: "BSNL",
    companyLogoKey: "bsnl",
    avatarBg: "from-green-500 via-blue-500 to-teal-500",
    content: "Telogica's tailored solutions for rural network expansion were critical. Their robust equipment helped us deploy reliable services in challenging terrains.",
    rating: 4,
  },
];

const DEFAULT_STATS = [
  {
    number: "50+",
    label: "Telecom Partners",
    icon: Handshake,
    color: "from-red-500 to-orange-500",
    bgGlow: "shadow-red-500/20",
  },
  {
    number: "200+",
    label: "Projects Completed",
    icon: CheckCircle,
    color: "from-green-500 to-teal-500",
    bgGlow: "shadow-green-500/20",
  },
  {
    number: "15+",
    label: "Years Experience",
    icon: Calendar,
    color: "from-blue-500 to-purple-500",
    bgGlow: "shadow-blue-500/20",
  },
  {
    number: "99%",
    label: "Client Satisfaction",
    icon: Star,
    color: "from-yellow-500 to-red-500",
    bgGlow: "shadow-yellow-500/20",
  },
];

// ========== ANIMATION VARIANTS ==========
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    } 
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      duration: 0.6, 
      ease: "easeOut" 
    } 
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const testimonialVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
    rotateY: direction > 0 ? 10 : -10,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: { 
      duration: 0.7, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    },
  },
  exit: (direction) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
    rotateY: direction < 0 ? -10 : 10,
    transition: { 
      duration: 0.7, 
      ease: "easeIn" 
    },
  }),
};

// ========== COMPONENTS ==========
const ClientTile = ({ client, index }) => {
  const logoSrc = getLogoSrc(client.logoKey);

  return (
    <motion.div
      className="flex-none group"
      variants={fadeInUp}
      whileHover={{ 
        scale: 1.05,
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className="relative">
        {/* Gradient Glow Effect */}
        <div className={`absolute inset-0 bg-gradient-to-r ${client.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500`} />
        
        <div className="relative bg-gradient-to-br from-white/5 to-white/10 rounded-3xl p-6 border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all duration-500 min-w-[180px] group-hover:shadow-2xl group-hover:shadow-purple-500/10">
          <div className="flex flex-col items-center gap-5">
            {/* Logo Container with Animated Border */}
            <div className="relative">
              <div className={`absolute inset-0 bg-gradient-to-r ${client.gradient} rounded-2xl blur-md opacity-0 group-hover:opacity-50 transition-all duration-500`} />
              <div className="relative w-20 h-20 rounded-2xl bg-black/30 p-3 flex items-center justify-center border border-white/10 group-hover:border-white/30 transition-all duration-500">
                {logoSrc ? (
                  <motion.img
                    src={logoSrc}
                    alt={`${client.name} logo`}
                    className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                    loading="lazy"
                    whileHover={{ scale: 1.1 }}
                  />
                ) : (
                  <span className="text-gray-500 text-sm">Logo</span>
                )}
              </div>
            </div>

            <div className="text-center space-y-2">
              <motion.div 
                className="font-bold text-white text-base"
                whileHover={{ color: "#60a5fa" }}
              >
                {client.name}
              </motion.div>
              <motion.div 
                className={`text-xs bg-gradient-to-r ${client.gradient} text-white px-3 py-1.5 rounded-full font-medium inline-block shadow-lg`}
                whileHover={{ scale: 1.05 }}
              >
                {client.partnershipYears}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const TestimonialCard = ({ testimonial, direction }) => {
  const CompanyLogoSrc = getLogoSrc(testimonial.companyLogoKey);

  return (
    <motion.article
      key={testimonial.name}
      custom={direction}
      variants={testimonialVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="absolute inset-0 h-full bg-gradient-to-br from-white/5 to-white/10 rounded-3xl p-8 border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col lg:flex-row gap-8"
    >
      {/* Left Side - Avatar & Info */}
      <div className="flex-none flex justify-center lg:block">
        <div className="relative">
          {/* Animated Gradient Border */}
          <div className={`absolute -inset-1 bg-gradient-to-r ${testimonial.avatarBg} rounded-3xl blur opacity-75 animate-pulse`} />
          <div className="relative w-28 h-28 rounded-2xl p-2 bg-gradient-to-r from-black/80 to-black/60 flex items-center justify-center">
            <div className="w-full h-full rounded-xl flex items-center justify-center">
              {CompanyLogoSrc ? (
                <motion.img 
                  src={CompanyLogoSrc} 
                  alt={`${testimonial.company} logo`} 
                  className="w-16 h-16 object-contain"
                  whileHover={{ scale: 1.1 }}
                />
              ) : (
                <span className="text-gray-500 text-sm">Logo</span>
              )}
            </div>
          </div>
        </div>
        
        {/* Rating Stars */}
        <motion.div 
          className="flex justify-center lg:justify-start mt-4"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              <Star
                className={`w-5 h-5 ${
                  i < testimonial.rating ? "text-yellow-400 fill-current" : "text-gray-600"
                }`}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Right Side - Content */}
      <div className="flex-1 text-center lg:text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Quote className="w-8 h-8 text-purple-400 mb-4 mx-auto lg:mx-0" />
          <p className="text-gray-200 italic mb-6 leading-relaxed text-lg font-light">
            "{testimonial.content}"
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="font-bold text-white text-xl">{testimonial.name}</div>
          <div className="text-gray-400 text-base">
            {testimonial.position} — <span className="text-gray-300 font-semibold">{testimonial.company}</span>
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
};

const StatCard = ({ stat, index }) => {
  const Icon = stat.icon;
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [count, setCount] = useState(0);

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

        if (progress < 1) {
          requestAnimationFrame(animateCount);
        } else {
          setCount(target);
        }
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
      whileHover={{ 
        y: -10,
        transition: { duration: 0.3 }
      }}
    >
      {/* Hover Glow Effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500 ${stat.bgGlow}`} />
      
      <div className="relative bg-gradient-to-br from-white/5 to-white/10 rounded-3xl p-6 border border-white/10 backdrop-blur-xl group-hover:border-white/20 transition-all duration-500 shadow-lg group-hover:shadow-2xl">
        <div className="flex items-center gap-5">
          {/* Icon with Gradient Background */}
          <motion.div 
            className={`p-4 rounded-2xl bg-gradient-to-r ${stat.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}
            whileHover={{ rotate: 5 }}
          >
            <Icon className="w-8 h-8 text-white" />
          </motion.div>
          
          <div className="space-y-2">
            <motion.div 
              className="text-4xl font-black text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-500"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {inView ? (stat.number.includes("%") ? `${count}%` : `${count}+`) : `0${stat.number.slice(-1)}`}
            </motion.div>
            <div className="text-gray-400 text-sm font-medium group-hover:text-gray-300 transition-colors duration-300">
              {stat.label}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ========== MAIN COMPONENT ==========
export default function Clients({
  clients: clientsProp = null,
  logosEndpoint = null,
  stats = DEFAULT_STATS,
}) {
  // ========== STATE MANAGEMENT ==========
  const [clients, setClients] = useState(clientsProp || DEFAULT_CLIENTS);
  const [loadingClients, setLoadingClients] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [testimonialDirection, setTestimonialDirection] = useState(0);
  const [isTestimonialPaused, setIsTestimonialPaused] = useState(false);
  const [isLogoScrollPaused, setIsLogoScrollPaused] = useState(false);

  // ========== REFS ==========
  const logoScrollRef = useRef(null);
  const testimonialTimerRef = useRef(null);

  // ========== EFFECTS ==========
  useEffect(() => {
    if (!logosEndpoint || clientsProp) return;

    const controller = new AbortController();
    setLoadingClients(true);

    (async () => {
      try {
        const res = await fetch(logosEndpoint, { signal: controller.signal });
        if (!res.ok) throw new Error("Failed to fetch client logos");
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setClients(data);
        }
      } catch (err) {
        console.error("Logo fetch error:", err);
      } finally {
        setLoadingClients(false);
      }
    })();

    return () => controller.abort();
  }, [logosEndpoint, clientsProp]);

  // Infinite logo scroller effect
  useEffect(() => {
    const scrollContainer = logoScrollRef.current;
    if (!scrollContainer || isLogoScrollPaused) return;

    let animationFrame;
    let scrollPosition = scrollContainer.scrollLeft;

    const scroll = () => {
      scrollPosition += 0.8;
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }
      scrollContainer.scrollLeft = scrollPosition;
      animationFrame = requestAnimationFrame(scroll);
    };

    animationFrame = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrame);
  }, [isLogoScrollPaused, clients]);

  // Testimonial auto-play effect
  useEffect(() => {
    if (!isTestimonialPaused) {
      testimonialTimerRef.current = setInterval(() => {
        setActiveTestimonial((prev) => {
          setTestimonialDirection(1);
          return (prev + 1) % TESTIMONIALS.length;
        });
      }, 6000);
    }
    return () => clearInterval(testimonialTimerRef.current);
  }, [isTestimonialPaused]);

  // ========== EVENT HANDLERS ==========
  const handlePrevTestimonial = () => {
    setTestimonialDirection(-1);
    setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    setIsTestimonialPaused(true);
  };

  const handleNextTestimonial = () => {
    setTestimonialDirection(1);
    setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    setIsTestimonialPaused(true);
  };

  const handleTestimonialDotClick = (index) => {
    if (index > activeTestimonial) {
      setTestimonialDirection(1);
    } else if (index < activeTestimonial) {
      setTestimonialDirection(-1);
    } else {
      setTestimonialDirection(0);
    }
    setActiveTestimonial(index);
    setIsTestimonialPaused(true);
  };

  // ========== RENDER LOGIC ==========
  const displayClients = loadingClients ? DEFAULT_CLIENTS : clients;
  const duplicatedClients = [...displayClients, ...displayClients];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white font-sans relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px),
                             linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 z-10">
        <div className="max-w-6xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-gray-300">Trusted by Industry Leaders</span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-purple-400 to-blue-400 animate-gradient">Proud</span> Partners
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            Collaborating with India's telecommunications pioneers to build robust, 
            future-ready networks that connect millions every day.
          </motion.p>
        </div>
      </section>

      {/* Logo Scroller Section */}
      <section className="py-16 px-6 z-10 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-4"
              variants={fadeInUp}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                Trusted By
              </span>
            </motion.h2>
            <motion.p 
              className="text-gray-400 text-lg max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              Leading telecommunications companies rely on our expertise
            </motion.p>
          </motion.div>

          <motion.div
            ref={logoScrollRef}
            className="flex flex-nowrap space-x-8 overflow-x-hidden py-8 cursor-grab active:cursor-grabbing [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
            onMouseEnter={() => setIsLogoScrollPaused(true)}
            onMouseLeave={() => setIsLogoScrollPaused(false)}
          >
            {duplicatedClients.map((client, idx) => (
              <ClientTile key={idx} client={client} index={idx} />
            ))}
          </motion.div>

          <motion.div 
            className="flex justify-center items-center gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={() => setIsLogoScrollPaused((v) => !v)}
              className="flex items-center gap-3 px-6 py-3 bg-white/5 rounded-2xl border border-white/10 text-white hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLogoScrollPaused ? (
                <Play className="w-5 h-5" />
              ) : (
                <Pause className="w-5 h-5" />
              )}
              <span className="text-base font-medium">
                {isLogoScrollPaused ? "Play" : "Pause"} Scroll
              </span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 z-10 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true, amount: 0.3 }}
          >
            {stats.map((stat, index) => (
              <StatCard key={index} stat={stat} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        className="py-24 px-6 z-10 relative"
        onMouseEnter={() => setIsTestimonialPaused(true)}
        onMouseLeave={() => setIsTestimonialPaused(false)}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-gray-300">Client Testimonials</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                Voices of Excellence
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Discover why industry leaders choose Telogica as their trusted technology partner
            </p>
          </motion.div>

          <div className="relative">
            <div className="relative h-[500px] lg:h-[400px] flex items-center justify-center">
              <AnimatePresence initial={false} custom={testimonialDirection}>
                <TestimonialCard
                  testimonial={TESTIMONIALS[activeTestimonial]}
                  direction={testimonialDirection}
                />
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-center gap-8 mt-12">
              <motion.button
                onClick={handlePrevTestimonial}
                className="p-4 bg-white/5 rounded-2xl border border-white/10 text-white hover:bg-white/10 transition-all duration-300 shadow-lg backdrop-blur-sm"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>

              <div className="flex gap-3">
                {TESTIMONIALS.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleTestimonialDotClick(index)}
                    className={`relative rounded-full transition-all duration-500 ${
                      activeTestimonial === index
                        ? "w-12 bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/30"
                        : "w-3 bg-gray-600 hover:bg-gray-500"
                    } h-3`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {activeTestimonial === index && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-white/20"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>

              <motion.button
                onClick={handleNextTestimonial}
                className="p-4 bg-white/5 rounded-2xl border border-white/10 text-white hover:bg-white/10 transition-all duration-300 shadow-lg backdrop-blur-sm"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 z-10 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Background Glow */}
            <div className="absolute -inset-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-4xl blur-3xl opacity-50" />
            
            <div className="relative bg-gradient-to-br from-white/5 to-white/10 rounded-4xl p-12 border border-white/10 backdrop-blur-2xl shadow-2xl">
              <motion.h3
                className="text-4xl md:text-5xl font-black mb-6"
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-red-400">
                  Ready to Transform Your Network?
                </span>
              </motion.h3>
              
              <motion.p
                className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed font-light"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Join India's leading telecommunications companies and experience 
                the Telogica advantage in network testing and optimization.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <motion.button
                  className="group relative bg-gradient-to-r from-purple-500 to-pink-500 px-10 py-4 rounded-2xl font-bold text-white text-lg inline-flex items-center gap-3 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden"
                  whileHover={{ 
                    scale: 1.05,
                    background: "linear-gradient(45deg, #8B5CF6, #EC4899, #8B5CF6)",
                    backgroundSize: "200% 200%"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Start Partnership 
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.button>
                
                <motion.button
                  className="group border border-white/20 px-10 py-4 rounded-2xl text-white text-lg inline-flex items-center gap-3 hover:border-white/40 hover:bg-white/10 transition-all duration-300 shadow-lg backdrop-blur-sm"
                  whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.4)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MessageSquare className="w-5 h-5" /> 
                  <span>Contact Team</span>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}