"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const isSavedLight = localStorage.getItem("theme") === "light";
    if (isSavedLight) {
      setIsLight(true);
      document.documentElement.classList.add("light-theme");
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const nextIsLight = !isLight;
    if (isLight) {
      root.classList.remove("light-theme");
      localStorage.setItem("theme", "dark");
      setIsLight(false);
    } else {
      root.classList.add("light-theme");
      localStorage.setItem("theme", "light");
      setIsLight(true);
    }

    window.dispatchEvent(
      new CustomEvent("lightToggle", {
        detail: { isLight: nextIsLight }
      })
    );
  };


  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Luxury Dark/Light Mode"
      className="relative p-2.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-glass)] text-[var(--text-primary)] hover:border-[var(--accent-cyan)] transition-all duration-300 shadow-md group cursor-pointer"
      title={isLight ? "Switch to Ultra-Luxury Dark" : "Switch to Soft Cashmere Light"}
    >
      {isLight ? (
        <Moon className="w-5 h-5 text-amber-600 group-hover:rotate-12 transition-transform" />
      ) : (
        <Sun className="w-5 h-5 text-amber-400 group-hover:rotate-45 transition-transform" />
      )}
    </button>
  );
}

