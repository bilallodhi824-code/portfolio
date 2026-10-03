"use client";

import { Briefcase, Calendar, MapPin, CheckCircle2, Award, Building2 } from "lucide-react";
import { EXPERIENCES } from "../data/portfolioData";
import TiltCard from "./TiltCard";

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative bg-[var(--bg-primary)] overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 right-0 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none animate-pulse-slow"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Title */}
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-xs backdrop-blur-md">
            <Briefcase className="w-3.5 h-3.5 animate-pulse" />
            <span>Career Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 animate-gradient-text">Experience</span> & Leadership
          </h2>
          <p className="text-base text-[var(--text-secondary)]">
            A proven record of leading engineering initiatives, optimizing performance metrics, and scaling digital products.
          </p>
        </div>

        {/* Timeline Stack */}
        <div className="relative border-l-2 border-[var(--border-color)] ml-4 sm:ml-8 space-y-12 pl-6 sm:pl-10">
          {EXPERIENCES.map((exp) => (
            <div key={exp.id} className="relative group">
              {/* Animated Timeline Dot with Radar Ping */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-5 h-5 rounded-full bg-[var(--bg-primary)] border-4 border-emerald-400 group-hover:scale-125 transition-transform duration-300 shadow-md shadow-emerald-400/50 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300"></span>
              </div>

              {/* Card Content in TiltCard */}
              <TiltCard className="rounded-2xl">
                <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6 border border-[var(--border-color)] group-hover:border-emerald-500/50 transition-all shadow-xl animate-shimmer">
                  {/* Header info */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-sm">
                          {exp.type}
                        </span>
                        <span className="text-xs font-mono text-[var(--text-muted)] flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{exp.location}</span>
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] pt-1 group-hover:text-cyan-400 transition-colors">
                        {exp.role}
                      </h3>
                      <p className="text-sm font-semibold text-[var(--accent-cyan)] flex items-center space-x-1.5">
                        <Building2 className="w-4 h-4" />
                        <span>{exp.company}</span>
                      </p>
                    </div>

                    <div className="flex items-center space-x-1.5 font-mono text-xs text-[var(--text-secondary)] bg-[var(--bg-primary)] px-3 py-1.5 rounded-lg border border-[var(--border-color)] self-start sm:self-auto shadow-inner">
                      <Calendar className="w-4 h-4 text-emerald-400" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Key Achievements */}
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold flex items-center space-x-1.5">
                      <Award className="w-4 h-4 text-amber-400" />
                      <span>Key Leadership Milestones</span>
                    </h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((item, i) => (
                        <li key={i} className="flex items-start space-x-2 text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="pt-2 flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1 rounded-lg text-xs font-mono bg-[var(--bg-primary)] text-[var(--accent-cyan)] border border-[var(--border-color)] hover:border-cyan-500/40 transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
