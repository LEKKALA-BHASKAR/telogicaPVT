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
  Pause
} from "lucide-react";

// ========== LOGO COMPONENTS ==========
import jioLogo from "../assets/jio.png";
import airtelLogo from "../assets/airtel.png";
import viLogo from "../assets/vi.png";
import tataLogo from "../assets/tata.png";
import railtelLogo from "../assets/railtel.png";
import BSNLLogo from "../assets/bsnl.png";

const LogoComponents = {
  JioLogo: ({ className = "w-12 h-12" }) => (
    <img src={jioLogo} alt="Jio Logo" className={className} />
  ),
  AirtelLogo: ({ className = "w-12 h-12" }) => (
    <img src={airtelLogo} alt="Airtel Logo" className={className} />
  ),
  VILogo: ({ className = "w-12 h-12" }) => (
    <img src={viLogo} alt="VI Logo" className={className} />
  ),
  TataLogo: ({ className = "w-12 h-12" }) => (
    <img src={tataLogo} alt="Tata Logo" className={className} />
  ),
  RailTelLogo: ({ className = "w-12 h-12" }) => (
    <img src={railtelLogo} alt="RailTel Logo" className={className} />
  ),
  BSNLLogo: ({ className = "w-12 h-12" }) => (
    <img src={BSNLLogo} alt="BSNL Logo" className={className} />
  ),
};



// ========== DATA CONFIGURATION ==========
const DEFAULT_CLIENTS = [
  { 
    name: "Reliance Jio", 
    logoUrl: "../assets/jio.png",
    partnershipYears: "8+ Years",
    Logo: LogoComponents.JioLogo 
  },
  { 
    name: "Airtel", 
    logoUrl: "../assets/airtel.png",
    partnershipYears: "12+ Years",
    Logo: LogoComponents.AirtelLogo 
  },
  { 
    name: "BSNL", 
    logoUrl: "../assets/bsnl.png",
    partnershipYears: "15+ Years",
    Logo: LogoComponents.BSNLLogo
  },
  { 
    name: "Vodafone Idea", 
    logoUrl: "/images/clients/vi.png",
    partnershipYears: "10+ Years",
    Logo: LogoComponents.VILogo 
  },
  { 
    name: "Tata Communications", 
    logoUrl: "/images/clients/tata.png",
    partnershipYears: "7+ Years",
    Logo: LogoComponents.TataLogo 
  },
  { 
    name: "RailTel", 
    logoUrl: "/images/clients/railtel.png",
    partnershipYears: "6+ Years",
    Logo: LogoComponents.RailTelLogo 
  }
];

const TESTIMONIALS = [
  {
    name: "Rajesh Kumar",
    position: "CTO",
    company: "Reliance Jio",
    companyLogo: LogoComponents.JioLogo,
    avatarBg: "from-red-500 via-purple-500 to-blue-500",
    content: "Telogica's precision instruments and test automation shortened our 5G validator cycles by half. Their engineers proactively worked with our teams during rollout and tuning.",
    rating: 5
  },
  {
    name: "Priya Sharma",
    position: "Network Director",
    company: "Airtel",
    companyLogo: LogoComponents.AirtelLogo,
    avatarBg: "from-orange-500 via-red-500 to-pink-500",
    content: "Working with Telogica has dramatically improved our fault-detection SLAs. Their monitoring integrations gave us operational clarity and reduced customer-impacting incidents.",
    rating: 5
  },
  {
    name: "Amit Patel",
    position: "Technical Head",
    company: "Vodafone Idea",
    companyLogo: LogoComponents.VILogo,
    avatarBg: "from-purple-500 via-pink-500 to-red-500",
    content: "Outstanding domain knowledge and responsive support. Telogica's on-site calibration and remote diagnostics have become integral to our lifecycle management.",
    rating: 5
  }
];

const DEFAULT_STATS = [
  { 
    number: "50+", 
    label: "Telecom Partners", 
    icon: Handshake, 
    color: "from-red-500 to-orange-500" 
  },
  { 
    number: "200+", 
    label: "Projects Completed", 
    icon: CheckCircle, 
    color: "from-green-500 to-teal-500" 
  },
  { 
    number: "15+", 
    label: "Years Experience", 
    icon: Calendar, 
    color: "from-blue-500 to-purple-500" 
  },
  { 
    number: "99%", 
    label: "Client Satisfaction", 
    icon: Star, 
    color: "from-yellow-500 to-red-500" 
  }
];

