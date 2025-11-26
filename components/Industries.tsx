" use client";
import {
  Heart,
  Home,
  Sparkles,
  Scale,
  DollarSign,
  GraduationCap,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Industries = () => {
    const router = useRouter();
    const [showMessage, setShowMessage] = useState(false);
    const handleBrowseTemplates = () => {
      setShowMessage(true);
    };
  const industries = [
    {
      icon: Heart,
      title: "Healthcare & Wellness",
      description: "Patient forms that don't make people sick!",
      features: ["75% LESS PAPERWORK", "HAPPY PATIENTS", "SECURE & PRIVATE"],
      bgColor: "bg-blue-50",
      borderColor: "border-brand-blue",
    },
    {
      icon: Home,
      title: "Real Estate",
      description: "Forms that sell houses faster than hotcakes!",
      features: ["3X MORE LEADS", "LIGHTNING FAST", "EASY INTEGRATION"],
      bgColor: "bg-green-50",
      borderColor: "border-brand-green",
    },
    {
      icon: Sparkles,
      title: "Digital Agencies",
      description: "White-label magic for your clients!",
      features: ["IMPRESS CLIENTS", "SAVE 50% TIME", "MAKE MORE MONEY"],
      bgColor: "bg-purple-50",
      borderColor: "border-brand-purple",
    },
    {
      icon: Scale,
      title: "Legal Services",
      description: "Legal forms that are actually legal!",
      features: [
        "SECURE & CONFIDENTIAL",
        "PROFESSIONAL GRADE",
        "COMPLIANCE READY",
      ],
      bgColor: "bg-gray-50",
      borderColor: "border-border",
    },
    {
      icon: DollarSign,
      title: "Financial Services",
      description: "Money forms that make cents!",
      features: [
        "BANK LEVEL SECURE",
        "COMPLIANCE BUILT-IN",
        "PROFESSIONAL GRADE",
      ],
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-500",
    },
    {
      icon: GraduationCap,
      title: "Education",
      description: "School forms that make the grade!",
      features: ["STUDENT FRIENDLY", "PARENT APPROVED", "TEACHER LOVED"],
      bgColor: "bg-orange-50",
      borderColor: "border-orange-500",
    },
  ];

  return (
    <section className="w-full py-20 bg-orange-50">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-4">
          EVERY INDUSTRY <span className="text-brand-pink">COVERED!</span>
        </h2>

        <p className="text-2xl text-center text-muted-foreground mb-16">
          From doctors to dog walkers, we have got templates that make your
          business look{" "}
          <span className="text-brand-purple font-bold underline">
            INCREDIBLE
          </span>{" "}
          !
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {industries.map((industry, index) => (
            <div
              key={index}
              className={`${industry.bgColor} ${industry.borderColor} border-4 rounded-2xl p-6 hover:shadow-xl transition-shadow`}
            >
              <div className="flex items-center gap-3 mb-4">
                <industry.icon className="w-10 h-10 text-foreground" />
              </div>

              <h3 className="text-3xl font-bold text-foreground mb-2">
                {industry.title}
              </h3>

              <p className="text-foreground mb-4 text-lg">
                {industry.description}
              </p>

              <ul className="space-y-3 mb-6">
                {industry.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-lg">
                    <span className="text-brand-green">✓</span>
                    <span className="font-bold text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <button onClick={handleBrowseTemplates} className="flex items-center gap-2 text-brand-blue font-bold hover:gap-3 transition-all">
                LEARN MORE <ChevronRight className="w-5 h-5" />
              </button>
              {showMessage && (
                <p className="text-red-500 mb-6 justify-center items-center mt-2 text-center">
                  This functionality is not yet finished, please wait.
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Don&apos;t see your industry? We have got solutions for 25+
            categories!
          </p>
          <button
            onClick={handleBrowseTemplates}
            className="px-8 py-4 bg-pink-500 text-white rounded-lg hover:bg-brand-pink/90 transition-colors font-bold text-lg"
          >
            📋 EXPLORE ALL TEMPLATES
          </button>
        </div>
        {showMessage && (
          <p className="text-red-500 mb-6 justify-center items-center mt-2 text-center">
            This functionality is not yet finished, please wait.
          </p>
        )}
      </div>
    </section>
  );
};

export default Industries;
