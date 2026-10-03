"use client";

import { Award, ShieldCheck, CheckCircle2, ExternalLink, Calendar, Key } from "lucide-react";
import { CERTIFICATIONS } from "../data/portfolioData";

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 relative bg-[var(--bg-secondary)] border-y border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 font-mono text-xs">
            <Award className="w-3.5 h-3.5" />
            <span>Verified Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
            Industry <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-cyan-400">Certifications</span> & Mastery
          </h2>
          <p className="text-base text-[var(--text-secondary)]">
            Official cloud, frontend, and Next.js certifications validating senior technical domain expertise.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.id}
              className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 border border-[var(--border-color)] hover:border-amber-500/40 transition-all duration-300 shadow-xl group"
            >
              <div className="space-y-4">
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  <div className={`px-3 py-1 rounded-full text-xs font-mono font-bold text-white bg-gradient-to-r ${cert.badgeColor} shadow-md`}>
                    {cert.issuer}
                  </div>
                  {cert.verified && (
                    <span className="flex items-center space-x-1 text-[10px] font-mono font-semibold text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Verified</span>
                    </span>
                  )}
                </div>

                {/* Title */}
                <div className="space-y-1.5">
                  <h3 className="text-xl font-bold text-[var(--text-primary)] group-hover:text-amber-400 transition-colors">
                    {cert.title}
                  </h3>
                  <div className="flex items-center space-x-3 text-xs font-mono text-[var(--text-muted)]">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      <span>{cert.issueDate}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Key className="w-3.5 h-3.5 text-cyan-400" />
                      <span>ID: {cert.credentialId}</span>
                    </span>
                  </div>
                </div>

                {/* Skill Pills */}
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {cert.skills.map((skill) => (
                    <span key={skill} className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-[var(--bg-primary)] text-[var(--accent-cyan)] border border-[var(--border-color)]">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--border-color)] flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
                <span className="flex items-center space-x-1 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Active Credential</span>
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
