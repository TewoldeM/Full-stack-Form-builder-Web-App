import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react'
import { ArrowRight, Palette, Zap, Code } from "lucide-react";
import { Card } from '@/components/ui/card';
const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-form-gradient bg-clip-text text-transparent">
                Form Builder
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Create beautiful, professional forms with our intuitive
              drag-and-drop builder. No coding required, unlimited
              possibilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-lg px-8 py-6">
                <Link href={"/builder"}>
                  Start Building
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Powerful Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to create professional forms quickly and
            efficiently
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6 bg-gradient-card border-border hover:shadow-card transition-all duration-300">
            <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4">
              <Palette className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-card-foreground mb-2">
              Drag & Drop Builder
            </h3>
            <p className="text-muted-foreground">
              Intuitive visual builder with drag-and-drop functionality. Create
              forms without any technical knowledge.
            </p>
          </Card>

          <Card className="p-6 bg-gradient-card border-border hover:shadow-card transition-all duration-300">
            <div className="p-3 rounded-lg bg-accent/10 w-fit mb-4">
              <Zap className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold text-card-foreground mb-2">
              Real-time Preview
            </h3>
            <p className="text-muted-foreground">
              See your forms come to life instantly with real-time preview and
              testing capabilities.
            </p>
          </Card>

          <Card className="p-6 bg-gradient-card border-border hover:shadow-card transition-all duration-300">
            <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4">
              <Code className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-card-foreground mb-2">
              Export & Integrate
            </h3>
            <p className="text-muted-foreground">
              Export your forms as clean HTML/CSS code or integrate directly
              with your applications.
            </p>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-secondary/20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of developers and designers who use our form
              builder to create amazing user experiences.
            </p>
            <Button size="lg" asChild className="text-lg px-8 py-6">
              <Link href={"/builder"}>
                Launch Form Builder
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home