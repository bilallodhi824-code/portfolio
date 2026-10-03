"use client";

import { useState, useEffect } from "react";
import { Check, Sparkles, X, Crown, Gem, Trees, SunMedium, Moon, Flame, Heart } from "lucide-react";

export interface ThemePreset {
  id: string;
  name: string;
  badge: string;
  description: string;
  icon: any;
  primary: string;
  secondary: string;
  glow: string;
  // Dark mode properties
  dark: {
    bgPrimary: string;
    bgSecondary: string;
    bgCard: string;
    bgGlass: string;
    borderColor: string;
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    accentCyan: string;
    accentEmerald: string;
    accentPurple: string;
    glow: string;
  };
  // Creamy non-glaring Luxury Light mode properties
  light: {
    bgPrimary: string;
    bgSecondary: string;
    bgCard: string;
    bgGlass: string;
    borderColor: string;
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    accentCyan: string;
    accentEmerald: string;
    accentPurple: string;
    glow: string;
  };
}

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: "champagne",
    name: "Champagne Royale & 24K Copper-Gold",
    badge: "👑 Executive Luxury",
    description: "Deep truffle velvet in dark, soothing creamy warm copper-linen in light",
    icon: Crown,
    primary: "#eac45f",
    secondary: "#ff9e42",
    glow: "rgba(234, 196, 95, 0.45)",
    dark: {
      bgPrimary: "#080706",
      bgSecondary: "#120f0c",
      bgCard: "rgba(22, 18, 14, 0.88)",
      bgGlass: "rgba(234, 196, 95, 0.05)",
      borderColor: "rgba(212, 175, 55, 0.22)",
      textPrimary: "#fefbf3",
      textSecondary: "#c8b89e",
      textMuted: "#96856e",
      accentCyan: "#eac45f",
      accentEmerald: "#ff9e42",
      accentPurple: "#dfb15b",
      glow: "rgba(234, 196, 95, 0.45)"
    },
    light: {
      bgPrimary: "#f7f4ee", // Soft creamy warm linen, zero glare
      bgSecondary: "#ebe5db",
      bgCard: "rgba(255, 255, 255, 0.92)",
      bgGlass: "rgba(184, 134, 11, 0.04)",
      borderColor: "rgba(180, 150, 120, 0.2)",
      textPrimary: "#1e1914", // Deep rich espresso typography
      textSecondary: "#5c5043",
      textMuted: "#877867",
      accentCyan: "#b8860b", // Polished warm copper-gold
      accentEmerald: "#c27803",
      accentPurple: "#8a5806",
      glow: "rgba(184, 134, 11, 0.35)"
    }
  },
  {
    id: "titanium",
    name: "Titanium Stealth & Sapphire Ice",
    badge: "💎 Rolex / Aerospace Sleek",
    description: "Smoked slate obsidian in dark, soothing frosted platinum alabaster in light",
    icon: Gem,
    primary: "#38bdf8",
    secondary: "#818cf8",
    glow: "rgba(56, 189, 248, 0.4)",
    dark: {
      bgPrimary: "#060709",
      bgSecondary: "#0d1017",
      bgCard: "rgba(14, 18, 26, 0.88)",
      bgGlass: "rgba(255, 255, 255, 0.04)",
      borderColor: "rgba(148, 163, 184, 0.18)",
      textPrimary: "#f8fafc",
      textSecondary: "#94a3b8",
      textMuted: "#64748b",
      accentCyan: "#38bdf8",
      accentEmerald: "#818cf8",
      accentPurple: "#c084fc",
      glow: "rgba(56, 189, 248, 0.4)"
    },
    light: {
      bgPrimary: "#f4f6f8",
      bgSecondary: "#e8ecf0",
      bgCard: "rgba(255, 255, 255, 0.92)",
      bgGlass: "rgba(2, 132, 199, 0.03)",
      borderColor: "rgba(148, 163, 184, 0.22)",
      textPrimary: "#0f172a",
      textSecondary: "#334155",
      textMuted: "#64748b",
      accentCyan: "#0284c7",
      accentEmerald: "#4f46e5",
      accentPurple: "#7c3aed",
      glow: "rgba(2, 132, 199, 0.35)"
    }
  },
  {
    id: "emerald",
    name: "Malachite Royale & Emerald Velvet",
    badge: "🌲 Patek Philippe Green",
    description: "Deep forest noir in dark, soothing soft sage mint cream in light",
    icon: Trees,
    primary: "#10b981",
    secondary: "#34d399",
    glow: "rgba(16, 185, 129, 0.45)",
    dark: {
      bgPrimary: "#030907",
      bgSecondary: "#081510",
      bgCard: "rgba(10, 24, 18, 0.88)",
      bgGlass: "rgba(16, 185, 129, 0.05)",
      borderColor: "rgba(16, 185, 129, 0.22)",
      textPrimary: "#f0fdf4",
      textSecondary: "#a7f3d0",
      textMuted: "#4ade80",
      accentCyan: "#10b981",
      accentEmerald: "#34d399",
      accentPurple: "#059669",
      glow: "rgba(16, 185, 129, 0.45)"
    },
    light: {
      bgPrimary: "#f2f7f4",
      bgSecondary: "#e5ede8",
      bgCard: "rgba(255, 255, 255, 0.92)",
      bgGlass: "rgba(16, 185, 129, 0.03)",
      borderColor: "rgba(16, 185, 129, 0.2)",
      textPrimary: "#06281e",
      textSecondary: "#1e4d3f",
      textMuted: "#2d6a57",
      accentCyan: "#059669",
      accentEmerald: "#10b981",
      accentPurple: "#047857",
      glow: "rgba(5, 150, 105, 0.35)"
    }
  },
  {
    id: "burgundy",
    name: "Burgundy Velvet & Rose Gold",
    badge: "🍷 Haute Horlogerie Wine",
    description: "Deep Bordeaux wine in dark, creamy rose linen alabaster in light",
    icon: Heart,
    primary: "#fb7185",
    secondary: "#f43f5e",
    glow: "rgba(251, 113, 133, 0.45)",
    dark: {
      bgPrimary: "#0d0508",
      bgSecondary: "#17090f",
      bgCard: "rgba(28, 12, 19, 0.88)",
      bgGlass: "rgba(251, 113, 133, 0.05)",
      borderColor: "rgba(251, 113, 133, 0.22)",
      textPrimary: "#fff1f2",
      textSecondary: "#fecdd3",
      textMuted: "#fb7185",
      accentCyan: "#fb7185",
      accentEmerald: "#f43f5e",
      accentPurple: "#e11d48",
      glow: "rgba(251, 113, 133, 0.45)"
    },
    light: {
      bgPrimary: "#faf3f4",
      bgSecondary: "#f0e4e6",
      bgCard: "rgba(255, 255, 255, 0.92)",
      bgGlass: "rgba(225, 29, 72, 0.03)",
      borderColor: "rgba(244, 63, 94, 0.2)",
      textPrimary: "#290812",
      textSecondary: "#521b28",
      textMuted: "#882f45",
      accentCyan: "#e11d48",
      accentEmerald: "#be123c",
      accentPurple: "#9f1239",
      glow: "rgba(225, 29, 72, 0.35)"
    }
  },
  {
    id: "amethyst",
    name: "Cosmic Amethyst & Obsidian",
    badge: "🔮 Royal Violet Prestige",
    description: "Abyssal plum noir in dark, soothing creamy lavender mist in light",
    icon: Moon,
    primary: "#c084fc",
    secondary: "#f472b6",
    glow: "rgba(192, 132, 252, 0.45)",
    dark: {
      bgPrimary: "#08040f",
      bgSecondary: "#120921",
      bgCard: "rgba(24, 12, 42, 0.88)",
      bgGlass: "rgba(192, 132, 252, 0.05)",
      borderColor: "rgba(192, 132, 252, 0.22)",
      textPrimary: "#faf5ff",
      textSecondary: "#d8b4fe",
      textMuted: "#a855f7",
      accentCyan: "#c084fc",
      accentEmerald: "#f472b6",
      accentPurple: "#e879f9",
      glow: "rgba(192, 132, 252, 0.45)"
    },
    light: {
      bgPrimary: "#f6f3fa",
      bgSecondary: "#ece5f2",
      bgCard: "rgba(255, 255, 255, 0.92)",
      bgGlass: "rgba(147, 51, 234, 0.03)",
      borderColor: "rgba(168, 85, 247, 0.2)",
      textPrimary: "#1b0a2a",
      textSecondary: "#431c62",
      textMuted: "#6b2897",
      accentCyan: "#9333ea",
      accentEmerald: "#c026d3",
      accentPurple: "#7e22ce",
      glow: "rgba(147, 51, 234, 0.35)"
    }
  },
  {
    id: "cashmere",
    name: "Cashmere Silk & Warm Alabaster",
    badge: "✨ Non-Glaring Oat Ivory",
    description: "Ultra-soothing creamy oat ivory with deep espresso contrast & bronze gold",
    icon: SunMedium,
    primary: "#b8860b",
    secondary: "#0f766e",
    glow: "rgba(184, 134, 11, 0.38)",
    dark: {
      bgPrimary: "#090807",
      bgSecondary: "#14120f",
      bgCard: "rgba(24, 20, 16, 0.88)",
      bgGlass: "rgba(184, 134, 11, 0.05)",
      borderColor: "rgba(184, 134, 11, 0.2)",
      textPrimary: "#fefcf9",
      textSecondary: "#d4c8b8",
      textMuted: "#9a8a76",
      accentCyan: "#d4af37",
      accentEmerald: "#14b8a6",
      accentPurple: "#b45309",
      glow: "rgba(212, 175, 55, 0.4)"
    },
    light: {
      bgPrimary: "#f7f4ee",
      bgSecondary: "#ebe5db",
      bgCard: "rgba(255, 255, 255, 0.92)",
      bgGlass: "rgba(0, 0, 0, 0.03)",
      borderColor: "rgba(60, 50, 40, 0.14)",
      textPrimary: "#1c1917",
      textSecondary: "#57534e",
      textMuted: "#78716c",
      accentCyan: "#b8860b",
      accentEmerald: "#0f766e",
      accentPurple: "#7c2d12",
      glow: "rgba(184, 134, 11, 0.38)"
    }
  }
];


