"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center text-center bg-cover bg-center"
      style={{ backgroundImage: "url('/placeholder.svg')" }} // Placeholder for a stunning wedding image
    >
      <div className="absolute inset-0 bg-black/40"></div> {/* Overlay for text readability */}
      <div className="relative z-10 p-8 text-white max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Where Love Stories Begin in Style
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Crafting unforgettable moments and seamless celebrations, Ze Events brings your dream wedding to life with elegance and precision.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="bg-gradient-to-r from-rose-300 to-amber-200 text-primary-foreground hover:from-rose-400 hover:to-amber-300 shadow-lg text-lg px-8 py-6">
            <Link to="/services">Our Services</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary text-lg px-8 py-6">
            <Link to="/auth">Get Your Proposal</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;