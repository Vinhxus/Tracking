import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CreateBarProps {
  selectedDate?: string;
}
export default function CreateBar({ selectedDate }: CreateBarProps
) {
  const navigate = useNavigate();

  return (
    <div
      className="flex relative h-40 w-screen overflow-hidden rounded-2xl border border-white/5 bg-[#0a0f1a] px-6 py-6 sm:px-8 sm:py-7"
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

      <div className="w-screen relative flex gap-6 items-center justify-between shrink mr-40">
        {/* Left: text */}
        <div className="w-max">
          <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
            Manage your journey
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            Build and recall your day to level up yourself
          </p>
        </div>

        {/* Right: stat box + button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() =>
              navigate('/create', { state: { date: selectedDate } })
            }
            className="cursor-pointer flex items-center gap-2 whitespace-nowrap rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-[#06251a] transition hover:bg-emerald-300 active:scale-[0.98]"
          >
            <PlusCircle className="h-5 w-5" />
            Create new activity
          </button>
        </div>
      </div>
    </div>
  );
}
