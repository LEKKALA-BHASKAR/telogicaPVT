import React from "react";
import Hero from "./Hero";
import ScrollSnapPage from "./ScrollSnapPage";

const Home = () => {
  return (
    <div className="bg-black text-white">
      <Hero />
      <ScrollSnapPage /> {/* Sidebar + scroll sections */}
    </div>
  );
};

export default Home;
