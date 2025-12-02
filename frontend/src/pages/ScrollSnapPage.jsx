import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  Shield,
  Radio,
  Factory,
  Users,
  ArrowRight,
  Target,
  Globe,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";

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
        "Advanced defence communication systems, electronic warfare solutions, and radar technology for national security.",
      features: ["Secure Communication", "Radar Systems", "Electronic Warfare", "Field-tested Reliability"],
      icon: Shield,
      gradient: "from-orange-500 to-red-500",
      buttonText: "Explore Defence Products",
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
        "Cutting-edge telecommunications infrastructure and network testing equipment for 5G and beyond.",
      features: ["5G Testing", "Network Analysis", "Field Maintenance", "Fiber Optic Solutions"],
      icon: Radio,
      gradient: "from-purple-500 to-blue-500",
      buttonText: "View Telecom Solutions",
      route: "/telecom",
      stats: [
        { value: "500+", label: "Installations" },
        { value: "99.9%", label: "Uptime" },
      ],
      image:
        "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?auto=format&fit=crop&q=80&w=1170",
    },
    {
      id: "manufacturing",
      title: "Manufacturing",
      subtitle: "Precision Engineering",
      description:
        "State-of-the-art manufacturing facilities for high-precision electronic components and test equipment.",
      features: ["Quality Manufacturing", "R&D Innovation", "Custom Solutions", "ISO Certified"],
      icon: Factory,
      gradient: "from-emerald-500 to-teal-500",
      buttonText: "View Capabilities",
      route: "/manufacturing",
      stats: [
        { value: "50+", label: "Product Lines" },
        { value: "24/7", label: "Operations" },
      ],
      image:
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1170",
    },
  ];

  const expertiseStats = [
    {
      label: "Mission Programs",
      value: "120+",
      icon: Target,
    },
    {
      label: "Countries Supported",
      value: "06",
      icon: Globe,
    },
    {
      label: "Expert Engineers",
      value: "80+",
      icon: Users,
    },
  ];

  return (
    <div className={`flex flex-col lg:flex-row min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Sidebar Navigation */}
      <div className={`lg:sticky lg:top-0 lg:h-screen lg:w-80 w-full z-30 flex items-center justify-center py-8 lg:py-0 border-b lg:border-b-0 lg:border-r transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-black/95 border-gray-800' 
          : 'bg-white border-gray-200 shadow-sm'
      }`}>
        <div className="w-full px-6">
          {/* Company Intro */}
          <div className="mb-10">
            <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold mb-6 ${
              isDarkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-600'
            }`}>
              OUR EXPERTISE
            </div>
            <h2 className="text-2xl font-bold leading-tight mb-4">
              Integrated mission programs with accountable ownership.
            </h2>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              We blend RF labs, secure manufacturing, and deployment squads for defense and telecom teams.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {expertiseStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className={`text-2xl font-bold mb-1 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {stat.value}
                </div>
                <div className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                  activeSection === section.id
                    ? isDarkMode
                      ? "bg-white/10"
                      : "bg-gray-100"
                    : isDarkMode
                      ? "hover:bg-white/5"
                      : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    activeSection === section.id
                      ? `bg-gradient-to-br ${section.gradient}`
                      : isDarkMode 
                        ? 'bg-white/10' 
                        : 'bg-gray-200'
                  }`}>
                    <section.icon
                      className={`w-4 h-4 ${
                        activeSection === section.id
                          ? 'text-white'
                          : isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <div className={`font-semibold text-sm ${
                      activeSection === section.id
                        ? isDarkMode ? "text-white" : "text-gray-900"
                        : isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      {section.title}
                    </div>
                    <div className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
                      {section.subtitle}
                    </div>
                  </div>
                  {activeSection === section.id && (
                    <div className={`w-1 h-6 rounded-full bg-gradient-to-b ${section.gradient}`} />
                  )}
                </div>
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <button
            onClick={() => navigateToRoute('/services')}
            className={`w-full mt-8 py-3 rounded-lg font-medium transition-colors ${
              isDarkMode 
                ? 'bg-white text-black hover:bg-gray-200' 
                : 'bg-gray-900 text-white hover:bg-gray-800'
            }`}
          >
            View Full Capability Deck
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="min-h-screen flex items-center justify-center relative px-6 lg:px-12 py-16"
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 opacity-5 bg-gradient-to-br ${section.gradient}`} />

            {/* Content Grid */}
            <div className="relative z-10 max-w-6xl mx-auto w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Text Content */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  {/* Section Header */}
                  <div>
                    <div className={`text-sm font-semibold mb-2 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {section.subtitle}
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                      <span className={`text-transparent bg-clip-text bg-gradient-to-r ${section.gradient}`}>
                        {section.title}
                      </span>
                    </h2>
                  </div>

                  {/* Description */}
                  <p className={`text-lg leading-relaxed ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {section.description}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-4">
                    {section.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle className={`w-4 h-4 flex-shrink-0 ${
                          section.gradient === 'from-orange-500 to-red-500' ? 'text-orange-500' :
                          section.gradient === 'from-purple-500 to-blue-500' ? 'text-purple-500' :
                          'text-emerald-500'
                        }`} />
                        <span className={`text-sm font-medium ${
                          isDarkMode ? 'text-gray-200' : 'text-gray-700'
                        }`}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex gap-8 pt-4">
                    {section.stats.map((stat, i) => (
                      <div key={i}>
                        <div className={`text-3xl font-bold ${
                          section.gradient === 'from-orange-500 to-red-500' ? 'text-orange-500' :
                          section.gradient === 'from-purple-500 to-blue-500' ? 'text-purple-500' :
                          'text-emerald-500'
                        }`}>
                          {stat.value}
                        </div>
                        <div className={`text-xs font-medium uppercase tracking-wider ${
                          isDarkMode ? 'text-gray-500' : 'text-gray-500'
                        }`}>
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <button
                      onClick={() => navigateToRoute(section.route)}
                      className={`px-8 py-3 rounded-lg font-semibold text-white transition-all hover:scale-[1.02] bg-gradient-to-r ${section.gradient}`}
                    >
                      {section.buttonText}
                    </button>
                    <button
                      onClick={() => navigateToRoute("/contact")}
                      className={`px-8 py-3 rounded-lg font-semibold border transition-all hover:scale-[1.02] ${
                        isDarkMode 
                          ? 'border-gray-700 text-white hover:bg-white/5' 
                          : 'border-gray-300 text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      Contact Sales
                    </button>
                  </div>
                </motion.div>

                {/* Image */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="relative"
                >
                  <div className={`absolute -inset-4 rounded-3xl bg-gradient-to-br ${section.gradient} opacity-10 blur-xl`} />
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    <img
                      src={section.image}
                      alt={section.title}
                      className="w-full h-[400px] lg:h-[500px] object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${
                      isDarkMode ? 'from-black/30' : 'from-black/10'
                    } to-transparent`} />
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