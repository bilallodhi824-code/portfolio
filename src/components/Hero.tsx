"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Download, Terminal as TerminalIcon, Sparkles, ShieldCheck, Zap, Code2, Cpu, CheckCircle2, Activity } from "lucide-react";
import { PERSONAL_INFO } from "../data/portfolioData";
import VoiceGreeting from "./VoiceGreeting";
import TiltCard from "./TiltCard";
import BorderBeam from "./BorderBeam";
import MagneticButton from "./MagneticButton";

interface HeroProps {
  onOpenTerminal: () => void;
}

export default function Hero({ onOpenTerminal }: HeroProps) {
  const [typedTitle, setTypedTitle] = useState("");
  const titles = [
    "Next.js App Router Architect",
    "Full-Stack TypeScript Developer",
    "High-Performance Web Engineer",
    "Serverless & API Specialist"
  ];
  const [titleIdx, setTitleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = titles[titleIdx];
    const timer = setTimeout(() => {
      if (!isDeleting && charIdx < currentText.length) {
        setTypedTitle(currentText.substring(0, charIdx + 1));
        setCharIdx(charIdx + 1);
      } else if (isDeleting && charIdx > 0) {
        setTypedTitle(currentText.substring(0, charIdx - 1));
        setCharIdx(charIdx - 1);
      } else if (!isDeleting && charIdx === currentText.length) {
        setTimeout(() => setIsDeleting(true), 1800);
      } else if (isDeleting && charIdx === 0) {
        setIsDeleting(false);
        setTitleIdx((prev) => (prev + 1) % titles.length);
      }
    }, isDeleting ? 40 : 80);

    return () => clearTimeout(timer);
  }, [charIdx, isDeleting, titleIdx]);

  return (
    <section id="about" className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden bg-cyber-grid">
      {/* Glow Orbs Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/20 via-purple-500/15 to-emerald-500/20 rounded-full blur-[140px] pointer-events-none animate-pulse-slow"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Intro */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Status & Voice Greeting Row */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-xs shadow-sm backdrop-blur-md">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span>{PERSONAL_INFO.availability}</span>
              </div>
              <VoiceGreeting />
            </div>

            {/* Main Heading */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.1]">
                Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 animate-gradient-text">Zero-Defect</span> Next-Gen Web Apps
              </h1>
              <div className="font-mono text-lg sm:text-2xl text-[var(--accent-cyan)] h-10 flex items-center">
                <span>{typedTitle}</span>
                <span className="w-2.5 h-6 bg-cyan-400 ml-1 animate-pulse"></span>
              </div>
            </div>

            {/* Description */}
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl">
              {PERSONAL_INFO.shortBio}
            </p>

            {/* Key Value Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center space-x-2 text-sm text-[var(--text-secondary)] p-2 rounded-lg bg-[var(--bg-glass)] border border-[var(--border-color)] hover:border-cyan-500/40 transition-all">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>100/100 Core Web Vitals Guaranteed</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-[var(--text-secondary)] p-2 rounded-lg bg-[var(--bg-glass)] border border-[var(--border-color)] hover:border-cyan-500/40 transition-all">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Strict TypeScript & Zero JS Warnings</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-[var(--text-secondary)] p-2 rounded-lg bg-[var(--bg-glass)] border border-[var(--border-color)] hover:border-purple-500/40 transition-all">
                <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span>Next.js 15 Server Components & Actions</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-[var(--text-secondary)] p-2 rounded-lg bg-[var(--bg-glass)] border border-[var(--border-color)] hover:border-pink-500/40 transition-all">
                <CheckCircle2 className="w-4 h-4 text-pink-400 flex-shrink-0" />
                <span>Enterprise API Gateways & Edge Cache</span>
              </div>
            </div>

            {/* Call to Actions with Magnetic Pull */}
            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <MagneticButton strength={18}>
                <a
                  href="#projects"
                  className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 hover:shadow-2xl hover:shadow-cyan-500/40 hover:scale-[1.04] transition-all duration-300 relative group overflow-hidden"
                >
                  <span className="relative z-10">Explore Featured Work</span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                </a>
              </MagneticButton>

              <MagneticButton strength={15}>
                <button
                  onClick={onOpenTerminal}
                  className="inline-flex items-center space-x-2 px-5 py-3.5 rounded-xl font-mono text-sm font-semibold border border-cyan-500/40 bg-cyan-950/40 text-cyan-300 hover:bg-cyan-900/50 hover:border-cyan-400 hover:scale-[1.02] transition-all duration-300 shadow-md cursor-pointer backdrop-blur-md"
                >
                  <TerminalIcon className="w-4 h-4 text-cyan-400 animate-pulse" />
                  <span>Run Interactive CLI</span>
                </button>
              </MagneticButton>

              <MagneticButton strength={12}>
                <a
                  href="#contact"
                  className="inline-flex items-center space-x-2 px-5 py-3.5 rounded-xl font-medium text-sm border border-[var(--border-color)] bg-[var(--bg-glass)] text-[var(--text-primary)] hover:border-cyan-500/40 hover:bg-[var(--border-color)] transition-all"
                >
                  <Download className="w-4 h-4 text-[var(--accent-cyan)]" />
                  <span>Download Resume</span>
                </a>
              </MagneticButton>
            </div>
          </div>

          {/* Right Column: 3D Tilt Dynamic Stats Card & Visual Badge */}
          <div className="lg:col-span-5 relative">
            
            {/* Floating HUD Badges */}
            <div className="absolute -top-6 -left-6 z-20 animate-float hidden sm:flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-cyan-500/40 text-cyan-300 text-xs font-mono shadow-2xl backdrop-blur-xl">
              <Zap className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
              <span>Sub-50ms Edge Engine</span>
            </div>

            <div className="absolute -bottom-6 -right-6 z-20 animate-float-reverse hidden sm:flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-emerald-500/40 text-emerald-300 text-xs font-mono shadow-2xl backdrop-blur-xl">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span>99.99% Production Uptime</span>
            </div>

            <TiltCard className="rounded-2xl shadow-2xl">
              <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden group border border-[var(--border-glow)] animate-shimmer">
                
                {/* Orbiting Laser Border Beam */}
                <BorderBeam size={220} duration={9} />

                {/* Card Glow Header */}
                <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)]">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                      <Code2 className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-[var(--text-primary)]">Engineering Quality</h3>
                      <p className="text-xs text-[var(--text-muted)] font-mono">Production Readiness Benchmark</p>
                    </div>
                  </div>
                  <div className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 radar-ring"></span>
                    <span>100% SLA</span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {PERSONAL_INFO.stats.map((stat, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-[var(--bg-primary)]/70 border border-[var(--border-color)] hover:border-cyan-500/40 transition-all duration-300 space-y-1 group/stat">
                      <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 font-mono group-hover/stat:scale-105 transition-transform">
                        {stat.value}
                      </div>
                      <div className="text-xs text-[var(--text-secondary)] font-medium">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Floating Badge */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-purple-900/30 via-indigo-900/30 to-cyan-900/30 border border-purple-500/30 flex items-center space-x-3 backdrop-blur-md">
                  <Sparkles className="w-6 h-6 text-purple-400 flex-shrink-0 animate-spin" style={{ animationDuration: '8s' }} />
                  <div className="text-xs">
                    <p className="font-semibold text-purple-200">Modern Next.js 15 Specialist</p>
                    <p className="text-purple-300/80">React 19 • TypeScript • Tailwind • Microservices • Edge Cache</p>
                  </div>
                </div>

              </div>
            </TiltCard>
          </div>

        </div>
      </div>
    </section>
  );
}

