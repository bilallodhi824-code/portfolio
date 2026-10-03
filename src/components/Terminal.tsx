"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft, Sparkles, Copy, Check } from "lucide-react";
import { PERSONAL_INFO, PROJECTS, SKILL_CATEGORIES } from "../data/portfolioData";

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LogItem {
  type: "input" | "output" | "system";
  text: string;
}

export default function Terminal({ isOpen, onClose }: TerminalProps) {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<LogItem[]>([
    { type: "system", text: "Bilal Khan Lodhi DevTerminal v2.5 [Next.js App Router Edition]" },
    { type: "system", text: "Type 'help' to view all available commands or 'sudo hire' for instant recruiter mode." }
  ]);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    const newLogs: LogItem[] = [{ type: "input", text: `$ ${cmdStr}` }];

    switch (trimmed) {
      case "help":
        newLogs.push({
          type: "output",
          text: `Available Commands:
  • help         - Display this command menu
  • about        - Summary of background & experience
  • skills       - List tech stack & proficiency ratings
  • projects     - Showcase top production Next.js apps
  • contact      - Print direct email & phone number
  • stats        - View performance & uptime benchmarks
  • clear        - Clear terminal history
  • sudo hire    - Trigger instant hire protocol`
        });
        break;
      case "about":
        newLogs.push({
          type: "output",
          text: `${PERSONAL_INFO.name} - ${PERSONAL_INFO.title}
Location: ${PERSONAL_INFO.location}
Bio: ${PERSONAL_INFO.shortBio}`
        });
        break;
      case "skills":
        const skillText = SKILL_CATEGORIES.map(cat => 
          `[${cat.title}]\n` + cat.skills.map(s => `  • ${s.name} (${s.level}% | ${s.experience})`).join("\n")
        ).join("\n\n");
        newLogs.push({ type: "output", text: skillText });
        break;
      case "projects":
        const projText = PROJECTS.map(p => 
          `🚀 ${p.title} (${p.category})
   - ${p.tagline}
   - Stack: ${p.tags.join(", ")}`
        ).join("\n\n");
        newLogs.push({ type: "output", text: projText });
        break;
      case "contact":
        newLogs.push({
          type: "output",
          text: `📧 Email: ${PERSONAL_INFO.email}
📞 Phone: ${PERSONAL_INFO.phone}
📍 Address: ${PERSONAL_INFO.location}
🐙 GitHub: ${PERSONAL_INFO.github}
💼 LinkedIn: ${PERSONAL_INFO.linkedin}`
        });
        break;
      case "stats":
        newLogs.push({
          type: "output",
          text: `⚡ Performance Metrics:
  • Lighthouse Score: 100/100
  • TypeScript Strictness: 100%
  • Test Coverage: 92%
  • Commits (2025): 2,400+`
        });
        break;
      case "clear":
        setHistory([]);
        return;
      case "sudo hire":
      case "hire":
        newLogs.push({
          type: "output",
          text: `🎉 ACCESS GRANTED!
Initializing priority recruiter channel...
Email copying to clipboard: ${PERSONAL_INFO.email}
Redirecting to contact section!`
        });
        navigator.clipboard.writeText(PERSONAL_INFO.email);
        setTimeout(() => {
          onClose();
          window.location.hash = "contact";
        }, 1500);
        break;
      default:
        newLogs.push({
          type: "output",
          text: `Command not found: '${trimmed}'. Type 'help' for available commands.`
        });
    }

    setHistory((prev) => [...prev, ...newLogs]);
    setInputVal("");
  };

  const handleCopyLogs = () => {
    const text = history.map(h => h.text).join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-3xl rounded-2xl overflow-hidden border border-cyan-500/30 bg-slate-950 shadow-2xl shadow-cyan-500/10 flex flex-col h-[520px]">
        {/* Terminal Header Bar */}
        <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between select-none">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:opacity-80" onClick={onClose}></div>
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="ml-3 text-xs font-mono text-slate-400 flex items-center space-x-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>bilal-lodhi@nextjs-arch:~ (cli)</span>
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyLogs}
              className="p-1.5 rounded text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors text-xs font-mono flex items-center space-x-1"
              title="Copy terminal transcript"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Content Body */}
        <div className="p-4 flex-1 overflow-y-auto font-mono text-sm space-y-2 text-slate-200 bg-slate-950/90">
          {history.map((item, index) => (
            <div key={index} className="leading-relaxed">
              {item.type === "input" && (
                <div className="text-cyan-400 font-bold">{item.text}</div>
              )}
              {item.type === "system" && (
                <div className="text-emerald-400 opacity-90">{item.text}</div>
              )}
              {item.type === "output" && (
                <pre className="text-slate-300 whitespace-pre-wrap font-mono text-xs sm:text-sm pl-2 border-l-2 border-cyan-500/30">
                  {item.text}
                </pre>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Command Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCommand(inputVal);
          }}
          className="p-3 bg-slate-900 border-t border-slate-800 flex items-center space-x-2"
        >
          <span className="text-cyan-400 font-mono font-bold">$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type 'help' or 'sudo hire'..."
            className="flex-1 bg-transparent font-mono text-sm text-slate-100 placeholder-slate-500 outline-none"
          />
          <button
            type="submit"
            className="px-3 py-1 rounded bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 text-xs font-mono font-semibold flex items-center space-x-1"
          >
            <span>Run</span>
            <CornerDownLeft className="w-3 h-3" />
          </button>
        </form>
      </div>
    </div>
  );
}
