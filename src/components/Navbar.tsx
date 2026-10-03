"use client";

import { useState, useEffect } from "react";
import { Terminal as TerminalIcon, Menu, X, Code, Briefcase, Cpu, FolderGit2, Mail, Award, Zap, Sparkles } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

interface NavbarProps {
  onOpenTerminal?: () => void;
}

export default function Navbar({ onOpenTerminal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about", icon: Code },
    { name: "Projects", href: "#projects", icon: FolderGit2 },
    { name: "Skills", href: "#skills", icon: Cpu },
    { name: "Certifications", href: "#certifications", icon: Award },
    { name: "Services", href: "#services", icon: Zap },
    { name: "Experience", href: "#experience", icon: Briefcase },
    { name: "Contact", href: "#contact", icon: Mail },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass-nav py-3" : "bg-transparent py-5"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-emerald-400 to-indigo-500 p-0.5 shadow-lg group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-[#090d16] rounded-[10px] flex items-center justify-center">
              <span className="font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">BK</span>
            </div>
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight text-[var(--text-primary)] block">Bilal Khan Lodhi</span>
            <span className="font-mono text-xs text-[var(--accent-cyan)] flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Next.js Architect</span>
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-1 bg-[var(--bg-glass)] border border-[var(--border-color)] px-3 py-1.5 rounded-full shadow-inner backdrop-blur-md">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1 rounded-full text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-color)] transition-all flex items-center space-x-1.5"
              >
                <Icon className="w-3.5 h-3.5 text-[var(--accent-cyan)] opacity-70" />
                <span>{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Actions & CTA */}
        <div className="hidden md:flex items-center space-x-3">
          {onOpenTerminal && (
            <button
              onClick={onOpenTerminal}
              className="flex items-center space-x-2 px-3.5 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 text-xs font-mono transition-all shadow-sm cursor-pointer"
              title="Open Interactive Terminal"
            >
              <TerminalIcon className="w-4 h-4 text-cyan-400" />
              <span>Terminal CLI</span>
            </button>
          )}
          <ThemeToggle />
          <a
            href="#contact"
            className="px-4 py-2 rounded-full font-medium text-sm text-slate-900 bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-105 transition-all duration-300"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center space-x-3">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-primary)]"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-nav border-b border-[var(--border-color)] px-4 pt-3 pb-6 space-y-3 mt-2 animate-fadeIn max-h-[80vh] overflow-y-auto">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-base font-medium text-[var(--text-primary)] hover:bg-[var(--border-color)] transition-colors"
              >
                <Icon className="w-5 h-5 text-[var(--accent-cyan)]" />
                <span>{link.name}</span>
              </a>
            );
          })}
          {onOpenTerminal && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTerminal();
              }}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg border border-cyan-500/40 bg-cyan-500/10 text-cyan-400 font-mono text-sm"
            >
              <TerminalIcon className="w-4 h-4" />
              <span>Launch Terminal CLI</span>
            </button>
          )}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center w-full px-4 py-2.5 rounded-lg font-semibold text-slate-900 bg-gradient-to-r from-cyan-400 to-emerald-400"
          >
            Hire Me
          </a>
        </div>
      )}
    </header>
  );
}
