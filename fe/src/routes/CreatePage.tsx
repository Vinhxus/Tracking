import { PlusCircle } from "lucide-react";
import React, { useState } from "react";

/**
 * CreateActivityPage
 * -------------------
 * A form to create a new activity:
 *  - Name (text input)
 *  - Tag (choose one of Health / Study / Spirit / Social)
 *  - Score (numeric input, can be negative for penalties)
 *
 * Usage:
 *   <CreateActivityPage onSubmit={(activity) => console.log(activity)} />
 */

type Tag = "Health" | "Study" | "Spirit" | "Social";

export interface NewActivity {
  name: string;
  tags: Tag[];
  score: number;
}

interface CreatePageProps {
  onSubmit?: (activity: NewActivity) => void;
  onCancel?: () => void;
  className?: string;
}

const TAGS: { key: Tag; color: string }[] = [
  { key: "Health", color: "#34d399" },
  { key: "Study", color: "#818cf8" },
  { key: "Spirit", color: "#c4b5fd" },
  { key: "Social", color: "#fb7185" },
];

export default function CreatePage({
  onSubmit,
  onCancel,
  className = "",
}: CreatePageProps) {
  const [name, setName] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [score, setScore] = useState("");
  const [error, setError] = useState<string | null>(null);

  const selectedTags = TAGS.filter((t) => tags.includes(t.key));

  function toggleTag(key: Tag) {
    setTags((prev) =>
      prev.includes(key) ? prev.filter((t) => t !== key) : [...prev, key]
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim()) {
      setError("Enter activity's name.");
      return;
    }
    if (!tags) {
      setError("Choose at least 1 tag.");
      return;
    }
    if (score.trim() === "" || Number.isNaN(Number(score))) {
      setError("Vui lòng nhập điểm số hợp lệ.");
      return;
    }

    setError(null);
    onSubmit?.({ name: name.trim(), tags, score: Number(score) });
  }

  return (
    <div
      className={`w-full max-w-md rounded-2xl border border-white/5 bg-[#0a0f1a] p-6 sm:p-7 ${className}`}
    >

      <h2 className="mt-2 text-xl font-bold text-white sm:text-2xl">
        Create new activity
      </h2>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        {/* Name */}
        <div>
          <label
            htmlFor="activity-name"
            className="mb-1.5 block text-xs font-semibold text-slate-300"
            style={{ letterSpacing: 0.5 }}
          >
            NAME
          </label>
          <input
            id="activity-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="VD: Chạy bộ 30 phút"
            className="w-full rounded-xl border border-white/10 bg-white/3 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20"
          />
        </div>

        {/* Tags */}
        <div>
          <label
            className="mb-1.5 block text-xs font-semibold text-slate-300"
            style={{ letterSpacing: 0.5 }}
          >
            TAGS
          </label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {TAGS.map((t) => {
              const active = tags.includes(t.key);
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => toggleTag(t.key)}
                  className={`flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-medium transition ${
                    active
                      ? "border-white/20 bg-white/6 text-white"
                      : "border-white/10 bg-white/2 text-slate-400 hover:border-white/20 hover:text-slate-200"
                  }`}
                >
                  <span
                    className="h-2 w-2 rounded-full shrink-0"
                    style={{ backgroundColor: t.color }}
                  />
                  {t.key}
                </button>
              );
            })}
          </div>
        </div>

        {/* Score */}
        <div>
          <label
            htmlFor="activity-score"
            className="mb-1.5 block text-xs font-semibold text-slate-300"
            style={{ letterSpacing: 0.5 }}
          >
            SCORE
          </label>
          <input
            id="activity-score"
            type="number"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            placeholder="VD: 10 hoặc -5"
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20"
          />
        </div>

        {error && (
          <p className="rounded-lg border border-rose-400/20 bg-rose-400/10 px-3 py-2 text-xs text-rose-300">
            {error}
          </p>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3 pt-1">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 rounded-full border border-white/10 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/[0.05]"
            >
              Hủy
            </button>
          )}
          <button
            type="submit"
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-emerald-400 px-4 py-2.5 text-sm font-semibold text-[#06251a] transition hover:bg-emerald-300 active:scale-[0.98]"
          >
            <PlusCircle size={14} />
            Create activity
          </button>
        </div>
      </form>

      
      {selectedTags.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2 rounded-xl border border-white/5 bg-white/2 px-3 py-2 text-xs text-slate-400">
          <span>Affect to:</span>
          {selectedTags.map((t) => (
            <span
              key={t.key}
              className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/3 px-2 py-0.5 font-semibold text-slate-200"
            >
              <span
                className="h-1.5 w-1.5 rounded-full shrink-0"
                style={{ backgroundColor: t.color }}
              />
              {t.key}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
