import React from "react";
import Hero from "./Hero";
import ScrollSnapPage from "./ScrollSnapPage";
import Clients from "./Clients";
import AboutHero from "./AboutHero";
import FeaturedProductsSection from "./FeaturedProductsSection";
import FAQSection from "../components/FAQSection";
import { useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const Home = () => {
    const { isDarkMode } = useTheme();
    
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <div className={`transition-colors duration-300 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
      <Hero />
      <AboutHero />
      <ScrollSnapPage />
      <FeaturedProductsSection/>
      <Clients />
    </div>
  );
};

export default Home;
