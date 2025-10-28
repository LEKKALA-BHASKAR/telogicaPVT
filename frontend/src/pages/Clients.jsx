import React, { useState, useEffect, useRef } from "react";
import { Handshake, CheckCircle, Calendar, Star, Quote, ArrowRight, MessageSquare, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
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
  { name: "Reliance Jio", logoKey: "jio", partnershipYears: "8+ Years", gradient: "from-red-500 to-pink-500" },
  { name: "Airtel", logoKey: "airtel", partnershipYears: "12+ Years", gradient: "from-orange-500 to-red-500" },
  { name: "BSNL", logoKey: "bsnl", partnershipYears: "15+ Years", gradient: "from-green-500 to-emerald-500" },
  { name: "Vodafone Idea", logoKey: "vi", partnershipYears: "10+ Years", gradient: "from-purple-500 to-indigo-500" },
  { name: "Tata Communications", logoKey: "tata", partnershipYears: "7+ Years", gradient: "from-blue-500 to-cyan-500" },
  { name: "RailTel", logoKey: "railtel", partnershipYears: "6+ Years", gradient: "from-yellow-500 to-orange-500" },
  { name: "ZTE Corporation", logoKey: "zte", partnershipYears: "9+ Years", gradient: "from-sky-500 to-blue-500" },
  { name: "Tata Indicom", logoKey: "indicom", partnershipYears: "11+ Years", gradient: "from-indigo-500 to-purple-500" },
  { name: "Bharat Electronics Ltd", logoKey: "bharath", partnershipYears: "14+ Years", gradient: "from-blue-500 to-sky-500" },
  { name: "Tyco Electronics", logoKey: "tyco", partnershipYears: "10+ Years", gradient: "from-amber-500 to-yellow-500" },
  { name: "BBC Networks", logoKey: "bbc", partnershipYears: "5+ Years", gradient: "from-neutral-600 to-gray-800" },
  { name: "GAIL (India) Ltd", logoKey: "gail", partnershipYears: "13+ Years", gradient: "from-lime-500 to-green-600" },
  { name: "Idea Cellular", logoKey: "idea", partnershipYears: "9+ Years", gradient: "from-yellow-400 to-orange-400" },
  { name: "MTC Networks", logoKey: "mtc", partnershipYears: "8+ Years", gradient: "from-teal-500 to-cyan-500" },
  { name: "Alcatel-Lucent", logoKey: "alcatel", partnershipYears: "10+ Years", gradient: "from-fuchsia-500 to-pink-500" },
  { name: "Vodafone", logoKey: "vodafone", partnershipYears: "12+ Years", gradient: "from-red-500 to-rose-500" },
  { name: "Nokia Networks", logoKey: "nokia", partnershipYears: "16+ Years", gradient: "from-blue-600 to-indigo-600" },
  { name: "Aircel", logoKey: "aircel", partnershipYears: "9+ Years", gradient: "from-cyan-500 to-blue-500" },
];

const TESTIMONIALS = [
  {
    name: "Rajesh Kumar",
    position: "CTO",
    company: "Reliance Jio",
    companyLogoKey: "jio",
    avatarBg: "from-red-500 via-purple-500 to-blue-500",
    content: "Telogica's precision instruments and test automation shortened our 5G validator cycles by half.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    position: "Network Director",
    company: "Airtel",
    companyLogoKey: "airtel",
    avatarBg: "from-orange-500 via-red-500 to-pink-500",
    content: "Telogica's monitoring integrations gave us operational clarity and reduced customer-impacting incidents.",
    rating: 5,
  },
  {
    name: "Amit Patel",
    position: "Technical Head",
    company: "Vodafone Idea",
    companyLogoKey: "vi",
    avatarBg: "from-purple-500 via-pink-500 to-red-500",
    content: "Outstanding domain knowledge and responsive support. Telogica's diagnostics are integral to our lifecycle management.",
    rating: 5,
  },
  {
    name: "Sandeep Singh",
    position: "Infrastructure Lead",
    company: "BSNL",
    companyLogoKey: "bsnl",
    avatarBg: "from-green-500 via-blue-500 to-teal-500",
    content: "Telogica's robust equipment helped us deploy reliable services in challenging terrains.",
    rating: 4,
  },
];

const DEFAULT_STATS = [
  { number: "50+", label: "Telecom Partners", icon: Handshake, color: "from-red-500 to-orange-500" },
  { number: "200+", label: "Projects Completed", icon: CheckCircle, color: "from-green-500 to-teal-500" },
  { number: "15+", label: "Years Experience", icon: Calendar, color: "from-blue-500 to-purple-500" },
  { number: "99%", label: "Client Satisfaction", icon: Star, color: "from-yellow-500 to-red-500" },
];

