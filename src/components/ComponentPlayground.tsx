"use client";

import { useState } from "react";
import { Sparkles, Code2, Copy, Check, Eye, Layers, ShieldCheck, Zap } from "lucide-react";

interface ComponentItem {
  id: string;
  name: string;
  category: string;
  snippet: string;
}

export default function ComponentPlayground() {
  const [activeTab, setActiveTab] = useState<string>("glass-card");
  const [copied, setCopied] = useState(false);
  const [interactiveState, setInteractiveState] = useState({
    activeCount: 142,
    shieldActive: true,
    speedLevel: 98
  });

  const components: ComponentItem[] = [
    {
      id: "glass-card",
      name: "Interactive Glass Card",
      category: "UI Components",
      snippet: `<div className="p-6 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-cyan-500/30 hover:border-cyan-400 shadow-2xl transition-all">
  <div className="flex items-center justify-between">
    <span className="text-cyan-400 font-mono text-xs">STATUS: ONLINE</span>
    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
  </div>
  <h3 className="text-xl font-bold text-white mt-2">Serverless Telemetry Node</h3>
</div>`
    },
    {
      id: "cyber-radar",
      name: "Real-time Signal Radar",
      category: "Widget Design",
      snippet: `<div className="flex items-center space-x-3 p-4 rounded-xl bg-slate-950 border border-emerald-500/30">
  <div className="relative w-8 h-8 rounded-full border border-emerald-400/50 flex items-center justify-center">
    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
  </div>
  <div>
    <p className="text-xs font-mono text-emerald-400 font-bold">99.99% Latency SLA</p>
    <p className="text-[10px] text-slate-400">Response time: 14ms</p>
  </div>
</div>`
    },
    {
      id: "action-pill",
      name: "Glow Micro-Action Button",
      category: "Micro-Interactions",
      snippet: `<button className="px-5 py-2.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 hover:shadow-xl hover:shadow-cyan-500/25 hover:scale-105 transition-all">
  <span>Execute Action</span>
</button>`
    }
  ];

  const currentComp = components.find(c => c.id === activeTab) || components[0];

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(currentComp.snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 relative bg-[var(--bg-primary)] border-t border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-400 font-mono text-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Design System Sandbox</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
            Live UI Component <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400">Playground</span>
          </h2>
          <p className="text-base text-[var(--text-secondary)]">
            Test and interact with custom reusable UI widgets built with Tailwind CSS and React.
          </p>
        </div>

        {/* Sandbox Console Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Controls & Tab List */}
          <div className="lg:col-span-4 glass-card rounded-2xl p-6 border border-[var(--border-color)] space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase text-[var(--text-muted)] font-semibold">Select Preset Widget</span>
              <div className="space-y-2">
                {components.map((comp) => (
                  <button
                    key={comp.id}
                    onClick={() => setActiveTab(comp.id)}
                    className={`w-full p-3.5 rounded-xl text-left font-mono text-xs font-semibold transition-all border flex items-center justify-between cursor-pointer ${
                      activeTab === comp.id
                        ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border-cyan-400 shadow-md"
                        : "bg-[var(--bg-primary)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-slate-500"
                    }`}
                  >
                    <span className="flex items-center space-x-2">
                      <Code2 className="w-4 h-4 text-cyan-400" />
                      <span>{comp.name}</span>
                    </span>
                    <span className="text-[10px] text-[var(--text-muted)]">{comp.category}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Micro Controls */}
            <div className="p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-3">
              <span className="text-xs font-mono text-cyan-400 font-bold block">Widget Customizer</span>
              <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
                <span>Signal Shield:</span>
                <button
                  onClick={() => setInteractiveState(prev => ({ ...prev, shieldActive: !prev.shieldActive }))}
                  className={`px-2.5 py-1 rounded font-mono text-[10px] font-bold ${
                    interactiveState.shieldActive ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {interactiveState.shieldActive ? "ACTIVE" : "INACTIVE"}
                </button>
              </div>
            </div>
          </div>

          {/* Live Preview Display */}
          <div className="lg:col-span-8 glass-card rounded-2xl p-6 sm:p-8 border border-[var(--border-color)] space-y-6 flex flex-col justify-between">
            {/* Live Render Area */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] pb-2 border-b border-[var(--border-color)]">
                <span className="flex items-center space-x-1.5 text-cyan-400">
                  <Eye className="w-4 h-4" />
                  <span>LIVE COMPONENT PREVIEW</span>
                </span>
                <span>{currentComp.name}</span>
              </div>

              <div className="p-8 rounded-xl bg-slate-950/80 border border-slate-800 min-h-[160px] flex items-center justify-center relative overflow-hidden bg-cyber-grid">
                {activeTab === "glass-card" && (
                  <div className="p-6 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-cyan-500/40 shadow-2xl space-y-3 max-w-sm w-full hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center justify-between">
                      <span className="text-cyan-400 font-mono text-xs font-bold flex items-center space-x-1">
                        <Zap className="w-3.5 h-3.5" />
                        <span>NEXT.JS STREAM NODE</span>
                      </span>
                      <span className={`w-2.5 h-2.5 rounded-full ${interactiveState.shieldActive ? "bg-emerald-400 animate-ping" : "bg-amber-400"}`} />
                    </div>
                    <h4 className="text-lg font-bold text-white">Serverless Telemetry Proxy</h4>
                    <div className="flex justify-between text-xs font-mono text-slate-400">
                      <span>Events: 10M+/day</span>
                      <span className="text-emerald-400">99.99% SLA</span>
                    </div>
                  </div>
                )}

                {activeTab === "cyber-radar" && (
                  <div className="flex items-center space-x-4 p-5 rounded-2xl bg-slate-900 border border-emerald-500/40 shadow-xl">
                    <div className="relative w-10 h-10 rounded-full border border-emerald-400/60 flex items-center justify-center bg-emerald-950/40">
                      <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                    </div>
                    <div>
                      <p className="text-sm font-mono text-emerald-400 font-bold flex items-center space-x-1">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Real-Time Edge Health Signal</span>
                      </p>
                      <p className="text-xs font-mono text-slate-400 pt-0.5">Response Time: 14ms (Distributed CDN)</p>
                    </div>
                  </div>
                )}

                {activeTab === "action-pill" && (
                  <button className="px-6 py-3 rounded-xl font-extrabold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 hover:shadow-xl hover:shadow-cyan-500/30 hover:scale-105 transition-all duration-300 cursor-pointer flex items-center space-x-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Execute High-Performance Action</span>
                  </button>
                )}
              </div>
            </div>

            {/* Code Snippet Box */}
            <div className="space-y-2 pt-4 border-t border-[var(--border-color)]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[var(--text-muted)]">Source Component JSX</span>
                <button
                  onClick={handleCopySnippet}
                  className="px-3 py-1 rounded bg-slate-800 text-slate-300 hover:text-cyan-400 text-xs font-mono flex items-center space-x-1 border border-slate-700 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied" : "Copy JSX"}</span>
                </button>
              </div>
              <pre className="p-3.5 rounded-xl bg-slate-950 text-slate-300 font-mono text-xs overflow-x-auto border border-slate-800 leading-relaxed">
                <code>{currentComp.snippet}</code>
              </pre>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
