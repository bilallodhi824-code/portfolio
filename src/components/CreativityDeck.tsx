"use client";

import { useState } from "react";
import { Sparkles, Shuffle, RotateCcw, Compass, ArrowRight, Lightbulb, Zap, CheckCircle2, Layers } from "lucide-react";
import TiltCard from "./TiltCard";

interface DeckCard {
  id: number;
  category: string;
  title: string;
  subtitle: string;
  insight: string;
  law: string;
  gradient: string;
  tag: string;
}

const CARDS_DATA: DeckCard[] = [
  {
    id: 1,
    category: "PARADIGM 01",
    title: "Zero-Defect Latency",
    subtitle: "Speed is a foundational feature, not an afterthought.",
    insight: "Every 100ms of latency reduction drives an exponential surge in user engagement. Architecting for sub-50ms TTFB via Edge Caching and Next.js Server Components isn't optimization—it's UX engineering.",
    law: "Rule of Performance: Render at the speed of human thought.",
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
    tag: "Next.js 15 & Edge"
  },
  {
    id: 2,
    category: "PARADIGM 02",
    title: "Strict Type Safety",
    subtitle: "Eliminate runtime bugs at compile time.",
    insight: "Writing resilient software means turning runtime uncertainties into strict TypeScript schema validations (Zod, Prisma, Trpc). When your types are air-tight, refactoring multi-thousand line apps is effortless.",
    law: "Rule of Stability: If it compiles with strict zero-any, it deploys with zero fear.",
    gradient: "from-purple-500/20 via-pink-500/10 to-transparent",
    tag: "Type Architecture"
  },
  {
    id: 3,
    category: "PARADIGM 03",
    title: "Human-Centric Micro-Physics",
    subtitle: "UI should feel organic, tactile, and responsive.",
    insight: "Interfaces shouldn't just be flat layouts; they should possess mass, momentum, and light reflection. Magnetic cursor attractions and 3D specular depth make digital products addictive to explore.",
    law: "Rule of Delight: Static screens inform; dynamic physics captivate.",
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    tag: "Tactile Motion"
  },
  {
    id: 4,
    category: "PARADIGM 04",
    title: "Systems Over Hacks",
    subtitle: "Scalability is earned through modular design patterns.",
    insight: "Premature microservice proliferation fails without coherent modular monolith foundations. Write decoupled headless components and clean API gateways so features can scale horizontally with ease.",
    law: "Rule of Scale: Clean boundaries create limitless growth.",
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    tag: "System Design"
  }
];

