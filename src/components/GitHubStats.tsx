"use client";

import { GitCommit, Star, GitFork, Code2, Flame, Award, Zap } from "lucide-react";
import TiltCard from "./TiltCard";

export default function GitHubStats() {
  // 52-week activity grid mock
  const weeks = Array.from({ length: 28 }, (_, i) => i);
  const days = Array.from({ length: 7 }, (_, i) => i);

  const getIntensityClass = (wIndex: number, dIndex: number) => {
    const score = (wIndex * 3 + dIndex * 7) % 5;
    if (score === 0) return "bg-slate-800/40 hover:bg-slate-700";
    if (score === 1) return "bg-emerald-950/70 border border-emerald-900/60 hover:border-emerald-500";
    if (score === 2) return "bg-emerald-700/70 hover:bg-emerald-600 shadow-sm";
    if (score === 3) return "bg-emerald-500/90 hover:bg-emerald-400 shadow-sm shadow-emerald-500/40";
    return "bg-emerald-400 shadow-md shadow-emerald-400/60 hover:scale-125";
  };

  const languages = [
    { name: "TypeScript & Next.js", percent: 45, color: "bg-cyan-400" },
    { name: "React 19 & Tailwind", percent: 30, color: "bg-emerald-400" },
    { name: "Node.js & GraphQL", percent: 15, color: "bg-purple-400" },
    { name: "PostgreSQL & Prisma", percent: 10, color: "bg-amber-400" },
  ];

  return (
    <section className="py-24 relative bg-[var(--bg-secondary)] border-t border-[var(--border-color)] overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none animate-pulse-slow"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Header */}
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-xs backdrop-blur-md">
            <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Open Source & Commits</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
            GitHub Activity & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 animate-gradient-text">Contribution Matrix</span>
          </h2>
          <p className="text-base text-[var(--text-secondary)]">
            Real-time representation of code output, repository stars, and language distribution across 2,400+ annual commits.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Contribution Grid in TiltCard */}
          <div className="lg:col-span-7">
            <TiltCard className="h-full">
              <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6 border border-[var(--border-color)] hover:border-emerald-500/40 shadow-xl transition-all duration-300 animate-shimmer h-full flex flex-col justify-between">
                <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)]">
                  <div className="flex items-center space-x-2">
                    <GitCommit className="w-5 h-5 text-emerald-400 animate-spin" style={{ animationDuration: '10s' }} />
                    <span className="font-bold text-sm sm:text-base text-[var(--text-primary)]">2,418 Commits in 2025</span>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30 flex items-center space-x-1">
                    <Zap className="w-3 h-3 text-amber-400" />
                    <span>Streak: 42 Days</span>
                  </span>
                </div>

                {/* Heatmap Grid Visual */}
                <div className="space-y-2 overflow-x-auto py-2">
                  <div className="flex space-x-1.5 min-w-[500px]">
                    {weeks.map((w) => (
                      <div key={w} className="flex flex-col space-y-1.5">
                        {days.map((d) => (
                          <div
                            key={d}
                            className={`w-3.5 h-3.5 rounded-sm transition-all duration-300 cursor-pointer ${getIntensityClass(w, d)}`}
                            title={`Activity Intensity: Day ${d + 1}, Week ${w + 1}`}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] pt-2">
                    <span>Jan 2025</span>
                    <span>Jul 2025</span>
                    <span>Dec 2025</span>
                  </div>
                </div>

                {/* Stats Summary Row */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[var(--border-color)] text-center">
                  <div className="p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-cyan-500/40 transition-colors">
                    <span className="text-xs text-[var(--text-muted)] font-mono block">Public Repos</span>
                    <span className="text-xl font-bold font-mono text-cyan-400">48</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-amber-500/40 transition-colors">
                    <span className="text-xs text-[var(--text-muted)] font-mono block">Total Stars</span>
                    <span className="text-xl font-bold font-mono text-amber-400 flex items-center justify-center space-x-1">
                      <Star className="w-4 h-4 fill-amber-400" />
                      <span>1,230</span>
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-emerald-500/40 transition-colors">
                    <span className="text-xs text-[var(--text-muted)] font-mono block">Pull Requests</span>
                    <span className="text-xl font-bold font-mono text-emerald-400">312</span>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Right Column: Language Breakdown Bar in TiltCard */}
          <div className="lg:col-span-5">
            <TiltCard className="h-full">
              <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6 border border-[var(--border-color)] hover:border-cyan-500/40 shadow-xl transition-all duration-300 animate-shimmer h-full flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-bold text-lg text-[var(--text-primary)] flex items-center space-x-2">
                    <Code2 className="w-5 h-5 text-cyan-400" />
                    <span>Primary Language Distribution</span>
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)]">Based on production code volume across open source & client projects.</p>
                </div>

                {/* Progress Stack */}
                <div className="space-y-4">
                  <div className="w-full h-3 rounded-full bg-[var(--bg-primary)] overflow-hidden flex border border-[var(--border-color)] shadow-inner">
                    {languages.map((lang) => (
                      <div
                        key={lang.name}
                        className={`h-full ${lang.color} transition-all duration-1000`}
                        style={{ width: `${lang.percent}%` }}
                        title={`${lang.name}: ${lang.percent}%`}
                      />
                    ))}
                  </div>

                  {/* Legend List */}
                  <div className="space-y-2.5 pt-2">
                    {languages.map((lang) => (
                      <div key={lang.name} className="flex items-center justify-between text-xs font-mono group/lang">
                        <div className="flex items-center space-x-2">
                          <span className={`w-3 h-3 rounded-full ${lang.color} shadow-sm group-hover/lang:scale-125 transition-transform`} />
                          <span className="text-[var(--text-primary)] font-semibold group-hover/lang:text-cyan-400 transition-colors">{lang.name}</span>
                        </div>
                        <span className="text-[var(--text-muted)] font-bold">{lang.percent}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300 flex items-center justify-between backdrop-blur-md">
                  <span>Code Style: Standard Semi / Strict TS</span>
                  <span className="text-emerald-400 font-bold flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 radar-ring"></span>
                    <span>100% Passed</span>
                  </span>
                </div>
              </div>
            </TiltCard>
          </div>

        </div>

      </div>
    </section>
  );
}
