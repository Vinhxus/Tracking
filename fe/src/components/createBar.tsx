import { PlusCircle } from "lucide-react";
import React from "react";

/**
 * ActivityMatrixHeader
 * ---------------------
 * Recreates the "PROTOCOL MATRIX 4.0" header banner:
 * left side = eyebrow + title + description,
 * right side = EXP stat box + a "create activity" pill button.
 *
 * Usage:
 *   <ActivityMatrixHeader
 *     expAvailable={285}
 *     expUsed={95}
 *     onCreateActivity={() => {}}
 *   />
 */

interface ActivityMatrixHeaderProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  expAvailable?: number;
  expUsed?: number;
  buttonLabel?: string;
  onCreateActivity?: () => void;
  className?: string;
}

export default function CreateBar({
  eyebrow = "PROTOCOL MATRIX 4.0",
  title = "Manage activities",
  description = "Build your own journey and assess 4 important features.",
  buttonLabel = "Create new activity",
  onCreateActivity,
  className = "",
}: ActivityMatrixHeaderProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/5 bg-[#0a0f1a] px-6 py-6 sm:px-8 sm:py-7 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* soft green glow */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left: text */}
        <div className="max-w-xl">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_2px_rgba(52,211,153,0.6)]" />
            <span
              className="text-[11px] font-semibold text-emerald-400"
              style={{ letterSpacing: 2 }}
            >
              {eyebrow}
            </span>
          </div>
          <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
            {title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            {description}
          </p>
        </div>

        {/* Right: stat box + button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onCreateActivity}
            className="flex items-center gap-2 whitespace-nowrap rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-[#06251a] transition hover:bg-emerald-300 active:scale-[0.98]"
          >
            <PlusCircle className="h-5 w-5" />
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
