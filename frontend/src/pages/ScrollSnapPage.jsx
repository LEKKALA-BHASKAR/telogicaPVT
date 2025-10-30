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
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ScrollSnapPage = () => {
  const [activeSection, setActiveSection] = useState("defence");
  const navigate = useNavigate();

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
      features: ["Secure Communication", "Radar Systems", "Electronic Warfare"],
      icon: Shield,
      bg: "bg-black",
      color: "text-orange-400",
      accent: "bg-orange-400",
      buttonBg: "bg-orange-500 hover:bg-orange-600",
      buttonText: "Defence Products",
      route: "/defence",
      image:
        "https://images.unsplash.com/photo-1717749789408-f6f73c9e6aac?auto=format&fit=crop&q=80&w=1170",
    },
    {
      id: "telecom",
      title: "Telecommunication",
      subtitle: "Next-Gen Network Solutions",
      description:
        "Cutting-edge telecommunications infrastructure and network testing equipment for 5G and beyond.",
      features: ["5G Testing", "Network Analysis", "Field Maintenance"],
      icon: Radio,
      bg: "bg-black",
      color: "text-purple-400",
      accent: "bg-purple-400",
      buttonBg: "bg-purple-500 hover:bg-purple-600",
      buttonText: "Telecom Solutions",
      route: "/telecom",
      image:
        "https://media.istockphoto.com/id/1602617670/photo/satellite-dish-antenna-communication-technology-concept.jpg?s=612x612&w=0&k=20&c=XjMfP8m2WEykJGAcWOMAmIJI3MWvFBnxDdKXI6ufYVE=",
    },
    {
      id: "manufacturing",
      title: "Manufacturing",
      subtitle: "Precision Engineering",
      description:
        "State-of-the-art manufacturing facilities for high-precision electronic components and test equipment.",
      features: ["Quality Manufacturing", "R&D Focus", "Custom Solutions"],
      icon: Factory,
      bg: "bg-black",
      color: "text-green-400",
      accent: "bg-green-400",
      buttonBg: "bg-green-500 hover:bg-green-600",
      buttonText: "Manufacturing Capabilities",
      route: "/manufacturing",
      image:
        "https://media.istockphoto.com/id/2155877725/photo/male-and-female-engineers-in-neat-work-clothes-prepare-and-control-the-production-system-of.jpg?s=612x612&w=0&k=20&c=6E6nQfie8dZIROGrqe9vO4ADz68Sw67LIjC_neaDg6Q=",
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-black text-white">
      {/* Sidebar */}
      <div className="lg:sticky lg:top-0 lg:h-screen lg:w-80 w-full bg-black/70 z-20 flex items-center justify-center py-4 lg:py-0 border-b border-gray-800 lg:border-b-0">
        <nav className="space-y-3 w-full px-4 sm:px-6 overflow-x-auto flex lg:block gap-3 lg:gap-0">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`w-full text-left p-4 rounded-xl transition-all duration-300 group flex-shrink-0 ${
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
                    className={`font-semibold ${
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

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto scroll-smooth">
        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className={`min-h-screen flex items-center justify-center ${section.bg} relative overflow-hidden px-4 sm:px-6 lg:px-10 py-12 sm:py-20`}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 25% 25%, #ffffff 1px, transparent 1px),
                                    radial-gradient(circle at 75% 75%, #ffffff 1px, transparent 1px)`,
                  backgroundSize: "50px 50px",
                  backgroundPosition: "0 0, 25px 25px",
                }}
              />
            </div>

            {/* Floating Icons */}
            <div className="absolute inset-0 overflow-hidden">
              {[Cpu, Satellite, Network, Play].map((Icon, i) => {
                const colors = [
                  "text-pink-500/20",
                  "text-orange-500/20",
                  "text-purple-500/20",
                  "text-green-500/20",
                ];
                return (
                  <Icon
                    key={i}
                    className={`absolute ${colors[i]} animate-float`}
                    size={40}
                    style={{
                      top: `${20 + (i * 20) % 60}%`,
                      left: `${15 + (i * 25) % 70}%`,
                      animationDelay: `${i * 3}s`,
                      animationDuration: `${15 + i * 5}s`,
                    }}
                  />
                );
              })}
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                {/* Text */}
                <div className="space-y-6 text-center lg:text-left">
                  <div>
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-900 border border-gray-700 mb-6">
                      <div
                        className={`w-2 h-2 rounded-full ${section.accent} mr-2 animate-pulse`}
                      />
                      <span className="text-gray-300 text-sm font-medium">
                        {section.subtitle}
                      </span>
                    </div>

                    <h1
                      className={`text-4xl sm:text-5xl lg:text-5xl font-bold mb-5 leading-tight ${section.color}`}
                    >
                      {section.title}
                    </h1>

                    <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed">
                      {section.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    {section.features.map((feature, i) => (
                      <div key={i} className="flex items-center justify-center lg:justify-start space-x-3">
                        <div className={`w-2 h-2 rounded-full ${section.accent}`} />
                        <span className="text-gray-300 text-base sm:text-lg">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
                    <button
                      onClick={() => navigateToRoute(section.route)}
                      className={`inline-flex items-center justify-center px-8 py-4 ${section.buttonBg} text-white font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg`}
                    >
                      {section.buttonText}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </button>

                    <button
                      onClick={() => navigateToRoute("/contact")}
                      className="inline-flex items-center justify-center px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl border border-gray-700 transition-all duration-300"
                    >
                      Contact Sales
                    </button>
                  </div>
                </div>

                {/* Image */}
                <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[28rem] rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={section.image}
                    alt={section.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        .animate-float {
          animation: float 20s infinite linear;
        }
      `}</style>
    </div>
  );
};

export default ScrollSnapPage;
