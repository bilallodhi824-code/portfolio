"use client";

import { useEffect, useState } from "react";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  rotation: number;
}

export default function ClickSparkles() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    let sparkleId = 0;

    const handleClick = (e: MouseEvent) => {
      // Don't trigger on inputs
      const target = e.target as HTMLElement | null;
      if (target?.tagName === "INPUT" || target?.tagName === "TEXTAREA") return;

      const colors = [
        "var(--accent-cyan)",
        "var(--accent-emerald)",
        "var(--accent-purple)",
        "#ffffff",
        "#ffd700"
      ];

      const newSparks: Sparkle[] = [];
      const count = 12;

      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
        const speed = Math.random() * 4 + 2;
        newSparks.push({
          id: ++sparkleId,
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 4 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          rotation: Math.random() * 360
        });
      }

      setSparkles((prev) => [...prev.slice(-24), ...newSparks]);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    if (sparkles.length === 0) return;

    const interval = setInterval(() => {
      setSparkles((prev) =>
        prev
          .map((s) => ({
            ...s,
            x: s.x + s.vx,
            y: s.y + s.vy + 0.3, // slight gravity
            alpha: s.alpha - 0.04,
            size: Math.max(0, s.size - 0.08),
            rotation: s.rotation + 8
          }))
          .filter((s) => s.alpha > 0)
      );
    }, 16);

    return () => clearInterval(interval);
  }, [sparkles.length]);

  if (sparkles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="fixed rounded-full pointer-events-none"
          style={{
            left: `${s.x}px`,
            top: `${s.y}px`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            backgroundColor: s.color,
            opacity: s.alpha,
            boxShadow: `0 0 8px ${s.color}`,
            transform: `translate(-50%, -50%) rotate(${s.rotation}deg)`
          }}
        />
      ))}
    </div>
  );
}
