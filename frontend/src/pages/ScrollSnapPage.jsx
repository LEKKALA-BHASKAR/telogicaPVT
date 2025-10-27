import React, { useState, useEffect } from "react";
import { Shield, Radio, Factory, Users, ArrowRight, Play, Cpu, Satellite, Network, Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const ScrollSnapPage = () => {
  const [activeSection, setActiveSection] = useState("about");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if we're on the home page
  const isHomePage = location.pathname === "/";

  // Scroll handling with offset for mobile header
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPos = window.scrollY + 100; // Small offset for better detection

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to section with mobile header offset
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = window.innerWidth < 1024 ? 64 : 0; // pt-16 = 64px
      const elementPosition = element.offsetTop - headerOffset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
      setActiveSection(id);
      setIsMobileMenuOpen(false);
    }
  };

  const navigateToRoute = (route) => {
    navigate(route);
  };

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
      image: "https://scontent.fcdp1-1.fna.fbcdn.net/v/t39.30808-6/454947021_825253096373273_2071655228525396527_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=VZsYBnhZWbEQ7kNvwHUXctN&_nc_oc=AdlFU0ypLkXz1Th7UL2rssIG_2YHA5dzc3Up8L3onVX0T44Vfvu1dyUwzIsy0Dcv9SB5LskDd_dKMSGJEVxYZJY-&_nc_zt=23&_nc_ht=scontent.fcdp1-1.fna&_nc_gid=2QGYrn6H2j63nsTNampbVw&oh=00_AfePAldZXxPo60rMIX_9-dOvoW2i6CCO4ygUr7pGwvAWqA&oe=69052E82",
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
      image: "https://images.unsplash.com/photo-1717749789408-f6f73c9e6aac?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
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
      image: "https://media.istockphoto.com/id/1602617670/photo/satellite-dish-antenna-communication-technology-concept.jpg?s=612x612&w=0&k=20&c=XjMfP8m2WEykJGAcWOMAmIJI3MWvFBnxDdKXI6ufYVE=",
    },
    {
      id: "manufacturing",
      title: "Manufacturing",
      description: "State-of-the-art manufacturing facilities for high-precision electronic components and test equipment.",
      features: ["Quality Manufacturing", "R&D Focus", "Custom Solutions"],
      icon: Factory,
      bg: "bg-black",
      color: "text-green-400",
      accent: "bg-green-400",
      buttonBg: "bg-green-500 hover:bg-green-600",
      buttonText: "Manufacturing Capabilities",
      route: "/manufacturing",
      image: "https://media.istockphoto.com/id/2155877725/photo/male-and-female-engineers-in-neat-work-clothes-prepare-and-control-the-production-system-of.jpg?s=612x612&w=0&k=20&c=6E6nQfie8dZIROGrqe9vO4ADz68Sw67LIjC_neaDg6Q=",
    },
  ];

  return (
    <div className="flex min-h-screen bg-black">
      {/* Mobile Header - Only show on home page */}
      {isHomePage && (
        <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-800">
          <div className="flex items-center justify-between p-3">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 bg-gradient-to-br from-pink-500 to-purple-500 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="text-white font-bold text-base">Telogica</span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-400 hover:text-white"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay - Only show on home page */}
      {isHomePage && isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-95 backdrop-blur-sm">
          <div className="pt-16 px-4 pb-4">
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${
                    activeSection === section.id
                      ? `${section.accent} text-white`
                      : "text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <section.icon className={`w-4 h-4 ${activeSection === section.id ? "text-white" : "text-gray-400"}`} />
                    <span className="font-medium text-sm">{section.title}</span>
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop Sidebar - Only show on home page */}
      {isHomePage && (
        <div className="hidden lg:flex fixed top-1/2 left-4 w-56 bg-black/90 backdrop-blur-sm rounded-xl py-6 px-4 transform -translate-y-1/2 z-30">
          <nav className="flex flex-col items-center space-y-2 w-full">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${
                  activeSection === section.id
                    ? `${section.accent} text-white`
                    : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <section.icon className={`w-4 h-4 ${activeSection === section.id ? "text-white" : "text-gray-400"}`} />
                  <span className="font-medium text-sm">{section.title}</span>
                </div>
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* Main Content */}
      <div className={`flex-1 overflow-y-auto scroll-smooth ${isHomePage ? '' : 'w-full'}`}>
        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className={`min-h-screen flex items-center justify-center ${section.bg} relative overflow-hidden ${isHomePage ? 'pt-16 lg:pt-0 snap-start' : 'pt-0'}`}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 25% 25%, #ffffff 1px, transparent 1px),
                                  radial-gradient(circle at 75% 75%, #ffffff 1px, transparent 1px)`,
                  backgroundSize: "40px 40px",
                  backgroundPosition: "0 0, 20px 20px",
                }}
              />
            </div>

            {/* Floating Icons - Only show on home page */}
            {isHomePage && (
              <div className="absolute inset-0 overflow-hidden">
                {[Cpu, Satellite, Network, Play].map((Icon, i) => (
                  <Icon
                    key={i}
                    className={`absolute text-${section.color.replace("text-", "")}/20 animate-float hidden sm:block`}
                    size={32}
                    style={{
                      top: `${20 + (i * 20) % 60}%`,
                      left: `${15 + (i * 25) % 70}%`,
                      animationDelay: `${i * 2}s`,
                      animationDuration: `${12 + i * 3}s`,
                    }}
                  />
                ))}
              </div>
            )}

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center h-full">
                {/* Text Content - Left Side */}
                <div className="space-y-6 flex flex-col justify-center h-full">
                  <div className="space-y-4">
                    <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight ${section.color}`}>
                      {section.title}
                    </h1>
                    <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-xl">
                      {section.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    {section.features.map((feature, i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${section.accent}`} />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-3">
                    <button
                      onClick={() => navigateToRoute(section.route)}
                      className={`inline-flex items-center justify-center px-6 py-3 ${section.buttonBg} text-white font-medium rounded-lg transition-all duration-200 hover:-translate-y-0.5 text-sm`}
                    >
                      {section.buttonText}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                    <button
                      onClick={() => navigateToRoute("/contact")}
                      className="inline-flex items-center justify-center px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-all duration-200 text-sm"
                    >
                      Contact Sales
                    </button>
                  </div>
                </div>

                {/* Image - Right Side */}
                <div className="flex items-center justify-center h-full">
                  <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden">
                    <img
                      src={section.image}
                      alt={section.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between text-sm">
                      <div className="text-center">
                        <div className={`font-bold ${section.color}`}>15+</div>
                        <div className="text-gray-300 text-xs">Years</div>
                      </div>
                      <div className="text-center">
                        <div className={`font-bold ${section.color}`}>50+</div>
                        <div className="text-gray-300 text-xs">Projects</div>
                      </div>
                      <div className="text-center">
                        <div className={`font-bold ${section.color}`}>24/7</div>
                        <div className="text-gray-300 text-xs">Support</div>
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
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-15px);
    }
  }

  .animate-float {
    animation: float 10s infinite ease-in-out;
  }

  /* ✅ Scroll snapping only inside ScrollSnapPage */
  .scroll-snap-container {
    scroll-snap-type: y mandatory;
  }

  .scroll-snap-section {
    scroll-snap-align: start;
    scroll-snap-stop: always;
  }

  /* Hide scrollbar */
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