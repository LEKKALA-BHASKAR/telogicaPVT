import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import heroSlide1 from "../assets/hero-slide-1.jpg";
import heroSlide2 from "../assets/hero-slide-2.jpg";
import heroSlide3 from "../assets/hero-slide-3.jpg";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
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
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Slides */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <img
            src={slides[currentSlide].image}
            alt="Hero Background"
            className={`w-full h-full object-cover ${
              isDarkMode ? 'brightness-[0.3]' : 'brightness-[0.85] saturate-[0.8]'
            }`}
          />
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 ${
            isDarkMode 
              ? 'bg-gradient-to-r from-black/80 via-black/50 to-transparent'
              : 'bg-gradient-to-r from-white/90 via-white/60 to-transparent'
          }`} />
        </motion.div>
      </AnimatePresence>

      {/* Content Container */}
      <div className="relative z-10 h-full container mx-auto px-6 lg:px-8 flex items-center">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Badge */}
              <div className={`inline-flex items-center px-4 py-2 rounded-full mb-8 backdrop-blur-md border ${
                isDarkMode 
                  ? 'bg-white/10 border-white/20 text-blue-300'
                  : 'bg-blue-50 border-blue-100 text-blue-700'
              }`}>
                <span className="relative flex h-2 w-2 mr-3">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    isDarkMode ? 'bg-blue-400' : 'bg-blue-500'
                  }`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${
                    isDarkMode ? 'bg-blue-500' : 'bg-blue-600'
                  }`}></span>
                </span>
                <span className="text-sm font-semibold tracking-wide uppercase">
                  {slides[currentSlide].badge}
                </span>
              </div>

              {/* Heading */}
              <h1 className={`text-5xl md:text-7xl font-bold leading-tight mb-6 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {slides[currentSlide].title}
                <span className={`block mt-2 bg-clip-text text-transparent bg-gradient-to-r ${
                  isDarkMode 
                    ? 'from-blue-400 via-purple-400 to-pink-400'
                    : 'from-blue-600 via-indigo-600 to-purple-600'
                }`}>
                  {slides[currentSlide].subtitle}
                </span>
              </h1>

              {/* Description */}
              <p className={`text-lg md:text-xl mb-10 max-w-2xl leading-relaxed ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {slides[currentSlide].description}
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => scrollToSection("products")}
                  className={`group relative px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 ${
                    isDarkMode 
                      ? 'bg-white text-black hover:bg-gray-100'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  <span className="flex items-center">
                    {slides[currentSlide].primaryButton}
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </button>

                <button
                  onClick={() => scrollToSection("about")}
                  className={`group px-8 py-4 rounded-2xl font-semibold text-lg border backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
                    isDarkMode 
                      ? 'border-white/30 text-white hover:bg-white/10'
                      : 'border-gray-300 text-gray-900 hover:bg-white/50'
                  }`}
                >
                  <span className="flex items-center">
                    {slides[currentSlide].secondaryButton}
                    <ChevronRight className="ml-2 w-5 h-5 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                  </span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 right-10 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === currentSlide 
                ? `w-8 ${isDarkMode ? 'bg-white' : 'bg-gray-900'}`
                : `w-2 ${isDarkMode ? 'bg-white/30' : 'bg-gray-300'}`
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
