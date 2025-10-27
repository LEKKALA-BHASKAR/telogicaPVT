import React, { useState, useEffect, useRef } from "react";
import { ChevronRight, Shield, Radio, Factory, Users, ArrowRight, Play, Cpu, Satellite, Network, Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ScrollSnapPage = () => {
  const [activeSection, setActiveSection] = useState("about");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  // Strict scroll snap sections
  const sections = [
    {
      id: "about",
      title: "About Telogica",
      description: "Leading manufacturer of advanced Test & Measuring Equipment for Defence and Telecom sectors with 15+ years of excellence.",
      features: ["ISO 9001:2015 Certified", "50+ Successful Projects", "24/7 Technical Support"],
      icon: Users,
      bg: "bg-black",
      color: "text-pink-500",
      accent: "bg-pink-500",
      buttonBg: "bg-pink-500 hover:bg-pink-600",
      buttonText: "Our Story",
      route: "/about",
      image: "https://scontent.fcdp1-1.fna.fbcdn.net/v/t39.30808-6/454947021_825253096373273_2071655228525396527_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=VZsYBnhZWbEQ7kNvwHUXctN&_nc_oc=AdlFU0ypLkXz1Th7UL2rssIG_2YHA5dzc3Up8L3onVX0T44Vfvu1dyUwzIsy0Dcv9SB5LskDd_dKMSGJEVxYZJY-&_nc_zt=23&_nc_ht=scontent.fcdp1-1.fna&_nc_gid=2QGYrn6H2j63nsTNampbVw&oh=00_AfePAldZXxPo60rMIX_9-dOvoW2i6CCO4ygUr7pGwvAWqA&oe=69052E82"
    },
    {
      id: "defence",
      title: "Defence Solutions",
      description: "Advanced defence communication systems, electronic warfare solutions, and radar technology for national security.",
      features: ["Secure Communication", "Radar Systems", "Electronic Warfare"],
      icon: Shield,
      bg: "bg-black",
      color: "text-orange-400",
      accent: "bg-orange-400",
      buttonBg: "bg-orange-500 hover:bg-orange-600",
      buttonText: "Defence Products",
      route: "/defence",
      image: "https://images.unsplash.com/photo-1717749789408-f6f73c9e6aac?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
    },
    {
      id: "telecom",
      title: "Telecommunication",
      description: "Cutting-edge telecommunications infrastructure and network testing equipment for 5G and beyond.",
      features: ["5G Testing", "Network Analysis", "Field Maintenance"],
      icon: Radio,
      bg: "bg-black",
      color: "text-purple-400",
      accent: "bg-purple-400",
      buttonBg: "bg-purple-500 hover:bg-purple-600",
      buttonText: "Telecom Solutions",
      route: "/telecom",
      image: "https://media.istockphoto.com/id/1602617670/photo/satellite-dish-antenna-communication-technology-concept.jpg?s=612x612&w=0&k=20&c=XjMfP8m2WEykJGAcWOMAmIJI3MWvFBnxDdKXI6ufYVE="
    },
    {
      id: "manufacturing",
      title: "Manufacturing",
      description: "State-of-the-art manufacturing facilities for high-precision electronic components and test equipment.",
      features: ["Quality Manufacturing", "R&D Focus", "Custom Solutions"],
      icon: Factory,
      bg: "bg-black",
      color: "text-blue-400",
      accent: "bg-blue-400",
      buttonBg: "bg-blue-500 hover:bg-blue-600",
      buttonText: "Manufacturing Capabilities",
      route: "/manufacturing",
      image: "https://media.istockphoto.com/id/2155877725/photo/male-and-female-engineers-in-neat-work-clothes-prepare-and-control-the-production-system-of.jpg?s=612x612&w=0&k=20&c=6E6nQfie8dZIROGrqe9vO4ADz68Sw67LIjC_neaDg6Q="
    }
  ];

  // Enable strict scroll snapping and active section detection
useEffect(() => {
  const container = containerRef.current;
  if (!container) return;

  let ticking = false;

  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollTop = container.scrollTop;
        const sectionHeight = container.clientHeight;

        // Find the closest section based on scroll position
        const index = Math.round(scrollTop / sectionHeight);
        const visibleSection = sections[index];
        if (visibleSection && visibleSection.id !== activeSection) {
          setActiveSection(visibleSection.id);
        }

        ticking = false;
      });
      ticking = true;
    }
  };



