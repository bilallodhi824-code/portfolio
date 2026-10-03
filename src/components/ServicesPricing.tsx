"use client";

import { CheckCircle2, Sparkles, Zap, ArrowRight, ShieldCheck, Clock } from "lucide-react";
import { SERVICES } from "../data/portfolioData";
import TiltCard from "./TiltCard";

export default function ServicesPricing() {
  return (
    <section id="services" className="py-24 relative bg-[var(--bg-primary)] overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none animate-pulse-slow"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Header */}
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-mono text-xs backdrop-blur-md">
            <Zap className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
            <span>Consulting & Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
            Development <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 animate-gradient-text">Packages</span> & Consulting
          </h2>
          <p className="text-base text-[var(--text-secondary)]">
            High-value engineering services tailored for startups, enterprise platforms, and scaling businesses.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map((pkg) => (
            <TiltCard
              key={pkg.id}
              className="h-full"
            >
              <div
                className={`glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 border transition-all duration-300 shadow-xl relative h-full animate-shimmer ${
                  pkg.popular
                    ? "border-cyan-400 ring-2 ring-cyan-400/30 bg-slate-900/90 shadow-cyan-500/20"
                    : "border-[var(--border-color)] hover:border-cyan-500/40"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 font-extrabold text-[10px] text-slate-950 font-mono tracking-wider uppercase shadow-lg shadow-cyan-500/30 flex items-center space-x-1">
                    <Sparkles className="w-3 h-3 animate-pulse" />
                    <span>Most Popular Choice</span>
                  </div>
                )}

                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-[var(--text-primary)]">{pkg.title}</h3>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{pkg.subtitle}</p>
                  </div>

                  <div className="flex items-baseline space-x-2 border-b border-[var(--border-color)] pb-4">
                    <span className="text-3xl sm:text-4xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                      {pkg.price}
                    </span>
                    <span className="text-xs font-mono text-[var(--text-muted)]">/ {pkg.period}</span>
                  </div>

                  {/* Timeline info */}
                  <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1.5 rounded-lg border border-cyan-500/20">
                    <Clock className="w-4 h-4" />
                    <span>Delivery: {pkg.timeline}</span>
                  </div>

                  {/* Feature Checklist */}
                  <ul className="space-y-3 pt-2">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start space-x-2.5 text-xs sm:text-sm text-[var(--text-secondary)]">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="pt-6 border-t border-[var(--border-color)]">
                  <a
                    href="#contact"
                    className={`w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center space-x-2 transition-all duration-300 shadow-md ${
                      pkg.popular
                        ? "bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 hover:shadow-xl hover:shadow-cyan-500/30 hover:scale-[1.03]"
                        : "bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] hover:border-cyan-400 hover:text-cyan-400"
                    }`}
                  >
                    <span>{pkg.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

      </div>
    </section>
  );
}
