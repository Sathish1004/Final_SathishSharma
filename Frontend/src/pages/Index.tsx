



import { useEffect, useState } from 'react';
import { useNavigate, useLocation, useOutletContext } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import Chatbot from '@/components/Chatbot';
import ScrollBasedSlider from '@/components/ScrollBasedSlider';
import FeaturesRow from '@/components/FeaturesRow';
import DetailedFeatures from '@/components/DetailedFeatures';
import WorkspaceStack from '@/components/WorkspaceStack';

import SlidingToolsSection from '@/components/SlidingToolsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import SaaSBackground from '@/components/SaaSBackground';
import HeroOrbit from '@/components/HeroOrbit';
import FeatureWheel from '@/components/FeatureWheel';
import Footer from '@/components/Footer';
import { ArrowRight } from 'lucide-react';

export default function Index() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsLoginModalOpen } = useOutletContext<{ setIsLoginModalOpen: (open: boolean) => void }>();

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    }
    // Check for openAuth state from other pages
    if (location.state?.openAuth) {
      setIsLoginModalOpen(true);
      // Clear state so it doesn't reopen on refresh (optional but good practice)
      window.history.replaceState({}, document.title);
    }
  }, [user, loading, navigate, location]);

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}


      {/* Unified Hero & Features Section with SaaS Background */}
      <div className="relative w-full">
        <SaaSBackground />

        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16 pb-12 lg:pt-40 lg:pb-32 bg-transparent">
          {/* Background - Clean gradient REMOVED for SaaS Background */}

          <div className="max-w-[1700px] mx-auto px-4 md:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

              {/* Left Content */}
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1 max-w-2xl lg:max-w-none mx-auto lg:mx-0">

                <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-bold tracking-tight text-slate-900 mb-6 leading-[1.15] lg:leading-[1.1]">
                  Welcome to Prolync student workspace
                </h1>

                <p className="text-lg md:text-xl text-slate-600 mb-8 md:mb-10 leading-relaxed max-w-xl lg:max-w-full font-medium">
                  Get free access to learning tools, coding platforms, and career opportunities using Prolync Student Workspace.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-slate-900 text-white hover:bg-black h-12 px-8 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                    onClick={() => navigate('/pricing')}
                  >
                    Start Free Trial
                  </Button>

                </div>

                {/* "Go premium" Link with Arrow Box */}
                <div
                  className="flex items-center gap-3 group cursor-pointer w-fit p-2 -ml-2 rounded-lg hover:bg-slate-50 transition-colors"
                  onClick={() => navigate('/pricing')}
                >
                  <div className="h-6 w-6 bg-slate-900 rounded-md flex items-center justify-center group-hover:bg-blue-600 transition-colors shadow-sm">
                    <ArrowRight className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="text-base font-semibold text-slate-700 underline-offset-4 group-hover:text-blue-700 transition-colors">
                    Go premium. See plans and pricing
                  </span>
                </div>
              </div>

              {/* Right Visual (New Feature Wheel) */}
              <div className="relative w-full lg:h-[600px] flex items-center justify-center order-1 lg:order-2">
                <FeatureWheel />
              </div>
            </div>
          </div>
        </section>



        {/* Section 3: Everything You Need to Succeed */}
        <FeaturesRow />
      </div>

      {/* Section 4: Interactive Scroll Slider (Why Choose Student Workspace?) */}
      <ScrollBasedSlider />

      {/* Student Workspace Animated Section */}


      {/* Section 5: Detailed Features (Pastel Cards) */}
      <DetailedFeatures />

      {/* Section 6: Sliding Tools Ecosystem */}
      <SlidingToolsSection />



      {/* Section 7: Student Workspace Stack */}
      <WorkspaceStack />

      {/* Learning Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      {/* Animated Text Banner (Above Footer) */}
      <section className="py-20 bg-[#020617] relative overflow-hidden flex items-center justify-center border-t border-slate-900/50">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

        <div className="w-full relative z-10 px-4 md:px-8 flex justify-center">
          <h2 className="flex flex-wrap justify-center gap-4 md:gap-8 text-4xl md:text-6xl lg:text-7xl font-black uppercase leading-none tracking-tighter">
            {["Prolync", "MAKES", "LEARNER", "CLEVER"].map((word, i) => {
              const isConstant = word === "Prolync";
              return (
                <div
                  key={i}
                  className={`flex cursor-default transition-transform duration-200 hover:scale-110 ${isConstant
                    ? "bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 bg-clip-text text-transparent"
                    : "text-slate-500 hover:text-transparent hover:bg-gradient-to-r hover:from-blue-500 hover:via-indigo-500 hover:to-cyan-400 hover:bg-clip-text"
                    }`}
                >
                  {word.split("").map((char, j) => (
                    <span
                      key={j}
                      className="inline-block"
                    >
                      {char}
                    </span>
                  ))}
                </div>
              );
            })}
          </h2>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* AI Chatbot */}
      <Chatbot />


    </div>
  );
}