// ========== ANIMATION VARIANTS ==========
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const testimonialVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: (direction) => ({
    x: direction < 0 ? 200 : -200,
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.5, ease: "easeIn" },
  }),
};

// ========== COMPONENTS ==========
const ClientTile = ({ client, index }) => {
  const logoSrc = getLogoSrc(client.logoKey);

  return (
    <motion.div
      className="flex-none"
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
    >
      <div className="relative bg-gray-800/50 rounded-xl p-4 border border-gray-700/50 min-w-[150px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-lg bg-black/30 p-2 flex items-center justify-center">
            {logoSrc ? (
              <img src={logoSrc} alt={`${client.name} logo`} className="w-full h-full object-contain" loading="lazy" />
            ) : (
              <span className="text-gray-500 text-xs">Logo</span>
            )}
          </div>
          <div className="text-center space-y-1">
            <div className="font-semibold text-white text-sm">{client.name}</div>
            <div className={`text-xs bg-gradient-to-r ${client.gradient} text-white px-2 py-1 rounded-full`}>{client.partnershipYears}</div>
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
      className="absolute inset-0 h-full bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 flex flex-col lg:flex-row gap-6"
    >
      <div className="flex-none flex justify-center lg:block">
        <div className="relative w-20 h-20 rounded-lg bg-black/30 p-2 flex items-center justify-center">
          {CompanyLogoSrc ? (
            <img src={CompanyLogoSrc} alt={`${testimonial.company} logo`} className="w-12 h-12 object-contain" />
          ) : (
            <span className="text-gray-500 text-xs">Logo</span>
          )}
        </div>
        <div className="flex justify-center lg:justify-start mt-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < testimonial.rating ? "text-yellow-400 fill-current" : "text-gray-600"}`} />
          ))}
        </div>
      </div>
      <div className="flex-1 text-center lg:text-left">
        <Quote className="w-6 h-6 text-purple-400 mb-3 mx-auto lg:mx-0" />
        <p className="text-gray-200 italic text-sm leading-relaxed">{testimonial.content}</p>
        <div className="mt-4">
          <div className="font-semibold text-white text-base">{testimonial.name}</div>
          <div className="text-gray-400 text-sm">{testimonial.position} — <span className="text-gray-300">{testimonial.company}</span></div>
        </div>
      </div>
    </motion.article>
  );
};

const StatCard = ({ stat, index }) => {
  const Icon = stat.icon;
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      const target = parseInt(stat.number.replace(/\D/g, ""));
      let start = 0;
      const duration = 1500;
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
      className="relative bg-gray-800/50 rounded-xl p-4 border border-gray-700/50"
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="flex items-center gap-3">
        <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="space-y-1">
          <div className="text-2xl font-bold text-white">{inView ? (stat.number.includes("%") ? `${count}%` : `${count}+`) : `0${stat.number.slice(-1)}`}</div>
          <div className="text-gray-400 text-xs">{stat.label}</div>
        </div>
      </div>
    </motion.div>
  );
};