// ========== COMPONENTS ==========
const ClientTile = ({ client }) => {
  const { name, logoUrl, partnershipYears, Logo } = client;
  const [imgError, setImgError] = useState(false);

  const handleImageError = () => {
    setImgError(true);
  };

  return (
    <div className="flex-none group transform hover:scale-105 transition-all duration-300">
      <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-2xl p-6 border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300 min-w-[160px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-2xl bg-black/20 p-2 flex items-center justify-center">
            {logoUrl && !imgError ? (
              <img
                src={logoUrl}
                alt={`${name} logo`}
                className="w-full h-full object-contain"
                onError={handleImageError}
                loading="lazy"
              />
            ) : (
              <Logo className="w-12 h-12" />
            )}
          </div>

          <div className="text-center">
            <div className="font-semibold text-white text-sm mb-1">{name}</div>
            <div className="text-xs text-gray-400 px-2 py-1 rounded-full">
              {partnershipYears}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TestimonialCard = ({ testimonial, isActive }) => {
  const CompanyLogo = testimonial.companyLogo;

  return (
    <article
      aria-hidden={!isActive}
      className={`absolute inset-0 transition-all duration-700 ${
        isActive ? "opacity-100 z-20" : "opacity-0 z-10 pointer-events-none"
      }`}
    >
      <div className="h-full bg-gradient-to-br from-white/5 to-white/10 rounded-3xl p-6 border border-white/10 backdrop-blur-sm flex gap-6">
        <div className="flex-none">
          <div className={`w-20 h-20 rounded-xl p-1 bg-gradient-to-r ${testimonial.avatarBg} flex items-center justify-center`}>
            <div className="w-full h-full bg-black/20 rounded-xl flex items-center justify-center">
              <CompanyLogo className="w-12 h-12" />
            </div>
          </div>
        </div>

        <div className="flex-1">
          <Quote className="w-6 h-6 text-purple-400 mb-3" />
          <p className="text-gray-200 italic mb-4">"{testimonial.content}"</p>
          <div>
            <div className="font-semibold text-white">{testimonial.name}</div>
            <div className="text-sm text-gray-400">
              {testimonial.position} — <span className="text-gray-300">{testimonial.company}</span>
            </div>
            <div className="flex mt-2">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

const StatCard = ({ stat }) => {
  const Icon = stat.icon;

  return (
    <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-2xl p-4 border border-white/10 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <div className="text-2xl font-bold text-white">{stat.number}</div>
          <div className="text-gray-400 text-sm">{stat.label}</div>
        </div>
      </div>
    </div>
  );
};

// ========== MAIN COMPONENT ==========
export default function Clients({ 
  clients: clientsProp = null, 
  logosEndpoint = null, 
  stats = DEFAULT_STATS 
}) {
  // ========== STATE MANAGEMENT ==========
  const [clients, setClients] = useState(clientsProp || DEFAULT_CLIENTS);
  const [loadingClients, setLoadingClients] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLogoScrollPaused, setIsLogoScrollPaused] = useState(false);
  
  // ========== REFS ==========
  const logoScrollRef = useRef(null);
  const timerRef = useRef(null);

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

  useEffect(() => {
    const scrollContainer = logoScrollRef.current;
    if (!scrollContainer || isLogoScrollPaused) return;

    let animationFrame;
    let scrollPosition = 0;

    const scroll = () => {
      scrollPosition += 0.5;
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }
      scrollContainer.scrollLeft = scrollPosition;
      animationFrame = requestAnimationFrame(scroll);
    };

    animationFrame = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrame);
  }, [isLogoScrollPaused, clients]);

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
      }, 4500);
    }
    return () => clearInterval(timerRef.current);
  }, [isPaused]);

  // ========== EVENT HANDLERS ==========
  const goPrev = () => {
    setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const goNext = () => {
    setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  // ========== RENDER LOGIC ==========
  const displayClients = loadingClients ? DEFAULT_CLIENTS : clients;
  const duplicatedClients = [...displayClients, ...displayClients];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/10 to-black text-white overflow-hidden relative">
      {/* Hero Section */}
      <section className="relative pt-28 pb-12 px-6">
        <div className="max-w-6xl mx-auto text-center z-10 relative">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            Trusted by{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-purple-400 to-blue-400">
              India's Telecom Leaders
            </span>
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Powering the nation's networks with reliable testing, calibration and support.
          </p>
        </div>
      </section>

      {/* Logo Scroller Section */}
      <section className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div
            ref={logoScrollRef}
            className="flex space-x-6 overflow-x-hidden py-6 cursor-grab active:cursor-grabbing"
            onMouseEnter={() => setIsLogoScrollPaused(true)}
            onMouseLeave={() => setIsLogoScrollPaused(false)}
          >
            {duplicatedClients.map((client, idx) => (
              <ClientTile key={idx} client={client} />
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 mt-4">
            <button
              onClick={() => setIsLogoScrollPaused((v) => !v)}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20 hover:bg-white/20 transition-all"
            >
              {isLogoScrollPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              <span className="text-sm">{isLogoScrollPaused ? "Play" : "Pause"} Scroll</span>
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatCard key={index} stat={stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        className="py-16 px-6"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Voices of Success</h2>
          <p className="text-gray-400 text-center mb-8">Hear directly from the leaders who trust Telogica</p>

          <div className="relative">
            <div className="relative h-64">
              {TESTIMONIALS.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  testimonial={testimonial}
                  isActive={index === activeTestimonial}
                />
              ))}
            </div>

            <div className="flex items-center justify-center gap-6 mt-6">
              <button 
                onClick={goPrev}
                className="p-3 bg-white/10 rounded-full border border-white/20 hover:bg-white/20 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex gap-2">
                {TESTIMONIALS.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeTestimonial === index 
                        ? "w-8 bg-gradient-to-r from-red-400 to-blue-400" 
                        : "bg-gray-600 hover:bg-gray-500"
                    }`}
                  />
                ))}
              </div>

              <button 
                onClick={goNext}
                className="p-3 bg-white/10 rounded-full border border-white/20 hover:bg-white/20 transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-3xl p-10 border border-white/10 backdrop-blur-sm">
            <h3 className="text-3xl font-bold mb-4">Join the Revolution</h3>
            <p className="text-gray-300 mb-6">
              Partner with Telogica for enterprise-grade testing and lifecycle support.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-red-500 to-blue-500 px-6 py-3 rounded-full font-bold text-white inline-flex items-center gap-2 hover:scale-105 transition-transform">
                Start Partnership <ArrowRight className="w-4 h-4" />
              </button>
              <button className="border border-white/20 px-6 py-3 rounded-full text-white inline-flex items-center gap-2 hover:border-white/40 transition-colors">
                <MessageSquare className="w-4 h-4" /> Contact Team
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}