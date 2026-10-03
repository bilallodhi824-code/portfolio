"use client";

import { X, ExternalLink, Star, GitFork, CheckCircle2, Layers, Globe, Sparkles } from "lucide-react";
import { Project } from "../types";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-card rounded-2xl border border-[var(--border-glow)] bg-[var(--bg-secondary)] shadow-2xl p-6 sm:p-8 space-y-6">
        
        {/* Header Bar */}
        <div className="flex items-start justify-between border-b border-[var(--border-color)] pb-4">
          <div className="space-y-1.5 pr-4">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                {project.category}
              </span>
              {project.featured && (
                <span className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  <Sparkles className="w-3 h-3" />
                  <span>Featured Production App</span>
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] pt-1">
              {project.title}
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              {project.tagline}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full border border-[var(--border-color)] hover:bg-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Overview & Description */}
        <div className="space-y-3">
          <h3 className="font-bold text-base text-[var(--text-primary)] flex items-center space-x-2">
            <Globe className="w-5 h-5 text-cyan-400" />
            <span>Website Overview & Purpose</span>
          </h3>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            {project.fullDescription}
          </p>
        </div>

        {/* Metrics Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {project.metrics.map((metric, i) => (
            <div key={i} className="p-3.5 rounded-xl bg-[var(--bg-primary)]/80 border border-[var(--border-color)] flex items-center space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-semibold text-[var(--text-primary)]">{metric}</span>
            </div>
          ))}
        </div>

        {/* Key Features & Architecture */}
        {project.architecture && (
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold flex items-center space-x-1.5">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Core Features & Implementation Highlights</span>
            </h4>
            <ul className="space-y-2">
              {project.architecture.map((item, i) => (
                <li key={i} className="flex items-start space-x-2 text-sm text-[var(--text-secondary)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech Stack Pills */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold">Technologies Used</h4>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-lg text-xs font-mono bg-[var(--bg-primary)] text-[var(--accent-cyan)] border border-[var(--border-color)]">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="pt-4 border-t border-[var(--border-color)] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4 text-xs font-mono text-[var(--text-muted)]">
            <span className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>{project.stars} Stars</span>
            </span>
            <span className="flex items-center space-x-1">
              <GitFork className="w-4 h-4 text-cyan-400" />
              <span>{project.forks} Forks</span>
            </span>
          </div>

          <div className="flex items-center space-x-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl text-sm font-medium border border-[var(--border-color)] bg-[var(--bg-glass)] text-[var(--text-primary)] hover:border-cyan-400 flex items-center space-x-2 transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                <span>GitHub</span>
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:shadow-lg hover:shadow-cyan-500/25 flex items-center space-x-2 transition-all hover:scale-105"
              >
                <span>Launch Live Website</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
