"use client";

import { useState, useEffect } from "react";
import { Volume2, VolumeX, Play, Pause, Sparkles } from "lucide-react";

export default function VoiceGreeting() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speechSynth, setSpeechSynth] = useState<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setSpeechSynth(window.speechSynthesis);
    }
  }, []);

  const toggleSpeech = () => {
    if (!speechSynth) return;

    if (isPlaying) {
      speechSynth.cancel();
      setIsPlaying(false);
    } else {
      speechSynth.cancel();
      const text = "Hi there! Welcome to my portfolio. I'm Bilal Khan Lodhi, a Senior Full-Stack and Next.js Engineer specializing in high-performance web applications.";
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
      speechSynth.speak(utterance);
      setIsPlaying(true);
    }
  };

  return (
    <button
      onClick={toggleSpeech}
      className={`inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full border transition-all duration-300 shadow-sm cursor-pointer ${
        isPlaying
          ? "border-cyan-400 bg-cyan-500/20 text-cyan-300 ring-2 ring-cyan-400/30"
          : "border-purple-500/30 bg-purple-500/10 text-purple-300 hover:border-purple-400 hover:bg-purple-500/20"
      }`}
      title="Listen to audio greeting"
    >
      <div className="flex items-center space-x-1">
        {isPlaying ? (
          <>
            <Pause className="w-3.5 h-3.5 text-cyan-400" />
            <div className="flex items-end space-x-0.5 h-3">
              <span className="w-0.5 bg-cyan-400 rounded-full h-full animate-bounce"></span>
              <span className="w-0.5 bg-emerald-400 rounded-full h-2/3 animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-0.5 bg-purple-400 rounded-full h-4/5 animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </>
        ) : (
          <>
            <Play className="w-3.5 h-3.5 text-purple-400 fill-purple-400" />
            <Volume2 className="w-3.5 h-3.5 text-purple-400" />
          </>
        )}
      </div>
      <span className="font-mono text-xs font-semibold">
        {isPlaying ? "Playing Audio Intro..." : "Listen Voice Intro"}
      </span>
    </button>
  );
}
