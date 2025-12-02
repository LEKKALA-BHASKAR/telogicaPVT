import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  Shield,
  Radio,
  Factory,
  Users,
  ArrowRight,
  Play,
  Cpu,
  Satellite,
  Network,
  CheckCircle,
  Zap,
  Globe,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

const ScrollSnapPage = () => {
  const [activeSection, setActiveSection] = useState("defence");
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollPos = window.scrollY + 150;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute("id");

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navigateToRoute = (route) => {
    navigate(route);
  };

  const sections = [
    {
      id: "defence",
      title: "Defence Solutions",
      subtitle: "Mission-Critical Systems",
      description:
        "Advanced defence communication systems, electronic warfare solutions, and radar technology for national security. Trusted by India's defense forces.",
      features: ["Secure Communication", "Radar Systems", "Electronic Warfare", "Field-tested Reliability"],
      icon: Shield,
      bg: "bg-black",
      color: "text-orange-400",
      accent: "bg-orange-400",
      gradient: "from-orange-500 to-red-500",
      buttonBg: "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600",
      buttonText: "Defence Products",
      route: "/defence",
      stats: [
        { value: "15+", label: "Defense Projects" },
        { value: "100%", label: "Mission Success" },
      ],
      image:
        "https://images.unsplash.com/photo-1717749789408-f6f73c9e6aac?auto=format&fit=crop&q=80&w=1170",
    },
    {
      id: "telecom",
      title: "Telecommunication",
      subtitle: "Next-Gen Network Solutions",
      description:
        "Cutting-edge telecommunications infrastructure and network testing equipment for 5G and beyond. Power the future of connectivity.",
      features: ["5G Testing Equipment", "Network Analysis", "Field Maintenance Tools", "Fiber Optic Solutions"],
      icon: Radio,
      bg: "bg-black",
      color: "text-purple-400",
      accent: "bg-purple-400",
      gradient: "from-purple-500 to-blue-500",
      buttonBg: "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600",
      buttonText: "Telecom Solutions",
      route: "/telecom",
      stats: [
        { value: "500+", label: "Installations" },
        { value: "99.9%", label: "Uptime" },
      ],
      image:
        "https://media.istockphoto.com/id/1602617670/photo/satellite-dish-antenna-communication-technology-concept.jpg?s=612x612&w=0&k=20&c=XjMfP8m2WEykJGAcWOMAmIJI3MWvFBnxDdKXI6ufYVE=",
    },
    {
      id: "manufacturing",
      title: "Manufacturing",
      subtitle: "Precision Engineering",
      description:
        "State-of-the-art manufacturing facilities for high-precision electronic components and test equipment. Built to international quality standards.",
      features: ["Quality Manufacturing", "R&D Innovation", "Custom Solutions", "ISO Certified"],
      icon: Factory,
      bg: "bg-black",
      color: "text-emerald-400",
      accent: "bg-emerald-400",
      gradient: "from-emerald-500 to-teal-500",
      buttonBg: "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600",
      buttonText: "Manufacturing Capabilities",
      route: "/manufacturing",
      stats: [
        { value: "50+", label: "Product Lines" },
        { value: "24/7", label: "Operations" },
      ],
      image:
        "https://media.istockphoto.com/id/2155877725/photo/male-and-female-engineers-in-neat-work-clothes-prepare-and-control-the-production-system-of.jpg?s=612x612&w=0&k=20&c=6E6nQfie8dZIROGrqe9vO4ADz68Sw67LIjC_neaDg6Q=",
    },
  ];

  const expertiseStats = [
    {
      label: "Mission programs",
      value: "120+",
      detail: "Defense & telecom deployments",
      icon: Target,
    },
    {
      label: "Countries supported",
      value: "06",
      detail: "Multi-region rollouts",
      icon: Globe,
    },
    {
      label: "Engineers & SMEs",
      value: "80+",
      detail: "Across RF, EW, and manufacturing",
      icon: Users,
    },
  ];

  return (
    <div className={`flex flex-col lg:flex-row min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-black text-white' : 'bg-slate-50 text-gray-900'
    }`}>
      {/* Enhanced Sidebar */}
      <div className={`lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] lg:w-96 w-full z-20 flex items-center justify-center py-6 lg:py-0 border-b lg:border-b-0 lg:border-r transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-black/90 border-gray-800 backdrop-blur-xl' 
          : 'bg-white/90 border-gray-200 backdrop-blur-xl shadow-sm'
      }`}>
        <div className="w-full px-6">
          {/* Desktop intro card */}
          <div
            className={`hidden lg:flex flex-col gap-4 mb-10 rounded-3xl border p-6 ${
              isDarkMode ? 'border-white/10 bg-white/5' : 'border-gray-100 bg-white shadow'
            }`}
          >
            <p className="text-xs font-semibold tracking-[0.4em] text-blue-400 uppercase">
              Our Expertise
            </p>
            <h2 className="text-3xl font-black leading-snug">
              Integrated mission programs with accountable ownership.
            </h2>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-base leading-relaxed`}>
              We blend RF labs, secure manufacturing, and deployment squads so defence and telecom teams work
              with one disciplined partner.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {expertiseStats.map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <div
                    className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    <stat.icon className="w-4 h-4" />
                    {stat.label}
                  </div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>{stat.detail}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigateToRoute('/services')}
              className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold transition-colors ${
                isDarkMode ? 'bg-white text-black' : 'bg-gray-900 text-white'
              }`}
            >
              View capability deck <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile intro */}
          <div className="lg:hidden mb-6">
            <p className="text-xs font-semibold tracking-[0.3em] text-blue-400 uppercase mb-2">Our Expertise</p>
            <h2 className="text-2xl font-bold leading-tight mb-2">Disciplined programs for mission teams.</h2>
            <p className="text-sm text-gray-500">
              Scroll to explore how we support defence, telecom, and manufacturing leaders.
            </p>
          </div>

          <nav className="space-y-3 w-full overflow-x-auto flex lg:block gap-3 lg:gap-0">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`w-full text-left p-5 rounded-2xl transition-all duration-300 group flex-shrink-0 ${
                  activeSection === section.id
                    ? isDarkMode
                      ? "bg-white/10 border border-white/20 shadow-lg"
                      : "bg-white border border-gray-200 shadow-lg"
                    : isDarkMode
                      ? "hover:bg-white/5 border border-transparent"
                      : "hover:bg-gray-50 border border-transparent"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl transition-all duration-300 ${
                    activeSection === section.id
                      ? `bg-gradient-to-br ${section.gradient} shadow-lg`
                      : isDarkMode 
                        ? 'bg-white/10 group-hover:bg-white/20' 
                        : 'bg-gray-100 group-hover:bg-gray-200'
                  }`}>
                    <section.icon
                      className={`w-5 h-5 ${
                        activeSection === section.id
                          ? 'text-white'
                          : isDarkMode ? "text-gray-400 group-hover:text-white" : "text-gray-500 group-hover:text-gray-700"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <div
                      className={`font-semibold text-base lg:text-lg leading-tight ${
                        activeSection === section.id
                          ? section.color
                          : isDarkMode ? "text-gray-300 group-hover:text-white" : "text-gray-700 group-hover:text-gray-900"
                      }`}
                    >
                      {section.title}
                    </div>
                    <div className={`text-xs mt-1 tracking-wide ${
                      isDarkMode ? "text-gray-500" : "text-gray-500"
                    }`}>
                      {section.subtitle}
                    </div>
                  </div>
                  {activeSection === section.id && (
                    <motion.div 
                      layoutId="activeIndicator"
                      className={`w-1.5 h-8 rounded-full bg-gradient-to-b ${section.gradient}`}
                    />
                  )}
                </div>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className={`min-h-screen flex items-center justify-center relative overflow-hidden px-6 sm:px-8 lg:px-16 py-20 transition-colors duration-300 ${
              isDarkMode ? 'bg-black' : 'bg-white'
            }`}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, ${isDarkMode ? '#fff' : '#000'} 1px, transparent 0)`,
                  backgroundSize: "40px 40px",
                }}
              />
            </div>

            {/* Gradient Orb */}
            <div className={`absolute top-1/2 right-0 w-[600px] h-[600px] rounded-full blur-[150px] opacity-20 -translate-y-1/2 bg-gradient-to-br ${section.gradient}`} />

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Text Content */}
                <motion.div 
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="space-y-8"
                >
                  {/* Badge */}
                  <div className={`inline-flex items-center px-5 py-2.5 rounded-full border backdrop-blur-sm ${
                    isDarkMode 
                      ? 'bg-white/5 border-white/10' 
                      : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${section.accent} mr-3 animate-pulse`} />
                    <span className={`text-sm font-semibold ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {section.subtitle}
                    </span>
                  </div>

                  {/* Heading */}
                  <h2 className="text-4xl sm:text-5xl font-semibold leading-tight tracking-tight">
                    <span className={`text-transparent bg-clip-text bg-gradient-to-r ${section.gradient}`}>
                      {section.title}
                    </span>
                  </h2>

                  {/* Description */}
                  <p className={`text-lg leading-relaxed max-w-xl ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {section.description}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-3">
                    {section.features.map((feature, i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <CheckCircle className={`w-5 h-5 flex-shrink-0 ${section.color}`} />
                        <span className={`text-sm font-medium ${
                          isDarkMode ? 'text-gray-200' : 'text-gray-700'
                        }`}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Stats Row */}
                  <div className="flex gap-8 pt-4 flex-wrap">
                    {section.stats.map((stat, i) => (
                      <div key={i}>
                        <div className={`text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${section.gradient}`}>
                          {stat.value}
                        </div>
                        <div className={`text-xs font-semibold tracking-wide uppercase ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button
                      onClick={() => navigateToRoute(section.route)}
                      className={`inline-flex items-center justify-center px-10 py-5 ${section.buttonBg} text-white font-bold text-lg rounded-2xl transition-all duration-300 transform hover:-translate-y-1 shadow-xl hover:shadow-2xl`}
                    >
                      {section.buttonText}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </button>

                    <button
                      onClick={() => navigateToRoute("/contact")}
                      className={`inline-flex items-center justify-center px-10 py-5 font-bold text-lg rounded-2xl border-2 transition-all duration-300 hover:-translate-y-1 ${
                        isDarkMode 
                          ? 'border-white/20 text-white hover:bg-white/10' 
                          : 'border-gray-200 text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      Contact Sales
                    </button>
                  </div>
                </motion.div>

                {/* Image */}
                <motion.div 
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative"
                >
                  <div className={`absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br ${section.gradient} opacity-20 blur-2xl`} />
                  <div className="relative w-full h-[500px] rounded-[2rem] overflow-hidden shadow-2xl border border-white/10">
                    <img
                      src={section.image}
                      alt={section.title}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${isDarkMode ? 'from-black/40' : 'from-black/20'} to-transparent`} />
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default ScrollSnapPage;
