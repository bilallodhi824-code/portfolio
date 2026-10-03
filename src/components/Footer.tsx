"use client";

import { Code2, Heart, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 bg-[var(--bg-primary)] border-t border-[var(--border-color)] font-mono text-xs text-[var(--text-muted)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-emerald-400 p-0.5">
            <div className="w-full h-full bg-[#090d16] rounded-[6px] flex items-center justify-center font-bold text-cyan-400 text-xs">
              BK
            </div>
          </div>
          <div>
            <span className="text-[var(--text-primary)] font-semibold block">Bilal Khan Lodhi</span>
            <span>Senior Full-Stack & Next.js Architect</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-center">
          <span>Engineered with</span>
          <span className="text-cyan-400 font-bold">Next.js 15 App Router</span>
          <span>&</span>
          <span className="text-emerald-400 font-bold">TypeScript</span>
        </div>

        <div className="flex items-center space-x-4">
          <span>© {new Date().getFullYear()} All rights reserved.</span>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-cyan-400 text-[var(--text-primary)] transition-all cursor-pointer"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}
