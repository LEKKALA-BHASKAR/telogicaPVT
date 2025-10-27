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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

import jioLogo from "../assets/jio.png";
import airtelLogo from "../assets/airtel.png";
import viLogo from "../assets/vi.png";
import tataLogo from "../assets/tata.png";
import railtelLogo from "../assets/railtel.png";
import BSNLLogo from "../assets/bsnl.png";

const LOGO_MAP = {
  jio: jioLogo,
  airtel: airtelLogo,
  vi: viLogo,
  tata: tataLogo,
  railtel: railtelLogo,
  bsnl: BSNLLogo,
};

const getLogoSrc = (key) => LOGO_MAP[key.toLowerCase()] || null;

// ========== DATA CONFIGURATION ==========
const DEFAULT_CLIENTS = [
  {
    name: "Reliance Jio",
    logoKey: "jio",
    partnershipYears: "8+ Years",
  },
  {
    name: "Airtel",
    logoKey: "airtel",
    partnershipYears: "12+ Years",
  },
  {
    name: "BSNL",
    logoKey: "bsnl",
    partnershipYears: "15+ Years",
  },
  {
    name: "Vodafone Idea",
    logoKey: "vi",
    partnershipYears: "10+ Years",
  },
  {
    name: "Tata Communications",
    logoKey: "tata",
    partnershipYears: "7+ Years",
  },
  {
    name: "RailTel",
    logoKey: "railtel",
    partnershipYears: "6+ Years",
  },
];

const TESTIMONIALS = [
  {
    name: "Rajesh Kumar",
    position: "CTO",
    company: "Reliance Jio",
    companyLogoKey: "jio",
    avatarBg: "from-red-500 via-black-500 to-blue-500",
    content: "Telogica's precision instruments and test automation shortened our 5G validator cycles by half. Their engineers proactively worked with our teams during rollout and tuning, significantly boosting our operational efficiency and accelerating market delivery.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    position: "Network Director",
    company: "Airtel",
    companyLogoKey: "airtel",
    avatarBg: "from-orange-500 via-red-500 to-pink-500",
    content: "Working with Telogica has dramatically improved our fault-detection SLAs. Their monitoring integrations gave us operational clarity and reduced customer-impacting incidents, leading to higher network stability and customer satisfaction.",
    rating: 5,
  },
  {
    name: "Amit Patel",
    position: "Technical Head",
    company: "Vodafone Idea",
    companyLogoKey: "vi",
    avatarBg: "from-black-500 via-pink-500 to-red-500",
    content: "Outstanding domain knowledge and responsive support. Telogica's on-site calibration and remote diagnostics have become integral to our lifecycle management, ensuring peak performance and extended equipment longevity.",
    rating: 5,
  },
  {
    name: "Sandeep Singh",
    position: "Infrastructure Lead",
    company: "BSNL",
    companyLogoKey: "bsnl",
    avatarBg: "from-green-500 via-blue-500 to-teal-500",
    content: "Telogica's tailored solutions for rural network expansion were critical. Their robust equipment and expert consultation helped us deploy reliable services in challenging terrains, bridging connectivity gaps effectively.",
    rating: 4,
  },
];

const DEFAULT_STATS = [
  {
    number: "50+",
    label: "Telecom Partners",
    icon: Handshake,
    color: "from-red-500 to-orange-500",
  },
  {
    number: "200+",
    label: "Projects Completed",
    icon: CheckCircle,
    color: "from-green-500 to-teal-500",
  },
  {
    number: "15+",
    label: "Years Experience",
    icon: Calendar,
    color: "from-blue-500 to-black-500",
  },
  {
    number: "99%",
    label: "Client Satisfaction",
    icon: Star,
    color: "from-yellow-500 to-red-500",
  },
];

// ========== ANIMATION VARIANTS ==========
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const testimonialVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.8,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: (direction) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.5, ease: "easeIn" },
  }),
};

