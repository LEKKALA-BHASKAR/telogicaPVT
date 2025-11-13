import React from "react";
import Hero from "./Hero";
import ScrollSnapPage from "./ScrollSnapPage";
import Clients from "./Clients";
import AboutHero from "./AboutHero";
import FeaturedProductsSection from "./FeaturedProductsSection";
import FAQSection from "../components/FAQSection";
import { useEffect } from "react";
const Home = () => {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  return (
    <div className="bg-black text-white">
      <Hero />
      <AboutHero />
      <div className="my-16">
      <ScrollSnapPage />
      </div>
      <FeaturedProductsSection/>
      <Clients />
      <FAQSection />
    </div>
  );
};

export default Home;
