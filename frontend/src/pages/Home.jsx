import React from "react";
import Hero from "./Hero";
import ScrollSnapPage from "./ScrollSnapPage";
import Clients from "./Clients";

const Home = () => {
  return (
    <div className="bg-black text-white">
      <Hero />
      <div className="my-16">
      <ScrollSnapPage />
      </div>
      <Clients />
    </div>
  );
};

export default Home;
