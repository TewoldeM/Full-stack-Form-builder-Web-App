import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react'
import { ArrowRight, Palette, Zap, Code } from "lucide-react";
import { Card } from '@/components/ui/card';
import Hero from '@/components/Hero';
import Navbar from '@/components/NavBar';
import BuildOptions from '@/components/BuildOptions';
import Industries from '@/components/Industries';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';
const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* <Navbar /> */}
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