// ========== COMPONENTS ==========
const ClientTile = ({ client }) => {
  const logoSrc = getLogoSrc(client.logoKey);

  return (
    <motion.div
      className="flex-none group transform hover:scale-105 transition-all duration-300"
      variants={fadeIn}
    >
      <div className="bg-black-to-br from-white/5 to-white/10 rounded-2xl p-6 border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300 min-w-[160px] shadow-lg hover:shadow-black-500/30">
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-2xl bg-black/20 p-2 flex items-center justify-center border border-black-500/20">
            {logoSrc ? (
              <img
                src={logoSrc}
                alt={`${client.name} logo`}
                className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                loading="lazy"
              />
            ) : (
              <span className="text-gray-500 text-sm">Logo</span>
            )}
          </div>

          <div className="text-center">
            <div className="font-semibold text-white text-sm mb-1">{client.name}</div>
            <div className="text-xs bg-black-500/20 text-black-200 px-2 py-1 rounded-full inline-block">
              {client.partnershipYears}
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
      className="absolute inset-0 h-full bg-gradient-to-br from-white/5 to-white/10 rounded-3xl p-6 border border-white/10 backdrop-blur-sm flex flex-col md:flex-row gap-6 shadow-xl"
    >
      <div className="flex-none flex justify-center md:block">
        <div className={`w-24 h-24 rounded-2xl p-2 bg-gradient-to-r ${testimonial.avatarBg} flex items-center justify-center shadow-md`}>
          <div className="w-full h-full bg-black/30 rounded-xl flex items-center justify-center">
            {CompanyLogoSrc ? (
              <img src={CompanyLogoSrc} alt={`${testimonial.company} logo`} className="w-14 h-14 object-contain" />
            ) : (
              <span className="text-gray-500 text-sm">Logo</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 text-center md:text-left">
        <Quote className="w-7 h-7 text-black-400 mb-3 mx-auto md:mx-0" />
        <p className="text-gray-200 italic mb-4 leading-relaxed text-base">
          "{testimonial.content}"
        </p>
        <div>
          <div className="font-semibold text-white text-lg">{testimonial.name}</div>
          <div className="text-sm text-gray-400">
            {testimonial.position} — <span className="text-gray-300">{testimonial.company}</span>
          </div>
          <div className="flex justify-center md:justify-start mt-3">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <Star
                  className={`w-5 h-5 ${
                    i < testimonial.rating ? "text-yellow-400 fill-current" : "text-gray-600"
                  }`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
};

const StatCard = ({ stat }) => {
  const Icon = stat.icon;
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      const target = parseInt(stat.number.replace(/\D/g, ""));
      let start = 0;
      const duration = 2000; // 2 seconds
      const startTime = Date.now();

      const animateCount = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(progress * target);
        setCount(current);

        if (progress < 1) {
          requestAnimationFrame(animateCount);
        } else {
          setCount(target); // Ensure it reaches the final target
        }
      };
      requestAnimationFrame(animateCount);
    }
  }, [inView, stat.number]);

  return (
    <motion.div
      ref={ref}
      className="bg-gradient-to-br from-white/5 to-white/10 rounded-2xl p-4 border border-white/10 backdrop-blur-sm shadow-md hover:border-black-500/30 transition-all duration-300 group"
      variants={fadeIn}
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color} shadow-lg`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
        <div>
          <div className
            ="text-3xl font-extrabold text-white group-hover:text-black-300 transition-colors"
          >
            {inView ? (stat.number.includes("%") ? `${count}%` : `${count}${stat.number.slice(-1)}`) : `0${stat.number.slice(-1)}`}
          </div>
          <div className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
            {stat.label}
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
  const [testimonialDirection, setTestimonialDirection] = useState(0); // 0: initial, 1: next, -1: prev
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
      scrollPosition += 0.5; // Adjust scroll speed here
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        // Reset scroll when half of the duplicated content has passed
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
          setTestimonialDirection(1); // Moving to next
          return (prev + 1) % TESTIMONIALS.length;
        });
      }, 6000); // Change testimonial every 6 seconds
    }
    return () => clearInterval(testimonialTimerRef.current);
  }, [isTestimonialPaused]);

  // ========== EVENT HANDLERS ==========
  const handlePrevTestimonial = () => {
    setTestimonialDirection(-1); // Moving to previous
    setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    setIsTestimonialPaused(true); // Pause auto-play on manual interaction
  };

  const handleNextTestimonial = () => {
    setTestimonialDirection(1); // Moving to next
    setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    setIsTestimonialPaused(true); // Pause auto-play on manual interaction
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
    setIsTestimonialPaused(true); // Pause auto-play on manual interaction
  };

  // ========== RENDER LOGIC ==========
  const displayClients = loadingClients ? DEFAULT_CLIENTS : clients;
  // Duplicate clients for seamless infinite scroll
  const duplicatedClients = [...displayClients, ...displayClients];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-black-950 to-black text-white font-sans relative overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-black-500/10 blur-3xl opacity-30 animate-pulse-slow"></div>
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-3xl opacity-20 animate-pulse-fast"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 z-10">
        <div className="max-w-6xl mx-auto text-center relative">
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold mb-5 leading-tight tracking-tight"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Trusted by{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-black-400 to-blue-400">
              India's Telecom Leaders
            </span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            Powering the nation's networks with reliable testing, calibration, and support, ensuring seamless connectivity for millions.
          </motion.p>
        </div>
      </section>

      {/* Logo Scroller Section */}
      <section className="py-12 px-6 z-10 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            ref={logoScrollRef}
            className="flex flex-nowrap space-x-8 overflow-x-hidden py-6 cursor-grab active:cursor-grabbing [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]"
            onMouseEnter={() => setIsLogoScrollPaused(true)}
            onMouseLeave={() => setIsLogoScrollPaused(false)}
          >
            {duplicatedClients.map((client, idx) => (
              <ClientTile key={idx} client={client} />
            ))}
          </motion.div>

          <div className="flex justify-center items-center gap-4 mt-6">
            <motion.button
              onClick={() => setIsLogoScrollPaused((v) => !v)}
              className="flex items-center gap-2 px-5 py-2.5 bg-white/10 rounded-full border border-white/20 text-white hover:bg-white/20 transition-all duration-300 shadow-md hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLogoScrollPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
              <span className="text-base font-medium">{isLogoScrollPaused ? "Play" : "Pause"} Scroll</span>
            </motion.button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 z-10 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true, amount: 0.3 }}
          >
            {stats.map((stat, index) => (
              <StatCard key={index} stat={stat} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        className="py-20 px-6 z-10 relative"
        onMouseEnter={() => setIsTestimonialPaused(true)}
        onMouseLeave={() => setIsTestimonialPaused(false)}
      >
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="text-4xl font-extrabold text-center mb-4 leading-tight"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Voices of Success
          </motion.h2>
          <motion.p
            className="text-gray-400 text-center mb-12 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Hear directly from the industry leaders who have experienced the Telogica difference.
          </motion.p>

          <div className="relative">
            <div className="relative h-[400px] md:h-72 lg:h-64 flex items-center justify-center">
              <AnimatePresence initial={false} custom={testimonialDirection}>
                <TestimonialCard
                  testimonial={TESTIMONIALS[activeTestimonial]}
                  direction={testimonialDirection}
                />
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-center gap-6 mt-10">
              <motion.button
                onClick={handlePrevTestimonial}
                className="p-3 bg-white/10 rounded-full border border-white/20 text-white hover:bg-white/20 transition-all duration-300 shadow-md"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>

              <div className="flex gap-2">
                {TESTIMONIALS.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleTestimonialDotClick(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeTestimonial === index
                        ? "w-8 bg-gradient-to-r from-red-400 to-blue-400"
                        : "bg-gray-600 hover:bg-gray-500"
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>

              <motion.button
                onClick={handleNextTestimonial}
                className="p-3 bg-white/10 rounded-full border border-white/20 text-white hover:bg-white/20 transition-all duration-300 shadow-md"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 z-10 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="bg-gradient-to-br from-white/5 to-white/10 rounded-3xl p-10 border border-white/10 backdrop-blur-sm shadow-2xl"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h3 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-black-400 to-blue-400">
              Join the Revolution
            </h3>
            <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
              Partner with Telogica for enterprise-grade testing, calibration, and lifecycle support
              that drives innovation and ensures network excellence.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <motion.button
                className="bg-gradient-to-r from-red-500 to-blue-500 px-8 py-3.5 rounded-full font-bold text-white text-lg inline-flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                Start Partnership <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                className="border border-white/20 px-8 py-3.5 rounded-full text-white text-lg inline-flex items-center gap-2 hover:border-white/40 hover:bg-white/10 transition-colors duration-300 shadow-lg"
                whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageSquare className="w-5 h-5" /> Contact Team
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}