import React, { useState, useEffect } from "react";
import { ChevronRight, Shield, Radio, Factory, Users, ArrowRight, Play, Cpu, Satellite, Network, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ScrollSnapPage = () => {
  const [activeSection, setActiveSection] = useState("about");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPos = window.scrollY + 100;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const navigateToRoute = (route) => {
    navigate(route);
  };

  const sections = [
    {
      id: "about",
      title: "About Telogica",
      subtitle: "Technology Innovators Since 2008",
      description: "Leading manufacturer of advanced Test & Measuring Equipment for Defence and Telecom sectors with 15+ years of excellence.",
      features: ["ISO 9001:2015 Certified", "50+ Successful Projects", "24/7 Technical Support"],
      icon: Users,
      bg: "bg-black",
      color: "text-pink-500",
      accent: "bg-pink-500",
      buttonBg: "bg-pink-500 hover:bg-pink-600",
      buttonText: "Our Story",
      route: "/about",
      details: [
        "Established in 2008 as Aishwarya Technologies",
        "Renamed to Telogica Limited in 2023",
        "Specialized in RF and Microwave technology",
        "Serving defence and telecom sectors nationwide"
      ],
      image: "https://images.unsplash.com/photo-1516321310764-8d9b6f3b1f0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "defence",
      title: "Defence Solutions",
      subtitle: "Mission-Critical Systems",
      description: "Advanced defence communication systems, electronic warfare solutions, and radar technology for national security.",
      features: ["Secure Communication", "Radar Systems", "Electronic Warfare"],
      icon: Shield,
      bg: "bg-black",
      color: "text-orange-400",
      accent: "bg-orange-400",
      buttonBg: "bg-orange-500 hover:bg-orange-600",
      buttonText: "Defence Products",
      route: "/defence",
      details: [
        "Spectrum Analyzers for defence applications",
        "Network Analyzers up to 40GHz",
        "Cable Fault Locators for field operations",
        "Customized solutions for armed forces"
      ],
      image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "telecom",
      title: "Telecommunication",
      subtitle: "Next-Gen Network Solutions",
      description: "Cutting-edge telecommunications infrastructure and network testing equipment for 5G and beyond.",
      features: ["5G Testing", "Network Analysis", "Field Maintenance"],
      icon: Radio,
      bg: "bg-black",
      color: "text-purple-400",
      accent: "bg-purple-400",
      buttonBg: "bg-purple-500 hover:bg-purple-600",
      buttonText: "Telecom Solutions",
      route: "/telecom",
      details: [
        "RF and Microwave test equipment",
        "Optical fiber testing solutions",
        "Wireless communication testers",
        "Network performance monitoring"
      ],
      image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "manufacturing",
      title: "Manufacturing",
      subtitle: "Precision Engineering",
      description: "State-of-the-art manufacturing facilities for high-precision electronic components and test equipment.",
      features: ["Quality Manufacturing", "R&D Focus", "Custom Solutions"],
      icon: Factory,
      bg: "bg-black",
      color: "text-green-400",
      accent: "bg-green-400",
      buttonBg: "bg-green-500 hover:bg-green-600",
      buttonText: "Manufacturing Capabilities",
      route: "/manufacturing",
      details: [
        "In-house design and development",
        "Surface Mount Technology (SMT) line",
        "Environmental testing laboratory",
        "Quality assurance and calibration"
      ],
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="flex min-h-screen bg-black">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-800">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="text-white font-bold text-lg">Telogica</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-400 hover:text-white"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-95 backdrop-blur-sm">
          <div className="pt-20 px-6 pb-6">
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 group ${
                    activeSection === section.id
                      ? "bg-gray-900 border border-gray-700"
                      : "hover:bg-gray-900 border border-transparent"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <section.icon className={`w-5 h-5 ${activeSection === section.id ? section.color : 'text-gray-500'}`} />
                    <div className="flex-1">
                      <div className={`font-semibold transition-colors ${
                        activeSection === section.id ? section.color : 'text-gray-300 group-hover:text-white'
                      }`}>
                        {section.title}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {section.subtitle}
                      </div>
                    </div>
                    {activeSection === section.id && (
                      <div className={`w-2 h-2 rounded-full animate-pulse ${section.accent}`} />
                    )}
                  </div>
                </button>
              ))}
            </nav>
            
            {/* Mobile Contact Info */}
            <div className="mt-8 pt-6 border-t border-gray-800">
              <div className="text-gray-400 text-sm space-y-2">
                <div>+91 9396610682</div>
                <div>sales@telogica.com</div>
                <div>Hyderabad, India</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex sticky top-0 h-screen w-80 bg-black shadow-lg flex-col p-8 border-r border-gray-800">
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-white font-bold text-xl">Telogica</span>
          </div>
          <p className="text-gray-400 text-sm">Precision Engineering Solutions</p>
        </div>

        <nav className="space-y-2 flex-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`w-full text-left p-4 rounded-xl transition-all duration-300 group ${
                activeSection === section.id
                  ? "bg-gray-900 border border-gray-700"
                  : "hover:bg-gray-900 border border-transparent"
              }`}
            >
              <div className="flex items-center space-x-3">
                <section.icon className={`w-5 h-5 ${activeSection === section.id ? section.color : 'text-gray-500'}`} />
                <div className="flex-1">
                  <div className={`font-semibold transition-colors ${
                    activeSection === section.id ? section.color : 'text-gray-300 group-hover:text-white'
                  }`}>
                    {section.title}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {section.subtitle}
                  </div>
                </div>
                {activeSection === section.id && (
                  <div className={`w-2 h-2 rounded-full animate-pulse ${section.accent}`} />
                )}
              </div>
            </button>
          ))}
        </nav>

        {/* Contact Info */}
        <div className="pt-6 border-t border-gray-800">
          <div className="text-gray-400 text-sm space-y-2">
            <div>+91 9396610682</div>
            <div>sales@telogica.com</div>
            <div>Hyderabad, India</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto scroll-smooth lg:ml-0">
        {sections.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            className={`min-h-screen flex items-center justify-center ${section.bg} relative overflow-hidden pt-16 lg:pt-0`}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, #ffffff 1px, transparent 1px),
                                radial-gradient(circle at 75% 75%, #ffffff 1px, transparent 1px)`,
                backgroundSize: '50px 50px',
                backgroundPosition: '0 0, 25px 25px'
              }} />
            </div>

            {/* Floating Icons - Reduced on mobile */}
            <div className="absolute inset-0 overflow-hidden">
              {[Cpu, Satellite, Network, Play].map((Icon, i) => {
                const colors = ['text-pink-500/20', 'text-orange-500/20', 'text-purple-500/20', 'text-green-500/20'];
                return (
                  <Icon
                    key={i}
                    className={`absolute ${colors[i]} animate-float hidden sm:block`}
                    size={40}
                    style={{
                      top: `${20 + (i * 20) % 60}%`,
                      left: `${15 + (i * 25) % 70}%`,
                      animationDelay: `${i * 3}s`,
                      animationDuration: `${15 + i * 5}s`
                    }}
                  />
                );
              })}
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Text Content */}
                <div className="space-y-6 lg:space-y-8 order-2 lg:order-1">
                  <div>
                    <div className="inline-flex items-center px-3 py-1 lg:px-4 lg:py-2 rounded-full bg-gray-900 border border-gray-700 mb-4 lg:mb-6">
                      <div className={`w-2 h-2 rounded-full ${section.accent} mr-2 animate-pulse`} />
                      <span className="text-gray-300 text-xs lg:text-sm font-medium">{section.subtitle}</span>
                    </div>
                    
                    <h1 className={`text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 lg:mb-6 leading-tight ${section.color}`}>
                      {section.title}
                    </h1>
                    
                    <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-6 lg:mb-8 leading-relaxed">
                      {section.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 lg:space-y-4">
                    {section.features.map((feature, i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${section.accent}`} />
                        <span className="text-gray-300 text-sm lg:text-base">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 pt-4">
                    <button
                      onClick={() => navigateToRoute(section.route)}
                      className={`inline-flex items-center justify-center px-6 py-3 lg:px-8 lg:py-4 ${section.buttonBg} text-white font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg text-sm lg:text-base`}
                    >
                      {section.buttonText}
                      <ArrowRight className="ml-2 w-4 h-4 lg:w-5 lg:h-5" />
                    </button>
                    
                    <button 
                      onClick={() => navigateToRoute('/contact')}
                      className="inline-flex items-center justify-center px-6 py-3 lg:px-8 lg:py-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl border border-gray-700 transition-all duration-300 text-sm lg:text-base"
                    >
                      Contact Sales
                    </button>
                  </div>
                </div>

                {/* Image and Details Panel */}
                <div className="space-y-4 lg:space-y-6 order-1 lg:order-2">
                  {/* Image */}
                  <div className="relative w-full h-48 sm:h-64 lg:h-80 rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src={section.image}
                      alt={section.title}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Details Panel */}
                  <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-700 p-4 sm:p-6 lg:p-8 shadow-md">
                    <h3 className={`text-xl sm:text-2xl font-bold mb-4 lg:mb-6 ${section.color}`}>
                      Key Highlights
                    </h3>
                    <div className="space-y-3 lg:space-y-4">
                      {section.details.map((detail, i) => (
                        <div key={i} className="flex items-start space-x-3 group">
                          <ChevronRight className={`w-4 h-4 lg:w-5 lg:h-5 mt-0.5 ${section.color} group-hover:translate-x-1 transition-transform`} />
                          <p className="text-gray-300 leading-relaxed text-sm lg:text-base group-hover:text-white transition-colors">
                            {detail}
                          </p>
                        </div>
                      ))}
                    </div>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3 lg:gap-4 mt-6 lg:mt-8 pt-4 lg:pt-6 border-t border-gray-700">
                      <div className="text-center">
                        <div className={`text-xl lg:text-2xl font-bold ${section.color}`}>15+</div>
                        <div className="text-gray-400 text-xs lg:text-sm">Years Experience</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-xl lg:text-2xl font-bold ${section.color}`}>50+</div>
                        <div className="text-gray-400 text-xs lg:text-sm">Projects</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 20s infinite linear;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        /* Improved scroll behavior for mobile */
        @media (max-width: 1024px) {
          html {
            scroll-snap-type: y mandatory;
          }
          section {
            scroll-snap-align: start;
            scroll-snap-stop: always;
          }
        }
      `}</style>
    </div>
  );
};

export default ScrollSnapPage;