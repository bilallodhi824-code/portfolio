"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: string;
  alpha: number;
}

export default function CyberCanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 160,
    };

    let activeColors = ["#eac45f", "#ff9e42", "#dfb15b", "#d4af37"];

    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && customEvent.detail.primaryColor) {
        const p = customEvent.detail.primaryColor;
        activeColors = [p, p, "#ffffff", p];
        particles.forEach(pt => {
          pt.color = activeColors[Math.floor(Math.random() * activeColors.length)];
        });
      }
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("themeChange", handleThemeChange);
    document.addEventListener("mouseleave", handleMouseLeave);

    let particles: Particle[] = [];

    const initParticles = () => {
      particles = [];
      const count = Math.min(Math.floor((width * height) / 14000), 100);
      for (let i = 0; i < count; i++) {
        const radius = Math.random() * 2 + 1;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.7,
          vy: (Math.random() - 0.5) * 0.7,
          radius,
          baseRadius: radius,
          color: activeColors[Math.floor(Math.random() * activeColors.length)],
          alpha: Math.random() * 0.45 + 0.15,
        });
      }
    };

    initParticles();

    // Laser Beam Scan line
    let scanLineY = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle scanner beam
      scanLineY = (scanLineY + 1.2) % (height + 200);
      const scanGrad = ctx.createLinearGradient(0, scanLineY - 60, 0, scanLineY + 60);
      scanGrad.addColorStop(0, "rgba(234, 196, 95, 0)");
      scanGrad.addColorStop(0.5, "rgba(234, 196, 95, 0.03)");
      scanGrad.addColorStop(1, "rgba(234, 196, 95, 0)");
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanLineY - 60, width, 120);

      // Update & Draw Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce bounds
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse proximity reaction (Repulsion + Glow)
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          p.x -= (dx / dist) * force * 3;
          p.y -= (dy / dist) * force * 3;
          p.radius = p.baseRadius + force * 2.5;
        } else {
          p.radius = Math.max(p.baseRadius, p.radius - 0.05);
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;

        // Connect with nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist2 = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist2 < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - dist2 / 120) * 0.18;
            ctx.lineWidth = 0.8;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("themeChange", handleThemeChange);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-65 transition-opacity duration-1000"
      style={{ filter: "blur(0.2px)" }}
    />
  );
}