// ========== MAIN COMPONENT ==========
export default function Clients({ clients: clientsProp = null, logosEndpoint = null, stats = DEFAULT_STATS }) {
  const [clients, setClients] = useState(clientsProp || DEFAULT_CLIENTS);
  const [loadingClients, setLoadingClients] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [testimonialDirection, setTestimonialDirection] = useState(0);
  const [isTestimonialPaused, setIsTestimonialPaused] = useState(false);
  const [isLogoScrollPaused, setIsLogoScrollPaused] = useState(false);
  const logoScrollRef = useRef(null);

  // Fetch clients from endpoint if provided
  useEffect(() => {
    if (!logosEndpoint || clientsProp) return;
    const controller = new AbortController();
    setLoadingClients(true);
    (async () => {
      try {
        const res = await fetch(logosEndpoint, { signal: controller.signal });
        if (!res.ok) throw new Error("Failed to fetch client logos");
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) setClients(data);
      } catch (err) {
        console.error("Logo fetch error:", err);
      } finally {
        setLoadingClients(false);
      }
    })();
    return () => controller.abort();
  }, [logosEndpoint, clientsProp]);

  // Infinite logo scroller
  useEffect(() => {
    const scrollContainer = logoScrollRef.current;
    if (!scrollContainer || isLogoScrollPaused) return;

    let animationFrame;
    let scrollPosition = scrollContainer.scrollLeft;

    const scroll = () => {
      scrollPosition += 0.5; // Slower scroll for smoother effect
      if (scrollPosition >= scrollContainer.scrollWidth / 2) scrollPosition = 0;
      scrollContainer.scrollLeft = scrollPosition;
      animationFrame = requestAnimationFrame(scroll);
    };

    animationFrame = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrame);
  }, [isLogoScrollPaused, clients]);

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
    setTestimonialDirection(index > activeTestimonial ? 1 : index < activeTestimonial ? -1 : 0);
    setActiveTestimonial(index);
    setIsTestimonialPaused(true);
  };

  const displayClients = loadingClients ? DEFAULT_CLIENTS : clients;
  const duplicatedClients = [...displayClients, ...displayClients];

  return (
    <div className="min-h-screen bg-black text-white font-sans relative overflow-hidden">
      {/* Subtle Background Gradient */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-80" />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`, backgroundSize: "30px 30px" }} />
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-12 px-4 z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1 className="text-4xl md:text-5xl font-bold mb-4" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            Our <span className="text-purple-400">Trusted</span> Partners
          </motion.h1>
          <motion.p className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            Collaborating with India's telecommunications pioneers to build robust, future-ready networks.
          </motion.p>
        </div>
      </section>

      {/* Logo Scroller Section */}
      <section className="py-8 px-4 z-10 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" variants={staggerContainer} viewport={{ once: true }} className="mb-6 text-center">
            <motion.h2 className="text-2xl md:text-3xl font-semibold" variants={fadeInUp}>Trusted By</motion.h2>
          </motion.div>
          <motion.div
            ref={logoScrollRef}
            className="flex flex-nowrap space-x-4 overflow-x-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
            onMouseEnter={() => setIsLogoScrollPaused(true)}
            onMouseLeave={() => setIsLogoScrollPaused(false)}
          >
            {duplicatedClients.map((client, idx) => (
              <ClientTile key={idx} client={client} index={idx} />
            ))}
          </motion.div>
          <motion.div className="flex justify-center mt-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <button
              onClick={() => setIsLogoScrollPaused((v) => !v)}
              className="px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700/50 text-sm text-white hover:bg-gray-700/50"
            >
              {isLogoScrollPaused ? <Play className="w-4 h-4 inline mr-2" /> : <Pause className="w-4 h-4 inline mr-2" />}
              {isLogoScrollPaused ? "Play" : "Pause"}
            </button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 z-10 relative">
        <div className="max-w-5xl mx-auto">
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" initial="hidden" whileInView="visible" variants={staggerContainer} viewport={{ once: true }}>
            {stats.map((stat, index) => (
              <StatCard key={index} stat={stat} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 px-4 z-10 relative" onMouseEnter={() => setIsTestimonialPaused(true)} onMouseLeave={() => setIsTestimonialPaused(false)}>
        <div className="max-w-5xl mx-auto">
          <motion.div className="text-center mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-semibold mb-2">Client Testimonials</h2>
            <p className="text-sm text-gray-400 max-w-xl mx-auto">Discover why industry leaders choose Telogica.</p>
          </motion.div>
          <div className="relative h-[300px] lg:h-[240px]">
            <AnimatePresence initial={false} custom={testimonialDirection}>
              <TestimonialCard testimonial={TESTIMONIALS[activeTestimonial]} direction={testimonialDirection} />
            </AnimatePresence>
          </div>
          <div className="flex items-center justify-center gap-6 mt-6">
            <button onClick={handlePrevTestimonial} className="p-2 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:bg-gray-700/50">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleTestimonialDotClick(index)}
                  className={`w-2 h-2 rounded-full ${activeTestimonial === index ? "bg-purple-400 w-6" : "bg-gray-600"}`}
                />
              ))}
            </div>
            <button onClick={handleNextTestimonial} className="p-2 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:bg-gray-700/50">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 z-10 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700/50" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="text-2xl md:text-3xl font-semibold mb-4">Ready to Transform Your Network?</h3>
            <p className="text-sm text-gray-300 mb-6 max-w-xl mx-auto">Join India's leading telecommunications companies with Telogica.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-sm text-white font-medium hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600">
                Start Partnership <ArrowRight className="w-4 h-4 inline ml-2" />
              </button>
              <button className="px-6 py-3 bg-gray-800/50 rounded-lg border border-gray-700/50 text-sm text-white hover:bg-gray-700/50">
                <MessageSquare className="w-4 h-4 inline mr-2" /> Contact Team
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}