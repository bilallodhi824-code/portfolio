"use client";

import { Sparkles, Zap, Terminal, Code2, Cpu, Globe, Layers, ShieldCheck, Flame } from "lucide-react";

export default function MarqueeTicker() {
  const items = [
    { text: "NEXT.JS 15 APP ROUTER", icon: Zap, color: "text-cyan-400" },
    { text: "100/100 CORE WEB VITALS", icon: Sparkles, color: "text-emerald-400" },
    { text: "EDGE COMPUTING & SERVER ACTIONS", icon: Cpu, color: "text-purple-400" },
    { text: "HIGH-CONCURRENCY MICROSERVICES", icon: Layers, color: "text-amber-400" },
    { text: "ZERO-DEFECT TYPESCRIPT", icon: ShieldCheck, color: "text-teal-400" },
    { text: "ENTERPRISE ARCHITECTURE", icon: Globe, color: "text-blue-400" },
    { text: "60 FPS FLUID ANIMATIONS", icon: Flame, color: "text-rose-400" },
    { text: "SUB-50MS API LATENCY", icon: Terminal, color: "text-lime-400" }
  ];

  return (
    <div className="w-full py-4 bg-slate-950/80 border-y border-cyan-500/20 overflow-hidden relative backdrop-blur-xl shadow-2xl">
      {/* Edge gradient fades */}
      <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-[var(--bg-primary)] to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-marquee space-x-10 hover:[animation-play-state:paused] cursor-pointer">
        {[...items, ...items, ...items].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex items-center space-x-3 text-xs sm:text-sm font-mono font-bold tracking-widest uppercase text-slate-300 group hover:text-white transition-colors select-none"
            >
              <Icon className={`w-4 h-4 ${item.color} group-hover:scale-125 transition-transform duration-300`} />
              <span>{item.text}</span>
              <span className="text-slate-600 font-normal ml-6">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
