"use client";

import { useState } from "react";
import { FolderGit2, Star, GitFork, ArrowUpRight, Search, Sparkles, Globe, Info } from "lucide-react";
import { PROJECTS } from "../data/portfolioData";
import { Project } from "../types";
import ProjectModal from "./ProjectModal";

import TiltCard from "./TiltCard";
import BorderBeam from "./BorderBeam";

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = ["All", "Next.js & Full-Stack", "UI/UX & E-Commerce", "AI & Platforms"];

  const filteredProjects = PROJECTS.filter((project) => {
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-24 relative bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-mono text-xs backdrop-blur-md">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Production Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 animate-gradient-text">Applications</span> & Live Websites
            </h2>
            <p className="text-base text-[var(--text-secondary)]">
              Production web applications, official college & registration portals, e-commerce boutiques, and interactive learning platforms.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects or tech..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-cyan-400 outline-none transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 pt-2 border-b border-[var(--border-color)] pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/25 scale-105"
                  : "bg-[var(--bg-glass)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-cyan-500/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid with 3D Tilt & Specular Lighting */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <TiltCard
              key={project.id}
              onClick={() => setActiveModalProject(project)}
              className="cursor-pointer group"
            >
              <div className="glass-card rounded-2xl p-6 h-full flex flex-col justify-between space-y-6 relative border border-[var(--border-color)] group-hover:border-cyan-500/50 shadow-xl group-hover:shadow-2xl group-hover:shadow-cyan-500/10 transition-all duration-300 animate-shimmer overflow-hidden">
                
                {/* Orbiting Border Laser Beam on Featured Cards */}
                {project.featured && <BorderBeam size={200} duration={8} />}

                {/* Header Badges */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-sm">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                        <Sparkles className="w-3 h-3 animate-pulse" />
                        <span>Featured</span>
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-[var(--text-primary)] group-hover:text-cyan-400 transition-colors flex items-center justify-between">
                      <span>{project.title}</span>
                      <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </h3>
                    <p className="text-xs font-mono text-[var(--accent-cyan)] line-clamp-1">
                      {project.tagline}
                    </p>
                    <p className="text-sm text-[var(--text-secondary)] line-clamp-3 leading-relaxed pt-1">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Metrics & Tech Badges */}
                <div className="space-y-4 pt-4 border-t border-[var(--border-color)]">
                  {/* Tech Pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-[var(--bg-primary)] text-[var(--text-secondary)] border border-[var(--border-color)] group-hover:border-cyan-500/30 transition-colors">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[var(--bg-primary)] text-[var(--text-muted)]">
                        +{project.tags.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Footer Actions */}
                  <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] pt-1">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center space-x-1">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span>{project.stars}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <GitFork className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{project.forks}</span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 hover:from-cyan-500/30 hover:to-emerald-500/30 text-cyan-300 border border-cyan-500/40 flex items-center space-x-1.5 font-bold transition-all hover:scale-105 shadow-sm"
                        >
                          <span>Live Demo</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <span className="text-[var(--text-secondary)] group-hover:text-cyan-400 font-semibold flex items-center space-x-1 px-2 py-1 rounded-lg">
                        <span>Overview</span>
                        <Info className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </TiltCard>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 glass-card rounded-2xl space-y-3">
            <p className="text-lg font-semibold text-[var(--text-secondary)]">No projects match your search.</p>
            <button
              onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
              className="px-4 py-2 rounded-xl bg-cyan-500/10 text-cyan-400 font-mono text-sm border border-cyan-500/30"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* Detail Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
}
