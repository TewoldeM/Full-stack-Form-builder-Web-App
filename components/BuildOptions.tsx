"use client";
import { useUser } from "@clerk/nextjs";
import { FileText, Bot } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const BuildOptions = () => {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const [showMessage, setShowMessage] = useState(false);
  const handleCreateForm = () => {
    if (isSignedIn) {
      router.push("/dashboard");
    } else {
      router.push("/sign-up");
    }
  };
  const handleBrowseTemplates = () => {
    setShowMessage(true);
  };
  return (
    <section className="w-full py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-4">
          HOW DO YOU WANT TO <span className="text-brand-green">BUILD</span>{" "}
          <span className="text-brand-blue">YOUR FORM?</span>
        </h2>

        <p className="text-2xl text-center text-muted-foreground mb-16">
          Two powerful ways to get professional forms built fast!
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="bg-card bg-blue-50 rounded-2xl p-8 border-4 border-blue-500 shadow-xl">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center shadow-md">
                <FileText className="w-10 h-10 text-brand-blue" />
              </div>
            </div>
            <button>
              <h3 className="text-4xl font-bold text-foreground text-center mb-4">
                GRAB A TEMPLATE
              </h3>
            </button>

            <p className="text-center text-lg max-w-4xl mb-2 text-gray-600">
              Why reinvent the wheel? Pick from 100+ professionally designed
              templates that look{" "}
              <span className="bg-brand-yellow px-2 py-1 font-bold text-black">
                AMAZING
              </span>{" "}
              right out of the box!
            </p>

            <div className="flex justify-center mt-8">
              <button
                onClick={handleBrowseTemplates}
                className="px-6 py-3 bg-blue-700  text-white rounded-lg hover:opacity-90 transition-opacity font-bold flex items-center gap-2"
              >
                <FileText className="w-5 h-5" />
                BROWSE TEMPLATES
              </button>
            </div>
            {showMessage && (
              <p className="text-red-500 mb-6 justify-center items-center mt-2 text-center">
                This functionality is not yet finished, please wait.
              </p>
            )}
          </div>

          <div className="bg-cardBg-green rounded-2xl p-8 border-4 border-brand-green shadow-xl">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center shadow-md">
                <Bot className="w-10 h-10 text-brand-purple" />
              </div>
            </div>

            <h3 className="text-4xl font-bold text-foreground text-center mb-4">
              Preview At a TIME
            </h3>

            <p className="text-center text-gray-700 mb-2 text-lg">
              Just build the form and view it how it look like
              <span className="bg-yellow-500 px-2 py-1 font-bold text-black">
                PERFECT
              </span>{" "}
              form in seconds!
            </p>

            <div className="mt-8 bg-white rounded-lg p-8 flex items-center justify-center gap-3">
              <button
                onClick={handleCreateForm}
                className="text-xl px-6 py-2 bg-brand-purple text-white rounded-lg hover:bg-purple-600/90 transition-colors font-bold"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuildOptions;
