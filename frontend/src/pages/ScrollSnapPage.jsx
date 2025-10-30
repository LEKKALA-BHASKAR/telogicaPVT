import React, { useState, useEffect, useRef } from "react";
import { ChevronRight, Shield, Radio, Factory, Users, ArrowRight, Play, Cpu, Satellite, Network } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ScrollSnapPage = () => {
  const [activeSection, setActiveSection] = useState("defence");
  const [mobileActiveSection, setMobileActiveSection] = useState("defence");
  const navigate = useNavigate();
  const mobileContentRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.content-section');
      const scrollPos = window.scrollY + 200;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('data-section');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const section = document.querySelector(`[data-section="${id}"]`);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navigateToRoute = (route) => {
    navigate(route);
  };

  const sections = [
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
      image: "https://images.unsplash.com/photo-1717749789408-f6f73c9e6aac?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
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
      image: "https://media.istockphoto.com/id/1602617670/photo/satellite-dish-antenna-communication-technology-concept.jpg?s=612x612&w=0&k=20&c=XjMfP8m2WEykJGAcWOMAmIJI3MWvFBnxDdKXI6ufYVE="
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
      image: "https://media.istockphoto.com/id/2155877725/photo/male-and-female-engineers-in-neat-work-clothes-prepare-and-control-the-production-system-of.jpg?s=612x612&w=0&k=20&c=6E6nQfie8dZIROGrqe9vO4ADz68Sw67LIjC_neaDg6Q="
    }
  ];

  return (
    <div className="flex min-h-screen bg-black">
      {/* Desktop Version - Unchanged */}
      <div className="hidden md:flex">
        {/* Sticky Sidebar */}
        <div className="sticky top-0 h-screen w-80 flex items-center justify-center overflow-hidden">
          <nav className="space-y-3 w-full px-6">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-300 group ${
                  activeSection === section.id
                    ? "bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-indigo-700/30 shadow-md"
                    : "hover:bg-gray-900/40 border border-transparent"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <section.icon
                    className={`w-5 h-5 ${
                      activeSection === section.id
                        ? section.color
                        : "text-gray-500 group-hover:text-gray-300"
                    }`}
                  />
                  <div className="flex-1">
                    <div
                      className={`font-semibold transition-colors ${
                        activeSection === section.id
                          ? section.color
                          : "text-gray-300 group-hover:text-white"
                      }`}
                    >
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
        </div>

        {/* Main Content Area with Sticky Image */}
        <div className="flex-1 flex">
          {/* Scrollable Content (Reduced space) */}
          <div className="flex-1 overflow-y-auto scroll-smooth px-4 py-16">
            {sections.map((section, index) => (
              <div
                key={section.id}
                data-section={section.id}
                className="content-section min-h-screen flex items-center justify-center mb-8 last:mb-0"
              >
                <div className="max-w-lg mx-auto">
                  <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gray-900 border border-gray-700 mb-4">
                    <div className={`w-2 h-2 rounded-full ${section.accent} mr-2 animate-pulse`} />
                    <span className="text-gray-300 text-sm font-medium">{section.subtitle}</span>
                  </div>
                  
                  <h1 className={`text-4xl lg:text-5xl font-bold mb-4 leading-tight ${section.color}`}>
                    {section.title}
                  </h1>
                  
                  <p className="text-lg text-gray-300 mb-6 leading-relaxed line-clamp-3">
                    {section.description}
                  </p>

                  {/* Features (Condensed) */}
                  <div className="flex flex-wrap gap-4 mb-6">
                    {section.features.map((feature, i) => (
                      <div key={i} className="flex items-center space-x-2 bg-gray-900/50 px-3 py-1.5 rounded-lg">
                        <div className={`w-2 h-2 rounded-full ${section.accent}`} />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      onClick={() => navigateToRoute(section.route)}
                      className={`inline-flex items-center justify-center px-6 py-3 ${section.buttonBg} text-white font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 shadow-md`}
                    >
                      {section.buttonText}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                    
                    <button 
                      onClick={() => navigateToRoute('/contact')}
                      className="inline-flex items-center justify-center px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg border border-gray-700 transition-all duration-300"
                    >
                      Contact Sales
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sticky Image Container (Expanded in both directions) */}
          <div className="sticky top-0 h-screen flex items-center justify-center p-1">
            <div className="relative w-[500px] h-75 rounded-2xl overflow-hidden shadow-xl">
              <img
                src={sections.find(s => s.id === activeSection)?.image}
                alt={sections.find(s => s.id === activeSection)?.title}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Version - Without Header Navigation */}
      <div className="md:hidden w-full">
        {/* Mobile Content with Smooth Scrolling */}
        <div 
          className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth"
        >
          {sections.map((section) => (
            <div 
              key={section.id} 
              id={`mobile-${section.id}`}
              className="snap-start min-h-screen w-full py-8 px-4 flex flex-col"
            >
              <div className="max-w-lg mx-auto w-full flex flex-col flex-1">
                <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gray-900 border border-gray-700 mb-4">
                  <div className={`w-2 h-2 rounded-full ${section.accent} mr-2 animate-pulse`} />
                  <span className="text-gray-300 text-sm font-medium">{section.subtitle}</span>
                </div>
                
                <h1 className={`text-3xl font-bold mb-4 leading-tight ${section.color}`}>
                  {section.title}
                </h1>
                
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  {section.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {section.features.map((feature, i) => (
                    <div key={i} className="flex items-center space-x-2 bg-gray-900/50 px-3 py-1.5 rounded-lg">
                      <div className={`w-2 h-2 rounded-full ${section.accent}`} />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Image */}
                <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-xl mb-6">
                  <img
                    src={section.image}
                    alt={section.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col gap-3 pt-2 mt-auto">
                  <button
                    onClick={() => navigateToRoute(section.route)}
                    className={`inline-flex items-center justify-center px-6 py-3 ${section.buttonBg} text-white font-semibold rounded-lg transition-all duration-300`}
                  >
                    {section.buttonText}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                  
                  <button 
                    onClick={() => navigateToRoute('/contact')}
                    className="inline-flex items-center justify-center px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg border border-gray-700 transition-all duration-300"
                  >
                    Contact Sales
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
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
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default ScrollSnapPage;