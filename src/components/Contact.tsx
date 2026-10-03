"use client";

import { useState } from "react";
import { Mail, Send, Copy, Check, MessageSquare, Sparkles, AlertCircle, Phone } from "lucide-react";
import { PERSONAL_INFO } from "../data/portfolioData";

import TiltCard from "./TiltCard";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Role / Project Inquiry",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "Role / Project Inquiry", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-24 relative bg-[var(--bg-secondary)] border-t border-[var(--border-color)] overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute bottom-0 left-1/4 w-[450px] h-[450px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none animate-pulse-slow"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Header */}
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-mono text-xs backdrop-blur-md">
            <Mail className="w-3.5 h-3.5 animate-pulse" />
            <span>Get in Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
            Let's Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 animate-gradient-text">Exceptional</span>
          </h2>
          <p className="text-base text-[var(--text-secondary)]">
            Interested in hiring for a senior full-stack role, architecture consultation, or custom Next.js development? Drop a message below!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Info in TiltCard */}
          <div className="lg:col-span-5 space-y-6">
            <TiltCard className="rounded-2xl">
              <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6 border border-[var(--border-color)] hover:border-cyan-500/40 shadow-xl transition-all duration-300 animate-shimmer">
                <h3 className="text-xl font-bold text-[var(--text-primary)] flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5 text-cyan-400" />
                  <span>Contact Channels</span>
                </h3>

                {/* Copy Email Box */}
                <div className="p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-2 group/email">
                  <span className="text-xs text-[var(--text-muted)] font-mono">Direct Email Address</span>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm sm:text-base font-semibold text-[var(--text-primary)] truncate pr-2 group-hover/email:text-cyan-400 transition-colors">
                      {PERSONAL_INFO.email}
                    </span>
                    <button
                      onClick={handleCopyEmail}
                      className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/30 transition-all hover:scale-105"
                      title="Copy Email Address"
                    >
                      {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Phone Box */}
                {PERSONAL_INFO.phone && (
                  <div className="p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-1">
                    <span className="text-xs text-[var(--text-muted)] font-mono">Direct Phone Number</span>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-emerald-400" />
                      <a href={`tel:${PERSONAL_INFO.phone}`} className="font-mono text-sm sm:text-base font-semibold text-cyan-400 hover:underline">
                        {PERSONAL_INFO.phone}
                      </a>
                    </div>
                  </div>
                )}

                {/* Location & Status */}
                <div className="space-y-3 pt-2 text-sm text-[var(--text-secondary)]">
                  <div className="flex flex-col space-y-1">
                    <span className="text-xs text-[var(--text-muted)] font-mono">Address & Location:</span>
                    <span className="font-mono text-[var(--text-primary)] font-semibold leading-relaxed">{PERSONAL_INFO.location}</span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span>Timezone:</span>
                    <span className="font-mono text-[var(--text-primary)] font-semibold">PKT (UTC+5) / Flexible</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Response Time:</span>
                    <span className="font-mono text-emerald-400 font-semibold flex items-center space-x-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 radar-ring"></span>
                      <span>&lt; 12 Hours</span>
                    </span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="pt-4 border-t border-[var(--border-color)] space-y-3">
                  <span className="text-xs font-mono uppercase text-[var(--text-muted)] block">Social Networks</span>
                  <div className="flex items-center space-x-3">
                    <a
                      href={PERSONAL_INFO.github}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-cyan-400 hover:border-cyan-400 transition-all hover:scale-110 shadow-sm"
                      aria-label="GitHub Profile"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                      </svg>
                    </a>
                    <a
                      href={PERSONAL_INFO.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-cyan-400 hover:border-cyan-400 transition-all hover:scale-110 shadow-sm"
                      aria-label="LinkedIn Profile"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                    <a
                      href={PERSONAL_INFO.twitter}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-cyan-400 hover:border-cyan-400 transition-all hover:scale-110 shadow-sm"
                      aria-label="Twitter Profile"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 glass-card rounded-2xl p-6 sm:p-8 border border-[var(--border-color)] space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[var(--text-secondary)] font-semibold">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-cyan-400 outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[var(--text-secondary)] font-semibold">Your Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. sarah@techcorp.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-cyan-400 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[var(--text-secondary)] font-semibold">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] outline-none transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[var(--text-secondary)] font-semibold">Message *</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your project, role, or timelines..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-cyan-400 outline-none transition-all resize-none"
                />
              </div>

              {/* Status Notifications */}
              {status === "success" && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm flex items-center space-x-2">
                  <Check className="w-5 h-5 flex-shrink-0" />
                  <span>Your message was sent successfully! Bilal will get back to you shortly.</span>
                </div>
              )}

              {status === "error" && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>Failed to send message. Please copy direct email above.</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-3.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
              >
                <span>{status === "sending" ? "Transmitting Message..." : "Send Message"}</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
