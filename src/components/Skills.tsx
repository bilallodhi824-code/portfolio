"use client";

import { useState } from "react";
import { Cpu, Code2, Server, Database, CheckCircle, Sparkles, Search } from "lucide-react";
import { SKILL_CATEGORIES } from "../data/portfolioData";

import TiltCard from "./TiltCard";

export default function Skills() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number | null>(null);
  const [skillSearch, setSkillSearch] = useState("");

  const iconMap: Record<string, any> = {
    Code2,
    Server,
    Database,
    Cpu
  };

  return (
    <section id="skills" className="py-24 relative bg-[var(--bg-secondary)] border-y border-[var(--border-color)] overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-purple-600/10 rounded-full blur-[130px] pointer-events-none animate-pulse-slow"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 font-mono text-xs backdrop-blur-md">
              <Cpu className="w-3.5 h-3.5 animate-pulse" />
              <span>Technical Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
              Core Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 animate-gradient-text">Mastery Matrix</span>
            </h2>
            <p className="text-base text-[var(--text-secondary)]">
              Expertise built across 6+ years of shipping enterprise web applications, high-concurrency microservices, and design systems.
            </p>
          </div>

          {/* Search skill */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={skillSearch}
              onChange={(e) => setSkillSearch(e.target.value)}
              placeholder="Filter skills (e.g. Next.js)..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-purple-400 outline-none transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Categories Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const Icon = iconMap[cat.iconName] || Cpu;
            const matchingSkills = cat.skills.filter(s => 
              s.name.toLowerCase().includes(skillSearch.toLowerCase())
            );

            if (skillSearch && matchingSkills.length === 0) return null;

            return (
              <TiltCard key={idx} className="rounded-2xl">
                <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6 border border-[var(--border-color)] hover:border-purple-500/40 shadow-xl transition-all duration-300 animate-shimmer h-full">
                  {/* Category Header */}
                  <div className="flex items-center space-x-3 pb-4 border-b border-[var(--border-color)]">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shadow-md shadow-purple-500/20">
                      <Icon className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-[var(--text-primary)]">{cat.title}</h3>
                      <p className="text-xs text-[var(--text-muted)] font-mono">{matchingSkills.length} Verified Technologies</p>
                    </div>
                  </div>

                  {/* Skills Bar List */}
                  <div className="space-y-4">
                    {matchingSkills.map((skill) => (
                      <div key={skill.name} className="space-y-2 group/skill">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-[var(--text-primary)] group-hover/skill:text-cyan-400 transition-colors">{skill.name}</span>
                            {skill.highlight && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                                Core
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 font-mono text-xs">
                            <span className="text-[var(--text-muted)]">{skill.experience}</span>
                            <span className="font-bold text-purple-400">{skill.level}%</span>
                          </div>
                        </div>

                        {/* Progress Bar Container */}
                        <div className="w-full h-2 rounded-full bg-[var(--bg-primary)] overflow-hidden border border-[var(--border-color)]">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 transition-all duration-1000 shadow-sm shadow-cyan-400/50"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>

      </div>
    </section>
  );
}
