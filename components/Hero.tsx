import { Check, FileText, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="w-full bg-blue-100 Light py-36">
      <div className="container mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-8 shadow-sm">
          <Sparkles className="w-4 h-4 text-yellow-500" />
          <span className="text-sm font-medium text-brand-blue">
            AI-Powered
          </span>
          <span className="text-sm text-muted-foreground">•</span>
          <span className="text-sm font-medium text-brand-blue">
            Professional
          </span>
          <span className="text-sm text-muted-foreground">•</span>
          <span className="text-sm font-medium text-brand-blue">
            Easy to Use
          </span>
        </div>

        <h1 className="text-6xl md:text-7xl font-bold text-foreground mb-6 max-w-6xl mx-auto">
          Create Professional Forms{" "}
          <span className="text-brand-blue">with AI Assistance</span>
        </h1>

        <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
          Transform your business workflows with intelligent form creation.
          Choose from 100+ professional templates or let AI build exactly what
          you need in seconds.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button className="px-8 py-4 bg-brand-blue text-white rounded-lg hover:bg-brand-blue/90 transition-colors font-medium text-lg shadow-lg">
            Create Your First Form
          </button>
          <button className="px-8 py-4 bg-white text-foreground rounded-lg hover:bg-gray-50 transition-colors font-medium text-lg shadow-sm border border-border flex items-center gap-2">
            <FileText className="w-5 h-5 text-pink-500" />
            Browse Templates
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-brand-green" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-brand-green" />
            <span>Free plan available</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-brand-green" />
            <span>Enterprise security</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
