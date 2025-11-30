import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import heroSlide1 from "../assets/hero-slide-1.jpg";
import heroSlide2 from "../assets/hero-slide-2.jpg";
import heroSlide3 from "../assets/hero-slide-3.jpg";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef(null);
  const { isDarkMode } = useTheme();

  const slides = [
    {
      image: heroSlide1,
      badge: "Telecommunication",
      title: "Precision Engineering",
      subtitle: "For Critical Systems",
      description:
        "Empowering Defence and Telecom sectors with advanced Test & Measuring Equipment. Where innovation meets reliability and performance.",
      primaryButton: "Explore Products",
      secondaryButton: "Learn More",
    },
    {
      image: heroSlide2,
      badge: "Defense Technology",
      title: "Advanced Solutions",
      subtitle: "For National Security",
      description:
        "Delivering cutting-edge electronics and communication solutions designed for mission-critical defense applications.",
      primaryButton: "Defense Products",
      secondaryButton: "Our Expertise",
    },
    {
      image: heroSlide3,
      badge: "Manufacturing Excellence",
      title: "Quality Innovation",
      subtitle: "For Industrial Applications",
      description:
        "Providing nationwide services to industries and government organizations with precision manufacturing and engineering excellence.",
      primaryButton: "Manufacturing Solutions",
      secondaryButton: "Our Process",
    },
  ];

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className={`relative h-screen flex items-center justify-center overflow-hidden transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-white'
    }`}>
      {/* Background slides */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className={`w-full h-full object-cover ${
                isDarkMode ? 'brightness-[0.4]' : 'brightness-[0.75]'
              }`}
            />
          </div>
        ))}

        {/* Overlay */}
        <div className={`absolute inset-0 ${
          isDarkMode 
            ? 'bg-gradient-to-b from-black/60 via-black/40 to-black/70'
            : 'bg-gradient-to-b from-black/40 via-black/25 to-black/50'
        }`}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 sm:px-8 md:px-16 max-w-5xl">
        <div className={`inline-flex items-center mb-6 px-4 py-1.5 rounded-full border backdrop-blur-md ${
          isDarkMode 
            ? 'bg-white/10 border-white/20'
            : 'bg-black/10 border-black/20'
        }`}>
          <div className={`w-2.5 h-2.5 rounded-full mr-2 ${
            isDarkMode ? 'bg-blue-400' : 'bg-blue-500'
          }`}></div>
          <span className={`text-sm font-medium tracking-wider uppercase ${
            isDarkMode ? 'text-blue-300' : 'text-blue-600'
          }`}>
            {slides[currentSlide].badge}
          </span>
        </div>

        <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight drop-shadow-md ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {slides[currentSlide].title}
          <span className={`block bg-clip-text text-transparent bg-gradient-to-r ${
            isDarkMode 
              ? 'from-blue-300 to-cyan-300'
              : 'from-blue-600 to-cyan-600'
          }`}>
            {slides[currentSlide].subtitle}
          </span>
        </h1>

        <p className={`text-lg md:text-xl leading-relaxed mb-10 drop-shadow-sm ${
          isDarkMode ? 'text-gray-200' : 'text-gray-700'
        }`}>
          {slides[currentSlide].description}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => scrollToSection("products")}
            className={`px-8 py-3 font-medium rounded-lg transition-all duration-300 ${
              isDarkMode 
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
            }`}
          >
            {slides[currentSlide].primaryButton}
          </button>

          <button
            onClick={() => scrollToSection("about")}
            className={`px-8 py-3 font-medium rounded-lg border transition-all duration-300 ${
              isDarkMode 
                ? 'bg-white/10 hover:bg-white/20 text-white border-white/20 shadow-lg'
                : 'bg-white/10 hover:bg-white/20 text-gray-900 border-gray-300 shadow-lg'
            }`}
          >
            {slides[currentSlide].secondaryButton}
          </button>
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? (isDarkMode ? 'bg-white' : 'bg-gray-900')
                : (isDarkMode ? 'bg-white/40' : 'bg-gray-400')
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default Hero;