export default function CreativityDeck() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [shuffleCount, setShuffleCount] = useState(0);

  const handleNext = () => {
    setIsFlipped(false);
    setActiveIdx((prev) => (prev + 1) % CARDS_DATA.length);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    setShuffleCount((prev) => prev + 1);
    let nextIdx;
    do {
      nextIdx = Math.floor(Math.random() * CARDS_DATA.length);
    } while (nextIdx === activeIdx && CARDS_DATA.length > 1);
    setActiveIdx(nextIdx);
  };

  const currentCard = CARDS_DATA[activeIdx];

  return (
    <section className="py-24 relative bg-[var(--bg-primary)] overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-purple-600/10 via-cyan-600/15 to-emerald-600/10 rounded-full blur-[160px] pointer-events-none animate-pulse-slow"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Header (meetfaisal-style interactive deck banner) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 font-mono text-xs backdrop-blur-md">
              <Lightbulb className="w-3.5 h-3.5 animate-pulse" />
              <span>Interactive Engineering Space</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
              Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 animate-gradient-text">Thought Deck</span>
            </h2>
            <p className="text-base text-[var(--text-secondary)]">
              Swipe, flip, and explore foundational philosophies and systems engineering paradigms that guide every line of production code.
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-3">
            <button
              onClick={handleShuffle}
              className="px-4 py-2.5 rounded-xl font-mono text-xs font-semibold bg-cyan-950/40 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-900/50 transition-all flex items-center space-x-2 shadow-lg cursor-pointer"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Shuffle Deck</span>
            </button>
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="px-4 py-2.5 rounded-xl font-mono text-xs font-semibold bg-purple-950/40 text-purple-300 border border-purple-500/30 hover:border-purple-400 hover:bg-purple-900/50 transition-all flex items-center space-x-2 shadow-lg cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isFlipped ? "Show Front" : "Flip Insight"}</span>
            </button>
          </div>
        </div>

        {/* 3D Interactive Card Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Card Viewport */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="w-full max-w-lg perspective-1000">
              <TiltCard className="rounded-3xl">
                <div
                  onClick={() => setIsFlipped(!isFlipped)}
                  className={`glass-card rounded-3xl p-8 sm:p-10 border border-cyan-500/30 shadow-2xl relative cursor-pointer min-h-[420px] flex flex-col justify-between overflow-hidden transition-all duration-500 bg-gradient-to-br ${currentCard.gradient} group hover:border-cyan-400`}
                >
                  {/* Subtle Background Watermark */}
                  <div className="absolute -right-8 -bottom-8 opacity-5 text-8xl font-black font-mono select-none pointer-events-none text-white">
                    0{currentCard.id}
                  </div>

                  {/* Card Header */}
                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                        {currentCard.category}
                      </span>
                      <span className="text-xs font-mono text-slate-400 flex items-center space-x-1">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>Card {activeIdx + 1} of {CARDS_DATA.length}</span>
                      </span>
                    </div>

                    {!isFlipped ? (
                      <div className="space-y-3 pt-4">
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                          {currentCard.title}
                        </h3>
                        <p className="text-base text-slate-300 font-medium leading-relaxed">
                          {currentCard.subtitle}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3 pt-4 animate-fade-in">
                        <span className="text-xs font-mono uppercase tracking-wider text-purple-300 font-bold block">
                          Architectural Insight:
                        </span>
                        <p className="text-sm sm:text-base text-slate-200 leading-relaxed italic">
                          "{currentCard.insight}"
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Card Footer */}
                  <div className="space-y-4 pt-6 border-t border-cyan-500/20 relative z-10">
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-cyan-500/20 text-xs font-mono text-cyan-300 flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <span className="truncate">{currentCard.law}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                      <span className="text-cyan-400 font-semibold">{currentCard.tag}</span>
                      <span className="flex items-center space-x-1 text-slate-400 group-hover:text-cyan-300 transition-colors">
                        <span>Click to {isFlipped ? "view summary" : "reveal deep insight"}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>

                </div>
              </TiltCard>
            </div>
          </div>

          {/* Right Column: Deck Navigator & Mini Stack */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold">
              Deck Index & Paradigms
            </div>

            <div className="space-y-3">
              {CARDS_DATA.map((card, idx) => (
                <div
                  key={card.id}
                  onClick={() => {
                    setActiveIdx(idx);
                    setIsFlipped(false);
                  }}
                  className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between ${
                    activeIdx === idx
                      ? "bg-cyan-500/10 border-cyan-400 text-white shadow-lg shadow-cyan-500/10 translate-x-2"
                      : "bg-[var(--bg-secondary)] border-[var(--border-color)] text-[var(--text-secondary)] hover:border-cyan-500/40 hover:text-[var(--text-primary)]"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold ${
                      activeIdx === idx ? "bg-cyan-400 text-slate-950" : "bg-slate-800 text-slate-400"
                    }`}>
                      0{card.id}
                    </span>
                    <div>
                      <h4 className="font-bold text-sm">{card.title}</h4>
                      <p className="text-xs font-mono text-[var(--text-muted)]">{card.tag}</p>
                    </div>
                  </div>

                  <ArrowRight className={`w-4 h-4 transition-transform ${activeIdx === idx ? "text-cyan-400 translate-x-1" : "text-slate-600"}`} />
                </div>
              ))}
            </div>

            {/* Next Card Quick Button */}
            <button
              onClick={handleNext}
              className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 hover:shadow-xl hover:shadow-cyan-500/25 transition-all flex items-center justify-center space-x-2 cursor-pointer mt-4"
            >
              <span>Next Thought Paradigm</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
