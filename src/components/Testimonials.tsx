"use client";

import { Quote, Star, CheckCircle, Sparkles, StarHalf, UserCheck } from "lucide-react";
import { TESTIMONIALS } from "../data/portfolioData";
import TiltCard from "./TiltCard";
import BorderBeam from "./BorderBeam";

export default function Testimonials() {
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;

    return (
      <div className="flex items-center space-x-1">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="w-4 h-4 text-amber-400 fill-amber-400" />
        ))}
        {hasHalf && (
          <div className="relative">
            <Star className="w-4 h-4 text-slate-600" />
            <div className="absolute inset-0 overflow-hidden w-[50%]">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            </div>
          </div>
        )}
        {[...Array(5 - fullStars - (hasHalf ? 1 : 0))].map((_, i) => (
          <Star key={`empty-${i}`} className="w-4 h-4 text-slate-700" />
        ))}
      </div>
    );
  };

  return (
    <section className="py-24 relative bg-[var(--bg-primary)] overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 right-1/4 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none animate-pulse-slow"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Header */}
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 font-mono text-xs backdrop-blur-md">
            <Quote className="w-3.5 h-3.5 animate-pulse" />
            <span>Engineering Leadership Feedback</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
            Endorsements & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-cyan-400 animate-gradient-text">Recommendations</span>
          </h2>
          <p className="text-base text-[var(--text-secondary)]">
            What Pakistani & global engineering leaders and product partners say about working together.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <TiltCard key={t.id} className="h-full">
              <div className="glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 border border-[var(--border-color)] group-hover:border-amber-500/50 transition-all shadow-xl h-full animate-shimmer relative overflow-hidden">
                
                {/* Orbiting Laser Border Beam on top rating card */}
                {t.rating >= 4.5 && <BorderBeam size={190} duration={8 + idx * 2} />}

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {renderStars(t.rating)}
                      <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                        {t.rating.toFixed(1)}
                      </span>
                    </div>

                    {t.verified && (
                      <span className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        <CheckCircle className="w-3 h-3" />
                        <span>Verified Tech Lead</span>
                      </span>
                    )}
                  </div>

                  <p className="text-sm sm:text-base text-[var(--text-secondary)] italic leading-relaxed group-hover:text-[var(--text-primary)] transition-colors">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center space-x-4 pt-4 border-t border-[var(--border-color)] relative z-10">
                  {/* Clean Professional Avatar Initials Badge (Replacing profile pictures as requested) */}
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500/20 via-orange-500/20 to-cyan-500/20 border-2 border-amber-400/40 flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 transition-transform">
                    <span className="font-mono font-extrabold text-sm text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-cyan-300">
                      {t.initials}
                    </span>
                  </div>

                  <div className="truncate">
                    <h4 className="font-bold text-sm sm:text-base text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] transition-colors truncate">
                      {t.name}
                    </h4>
                    <p className="text-xs text-[var(--text-muted)] font-mono truncate">{t.role} • {t.company}</p>
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

      </div>
    </section>
  );
}

