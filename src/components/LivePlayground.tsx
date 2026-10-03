"use client";

import { useState } from "react";
import { Sliders, Zap, Server, ShieldCheck, RefreshCw, Sparkles, Gauge } from "lucide-react";

export default function LivePlayground() {
  const [users, setUsers] = useState(10000);
  const [cacheStrategy, setCacheStrategy] = useState<"ISR" | "SSR" | "Static">("ISR");
  const [edgeRegions, setEdgeRegions] = useState(6);

  // Dynamic calculations
  const calculatedLighthouse = cacheStrategy === "Static" ? 100 : cacheStrategy === "ISR" ? 99 : 94;
  const estimatedTTFB = cacheStrategy === "Static" ? 18 : cacheStrategy === "ISR" ? 35 : 120;
  const estimatedCost = Math.round((users / 5000) * (cacheStrategy === "SSR" ? 1.8 : 0.4) * (edgeRegions / 3) * 10) / 10;

  return (
    <section className="py-20 relative bg-[var(--bg-secondary)] border-y border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Title Header */}
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-mono text-xs">
            <Sliders className="w-3.5 h-3.5" />
            <span>Interactive Simulator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
            Next.js Architecture & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">SLA Estimator</span>
          </h2>
          <p className="text-base text-[var(--text-secondary)]">
            Test how different caching strategies and edge configurations impact performance metrics in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Controls Column */}
          <div className="lg:col-span-6 glass-card rounded-2xl p-6 sm:p-8 space-y-6 border border-[var(--border-color)]">
            <div className="space-y-4">
              <label className="flex items-center justify-between text-sm font-semibold text-[var(--text-primary)]">
                <span className="flex items-center space-x-2">
                  <Server className="w-4 h-4 text-cyan-400" />
                  <span>Monthly Active Users (MAU)</span>
                </span>
                <span className="font-mono text-cyan-400 font-bold">{users.toLocaleString()} users</span>
              </label>
              <input
                type="range"
                min="1000"
                max="500000"
                step="5000"
                value={users}
                onChange={(e) => setUsers(Number(e.target.value))}
                className="w-full h-2 bg-[var(--bg-primary)] rounded-lg appearance-none cursor-pointer accent-cyan-400 border border-[var(--border-color)]"
              />
            </div>

            {/* Cache Strategy Selector */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[var(--text-primary)] block">
                Next.js Rendering Strategy
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(["Static", "ISR", "SSR"] as const).map((strat) => (
                  <button
                    key={strat}
                    onClick={() => setCacheStrategy(strat)}
                    className={`py-2.5 rounded-xl font-mono text-xs font-bold transition-all border ${
                      cacheStrategy === strat
                        ? "bg-cyan-500/20 text-cyan-400 border-cyan-400 shadow-md"
                        : "bg-[var(--bg-primary)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-slate-500"
                    }`}
                  >
                    {strat}
                  </button>
                ))}
              </div>
            </div>

            {/* Edge Region Slider */}
            <div className="space-y-4">
              <label className="flex items-center justify-between text-sm font-semibold text-[var(--text-primary)]">
                <span>Distributed Edge Regions</span>
                <span className="font-mono text-cyan-400 font-bold">{edgeRegions} Global Nodes</span>
              </label>
              <input
                type="range"
                min="1"
                max="24"
                value={edgeRegions}
                onChange={(e) => setEdgeRegions(Number(e.target.value))}
                className="w-full h-2 bg-[var(--bg-primary)] rounded-lg appearance-none cursor-pointer accent-emerald-400 border border-[var(--border-color)]"
              />
            </div>
          </div>

          {/* Real-time Output Matrix */}
          <div className="lg:col-span-6 glass-card rounded-2xl p-6 sm:p-8 space-y-6 border border-cyan-500/30 bg-slate-950/60 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)]">
              <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs font-bold">
                <Gauge className="w-4 h-4" />
                <span>REAL-TIME ESTIMATED METRICS</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono font-semibold border border-emerald-500/30">
                Optimal Setup
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-1">
                <span className="text-xs text-[var(--text-muted)] font-mono">Lighthouse Score</span>
                <div className="text-3xl font-extrabold text-emerald-400 font-mono flex items-center space-x-1">
                  <span>{calculatedLighthouse}</span>
                  <span className="text-xs text-emerald-500 font-normal">/100</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-1">
                <span className="text-xs text-[var(--text-muted)] font-mono">Time To First Byte</span>
                <div className="text-3xl font-extrabold text-cyan-400 font-mono">
                  ~{estimatedTTFB}ms
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-1">
                <span className="text-xs text-[var(--text-muted)] font-mono">Global Cache Hit</span>
                <div className="text-3xl font-extrabold text-purple-400 font-mono">
                  {cacheStrategy === "SSR" ? "82%" : "99.4%"}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-1">
                <span className="text-xs text-[var(--text-muted)] font-mono">Est. Infrastructure Cost</span>
                <div className="text-3xl font-extrabold text-amber-400 font-mono">
                  ${estimatedCost}/mo
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
