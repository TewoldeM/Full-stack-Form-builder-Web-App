"use client";
import React from 'react'
import Hero from '@/components/Hero';
import BuildOptions from '@/components/BuildOptions';
import Industries from '@/components/Industries';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';
const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <BuildOptions />
      <Industries />
      <Features />
      <Pricing />
      <Footer />
    </div>
  );
}

export default Home