const handleWheel = (e) => {
    if (isScrolling) return;

    e.preventDefault();
    setIsScrolling(true);
    const currentIndex = sections.findIndex(s => s.id === activeSection);
    let nextIndex = currentIndex;

    if (e.deltaY > 0) {
      nextIndex = Math.min(currentIndex + 1, sections.length - 1);
    } else {
      nextIndex = Math.max(currentIndex - 1, 0);
    }

    if (nextIndex !== currentIndex) {
      scrollToSection(sections[nextIndex].id);
    }

    clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 900);
  };

 const handleKeyDown = (e) => {
    if (isScrolling) return;

    const currentIndex = sections.findIndex(s => s.id === activeSection);
    let nextIndex = currentIndex;

    if (e.key === "ArrowDown" || e.key === "PageDown") {
      nextIndex = Math.min(currentIndex + 1, sections.length - 1);
    } else if (e.key === "ArrowUp" || e.key === "PageUp") {
      nextIndex = Math.max(currentIndex - 1, 0);
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = sections.length - 1;
    }

    if (nextIndex !== currentIndex) {
      e.preventDefault();
      setIsScrolling(true);
      scrollToSection(sections[nextIndex].id);

      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 900);
    }
  };

  

    // Add scroll event listener for active section detection
  container.addEventListener("scroll", handleScroll, { passive: true });
  container.addEventListener("wheel", handleWheel, { passive: false });
  window.addEventListener("keydown", handleKeyDown);


  return () => {
    container.removeEventListener("scroll", handleScroll);
    container.removeEventListener("wheel", handleWheel);
    window.removeEventListener("keydown", handleKeyDown);
    clearTimeout(scrollTimeoutRef.current);
  };
}, [activeSection, isScrolling]);


  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element && containerRef.current) {
      const container = containerRef.current;
      const elementTop = element.offsetTop;
      
      container.scrollTo({
        top: elementTop,
        behavior: 'smooth'
      });
      
      setActiveSection(id);
      setIsMobileMenuOpen(false);
    }
  };

  const navigateToRoute = (route) => {
    navigate(route);
  };


  return (
    <div className="flex min-h-screen bg-black overflow-hidden">
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
                  className={`w-full text-left p-3 rounded-xl transition-all duration-300 group ${
                    activeSection === section.id
                      ? "bg-gray-900 border border-gray-700"
                      : "hover:bg-gray-900 border border-transparent"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <section.icon className={`w-4 h-4 ${activeSection === section.id ? section.color : 'text-gray-500'}`} />
                    <div className="flex-1">
                      <div className={`font-semibold transition-colors ${
                        activeSection === section.id ? section.color : 'text-gray-300 group-hover:text-white'
                      }`}>
                        {section.title}
                      </div>
                    </div>
                    {activeSection === section.id && (
                      <div className={`w-2 h-2 rounded-full animate-pulse ${section.accent}`} />
                    )}
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop Sidebar - Now properly updates with scroll */}
      <div className="hidden lg:flex sticky top-0 h-screen w-80 bg-black shadow-lg flex-col p-8 border-r border-gray-800 z-30">
        <nav className="space-y-1 flex-1">
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
                </div>
                {activeSection === section.id && (
                  <div className={`w-2 h-2 rounded-full animate-pulse ${section.accent}`} />
                )}
              </div>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content with Strict Scroll Snap */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto lg:ml-0 snap-y snap-mandatory"
        style={{ 
          height: '90vh',
          scrollBehavior: 'smooth'
        }}
      >
        {sections.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            className={`h-screen w-full flex items-center justify-center ${section.bg} relative overflow-hidden pt-16 lg:pt-0 snap-start`}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, #ffffff 1px, transparent 1px),
                                radial-gradient(circle at 75% 75%, #ffffff 1px, transparent 1px)`,
                backgroundSize: '45px 45px',
                backgroundPosition: '0 0, 22px 23px'
              }} />
            </div>

            {/* Floating Icons */}
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



            {/* Mobile Scroll Indicator */}
            <div className="lg:hidden absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
              <div className="flex items-center gap-2">
                {sections.map((section, idx) => (
                  <div
                    key={section.id}
                    className={`w-2 h-2 rounded-full transition-all ${
                      activeSection === section.id ? section.accent : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center h-full">
                {/* Text Content - Left Side */}
                <div className="space-y-8 lg:space-y-12 flex flex-col justify-center h-full">
                  <div className="space-y-6">
                    <h1 className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight ${section.color}`}>
                      {section.title}
                    </h1>
                    
                    <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl">
                      {section.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-4">
                    {section.features.map((feature, i) => (
                      <div key={i} className="flex items-center space-x-4 group">
                        <div className={`w-3 h-3 rounded-full ${section.accent} group-hover:scale-125 transition-transform duration-300`} />
                        <span className="text-gray-300 text-lg group-hover:text-white transition-colors duration-300">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button
                      onClick={() => navigateToRoute(section.route)}
                      className={`inline-flex items-center justify-center px-8 py-4 ${section.buttonBg} text-white font-bold rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl text-base lg:text-lg`}
                    >
                      {section.buttonText}
                      <ArrowRight className="ml-3 w-5 h-5 lg:w-6 lg:h-6" />
                    </button>
                    
                    <button 
                      onClick={() => navigateToRoute('/contact')}
                      className="inline-flex items-center justify-center px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-xl border border-gray-700 transition-all duration-300 text-base lg:text-lg hover:border-gray-600"
                    >
                      Contact Sales
                    </button>
                  </div>
                </div>

                {/* Image - Right Side - Square Layout */}
                <div className="flex items-center justify-center h-full">
                  <div className="relative w-full max-w-2xl aspect-square rounded-3xl overflow-hidden shadow-2xl group">
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10`} />
                    
                    {/* Animated Border */}
                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${section.color.replace('text-', '')} opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500`} />
                    
                    <img
                      src={section.image}
                      alt={section.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Floating Stats */}
                    <div className="absolute bottom-6 left-6 right-6 z-20">
                      <div className="flex justify-between items-center">
                        <div className="text-center">
                          <div className={`text-2xl lg:text-3xl font-bold ${section.color}`}>15+</div>
                          <div className="text-gray-300 text-sm">Years Experience</div>
                        </div>
                        <div className="text-center">
                          <div className={`text-2xl lg:text-3xl font-bold ${section.color}`}>50+</div>
                          <div className="text-gray-300 text-sm">Projects</div>
                        </div>
                        <div className="text-center">
                          <div className={`text-2xl lg:text-3xl font-bold ${section.color}`}>24/7</div>
                          <div className="text-gray-300 text-sm">Support</div>
                        </div>
                      </div>
                    </div>

                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 z-10" />
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
        
        /* Force strict scroll snapping */
        .snap-y {
          scroll-snap-type: y mandatory;
        }
        .snap-start {
          scroll-snap-align: start;
        }
        
        /* Hide scrollbar for cleaner look */
        .overflow-y-auto::-webkit-scrollbar {
          display: none;
        }
        .overflow-y-auto {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default ScrollSnapPage;