"use client";

import { useState, useEffect } from "react";
import { Clock, Radio, Activity, Music, Code2, Cpu, Globe, Zap, ShieldCheck, Sparkles, Terminal } from "lucide-react";
import TiltCard from "./TiltCard";

export default function BentoGrid() {
  const [timePKT, setTimePKT] = useState("");
  const [timeUTC, setTimeUTC] = useState("");
  const [latency, setLatency] = useState(24);
  const [isPlayingMusic, setIsPlayingMusic] = useState(true);
  const [activeCodeTab, setActiveCodeTab] = useState<"middleware" | "serverAction" | "cache">("middleware");

  // Real-time Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimePKT(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Karachi",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true
        })
      );
      setTimeUTC(
        now.toLocaleTimeString("en-US", {
          timeZone: "UTC",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false
        }) + " UTC"
      );
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulating live Edge Latency jitter (18ms - 32ms)
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(18 + Math.random() * 14));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Web Audio Synth Chime
  const playChime = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch {
      // AudioContext blocked or not supported
    }
  };

  const codeSnippets = {
    middleware: `// Next.js 15 Edge Middleware
export async function middleware(req: NextRequest) {
  const edgeGeo = req.geo?.city || "Direct Edge";
  const res = NextResponse.next();
  res.headers.set("X-Edge-Cluster", edgeGeo);
  res.headers.set("X-Cache-Status", "HIT-L1");
  return res;
}`,
    serverAction: `// Server Action with Optimistic UI
"use server";
import { revalidateTag } from "next/cache";

export async function mutateProject(id: string) {
  await db.project.update({ where: { id } });
  revalidateTag("projects-feed");
  return { success: true, latency: "14ms" };
}`,
    cache: `// Dynamic ISR with Stale-While-Revalidate
export const dynamic = "force-static";
export const revalidate = 60; // 60s Edge ISR

export async function getTelemetryStream() {
  return await fetch("https://api.vectonix.com/telemetry", {
    next: { tags: ["telemetry"] }
  });
}`
  };

  return (
    <section className="py-24 relative bg-[var(--bg-secondary)] border-y border-[var(--border-color)] overflow-hidden">
      {/* Ambient background lights */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none animate-pulse-slow"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-mono text-xs backdrop-blur-md">
            <Radio className="w-3.5 h-3.5 animate-pulse text-rose-400" />
            <span>Interactive Engineering Matrix</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
            Live Telemetry & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 animate-gradient-text">Bento Hub</span>
          </h2>
          <p className="text-base text-[var(--text-secondary)]">
            Interactive real-time telemetry, live timezones, edge response monitors, and code architecture sandbox.
          </p>
        </div>

        {/* Bento Grid Layout (meetfaisal-style modular tiles) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* Tile 1: Live Clocks & Availability (Col 4) */}
          <div className="md:col-span-4">
            <TiltCard className="h-full">
              <div className="glass-card rounded-3xl p-6 sm:p-8 border border-[var(--border-color)] hover:border-cyan-500/40 shadow-xl h-full flex flex-col justify-between space-y-6 animate-shimmer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-cyan-400" />
                    <span className="font-bold text-sm text-[var(--text-primary)]">Global Timezone</span>
                  </div>
                  <span className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-xs border border-emerald-500/30">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 radar-ring"></span>
                    <span>Available</span>
                  </span>
                </div>

                <div className="space-y-4 py-2">
                  <div className="p-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-1">
                    <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">Karachi / Pakistan (PKT)</span>
                    <div className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-400 tracking-tight">
                      {timePKT || "06:22:00 PM"}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[var(--bg-primary)]/60 border border-[var(--border-color)] flex items-center justify-between font-mono text-xs text-[var(--text-secondary)]">
                    <span>UTC Baseline:</span>
                    <span className="text-slate-300 font-semibold">{timeUTC || "13:22:00 UTC"}</span>
                  </div>
                </div>

                <div className="text-xs text-[var(--text-muted)] font-mono flex items-center justify-between">
                  <span>Location: Karachi, PK</span>
                  <span className="text-cyan-400">Remote Worldwide</span>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Tile 2: Live Edge Latency Monitor (Col 4) */}
          <div className="md:col-span-4">
            <TiltCard className="h-full">
              <div className="glass-card rounded-3xl p-6 sm:p-8 border border-[var(--border-color)] hover:border-emerald-500/40 shadow-xl h-full flex flex-col justify-between space-y-6 animate-shimmer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-emerald-400" />
                    <span className="font-bold text-sm text-[var(--text-primary)]">Edge Response Pulse</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-[10px] border border-emerald-500/30">
                    Vercel Edge L1
                  </span>
                </div>

                <div className="space-y-3 text-center py-2">
                  <div className="text-4xl sm:text-5xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                    {latency} <span className="text-xl text-emerald-400/80">ms</span>
                  </div>
                  <p className="text-xs font-mono text-[var(--text-secondary)]">Roundtrip Edge DNS + TLS 1.3 Handshake</p>
                </div>

                {/* Simulated Latency Pulse Wave */}
                <div className="flex items-end justify-center space-x-1.5 h-10 py-1">
                  {[40, 65, 30, 85, 50, 95, 45, 70, 35, 90, 60, 100].map((h, i) => (
                    <span
                      key={i}
                      className="w-1.5 rounded-full bg-gradient-to-t from-emerald-600 to-cyan-400 transition-all duration-500"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>

                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-300 flex items-center justify-between">
                  <span>SLA Guarantee</span>
                  <span className="font-bold">99.99% Uptime</span>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Tile 3: Focus & Audio Chime Synthesizer (Col 4) */}
          <div className="md:col-span-4">
            <TiltCard className="h-full">
              <div className="glass-card rounded-3xl p-6 sm:p-8 border border-[var(--border-color)] hover:border-purple-500/40 shadow-xl h-full flex flex-col justify-between space-y-6 animate-shimmer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Music className="w-5 h-5 text-purple-400" />
                    <span className="font-bold text-sm text-[var(--text-primary)]">Engineering Frequency</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/10 text-purple-300 border border-purple-500/30">
                    432 Hz Lo-Fi
                  </span>
                </div>

                <div className="space-y-3 py-2">
                  <div className="flex items-center space-x-3 p-3 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)]">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-5 h-5 text-purple-400 animate-spin" style={{ animationDuration: '6s' }} />
                    </div>
                    <div className="truncate text-xs">
                      <p className="font-bold text-[var(--text-primary)] truncate">Deep Focus Session</p>
                      <p className="text-[var(--text-muted)] font-mono">Next.js 15 & High Concurrency</p>
                    </div>
                  </div>

                  {/* Equalizer bars */}
                  <div className="flex items-end justify-between h-8 px-2">
                    {[60, 100, 40, 80, 50, 90, 30, 70, 95, 45, 85, 60, 75, 40, 90].map((bar, i) => (
                      <span
                        key={i}
                        className="w-1 rounded-full bg-purple-400/80 animate-pulse"
                        style={{
                          height: isPlayingMusic ? `${bar}%` : '20%',
                          animationDuration: `${0.6 + (i % 5) * 0.2}s`
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Interactive Sound Chime Button */}
                <button
                  onClick={playChime}
                  className="w-full py-2.5 rounded-xl font-mono text-xs font-semibold bg-purple-950/40 text-purple-300 border border-purple-500/40 hover:bg-purple-900/50 hover:border-purple-400 transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-md"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Test Audio Synthesis Chime</span>
                </button>
              </div>
            </TiltCard>
          </div>

          {/* Tile 4: Code Architecture Sandbox (Full Col 12) */}
          <div className="md:col-span-12">
            <TiltCard className="rounded-3xl">
              <div className="glass-card rounded-3xl p-6 sm:p-8 border border-cyan-500/30 shadow-2xl space-y-4 animate-shimmer">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                      <Terminal className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-[var(--text-primary)]">Modern Architecture Blueprint</h3>
                      <p className="text-xs text-[var(--text-muted)] font-mono">Real patterns used in production apps</p>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setActiveCodeTab("middleware")}
                      className={`px-3 py-1.5 rounded-xl font-mono text-xs font-semibold transition-all cursor-pointer ${
                        activeCodeTab === "middleware"
                          ? "bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/30"
                          : "bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:text-white border border-[var(--border-color)]"
                      }`}
                    >
                      Edge Middleware
                    </button>
                    <button
                      onClick={() => setActiveCodeTab("serverAction")}
                      className={`px-3 py-1.5 rounded-xl font-mono text-xs font-semibold transition-all cursor-pointer ${
                        activeCodeTab === "serverAction"
                          ? "bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/30"
                          : "bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:text-white border border-[var(--border-color)]"
                      }`}
                    >
                      Server Action
                    </button>
                    <button
                      onClick={() => setActiveCodeTab("cache")}
                      className={`px-3 py-1.5 rounded-xl font-mono text-xs font-semibold transition-all cursor-pointer ${
                        activeCodeTab === "cache"
                          ? "bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/30"
                          : "bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:text-white border border-[var(--border-color)]"
                      }`}
                    >
                      Edge ISR Cache
                    </button>
                  </div>
                </div>

                {/* Code Block */}
                <div className="rounded-2xl bg-slate-950 p-4 sm:p-5 border border-slate-800 font-mono text-xs sm:text-sm text-cyan-300 overflow-x-auto shadow-inner leading-relaxed">
                  <pre>{codeSnippets[activeCodeTab]}</pre>
                </div>
              </div>
            </TiltCard>
          </div>

        </div>

      </div>
    </section>
  );
}
