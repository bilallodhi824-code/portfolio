"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Terminal from "../components/Terminal";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Certifications from "../components/Certifications";
import ComponentPlayground from "../components/ComponentPlayground";
import GitHubStats from "../components/GitHubStats";
import Experience from "../components/Experience";
import ServicesPricing from "../components/ServicesPricing";
import LivePlayground from "../components/LivePlayground";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import CyberCanvasBackground from "../components/CyberCanvasBackground";
import CustomCursor from "../components/CustomCursor";
import MarqueeTicker from "../components/MarqueeTicker";
import CreativityDeck from "../components/CreativityDeck";
import BentoGrid from "../components/BentoGrid";
import ThemeCustomizer from "../components/ThemeCustomizer";
import ScrollProgressBar from "../components/ScrollProgressBar";
import ClickSparkles from "../components/ClickSparkles";

export default function Home() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] relative selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Interactive Luxury Click Particle Sparkles */}
      <ClickSparkles />

      {/* Top Reading / Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Interactive Magnetic Glowing Custom Cursor (meetfaisal-style) */}
      <CustomCursor />

      {/* Interactive Cyber Particle Background with Cursor Physics */}
      <CyberCanvasBackground />

      {/* Unique Live Visual Theme Engine (6 Haute Couture Palettes) */}
      <ThemeCustomizer />

      {/* Sticky Navigation Header */}
      <Navbar onOpenTerminal={() => setIsTerminalOpen(true)} />


      {/* Main Content Sections */}
      <main>
        <Hero onOpenTerminal={() => setIsTerminalOpen(true)} />
        
        {/* Infinite Seamless Marquee Ticker */}
        <MarqueeTicker />

        {/* Live Telemetry & Bento Matrix Hub (meetfaisal-style) */}
        <BentoGrid />

        <Projects />

        {/* Interactive Engineering & Innovation Thought Deck (meetfaisal signature) */}
        <CreativityDeck />

        <Skills />
        <Certifications />
        <ComponentPlayground />
        <GitHubStats />
        <Experience />
        <ServicesPricing />
        <LivePlayground />
        <Testimonials />
        <Contact />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Interactive Developer CLI Modal */}
      <Terminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />
    </div>
  );
}