export default function ThemeCustomizer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeThemeId, setActiveThemeId] = useState("champagne");

  const playChime = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(659.25, ctx.currentTime); // E5
      osc.frequency.exponentialRampToValueAtTime(987.77, ctx.currentTime + 0.12); // B5

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch {}
  };

  const applyTheme = (theme: ThemePreset, forceLight?: boolean) => {
    setActiveThemeId(theme.id);
    const root = document.documentElement;
    const isLightMode = forceLight !== undefined ? forceLight : root.classList.contains("light-theme");
    const mode = isLightMode ? theme.light : theme.dark;

    root.style.setProperty("--bg-primary", mode.bgPrimary);
    root.style.setProperty("--bg-secondary", mode.bgSecondary);
    root.style.setProperty("--bg-card", mode.bgCard);
    root.style.setProperty("--bg-glass", mode.bgGlass);
    root.style.setProperty("--border-color", mode.borderColor);
    root.style.setProperty("--border-glow", mode.glow);
    root.style.setProperty("--text-primary", mode.textPrimary);
    root.style.setProperty("--text-secondary", mode.textSecondary);
    root.style.setProperty("--text-muted", mode.textMuted);
    root.style.setProperty("--accent-cyan", mode.accentCyan);
    root.style.setProperty("--accent-emerald", mode.accentEmerald);
    root.style.setProperty("--accent-purple", mode.accentPurple);

    // Dispatch global event for canvas background particles & cursor
    window.dispatchEvent(
      new CustomEvent("themeChange", {
        detail: {
          primaryColor: mode.accentCyan,
          secondaryColor: mode.accentEmerald,
          isLight: isLightMode
        }
      })
    );

    playChime();

    try {
      localStorage.setItem("portfolio_theme", theme.id);
    } catch {}
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem("portfolio_theme");
      const isSavedLight = localStorage.getItem("theme") === "light";
      const found = THEME_PRESETS.find((t) => t.id === saved) || THEME_PRESETS[0];
      applyTheme(found, isSavedLight);
    } catch {
      applyTheme(THEME_PRESETS[0], false);
    }

    const handleLightToggle = (e: Event) => {
      const customEvent = e as CustomEvent;
      const isLight = !!customEvent.detail?.isLight;
      const savedThemeId = localStorage.getItem("portfolio_theme") || "champagne";
      const found = THEME_PRESETS.find((t) => t.id === savedThemeId) || THEME_PRESETS[0];
      applyTheme(found, isLight);
    };

    window.addEventListener("lightToggle", handleLightToggle);
    return () => window.removeEventListener("lightToggle", handleLightToggle);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);


  return (
    <>
      {/* Backdrop overlay when open */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        />
      )}

      {/* Floating Theme Customizer Container */}
      <div className="fixed bottom-6 right-6 z-50">
        {isOpen && (
          <div
            className="mb-4 w-[92vw] sm:w-[440px] max-w-[440px] rounded-3xl p-6 border border-[var(--border-glow)] shadow-2xl shadow-black/90 backdrop-blur-2xl bg-[var(--bg-primary)] text-[var(--text-primary)] animate-fade-in relative z-50 max-h-[85vh] flex flex-col justify-between"
            style={{
              boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 35px var(--border-glow)"
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-[var(--bg-glass)] border border-[var(--border-glow)] flex items-center justify-center shadow-inner">
                  <Crown className="w-5 h-5 text-[var(--accent-cyan)] animate-pulse" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-[var(--text-primary)]">
                    Haute Couture <span className="text-[var(--accent-cyan)]">Theme Suite</span>
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] font-mono">
                    6 Curated Luxury Palettes
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--border-color)] transition-all cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Theme List Grid */}
            <div className="space-y-3 my-4 overflow-y-auto pr-1 max-h-[50vh] custom-scrollbar">
              {THEME_PRESETS.map((t) => {
                const Icon = t.icon;
                const isActive = activeThemeId === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => applyTheme(t)}
                    className={`w-full p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between text-left cursor-pointer group ${
                      isActive
                        ? "border-[var(--accent-cyan)] bg-[var(--bg-glass)] ring-2 ring-[var(--accent-cyan)]/50 shadow-xl shadow-[var(--border-glow)] scale-[1.01]"
                        : "border-[var(--border-color)] hover:border-[var(--border-glow)] bg-[var(--bg-secondary)]/80 hover:bg-[var(--bg-secondary)]"
                    }`}
                  >
                    <div className="flex items-center space-x-3.5">
                      {/* Color Preview Swatch */}
                      <div
                        className="w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 transition-transform"
                        style={{
                          backgroundColor: t.dark.bgSecondary,
                          borderColor: t.primary
                        }}
                      >
                        <Icon className="w-5 h-5" style={{ color: t.primary }} />
                      </div>

                      <div className="space-y-0.5">
                        <div className="flex items-center space-x-2">
                          <p className="font-bold text-xs sm:text-sm text-[var(--text-primary)]">{t.name}</p>
                        </div>
                        <p className="text-[10px] font-mono text-[var(--accent-cyan)] font-semibold">{t.badge}</p>
                        <p className="text-[11px] text-[var(--text-secondary)] leading-tight">{t.description}</p>
                      </div>
                    </div>

                    {isActive && (
                      <div className="w-6 h-6 rounded-full bg-[var(--accent-cyan)] text-slate-950 flex items-center justify-center flex-shrink-0 shadow-md ml-2">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Footer Status */}
            <div className="pt-3 border-t border-[var(--border-color)] flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
              <span>All 6 Palettes Zero-Glare & Calibrated</span>
              <span className="text-[var(--accent-cyan)] font-bold">Live Synced</span>
            </div>
          </div>
        )}

        {/* Floating Trigger Luxury Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-5 py-3.5 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-glow)] text-[var(--text-primary)] shadow-2xl hover:scale-105 hover:border-[var(--accent-cyan)] transition-all flex items-center space-x-2.5 backdrop-blur-2xl cursor-pointer ring-1 ring-white/10 group"
          title="Select Luxury Visual Theme"
          style={{
            boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.8), 0 0 20px var(--border-glow)"
          }}
        >
          <Crown className="w-4 h-4 text-[var(--accent-cyan)] group-hover:rotate-12 transition-transform duration-300" />
          <span className="text-xs font-mono font-bold tracking-wider uppercase">Luxury Theme</span>
          <span className="w-2 h-2 rounded-full bg-[var(--accent-cyan)] animate-pulse"></span>
        </button>
      </div>
    </>
  );
}
