import React, { useState, useEffect, useRef } from "react";
import {
  Users,
  Award,
  CheckCircle,
  Handshake,
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

// Logo Components with Rainbow Colors
function JioLogo({ className = "w-12 h-12" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <defs>
        <linearGradient id="jioGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B6B" />
          <stop offset="25%" stopColor="#4ECDC4" />
          <stop offset="50%" stopColor="#45B7D1" />
          <stop offset="75%" stopColor="#96CEB4" />
          <stop offset="100%" stopColor="#FFEAA7" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="8" fill="url(#jioGradient)" />
      <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fontWeight="800" fill="#000" fontSize="8">JIO</text>
    </svg>
  );
}

function AirtelLogo({ className = "w-12 h-12" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <defs>
        <linearGradient id="airtelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF9A8B" />
          <stop offset="50%" stopColor="#FF6B6B" />
          <stop offset="100%" stopColor="#FF8E53" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="8" fill="url(#airtelGradient)" />
      <path d="M7 12h10M7 9h6M7 15h8" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function BSNLLogo({ className = "w-12 h-12" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <defs>
        <linearGradient id="bsnlGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A8E6CF" />
          <stop offset="50%" stopColor="#3ED598" />
          <stop offset="100%" stopColor="#00B894" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="8" fill="url(#bsnlGradient)" />
      <circle cx="8" cy="9" r="1.5" fill="#000" />
      <circle cx="16" cy="15" r="1.5" fill="#000" />
      <path d="M8 11c3 2 5 3 8 4" stroke="#000" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function VILogo({ className = "w-12 h-12" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <defs>
        <linearGradient id="viGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4A5FF" />
          <stop offset="50%" stopColor="#9D4EDD" />
          <stop offset="100%" stopColor="#7B2CBF" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="8" fill="url(#viGradient)" />
      <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fontWeight="800" fill="#fff" fontSize="9">VI</text>
    </svg>
  );
}

function TataLogo({ className = "w-12 h-12" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <defs>
        <linearGradient id="tataGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#74B9FF" />
          <stop offset="50%" stopColor="#0984E3" />
          <stop offset="100%" stopColor="#0062CC" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="8" fill="url(#tataGradient)" />
      <path d="M7 8l5 8 5-8" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RailTelLogo({ className = "w-12 h-12" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <defs>
        <linearGradient id="railtelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFB74D" />
          <stop offset="50%" stopColor="#FF9800" />
          <stop offset="100%" stopColor="#F57C00" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="8" fill="url(#railtelGradient)" />
      <path d="M7 12h10M7 9h10M7 15h6" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Additional telecom clients for longer scroll
const telecomClients = [
  { name: "Reliance Jio", Logo: JioLogo, partnershipYears: "8+ Years" },
  { name: "Airtel", Logo: AirtelLogo, partnershipYears: "12+ Years" },
  { name: "BSNL", Logo: BSNLLogo, partnershipYears: "15+ Years" },
  { name: "Vodafone Idea", Logo: VILogo, partnershipYears: "10+ Years" },
  { name: "Tata Communications", Logo: TataLogo, partnershipYears: "7+ Years" },
  { name: "RailTel", Logo: RailTelLogo, partnershipYears: "6+ Years" },
  { name: "MTNL", Logo: AirtelLogo, partnershipYears: "11+ Years" },
  { name: "Bharti Airtel Business", Logo: AirtelLogo, partnershipYears: "9+ Years" },
];

const testimonials = [
  {
    name: "Rajesh Kumar",
    position: "CTO",
    company: "Reliance Jio",
    companyLogo: JioLogo,
    avatarBg: "from-red-500 via-purple-500 to-blue-500",
    content: "Telogica's precision instruments and test automation shortened our 5G validator cycles by half. Their engineers proactively worked with our teams during rollout and tuning.",
    rating: 5
  },
  {
    name: "Priya Sharma",
    position: "Network Director",
    company: "Airtel",
    companyLogo: AirtelLogo,
    avatarBg: "from-orange-500 via-red-500 to-pink-500",
    content: "Working with Telogica has dramatically improved our fault-detection SLAs. Their monitoring integrations gave us operational clarity and reduced customer-impacting incidents.",
    rating: 5
  },
  {
    name: "Amit Patel",
    position: "Technical Head",
    company: "Vodafone Idea",
    companyLogo: VILogo,
    avatarBg: "from-purple-500 via-pink-500 to-red-500",
    content: "Outstanding domain knowledge and responsive support. Telogica's on-site calibration and remote diagnostics have become integral to our lifecycle management.",
    rating: 5
  }
];

const stats = [
  { number: "50+", label: "Telecom Partners", icon: Handshake, color: "from-red-500 to-orange-500" },
  { number: "200+", label: "Projects Completed", icon: CheckCircle, color: "from-green-500 to-teal-500" },
  { number: "15+", label: "Years Experience", icon: Calendar, color: "from-blue-500 to-purple-500" },
  { number: "99%", label: "Client Satisfaction", icon: Star, color: "from-yellow-500 to-red-500" }
];

export default function Clients() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLogoScrollPaused, setIsLogoScrollPaused] = useState(false);
  const logoScrollRef = useRef(null);
  const timerRef = useRef(null);

  // Auto-scrolling logos effect
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
  }, [isLogoScrollPaused]);

  // Testimonial auto-advance
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 4000);
    }
    return () => clearInterval(timerRef.current);
  }, [isPaused]);

  const goPrev = () => setActiveTestimonial((p) => (p - 1 + testimonials.length) % testimonials.length);
  const goNext = () => setActiveTestimonial((p) => (p + 1) % testimonials.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-purple-500/10 to-blue-500/10 animate-pulse"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-red-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 z-10">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-red-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
              India's Telecom Giants
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Powering the nation's digital infrastructure with cutting-edge testing solutions and unparalleled reliability
          </p>
        </div>
      </section>

      {/* Animated Logo Scroller */}
      <section className="relative py-12 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <div 
            ref={logoScrollRef}
            className="flex space-x-8 overflow-x-hidden py-8 cursor-grab active:cursor-grabbing"
            onMouseEnter={() => setIsLogoScrollPaused(true)}
            onMouseLeave={() => setIsLogoScrollPaused(false)}
          >
            {/* Double the array for seamless loop */}
            {[...telecomClients, ...telecomClients].map((client, idx) => {
              const Logo = client.Logo;
              return (
                <div
                  key={idx}
                  className="flex-none group transform hover:scale-110 transition-all duration-300"
                >
                  <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-2xl p-6 border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300">
                    <div className="flex flex-col items-center gap-4 min-w-[140px]">
                      <Logo className="w-16 h-16 transform group-hover:rotate-12 transition-transform duration-300" />
                      <div className="text-center">
                        <div className="font-semibold text-white text-sm mb-1">{client.name}</div>
                        <div className="text-xs text-gray-400 bg-gradient-to-r from-red-400/50 to-blue-400/50 px-2 py-1 rounded-full">
                          {client.partnershipYears}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Scroll Controls */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={() => setIsLogoScrollPaused(!isLogoScrollPaused)}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20 hover:bg-white/20 transition-all"
            >
              {isLogoScrollPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              <span className="text-sm">{isLogoScrollPaused ? "Play" : "Pause"} Scroll</span>
            </button>
          </div>
        </div>
      </section>

      {/* Rainbow Stats */}
      <section className="py-16 px-6 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={idx}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" 
                       style={{background: `linear-gradient(45deg, ${stat.color})`}}>
                  </div>
                  <div className="relative bg-gradient-to-br from-white/5 to-white/10 rounded-2xl p-6 border border-white/10 backdrop-blur-sm group-hover:scale-105 transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                          {stat.number}
                        </div>
                        <div className="text-gray-400 text-sm">{stat.label}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials */}
      <section 
        className="py-20 px-6 z-10"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-red-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Voices of Success
            </span>
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Hear from industry leaders who trust Telogica for their critical infrastructure needs
          </p>

          <div className="relative">
            {/* Testimonial Cards */}
            <div className="relative h-80">
              {testimonials.map((testimonial, idx) => {
                const CompanyLogo = testimonial.companyLogo;
                const isActive = idx === activeTestimonial;
                return (
                  <div
                    key={idx}
                    className={`absolute inset-0 transition-all duration-700 ease-out ${
                      isActive
                        ? "opacity-100 scale-100 translate-x-0 z-20"
                        : idx < activeTestimonial
                        ? "opacity-0 -translate-x-10 scale-95 z-10"
                        : "opacity-0 translate-x-10 scale-95 z-10"
                    }`}
                  >
                    <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-3xl p-8 border border-white/10 backdrop-blur-sm h-full">
                      <div className="flex flex-col md:flex-row gap-8 h-full">
                        {/* Left Side - Logo & Info */}
                        <div className="flex flex-col items-center md:items-start space-y-6">
                          <div className={`w-24 h-24 rounded-2xl bg-gradient-to-r ${testimonial.avatarBg} p-1`}>
                            <div className="w-full h-full bg-black/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                              <CompanyLogo className="w-12 h-12" />
                            </div>
                          </div>
                          <div className="text-center md:text-left">
                            <div className="font-bold text-white text-lg">{testimonial.name}</div>
                            <div className="text-gray-400 text-sm">{testimonial.position}</div>
                            <div className="text-gray-300 font-semibold">{testimonial.company}</div>
                            <div className="flex justify-center md:justify-start mt-2">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Right Side - Content */}
                        <div className="flex-1 flex flex-col justify-center">
                          <Quote className="w-8 h-8 text-purple-400 mb-4" />
                          <p className="text-gray-200 text-lg leading-relaxed italic">
                            "{testimonial.content}"
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-center gap-6 mt-8">
              <button
                onClick={goPrev}
                className="p-3 bg-white/10 rounded-full border border-white/20 hover:bg-white/20 transition-all hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <div className="flex gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTestimonial(idx)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeTestimonial === idx 
                        ? "bg-gradient-to-r from-red-400 to-blue-400 w-8" 
                        : "bg-gray-600 hover:bg-gray-500"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={goNext}
                className="p-3 bg-white/10 rounded-full border border-white/20 hover:bg-white/20 transition-all hover:scale-110"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Rainbow CTA */}
      <section className="py-20 px-6 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 rounded-3xl blur-xl opacity-30 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-white/5 to-white/10 rounded-3xl p-12 border border-white/10 backdrop-blur-sm">
              <h3 className="text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-red-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Join the Revolution
                </span>
              </h3>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Partner with Telogica and experience the future of telecommunications testing and infrastructure solutions
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group relative bg-gradient-to-r from-red-500 to-blue-500 px-8 py-4 rounded-full font-bold text-white overflow-hidden transition-all hover:scale-105 hover:shadow-2xl">
                  <span className="relative z-10 flex items-center gap-2">
                    Start Partnership
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                
                <button className="group border border-white/20 px-8 py-4 rounded-full font-bold text-white hover:border-white/40 transition-all hover:scale-105">
                  <span className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Contact Team
                  </span>
                </button>
              </div>
            </div>
          </div>
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